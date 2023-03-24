import styled from "styled-components";
import SprintsTopBar from "../../components/dashboard/SprintsTopBar";
 
export default function Dashboard() {
  console.log("renderizou dashboard");
  return(
    <Content>
      <SprintsTopBar/>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
