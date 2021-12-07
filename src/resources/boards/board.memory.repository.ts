let boards = [];

const getAll = async () => boards;
const create = async (newboard) => boards.push(newboard);

const findOneByLogin = async ({ login }) =>
  boards.find((desk) => desk.login === login);

  const findById = async ({ id }) => {
  const boardDB = await getAll();
  const board = boardDB.find((desk) => desk.id === id);
  return board;
};
const updateOne = async ({ id, ...rest }) => {
  boards = boards.map((board) =>
    board.id === id ? { ...board, ...rest } : board
  );
};
const deleteOne = async ({ id }) => {
  const board = boards.find((el) => el.id === id);
  const boardIdx = boards.indexOf(board);
  boards.splice(boardIdx, 1);
};

export {
  getAll,
  create,
  findOneByLogin,
  findById,
  updateOne,
  deleteOne,
};
