export default function tokenVerify() {
    console.log("rodou token verify");

    const token = window.localStorage.getItem("token");

    if(!token) return;

    return token;
};
