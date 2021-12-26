import { FastifyInstance } from 'fastify';
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from './user.service';

const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getAllUsersOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            login: { type: 'string' },
          },
        },
      },
    },
  },
  handler: getUsers,
};

const getUserOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
    },
  },
  handler: getUser,
};

const updateUserOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          login: { type: 'string' },
        },
      },
    },
  },
  handler: updateUser,
};

const deleteUserOptions = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: deleteUser,
};

const addUserOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'password', 'login'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
        login: { type: 'string' },
      },
    },
    response: {
      201: UserSchema,
    },
  },
  handler: addUser,
};

/**
 * User routes
 *
 * @param fastify - Fastify Instance
 * @returns Promise (void)
 */

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', getAllUsersOptions);
  fastify.post('/users', addUserOptions);
  fastify.get('/users/:userId', getUserOptions);
  fastify.put('/users/:userId', updateUserOptions);
  fastify.delete('/users/:userId', deleteUserOptions);

  await Promise.resolve();
}

export default userRoutes;
