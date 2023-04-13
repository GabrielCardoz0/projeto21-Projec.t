import api from "./api";

export default async function signIn(email, password) {
    const { data } = await api.post("/auth/sign-in", {email, password});

    return data;
};