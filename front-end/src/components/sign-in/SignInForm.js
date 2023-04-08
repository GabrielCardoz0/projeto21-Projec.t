import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getColor from "../../assets/COLORS";
import signIn from "../../services/signInApi";

export default function SignInForm(params) {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function changePage() {
        navigate("/sign-up");
    };

    async function submituser(e) {
        e.preventDefault();
        try {
            const token = await signIn(email, password);

            alert(token)

            window.localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert(`
            Não foi possível fazer login, tente novamente mais tarde.
            error: ${error.message}`);
        };
    };

  return (
    <Container>
        <form onSubmit={e => submituser(e)}>
        <span>Login</span>
            <input type={"email"} placeholder="email" required onChange={e => setEmail(e.target.value)}/>
            <input type={"password"} placeholder="password" required onChange={e => setPassword(e.target.value)}/>
            <input className="submit" type={"submit"} value="login"/>
        </form>
        <p onClick={() => changePage()}>Don't have an account? sign-up!</p>
    </Container>
  );
};

const Container = styled.div`
    width: 50vw;
    height: 100vh;
    background-color: ${() => getColor("fst")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    p {
        color: ${() => getColor("wht")};
        text-decoration: underline;
    }
    span {
        font-size: 30px;
        color: #fff;
        font-weight: 700;
        margin-bottom: 15px;
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        /* height: 350px; */
        max-width: 450px;
        border-radius: 5px;
        padding: 15px;
        input {
            width: 300px;
            height: 40px;
            border-radius: 5px;
            margin-bottom: 15px;
            border: 1px solid #fff;
            padding: 10px;
        }
        .submit {
            font-weight: bold;
            color: ${() => getColor("fst")};
        }
    }
    p, .submit {
            cursor: pointer;
    }

    animation: changePage .4s;

    @keyframes changePage {
        from {
            opacity: 0;
            width: 0;
        }
        to {
            opacity: 1;
            width: 50vw;
        }
    }
`;