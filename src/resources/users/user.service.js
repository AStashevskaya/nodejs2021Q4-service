const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/tasks.memory.repository')
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUsers = async (req, reply) => {
  const users = await getAll();

  reply.send(users.map(User.toResponse));
};

const getUser = async (req, reply) => {
  const { userId: id } = req.params;

  try {
    const user = await usersRepo.findById({ id });

    if (user) {
      reply.code(200).send(user.toResponse(user));
    }

    reply.code(404);
  } catch (error) {
    reply.code(404);
  }
};

const addUser = async (req, reply) => {
  const { name, login, password } = req.body;

  try {
    const newUser = new User({ name, login, password });
    newUser.toResponse = User.toResponse;

    await usersRepo.create(newUser);

    reply.code(201).send(newUser.toResponse(newUser));
  } catch (error) {
    reply.code(400).send({ message: 'Something goes wrong' });
  }
};

const updateUser = async (req, reply) => {
  const { userId: id } = req.params;

  try {
    await usersRepo.updateOne({ id, ...req.body })
    const user = await usersRepo.findById({ id });
    const updatedUser = { ...user, ...req.body }

    reply.code(200).send(updatedUser.toResponse(updatedUser))
  } catch (error) {
    reply.code(404)
  }
};

const deleteUser = async (req, reply) => {
      const { userId: id } = req.params;

      try {
        await tasksRepo.updateAllUserId(id);
        await usersRepo.deleteOne({ id });

        reply.send('User deleted');
      } catch (error) {
        reply.code(404);
      }
};

module.exports = { getAll, getUsers, getUser, addUser, updateUser, deleteUser };
