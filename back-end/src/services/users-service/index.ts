import usersRepository from "../../repositories/users-repository"; 
import bcrypt from "bcrypt";

export type CreateUserParams = {
  name: string,
  email: string,
  password: string
}

async function createNewUser({ name, email, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await usersRepository.createNewUser({ name, email, password: hashedPassword });

  return {id: user.id, name: user.name, email: user.email};
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await usersRepository.findUserByEmail(email);

  if(userWithSameEmail) throw { name: "ConflictError", message: "email alredy exist" };
}

const userService = {
  createNewUser,
}

export default userService;
