import { v4 as uuidv4 } from 'uuid';

// interface Column {
//   id: string;
//   title: string;
//   order: string;
// }

class Column {
  id: string;

  title: string;

  order: string;

  constructor({ id = uuidv4(), title = 'Fix Bugs', order = '1' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
