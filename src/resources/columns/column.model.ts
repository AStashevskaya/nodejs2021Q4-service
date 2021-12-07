import { uuidv4 } from 'uuid'
// const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({
    id = uuidv4(),
    title = 'Fix Bugs',
    order = '1',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

export default Column;
