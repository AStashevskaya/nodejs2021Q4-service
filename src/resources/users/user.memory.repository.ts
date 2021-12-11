import User from './user.model';

let users: User[] = [];

/**
 * Returns array of users
 * @returns users array
 */
const getAll = () => users;

/**
 * Returns the sum of a and b
 * @param user - param new poste user User
 * @returns void
 */
const create = (user: User) => users.push(user);

/**
 * Returns the sum of a and b
 * @param id - distructured param from User string
 * @returns user User
 */
const findById = ({ id }: { id: string }) => {
  const usersDB = getAll();
  const user = usersDB.find((person: User) => person.id === id);

  return user;
};

/**
 * Returns the sum of a and b
 * @param id - distructured first param from User string
 * @param rest - distructured rest params from User array of strings
 * @returns void
 */
const updateOne = ({ id, ...rest }: { id: string }) => {
  // users = users.map((person: User) =>
  //   person.id === id ? new User({ ...person, ...rest }) : person
  // );
  users = users.map((person: User) => new User({ ...person, ...rest }));
};

/**
 * Returns the sum of a and b
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
