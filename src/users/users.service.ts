import { Injectable } from '@nestjs/common';
export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'test1',
      password: 'passtest',
    },
    {
      userId: 2,
      username: 'test2',
      password: 'passtest',
    },
  ];
  create(user: User) {
    this.users.push(user);
  }
  findUserByName(username: string) {
    return this.users.find((obj) => obj['username'] === username);
  }
}
