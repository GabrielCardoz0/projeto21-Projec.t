import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import SprintsTopBar from "../../components/dashboard/SprintsTopBar";
import TaskColumnContainer from "../../components/dashboard/TaskColumnContainer";
import UserContext from "../../contexts/userContext";
 
export default function Dashboard() {
  const { loading, setLoading, selectedSprint, setSelectedSprint } = useContext(UserContext);

  useEffect(() => {
    if(loading !== "loading") return setLoading("loading");
  }, [loading, setLoading]);

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
