const express = require('express');
const router = express.Router();
const config = require('../util/config');
const redis = require('../redis');
const { Todo } = require('../mongo');


let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...config,
    visits,
  });
});

router.get('/statistics', async (req, res) => {
  let todoCount = await redis.getAsync(config.REDIS_ID_TODO_COUNT);

  todoCount = Number.parseInt(todoCount, 10);
  if (Number.isNaN(todoCount) || todoCount < 0) {
    todoCount = await Todo.countDocuments({});
    await redis.setAsync(
      config.REDIS_ID_TODO_COUNT,
      todoCount);
  }

  const response = {
    "added_todos": todoCount,
  };

  res.send(response);
});

module.exports = router;
