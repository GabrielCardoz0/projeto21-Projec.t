import authRepository from "../../repositories/auth-repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type AuthParams = {
  email: string,
  password: string,
}

async function signIn({ email, password }: AuthParams) {
  const user = await authRepository.getUserByEmail(email);

  if(!user) throw { name: "UnauthorizedError", message: "wrong email" };

  const passwordVerify = bcrypt.compareSync(password, user.password);

  if(!passwordVerify) throw { name: "UnauthorizedError", message: "wrong password" };

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  delete user.password;

  return {...user, token};
}


const authService = {
  signIn
};

export default authService;
