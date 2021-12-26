import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';

import * as boardsRepo from './board.memory.repository';
import * as tasksRepo from '../tasks/tasks.memory.repository';
import Column from '../columns/column.model';
import Board from './board.model';

type ErrorResponse = {
  message: string;
};

/** get all boards
 * @param req - Fastify Request
 * @returns Board[] or ErrorResponse
 */
const getBoards: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Board[] }
> = async (req, reply) => {
  const boards = boardsRepo.getAll();

  await reply.send(boards);
};

/** get a specific Board
 * @param req - Fastify Request
 * @returns Board or ErrorResponse
 */
const getBoard: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Board | ErrorResponse; Params: { boardId: string } }
> = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    const board = boardsRepo.findById({ id });

    if (!board) {
      throw new Error();
    }

    await reply.code(200).send(board);
  } catch (error) {
    await reply.code(404).send({ message: 'Not found' });
  }
};

/** create new Board
 * @param req - Fastify Request
 * @returns Board or ErrorResponse
 */
const addBoard: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{
  Reply: Board | ErrorResponse;
  Body: { title: string; columns: object[] };
}
> = async (req, reply) => {
  const { columns, title } = req.body;
  const columnsObj: Column[] = columns.map((el: object) => new Column(el)) || [];

  try {
    const newBoard = new Board({ title, columns: columnsObj });

    boardsRepo.create(newBoard);

    await reply.code(201).send(newBoard);
  } catch (error) {
    await reply.code(400).send({ message: 'Something goes wrong' });
  }
};

/** update Board
 * @param req - Fastify Request
 * @returns Board or ErrorResponse
 */
const updateBoard: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{
  Reply: Board | ErrorResponse;
  Body: { title: string; columns: Column[] };
  Params: { boardId: string };
}
> = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    boardsRepo.updateOne({ id, ...req.body });
    const board = boardsRepo.findById({ id });

    await reply.code(200).send(board);
  } catch (error) {
    await reply.code(404);
  }
};

/** delete Board
 * @param req - Fastify Request
 * @returns Board or ErrorResponse
 */
const deleteBoard: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Board | string; Params: { boardId: string } }
> = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    const board = boardsRepo.findById({ id });

    if (!board) {
      throw new Error();
    }

    tasksRepo.deleteAllBoardId(id);
    boardsRepo.deleteOne({ id });

    await reply.send('Board deleted');
  } catch (error) {
    await reply.code(404).send('Not Found');
  }
};

export {
  getBoards, getBoard, addBoard, updateBoard, deleteBoard,
};
