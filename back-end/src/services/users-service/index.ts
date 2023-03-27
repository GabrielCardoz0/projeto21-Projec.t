import usersRepository from "../../repositories/users-repository";
import bcrypt from "bcrypt";

export type CreateUserParams = {
    email: string,
    password: string
}

async function createNewUser({ email, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await usersRepository.createNewUser({ email, password: hashedPassword });

  return {id: user.id, email: user.email};
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await usersRepository.findUserByEmail(email);

  if(userWithSameEmail) throw { name: "ConflictError", message: "email alredy exist" };
}

const userService = {
  createNewUser,
}

export default userService;
