import styled from "styled-components";
import SignInForm from "../../components/sign-in/SignInForm";
import { TbFileSpreadsheet } from "react-icons/tb";
import getColor from "../../assets/COLORS";

export default function SigninPage(params) {
  return(
    <Container>
        <SignInForm/>
        <Logo>
            <TbFileSpreadsheet onClick={() => alert(process.env.REACT_APP_API_BASE_URL)}/>
            <span>Projec.t</span>
        </Logo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
    width: 50vw;
    height: 100vh;
    background-color: ${() => getColor("wht")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:  ${() => getColor("fst")};
    font-size: 80px;
    svg {
        margin-bottom: 15px;
    }
    span {
        font-weight: 700;
        font-family: 'Roboto';
    }
`;