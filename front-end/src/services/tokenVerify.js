import { useNavigate } from "react-router-dom";

export default function useTokenVerify() {
    const navigate = useNavigate();

    const token = window.localStorage.getItem("token");

    if(!token) navigate("/");
};
