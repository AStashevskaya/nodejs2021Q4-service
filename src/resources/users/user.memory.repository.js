let users = [];

// const getAll = async () => {
//   // const users = []
//   return users;
//   // // TODO: mock implementation. should be replaced during task development
//   // return [];
// };

const getAll = async () => users;
const create = async (user) => users.push(user);
const findOneByLogin = async ({ login }) =>
  users.find((user) => user.login === login);
const findById = async ({ id }) => {
  const usersDB = await getAll();
  const user = usersDB.find((person) => person.id === id);
  return user;
};
const updateOne = async ({ id, ...rest }) => {
  users = users.map((person) =>
    person.id === id ? { ...person, ...rest } : person
  );
};
const deleteOne = async ({ id }) => {
  const user = users.find((el) => el.id === id);
  const userIdx = users.indexOf(user);
  users.splice(userIdx, 1);
};

module.exports = {
  getAll,
  create,
  findOneByLogin,
  findById,
  updateOne,
  deleteOne,
};
