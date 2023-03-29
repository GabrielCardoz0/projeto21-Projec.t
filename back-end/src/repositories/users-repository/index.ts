import prisma from "../../config/database"; 
import { CreateUserParams } from "../../services/users-service";

async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
        email,
    }
  });
}

async function createNewUser({name, email, password}: CreateUserParams) {
  return await prisma.user.create({
    data: {
        email,
        password,
        name,
    }
  });
}

async function findUserById(id: number) {
  return prisma.user.findFirst({
    where: {
      id,
    }
  });
}

const usersRepository = {
  findUserByEmail,
  createNewUser,
  findUserById,
}

export default usersRepository;
