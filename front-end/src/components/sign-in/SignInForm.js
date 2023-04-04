import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getColor from "../../assets/COLORS";

export default function SignInForm(params) {

   function submituser(e) {
    e.preventDefault();
    alert("clicou em submit");
   }

   const navigate = useNavigate();

  return (
    <Container>
        <form onSubmit={e => submituser(e)}>
        <span>Login</span>
            {/* <input type={"text"} placeholder="username" required/> */}
            <input type={"text"} placeholder="email" required/>
            <input type={"text"} placeholder="password" required/>
            {/* <input type={"text"} placeholder="repeat password" required/> */}
            <input className="submit" type={"submit"} value="login"/>
        </form>
        <p onClick={() => navigate("/dashboard")}>Cadastre-se agora!</p>
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
`;