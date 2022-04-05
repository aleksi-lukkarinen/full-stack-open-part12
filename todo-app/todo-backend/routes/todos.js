const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

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
});

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

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  if (!req.todo) {
    return res.sendStatus(404);
  }

  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (!req.todo) {
    return res.sendStatus(404);
  }

  const entryToUpdate = {}

  const {text, done} = req.body;

  if (text || typeof(text) === "string") {
    const trimmedText = text.trim();
    if (trimmedText.length > 0) {
      entryToUpdate.text = trimmedText;
    }
    else {
      return res.sendStatus(400);
    }
  }

  if (typeof(done) === "boolean") {
    entryToUpdate.done = done;
  }
  else {
    return res.sendStatus(400);
  }

  const updatedEntry =
    await Todo.findByIdAndUpdate(
      req.todo._id, entryToUpdate, {
        new: true,
        useFindAndModify: false,
      });

  res.json(updatedEntry);
});

router.use('/:id', findByIdMiddleware, singleRouter);


module.exports = router;
