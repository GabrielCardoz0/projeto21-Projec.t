import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import NavigationBar from "../components/layout/navBar";
import getColor from "../assets/COLORS";
import tokenVerify from "../services/tokenVerify";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import { getProjects } from "../services/projectsApi";

export default function Layout() {
  const { setProjectsList, projectSelectedData, loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect( () => {
    const token = tokenVerify();
    if(!token) navigate("/");

    if(loading !== "loading") return setLoading("loading");

    async function getProjectsList() {
      const projectsList = await getProjects();
      setProjectsList(projectsList);
    }
    getProjectsList();
  }, [navigate, setProjectsList, loading, setLoading]);

  return(
    <Content>

      <TopBar/>

      <div>
        <NavigationBar/>
        <Container>
          {!projectSelectedData.projectId ? <SelectProjectAdvise>Por favor selecione ou crie um projeto.</SelectProjectAdvise> : <Outlet/>}
        </Container>
      </div>

    </Content>
  );
};

const SelectProjectAdvise = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  font-family: "Roboto";
  color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
  }
`;

const Container = styled.div`
  background-color: ${() => getColor("fst")};
  width: calc(100vw - 110px);
  height: calc(100vh - 60px);
  padding: 10px;
  box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.2);
`