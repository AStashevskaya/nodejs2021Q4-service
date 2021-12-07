import * as tasksRepo from './tasks.memory.repository';
import * as boardsRepo from '../boards/board.memory.repository';
import Task from './tasks.model';

// const tasksRepo = require('./tasks.memory.repository');
// const boardsRepo = require('../boards/board.memory.repository');
// const Task = require('./tasks.model');

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
      throw new Error();
    }

    const task = await tasksRepo.findById({ id: taskId });

    if (!task) {
      throw new Error();
    }

    reply.code(200).send(task);
  } catch (error) {
    reply.code(404).send({ message: 'Not found' });
  }
};

const addTask = async (req, reply) => {
  const { boardId } = req.params;

  try {
    const board = await boardsRepo.findById({ id: boardId });

    if (!board) {
      throw new Error();
    }

    const newTask = new Task({ ...req.body, boardId });
    await tasksRepo.create(newTask);

    reply.code(201).send(newTask);
  } catch (error) {
    reply.code(400);
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
  const { taskId, boardId } = req.params;

  try {
    const board = await boardsRepo.findById({ id: boardId });

    if (!board) {
      throw new Error();
    }

    await tasksRepo.deleteOne({ id: taskId });

    reply.send('Task deleted');
  } catch (error) {
    reply.code(404).send({ message: 'Not found' });
  }
};

// {   "title": "Autotest task",
//   "order": 0,
//   "description": "Lorem ipsum",
//   "userId": null,
//   "boardId": null,
//   "columnId": null
//   }

export {
  getTasksFromBoard,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
