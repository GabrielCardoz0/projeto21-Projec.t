import authRepository from "../../repositories/auth-repository";
import { CreateUserParams } from "../users-service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn({ email, password }: CreateUserParams) {
  const user = await authRepository.getUserByEmail(email);

  if(!user) throw { name: "NotFoundError", message: "wrong email" };

  const passwordVerify = bcrypt.compareSync(password, user.password);

  if(!passwordVerify) throw { name: "UnauthorizedError", message: "wrong password" };

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

}


const authService = {
  signIn
};

export default authService;
