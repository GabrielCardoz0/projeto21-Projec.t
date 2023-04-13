import styled from "styled-components";
import { ImMenu } from "react-icons/im";
import { BiExit } from "react-icons/bi";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { projectSelectedData } = useContext(UserContext);
  const [ sidebar, setSidebar ] = useState(false);
  const navigate = useNavigate();

  function showSidebar() {
    setSidebar(!sidebar);
  }

  function signOut() {
    window.localStorage.clear();

    navigate("/");
  }

  console.log("renderizou topbar", projectSelectedData);

  return (
    <>
    <TopBarComponent>
      {<ImMenu onClick={showSidebar}/>}
      {sidebar && <Sidebar setSidebar={setSidebar} />}

        <div className="topOtption projectName">{projectSelectedData.Project ? projectSelectedData.Project.name : ""}</div>

        <div className="topOtption">
            Sair
            <BiExit onClick={signOut}/>
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
  .topOtption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 260px;
    }
    .projectName {
    font-size: 20px;
    justify-content: center;
    font-weight: 500;
  }
  svg {
    font-size: 25px;
    cursor: pointer;
    margin: 5px;
  }
`;