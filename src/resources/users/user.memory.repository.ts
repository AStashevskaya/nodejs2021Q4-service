import User from './user.model';

let users: User[] = [];

/**
 * Returns array of users
 * @returns users array User[]
 */
const getAll = () => users;

/**
 * Returns update array of user with new user inside
 * @param user - param new user object User
 * @returns updated users array
 */
const create = (user: User) => users.push(user);

/**
 * Returns user with requested id
 * @param id - distructured param from User string
 * @returns user User
 */
const findById = ({ id }: { id: string }) => {
  const usersDB = getAll();
  const user = usersDB.find((person: User) => person.id === id);

  return user;
};

/**
 * Update requested user in users array
 * @param id - distructured first param from User string
 * @param rest - distructured rest params from User array of strings
 * @returns void
 */
const updateOne = ({ id, ...rest }: { id: string }) => {
  users = users.map((person: User) => new User({ ...person, ...rest }));
};

/**
 * Delete requested user in users array
 * @param id - distructured first param from User string
 * @returns void
 */
const deleteOne = ({ id }: { id: string }) => {
  const user = users.find((person: User) => person.id === id);
  const userIdx = user && users.indexOf(user);

  if (userIdx) {
    users.splice(userIdx, 1);
  }
};

export {
  getAll, create, findById, updateOne, deleteOne,
};
