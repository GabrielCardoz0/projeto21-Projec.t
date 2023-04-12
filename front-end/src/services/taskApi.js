import api from "./api";
import tokenVerify from "./tokenVerify";

export async function createTask(task) {
  const token = tokenVerify();

  return await api.post("/tasks", task, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
  });
};
