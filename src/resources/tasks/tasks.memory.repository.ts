import Task from './tasks.model';

let tasks: Task[] = [];

const getAll = () => tasks;

const create = (task: Task) => tasks.push(task);

const findOneByBoardId = ({ boardId }: { boardId: string }) =>
  tasks.filter((task) => task.boardId === boardId);

function findById({ id }: { id: string }) {
  const tasksDB = getAll();
  const task = tasksDB.find((issue) => issue.id === id);
  return task;
}

const updateOne = ({ ID: taskId, ...rest }: { ID: string }) => {
  tasks = tasks.map((task: Task) =>
    (task.id === taskId ? { ...task, ...rest } : task));
};

const deleteAllBoardId = (boardId: string) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

const updateAllUserId = (userId: string) => {
  tasks = tasks.map((task) =>
    (task.userId === userId ? { ...task, userId: null } : task));
};

const deleteOne = ({ id }: { id: string }) => {
  const task = tasks.find((el) => el.id === id);
  const taskIdx = task && tasks.indexOf(task);

  if (typeof taskIdx === 'number' && taskIdx >= 0) {
    tasks.splice(taskIdx, 1);
  }
};

export {
  getAll,
  create,
  findOneByBoardId,
  findById,
  updateOne,
  deleteOne,
  deleteAllBoardId,
  updateAllUserId,
};
