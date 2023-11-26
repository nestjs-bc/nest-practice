import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { User } from 'src/users/user.entity';
import { promisify } from 'util';

const password = 'Password used to generate key';
const iv = randomBytes(12);

export const encrypt = async (text) => {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
  return encryptedText.toString('base64');
};

export const decrypt = async (text) => {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(text, 'base64')),
    decipher.final(),
  ]);
  return decryptedText.toString();
};

// 사용자 데이터 암호화
export const encryptUserData = async (user: User) => {
  user.email = await encrypt(user.email);
  return user;
};

// 사용자 데이터 복호화
export const decryptUserData = async (user: User) => {
  user.email = await decrypt(user.email);
  return user;
};