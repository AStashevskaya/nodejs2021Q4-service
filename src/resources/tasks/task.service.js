const tasksRepo = require('./tasks.memory.repository');
const boardsRepo = require('../boards/board.memory.repository');
const Task = require('./tasks.model');

const getTasksFromBoard = async (req, reply) => {
  const { boardId } = req.params;

  try {
    const tasks = await tasksRepo.findOneByBoardId({ boardId });

    if (!tasks.length) {
      reply.code(404);
    }

    reply.code(200).send(tasks);
  } catch (error) {
    reply.code(404);
  }
};

const getTask = async (req, reply) => {
  const { boardId, taskId } = req.params;

  try {
    const board = await boardsRepo.findById({ id: boardId });

    if (!board) {
      reply.code(404);
    }

    const task = await tasksRepo.findById({ id: taskId });

    if (task) {
      reply.code(200).send(task);
    }

    reply.code(404);
  } catch (error) {
    reply.code(404);
  }
};

const addTask = async (req, reply) => {
  const { boardId } = req.params;

  try {
    const board = await boardsRepo.findById({ id: boardId });

    if (!board) {
      reply.code(404);
    }

    const newTask = new Task({ ...req.body, boardId });
    await tasksRepo.create(newTask);

    reply.code(201).send(newTask);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, reply) => {
    const { taskId } = req.params;

  try {
    await tasksRepo.updateOne({ taskId, ...req.body });
    const task = await tasksRepo.findById({ id: taskId });
    const updatedTask = { ...task, ...req.body };

    reply.code(200).send(updatedTask);
  } catch (error) {
    reply.code(404);
  }
};

const deleteTask = async (req, reply) => {
  const { taskId: id } = req.params;

  try {
    await tasksRepo.deleteOne({ id });

    reply.send('Task deleted');
  } catch (error) {
    reply.code(404);
  }
};

// {   "title": "Autotest task",
//   "order": 0,
//   "description": "Lorem ipsum",
//   "userId": null,
//   "boardId": null,
//   "columnId": null
//   }

module.exports = {
  getTasksFromBoard,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
