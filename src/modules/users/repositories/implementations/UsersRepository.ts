import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const findId = this.users.find((user) => user.id === id);
    return findId;
  }

  findByEmail(email: string): User | undefined {
    const findEmail = this.users.find((user) => user.email === email);
    return findEmail;
  }

  turnAdmin(receiverUser: User): User {
    const updateAdmin = {
      ...receiverUser,
      admin: true,
      updated_at: new Date(),
    };

    this.users = this.users.map((user) =>
      user.id === receiverUser.id ? updateAdmin : user
    );

    return updateAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
