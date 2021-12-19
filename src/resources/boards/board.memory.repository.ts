import Board from './board.model';

let boards: Board[] = [];

/**
 * Returns array of boards
 * @returns boards array Board[]
 */
const getAll = () => boards;

/**
 * Returns update array of boards with new board inside
 * @param user - param new board object Board
 * @returns updated boards array Board[]
 */
const create = (newboard: Board) => boards.push(newboard);

/**
 * Returns Board
 * @param id - distructured param from Board string
 * @returns board instanse of Board
 */
const findById = ({ id }: { id: string }) => {
  const boardDB = getAll();
  const board = boardDB.find((desk) => desk.id === id);

  return board;
};

/**
 * Update requested board in boards array
 * @param id - distructured first param from Board string
 * @param rest - distructured rest params from Board array of strings
 * @returns void
 */
const updateOne = ({ id, ...rest }: { id: string }) => {
  boards = boards.map((board: Board) => new Board({ ...board, ...rest }));
};

/**
 * Delete requested board from boards array
 * @param id - distructured first param from Board string
 * @returns void
 */
const deleteOne = ({ id }: { id: string }) => {
  const board = boards.find((el) => el.id === id);
  const boardIdx = board && boards.indexOf(board);

  if (boardIdx) {
    boards.splice(boardIdx, 1);
  }
};

export {
  getAll, create, findById, updateOne, deleteOne,
};
