import styled from "styled-components";
import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import NavigationBar from "../components/layout/navBar";

export default function Layout() {
  console.log("renderizou dashboard");
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
  /* background-color: red; */
  width: calc(100vw - 110px);
  height: calc(100vh - 60px);
  padding: 10px;
`