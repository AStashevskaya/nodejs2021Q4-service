import { v4 as uuidv4 } from 'uuid';

// type UserType = {
//   id: string;
//   name: string;
//   login: string;
//   password: string;
//   toResponse(): { name: string; id: string; login: string };
// };

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public toResponse() {
    const { id } = this;
    const { name } = this;
    const { login } = this;

    return { id, name, login };
  }
}

export default User;
