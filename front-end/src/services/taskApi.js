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

export async function getTasks(sprintId) {
  const token = tokenVerify();

  const { data } = await api.get(`/tasks/${sprintId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
  });

  return data;
};

export async function deleteTask(id) {
  const token = tokenVerify();

  return await api.delete(`/tasks/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
};

export async function updateTaskStatus(task){
  const token = tokenVerify();

  const { data } = await api.put("/tasks", task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};
