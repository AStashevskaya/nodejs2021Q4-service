import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

class Board {
  constructor({ id = uuidv4(), title = 'Backlog', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
