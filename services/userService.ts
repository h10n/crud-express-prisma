import { findUsers } from "../repositories/userRepository";

export const getUsers = async () => {
  return await findUsers();
};
