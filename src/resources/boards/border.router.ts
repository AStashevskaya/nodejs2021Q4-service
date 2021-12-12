import { FastifyInstance, RegisterOptions } from 'fastify';
import {
  getBoards,
  addBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} from './board.service';

const BoardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array' },
  },
};

const getAllBoardsOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: { type: 'array' },
          },
        },
      },
    },
  },
  handler: getBoards,
};

const getBoardOptions = {
  schema: {
    response: {
      200: BoardSchema,
    },
  },
  handler: getBoard,
};

const updateBoardOptions = {
  schema: {
    response: {
      200: BoardSchema,
    },
  },
  handler: updateBoard,
};

const deleteBoardOptions = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
      404: {
        type: 'string',
      },
    },
  },
  handler: deleteBoard,
};

const addBoardOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          properties: {
            // id: { type: 'string' },
            title: { type: 'string' },
            order: { type: 'string' },
          },
        },
      },
    },
    response: {
      201: BoardSchema,
    },
  },
  handler: addBoard,
};

async function boardRoutes(fastify: FastifyInstance, options: RegisterOptions) {
  fastify.get('/boards', getAllBoardsOptions);
  fastify.post('/boards', addBoardOptions);
  fastify.get('/boards/:boardId', getBoardOptions);
  fastify.put('/boards/:boardId', updateBoardOptions);
  fastify.delete('/boards/:boardId', deleteBoardOptions);

  await Promise.resolve();
}

export default boardRoutes;
