import styled from "styled-components";
import { ImMenu } from "react-icons/im";
import { BiExit } from "react-icons/bi";

export default function TopBar() {

  console.log("renderizou topbar");

  return (
    <>
    <TopBarComponent>
        <div>{<ImMenu/>}</div>

        <div className="projectName">Nome do projeto</div>

        <div>
            Logado como: Gabriel Cardozo
            <BiExit/>
        </div>

    </TopBarComponent>
    </>
  );
};

const TopBarComponent = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #334357;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  box-sizing: border-box;
  font-family: "Roboto";
  color: #fff;
  div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 260px;
    }
    .projectName {
    font-size: 20px;
    justify-content: center;
    font-weight: 500;
  }
  svg {
    font-size: 25px;
  }
`;