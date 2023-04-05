import api from "./api";

export default async function signUp(name, email, password) {
    await api.post("/users", {name, email, password});
};