export interface IUser {
  id: string;
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  password?: string;
}
