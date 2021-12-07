import { uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = 'Backlog', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;