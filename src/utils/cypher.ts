// import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';

// const password = 'Password used to generate key';
// const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
// const iv = randomBytes(16);

// export const encrypt = async (text) => {
//   const cipher = createCipheriv('aes-256-ctr', key, iv);
//   const textToEncrypt = 'Nest';
//   const encryptedText = Buffer.concat([
//     cipher.update(textToEncrypt),
//     cipher.final(),
//   ]);
//   return encryptedText;
// };

// export const decrypt = async (text) => {
//   const decipher = createDecipheriv('aes-256-ctr', key, iv);
//   const decryptedText = Buffer.concat([
//     decipher.update(text),
//     decipher.final(),
//   ]);
//   return decryptedText;
// };
