import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import * as usersRepo from './user.memory.repository';
import * as tasksRepo from '../tasks/tasks.memory.repository';
import User from './user.model';

type UserResponse = {
  id: string;
  login: string;
  name: string;
};

type ErrorResponse = {
  message: string;
};

type DeleteResponse = {
  message: string;
};

/** get all user handler
 * @param req - Fastify Request
 * @returns Useresponse []
 */
const getUsers: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: UserResponse[] }
> = async (req, reply) => {
  const users = usersRepo.getAll();

  try {
    await reply.send(users.map((user) => user.toResponse()));
  } catch (error) {
    await reply.code(404);
  }
};

/** get a user
 * @param req - Fastify Request
 * @returns user getted by id Useresponse
 */
const getUser: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: UserResponse; Params: { userId: string } }
> = async (req, reply) => {
  const { userId: id } = req.params;

  try {
    const user = usersRepo.findById({ id });

    if (user) {
      await reply.code(200).send(user.toResponse());
    }

    await reply.code(404);
  } catch (error) {
    await reply.code(404);
  }
};

/** create new user handler
 * @param req - Fastify Request
 * @returns new user Useresponse || ErrorResponse
 */
const addUser: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{
  Reply: UserResponse | ErrorResponse;
  Body: { name: string; login: string; password: string };
}
> = async (req, reply) => {
  const { name, login, password } = req.body;

  try {
    const newUser = new User({ name, login, password });

    usersRepo.create(newUser);

    await reply.code(201).send(newUser.toResponse());
  } catch (error) {
    await reply.code(400).send({ message: 'Something goes wrong' });
  }
};

/** update user with new params
 * @param req - Fastify Request
 * @returns user getted by id Useresponse || ErrorResponse
 */
const updateUser: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{
  Reply: UserResponse;
  Body: { name: string; login: string; password: string };
  Params: { userId: string };
}
> = async (req, reply) => {
  const { userId: id } = req.params;

  try {
    usersRepo.updateOne({ id, ...req.body });
    const user = usersRepo.findById({ id });
    const updatedUser = new User({ ...user, ...req.body });

    await reply.code(200).send(updatedUser.toResponse());
  } catch (error) {
    await reply.code(404);
  }
};

/** delete User
 * @param req - Fastify Request
 * @returns DeleteResponse or ErrorResponse
 */
const deleteUser: RouteHandlerMethod<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
{ Reply: DeleteResponse | ErrorResponse; Params: { userId: string } }
> = async (req, reply) => {
  const { userId: id } = req.params;

  try {
    tasksRepo.updateAllUserId(id);

    usersRepo.deleteOne({ id });

    await reply.send({ message: 'User deleted' });
  } catch (error) {
    await reply.code(404);
  }
};

export {
  getUsers, getUser, addUser, updateUser, deleteUser,
};
