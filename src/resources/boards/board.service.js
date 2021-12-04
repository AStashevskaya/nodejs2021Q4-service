const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/tasks.memory.repository')
const Board = require('./board.model');
const Column = require('../columns/column.model')

const getBoards = async (req, reply) => {
  const boards = await boardsRepo.getAll();

  reply.send(boards);
};

const getBoard = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    const board = await boardsRepo.findById({ id });

    if (board) {
      reply.code(200).send(board);
    }

    reply.code(404);
  } catch (error) {
    reply.code(404);
  }
};

const addBoard = async (req, reply) => {
  const { columns, title } = req.body;
  const columnsObj = columns.map(el => new Column(el))

  try {
    const newBoard = new Board({ title, columns: columnsObj });
  
    await boardsRepo.create(newBoard);

    reply.code(201).send(newBoard);
  } catch (error) {
    reply.code(400).send({ message: 'Something goes wrong' });
  }
};

const updateBoard = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    await boardsRepo.updateOne({ id, ...req.body });
    const board = await boardsRepo.findById({ id });
    const updatedBoard = { ...board, ...req.body };

    reply.code(200).send(updatedBoard);
  } catch (error) {
    reply.code(404);
  }
};

const deleteBoard = async (req, reply) => {
  const { boardId: id } = req.params;

  try {
    await tasksRepo.deleteAllBoardId(id);
    await boardsRepo.deleteOne({ id });

    reply.send('Board deleted');
  } catch (error) {
    reply.code(404);
  }
};

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
