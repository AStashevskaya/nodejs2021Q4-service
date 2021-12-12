import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  order: string | number;
  description: string;
  userId: string | null;
  columnId: string | null;
  boardId: string;
}

class Task {
  constructor({
    id = uuidv4(),
    title = 'Fix Bugs',
    order = '1',
    description = 'Priority',
    userId = null,
    boardId = '',
    columnId = null,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
