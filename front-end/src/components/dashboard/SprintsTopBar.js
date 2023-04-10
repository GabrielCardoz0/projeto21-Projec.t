import { useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";
import { getSprints, createSprint } from "../../services/sprintsApi";

export default function SprintsTopBar(params) {
  const { selectedSprint, setSelectedSprint } = params;
  const { projectSelectedData, sprintsList, setSprintsList } = useContext(UserContext);

  async function createNewSprint() {
    try {
        if(sprintsList.length > -10) {
            const newSprint = await createSprint(projectSelectedData.projectId, (sprintsList.length+1));

            setSprintsList([...sprintsList, newSprint]);
        };  
    } catch (error) {
        console.log(error);
        alert("erro ao criar uma nova sprint, por favor  tente novamente mais tarde.");
    }
  };

  useEffect( () => {
    try {
        const id = projectSelectedData.projectId;

        async function getSprintsList() {
            const response = await getSprints(id);
            setSprintsList(response);
        };

        if(id) getSprintsList();

    } catch (error) {
        console.log("erro sprint", error);
    }
  }, [projectSelectedData, setSprintsList]);

  return (
    <Content>
      <ul>
        {sprintsList.map((s) => {
          if (selectedSprint === s.id)
            return <li className="select"> sprint {s.number}</li>;
          return (
            <li onClick={() => setSelectedSprint(s.id)}> sprint {s.number} </li>
          );
        })}

        <li className="addButton" onClick={createNewSprint}>adicionar</li>
      </ul>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  ul,
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li {
    width: 60px;
    height: 20px;
    margin-left: 20px;
    font-family: "Roboto";
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    color: #607da3;
  }
  .addButton {
    background-color: #607da3;
    width: 100px;
    height: 30px;
    border-radius: 12px;
    margin-left: 25px;
    color: #fff;
  }
  .select {
    color: #d5e1f0;
    border-bottom: 3px solid #d5e1f0;
  }
`;
