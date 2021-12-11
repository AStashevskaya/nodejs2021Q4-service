/* eslint-disable @typescript-eslint/ban-ts-comment */
import Board from './board.model';

let boards: Board[] = [];

const getAll = () => boards;
const create = (newboard: Board) => boards.push(newboard);

/**
 * Returns Board
 * @param id - distructured param from User string
 * @returns board instanse of Board
 */
const findById = ({ id }: { id: string }) => {
  const boardDB = getAll();
  const board = boardDB.find((desk) => desk.id === id);

  return board;
};

const updateOne = ({ id, ...rest }: { id: string }) => {
  // @ts-ignore
  boards = boards.map((board: Board) => new Board({ ...board, ...rest }));
};

const deleteOne = ({ id }: { id: string }) => {
  const board = boards.find((el) => el.id === id);
  const boardIdx = board && boards.indexOf(board);

  if (boardIdx) {
    boards.splice(boardIdx, 1);
  }
};

export { getAll, create, findById, updateOne, deleteOne };
