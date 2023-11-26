import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

export const transformPw = async (password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

export const PwCompare = async (pass, user: User) => {
  const isValid = await bcrypt.compare(pass, user.password);
  if (isValid) return true;
  else return false;
};
