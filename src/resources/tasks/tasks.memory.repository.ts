import Task from './tasks.model';

let tasks: Task[] = [];

/**
 * Returns array of tasks
 * @returns tasks array Task[]
 */
const getAll = () => tasks;

/**
 * Returns update array of tasks with new task inside
 * @param task - param new task object Task
 * @returns updated tasks array
 */
const create = (task: Task) => tasks.push(task);

/**
 * Returns tasks with requested board id
 * @param boardId - distructured param from Task string
 * @returns array of tasks Task[]
 */
const findOneByBoardId = ({ boardId }: { boardId: string }) =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Returns task with requested id
 * @param id - distructured param from Task string
 * @returns task Task
 */
function findById({ id }: { id: string }) {
  const tasksDB = getAll();
  const task = tasksDB.find((issue) => issue.id === id);
  return task;
}

/**
 * Update requested task in tasks array
 * @param ID - distructured first param from Task string
 * @param rest - distructured all other params object
 * @returns void
 */
const updateOne = ({ ID: taskId, ...rest }: { ID: string }) => {
  tasks = tasks.map((task: Task) =>
    (task.id === taskId ? { ...task, ...rest } : task));
};

/**
 * Delete all tasks of requested board in tasks array
 * @param boardId - first param string
 * @returns void
 */
const deleteAllBoardId = (boardId: string) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

/**
 * Updated all tasks wich have same id with id from params in tasks array with null
 * @param id - first param from User string
 * @returns void
 */
const updateAllUserId = (userId: string) => {
  tasks = tasks.map((task) =>
    (task.userId === userId ? { ...task, userId: null } : task));
};

/**
 * Delete requested task in users array
 * @param id - distructured first param from User string
 * @returns void
 */
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
