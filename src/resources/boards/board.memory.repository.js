let boards = [];

const getAll = async () => boards;
const create = async (user) => boards.push(user);
const findOneByLogin = async ({ login }) =>
  boards.find((user) => user.login === login);
const findById = async ({ id }) => {
  const usersDB = await getAll();
  const user = usersDB.find((person) => person.id === id);
  return user;
};
const updateOne = async ({ id, ...rest }) => {
  boards = boards.map((person) =>
    person.id === id ? { ...person, ...rest } : person
  );
};
const deleteOne = async ({ id }) => {
  const user = boards.find((el) => el.id === id);
  const userIdx = boards.indexOf(user);
  boards = boards.splice(userIdx, 1);
};

module.exports = {
  getAll,
  create,
  findOneByLogin,
  findById,
  updateOne,
  deleteOne,
};
