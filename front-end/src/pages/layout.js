import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import NavigationBar from "../components/layout/navBar";
import getColor from "../assets/COLORS";

export default function Layout() {
  console.log("renderizou layout");

  return(
    <Content>

      <TopBar/>

      <div>
        <NavigationBar/>
        <Container>

          <Outlet/>

        </Container>
      </div>

    </Content>
  );
};

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