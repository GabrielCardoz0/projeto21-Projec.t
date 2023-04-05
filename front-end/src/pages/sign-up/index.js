import styled from "styled-components";
import { TbFileSpreadsheet } from "react-icons/tb";
import getColor from "../../assets/COLORS";
import SignupForm from "../../components/sign-up/SignupForm";

export default function SignupPage(params) {
  return(
    <Container>
        <Logo>
            <TbFileSpreadsheet/>
            <span>Projec.t</span>
        </Logo>
        <SignupForm/>
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
    animation: changePage .4s;

    @keyframes changePage {
        from {
            opacity: 0;
            width: 0;
            font-size: 20px;
        }
        to {
            opacity: 1;
            width: 50vw;
        }
    }
`;
