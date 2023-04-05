import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getColor from "../../assets/COLORS";
import signUp from "../../services/signUpApi";

export default function SignupForm(params) {
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    
    function changePage() {
        navigate("/sign-in");
    }

    async function submituser(e) {
     e.preventDefault();
     if(password !== repeatPassword) return alert("passwords dotn match");
     
     try {
        await signUp(username, email, password);
        changePage();
     } catch (error) {
        console.log(error);
        alert("Nao foi possível cadastrar, por favor tente novamente mais tarde.");
     };
    }
 
   return (
       <Container>
         <form onSubmit={e => submituser(e)}>
         <span>Create an account</span>
             <input type={"text"} placeholder="username" required onChange={e => setUsername(e.target.value)}/>
             <input type={"email"} placeholder="email" required onChange={e => setEmail(e.target.value)}/>
             <input type={"password"} placeholder="password" required onChange={e => setPassword(e.target.value)}/>
             <input type={"password"} placeholder="repeat password" required onChange={e => setRepeatPassword(e.target.value)}/>
             <input className="submit" type={"submit"} value="submit"/>
         </form>
         <p onClick={() => changePage()}>Alredy have an account? sign-in!</p>
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
