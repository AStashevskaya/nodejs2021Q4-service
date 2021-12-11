import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');

interface Column {
  id: string;
  title: string;
  order: string;
}

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
}

export default Column;
