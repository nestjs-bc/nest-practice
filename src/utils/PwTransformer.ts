import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

export const PwTransformer = async (user: User): Promise<void> => {
  user.password = await bcrypt.hash(user.password, 10);
  return Promise.resolve();
};

export const PwCompare = async (pass, user: User) => {
  const isValid = await bcrypt.compare(pass, user.password);
  if (isValid) return true;
  else return false;
};
