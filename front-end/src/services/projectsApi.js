import api from "./api";
import tokenVerify from "./tokenVerify";

export async function getProjects() {
    const token = tokenVerify();

    const { data: { projects } } = await api.get("/projects", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
    return projects;
}

export async function createProject(name) {
    const token = tokenVerify();

    return await api.post("/projects", {name}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};