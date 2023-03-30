import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import prisma from "../../src/config/database";
import { User } from "../helpers";

export async function createUser(): Promise<User> {
  const name = faker.name.firstName();

  const email = faker.internet.email();

  const password = faker.internet.password(6);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword,
    }
  });

  return { ...user, password: password };
};