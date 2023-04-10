import api from "./api";
import tokenVerify from "./tokenVerify";

export async function getSprints(projectId) {
    const token = tokenVerify();

    const { data } = await api.get(`/sprints/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data;
};

export async function createSprint(projectId, number) {
    const token = tokenVerify();

    const { data } =  await api.post("/sprints", {projectId, number}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data;
};
