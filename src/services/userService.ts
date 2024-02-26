import { findUserById, findUsers } from "@/repositories/userRepository";

export const getUsers = async () => {
  return await findUsers();
};

export const getUserById = async (id: string) => {
  return await findUserById(id);
};
