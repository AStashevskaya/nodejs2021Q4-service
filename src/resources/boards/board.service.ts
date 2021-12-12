/* eslint-disable @typescript-eslint/ban-ts-comment */
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

// const boardsRepo = require('./board.memory.repository');
// const tasksRepo = require('../tasks/tasks.memory.repository');
// const Board = require('./board.model');
// const Column = require('../columns/column.model');

const getBoards: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: Board[] }
> = async (req, reply) => {
  const boards = boardsRepo.getAll();
  console.log('boards', boards);

  await reply.send(boards);
};

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
    // @ts-ignore
    const newBoard = new Board({ title, columns: columnsObj });

    boardsRepo.create(newBoard);

    await reply.code(201).send(newBoard);
  } catch (error) {
    await reply.code(400).send({ message: 'Something goes wrong' });
  }
};

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

    // if (board) {

    await reply.code(200).send(board);
    // const updatedBoard = new Board({ ...board, ...req.body });
    // await reply.code(200).send(updatedBoard);
    // }
  } catch (error) {
    await reply.code(404);
  }
};

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
