import { uuidv4 } from 'uuid';

class Task {
  constructor({
    id = uuidv4(),
    title = 'Fix Bugs',
    order = '1',
    description = 'Priority',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, columnId, boardId } = task;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

export default Task;
