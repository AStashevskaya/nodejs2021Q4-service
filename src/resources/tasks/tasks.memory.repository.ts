let tasks = [];

const getAll = async () => tasks;
const create = async (task) => tasks.push(task);
const findOneByBoardId = async ({ boardId }) =>
  tasks.filter((task) => task.boardId === boardId);
const findById = async ({ id }) => {
  const tasksDB = await getAll();
  const task = tasksDB.find((issue) => issue.id === id);
  return task;
};
const updateOne = async ({ id, ...rest }) => {
  tasks = tasks.map((issue) =>
    issue.id === id ? { ...issue, ...rest } : issue
  );
};

const deleteAllBoardId = async ( boardId ) => {
  tasks = tasks.filter(task => task.boardId !== boardId)
}

const updateAllUserId = async (userId) => {
  tasks = tasks.map((task) => task.userId === userId ? { ...task, userId: null } : task);
};

const deleteOne = async ({ id }) => {
  const task = tasks.find((el) => el.id === id);
  const taskIdx = tasks.indexOf(task);
  tasks.splice(taskIdx, 1);
};

export = {
  getAll,
  create,
  findOneByBoardId,
  findById,
  updateOne,
  deleteOne,
  deleteAllBoardId,
  updateAllUserId,
};