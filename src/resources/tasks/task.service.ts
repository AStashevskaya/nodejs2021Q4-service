import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteHandlerMethod,
} from 'fastify';
import * as tasksRepo from './tasks.memory.repository';
import * as boardsRepo from '../boards/board.memory.repository';
import Task from './tasks.model';
import Board from '../boards/board.model';

type ErrorResponse = {
  message: string;
};

const getTasksFromBoard: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{
  Reply: Task[] | ErrorResponse;
  Params: { boardId: string };
}
> = async (req, reply) => {
  const { boardId } = req.params;

  try {
    const tasks = tasksRepo.findOneByBoardId({ boardId });

    if (!tasks.length) {
      await reply.code(404);
    }

    await reply.code(200).send(tasks);
  } catch (error) {
    await reply.code(404);
  }
};

const getTask: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Task | ErrorResponse; Params: { taskId: string, boardId: string } }
> = async (req, reply) => {
  const { boardId, taskId } = req.params;

  try {
    const board = boardsRepo.findById({ id: boardId });

    if (!board) {
      throw new Error();
    }

    const task = tasksRepo.findById({ id: taskId });

    if (!task) {
      throw new Error();
    }

    await reply.code(200).send(task);
  } catch (error) {
    await reply.code(404).send({ message: 'Not found' });
  }
};

const addTask: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Task | ErrorResponse; Params: { boardId: string }; Body: Board }
> = async (req, reply) => {
  const { boardId } = req.params;

  try {
    const board = boardsRepo.findById({ id: boardId });

    if (!board) {
      throw new Error();
    }

    const newTask = new Task({ boardId, ...req.body });
    tasksRepo.create(newTask);

    await reply.code(201).send(newTask);
  } catch (error) {
    await reply.code(400);
  }
};

const updateTask: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Task | ErrorResponse; Params: { taskId: string }; Body : Task }
> = async (req, reply) => {
  const { taskId } = req.params;

  try {
    tasksRepo.updateOne({ ID: taskId, ...req.body });
    const task = tasksRepo.findById({ id: taskId });
    // const updatedTask = new Task({ ...task, ...req.body });

    await reply.code(200).send(task);
  } catch (error) {
    await reply.code(404);
  }
};

const deleteTask: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: string | ErrorResponse; Params: { taskId: string, boardId: string } }
> = async (req, reply) => {
  const { taskId, boardId } = req.params;

  try {
    const board = boardsRepo.findById({ id: boardId });

    if (!board) {
      throw new Error();
    }

    tasksRepo.deleteOne({ id: taskId });

    await reply.send('Task deleted');
  } catch (error) {
    await reply.code(404).send('Not found');
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
  getTasksFromBoard, getTask, addTask, updateTask, deleteTask,
};
