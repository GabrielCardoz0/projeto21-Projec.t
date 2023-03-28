import prisma from "../../config/database";

async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
        email
    }
  });
}

const authRepository = {
  getUserByEmail
};

export default authRepository;
