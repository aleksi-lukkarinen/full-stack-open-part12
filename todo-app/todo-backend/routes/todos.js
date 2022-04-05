const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();
const config = require('../util/config');


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  res.send(todo);

  increaseTodoCount();
});

const increaseTodoCount = async () => {
  let todoCount = await redis.getAsync(config.REDIS_ID_TODO_COUNT);
  todoCount = Number.parseInt(todoCount, 10);
  if (Number.isNaN(todoCount) || todoCount < 0) {
    todoCount = Todo.countDocuments({});
  }
  await redis.setAsync(config.REDIS_ID_TODO_COUNT, todoCount + 1);
}

const singleRouter = express.Router();

const reId = /^[0-9A-Fa-f]{24}$/;

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  if (!id || typeof(id) !== "string") {
    return res.sendStatus(400);
  }

  const trimmedId = id.trim();
  if (!reId.test(trimmedId)) {
    return res.sendStatus(400);
  }

  req.todo = await Todo.findById(trimmedId);
  if (!req.todo) return res.sendStatus(404);

  next();
}

singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

singleRouter.get('/', async (req, res) => {
  if (!req.todo) {
    return res.sendStatus(404);
  }

  res.send(req.todo);
});

singleRouter.put('/', async (req, res) => {
  // If the note was not found, there is nothing to modify
  if (!req.todo) {
    return res.sendStatus(404);
  }

  const entryToUpdate = {}

  const {text, done} = req.body;

  // Text does not have to be given,
  // but if it is, it has to be valid.
  if (text) {
    if (typeof(text) === "string") {
      const trimmedText = text.trim();
      if (trimmedText.length > 0) {
        entryToUpdate.text = trimmedText;
      }
    }

    if (!entryToUpdate.text) {
      return res.sendStatus(400);
    }
  }

  // "Done" does not have to be given,
  // but if it is, it has to be valid.
  if (done != undefined) {
    if (typeof(done) === "boolean") {
      entryToUpdate.done = done;
    }
    else {
      return res.sendStatus(400);
    }
  }

  // However, at least one of
  // the values has to be given.
  if (!entryToUpdate.text
    && entryToUpdate.done === undefined) {

    return res.sendStatus(400);
  }

  // Perform the update.
  const updatedEntry =
    await Todo.findOneAndUpdate(
      {_id: req.todo._id},
      {$set: entryToUpdate},
      {
        new: true,
        useFindAndModify: false,
      });

  res.json(updatedEntry);
});

router.use('/:id', findByIdMiddleware, singleRouter);


module.exports = router;
