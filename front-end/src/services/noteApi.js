import api from "./api";
import tokenVerify from "./tokenVerify";

export async function createNote(projectId, note) {
    const token = tokenVerify();

    const { data } = await api.post("/notes", { projectId, note }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data;
};

export async function getNotesByProjectId(id) {
    const token = tokenVerify();

    const { data } = await api.get(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data;
};