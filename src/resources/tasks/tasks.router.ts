/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FastifyInstance, RegisterOptions } from 'fastify';
import {
  getTasksFromBoard,
  addTask,
  getTask,
  updateTask,
  deleteTask,
} from './task.service';

const TaskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' || 'string' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true },
    boardId: { type: 'string', nullable: true },
    columnId: { type: 'string', nullable: true },
  },
};

const getAllBoardTasksOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            order: { type: 'number' || 'string' },
            description: { type: 'string' },
            userId: { type: 'string', nullable: true },
            boardId: { type: 'string', nullable: true },
            columnId: { type: 'string', nullable: true },
          },
        },
      },
    },
  },
  handler: getTasksFromBoard,
};

const getTaskOptions = {
  schema: {
    response: {
      200: TaskSchema,
    },
  },
  handler: getTask,
};

const updateTaskOptions = {
  schema: {
    response: {
      200: TaskSchema,
    },
  },
  handler: updateTask,
};

const deleteTaskOptions = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: deleteTask,
};

const addTaskOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId'],
    },
    response: {
      201: TaskSchema,
    },
  },
  handler: addTask,
};

async function TasksRoutes(fastify: FastifyInstance, options: RegisterOptions) {
  fastify.get('/boards/:boardId/tasks', getAllBoardTasksOptions);
  fastify.post('/boards/:boardId/tasks', addTaskOptions);
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOptions);
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOptions);
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOptions);

  await Promise.resolve();
}

export default TasksRoutes;
