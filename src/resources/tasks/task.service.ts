import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import * as tasksRepo from './tasks.memory.repository';
import * as boardsRepo from '../boards/board.memory.repository';
import Task from './tasks.model';
import Board from '../boards/board.model';

type ErrorResponse = {
  message: string;
};

/** get all Tasks
 * @param req - Fastify Request
 * @returns Task[] or ErrorResponse
 */
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

    await reply.code(200).send(tasks);
  } catch (error) {
    await reply.code(404);
  }
};

/** get a specific Task
 * @param req - Fastify Request
 * @returns Task or ErrorResponse
 */
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

/** create new Task
 * @param req - Fastify Request
 * @returns Task or ErrorResponse
 */
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

    const newTask = new Task({ ...req.body, boardId });
    tasksRepo.create(newTask);

    await reply.code(201).send(newTask);
  } catch (error) {
    await reply.code(400);
  }
};

/** update Task
 * @param req - Fastify Request
 * @returns Task or ErrorResponse
 */
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

    await reply.code(200).send(task);
  } catch (error) {
    await reply.code(404);
  }
};

/** delete Task
 * @param req - Fastify Request
 * @returns DeleteResponse or ErrorResponse
 */
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

export {
  getTasksFromBoard, getTask, addTask, updateTask, deleteTask,
};
