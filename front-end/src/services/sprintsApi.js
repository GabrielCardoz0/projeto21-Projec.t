import api from "./api";
import tokenVerify from "./tokenVerify";

export async function getSprints(projectId) {
    const token = tokenVerify();

    const list = await api.get(`/sprints/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return list.data;
};
