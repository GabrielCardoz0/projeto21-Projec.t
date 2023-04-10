import styled from "styled-components";
import SprintsTopBar from "../../components/dashboard/SprintsTopBar";
import TaskColumnContainer from "../../components/dashboard/TaskColumnContainer";
 
export default function Dashboard() {

  console.log("renderizou dashboard");

  return(
    <Content>
      <SprintsTopBar/>
      <TaskColumnContainer/>
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
