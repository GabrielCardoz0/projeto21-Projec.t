import express from "express";
import cors from "cors";
import prisma from "./config/database";

const app = express();

app
  .use(express.json())
  .use(cors())
  .get("/health", async (req, res) => {
    const list = await prisma.user.findMany({});
    res.send(list);
  });


export default app;