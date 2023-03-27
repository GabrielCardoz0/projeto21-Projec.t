import prisma from "../../config/database";
import { CreateUserParams } from "../../services/users-service";

async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
        email,
    }
  });
}

async function createNewUser({email, password}: CreateUserParams) {
  return await prisma.user.create({
    data: {
        email,
        password,
        name: ''
    }
  });
}

const usersRepository = {
  findUserByEmail,
  createNewUser
}

export default usersRepository;
