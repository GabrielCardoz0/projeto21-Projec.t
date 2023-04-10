export default function tokenVerify() {
    const token = window.localStorage.getItem("token");

    if(!token) return;

    return token;
};
