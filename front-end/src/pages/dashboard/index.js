import { useState } from "react";
import styled from "styled-components";
import SprintsTopBar from "../../components/dashboard/SprintsTopBar";
import TaskColumnContainer from "../../components/dashboard/TaskColumnContainer";
 
export default function Dashboard() {
  const [selectedSprint, setSelectedSprint] = useState(0);

  console.log("renderizou dashboard");

  return(
    <Content>
      <SprintsTopBar selectedSprint={selectedSprint} setSelectedSprint={setSelectedSprint} />
      <TaskColumnContainer selectedSprint={selectedSprint} />
    </Content>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
