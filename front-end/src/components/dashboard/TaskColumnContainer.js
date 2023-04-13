import styled from "styled-components";
import Task from "./Task";
import getColor from "../../assets/COLORS";
import { useState } from "react";
import { createTask, getTasks } from "../../services/taskApi";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function TaskColumnContainer(params) {
  const { selectedSprint } = params;
  const { loading, setLoading } = useContext(UserContext);
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const [ task, setTask ] = useState('');
  const [tasksList, setTasksList ] = useState([]);

  
  async function submitTask(e) {
    e.preventDefault();
    
    if(selectedSprint < 1) return alert("você precisa ter uma sprint selecionada!");

    const newTask = {
      sprintId: selectedSprint,
      responsible: "Gabriel",
      task,
    };

    try {
      await createTask(newTask);
      
      alert("task criada com sucesso!");

      setShowCreateTaskForm(false);

      setLoading("createTaskLoading");
    } catch (error) {
      console.log(error);

      alert("Não foi possível criar a task, por favor tente novamente mais tarde.");
    };
  };

  useEffect(() => {
    if(selectedSprint === 0) return setTasksList([]);
  
    async function getTasksBySprintId() {
      try {
        const tasks = await getTasks(selectedSprint);
        
        setTasksList(tasks);
      } catch (error) {
        console.log(error);
      };
    };
    getTasksBySprintId();

  }, [selectedSprint, loading]);


  if(selectedSprint === 0) return <SelectSprintAdvise>Selecione uma sprint.</SelectSprintAdvise>;
  
  return (
    <BacklogColumnContainer>
        <div className="columnContent">
          {showCreateTaskForm &&
          <CreateTaskForm>
            <form onSubmit={e => submitTask(e)}>
              Tarefa:
              <textarea placeholder="Ex.: Criar layout estático" onChange={e => setTask(e.target.value)}/>
              <div>
                <input type={"submit"} value="criar task"/>
                <input type={"button"} value="cancelar" onClick={() => setShowCreateTaskForm(false)}/>
              </div>
            </form>
          </CreateTaskForm>}

            <div className="columnInfo">Backlog</div>
            <div className="tasksList">
              <ul>
                {tasksList.map(t => <Task key={t.id} task={t} taskColumnType={"backlog"}/>)}
              </ul>
            </div>
            <div className="columnInfo" onClick={() => setShowCreateTaskForm(true)}>adicionar</div>
        </div>

        <div className="columnContent">
            <div className="columnInfo">In progress</div>
            <div className="tasksList">
              <ul>
                {tasksList.map(t => <Task  key={t.id} task={t} taskColumnType={"w.i.p"}/>)}
              </ul>
            </div>
        </div> 

        <div className="columnContent">
            <div className="columnInfo">Done</div>
            <div className="tasksList">
              <ul>
                {tasksList.map(t => <Task key={t.id} task={t} taskColumnType={"done"}/>)}
              </ul>
            </div>
        </div> 
    </BacklogColumnContainer>
  );
};

const SelectSprintAdvise = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  font-family: "Roboto";
  color: #fff;
`;

const BacklogColumnContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  box-sizing: border-box;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .columnContent {
    position: relative;
    width: 300px;
    min-height: 540px;
    height: 90%;
    background-color: ${() => getColor("scd")};
    border-radius: 10px;
    margin: 15px 40px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .tasksList {
      width: 95%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
 ::-webkit-scrollbar {
     display: none;
 }
    }
    .columnInfo {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: ${() => getColor("wht")};
    }
  }
`;

const CreateTaskForm = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    background-color: ${() => getColor("scd")};
    width: 90%;
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 10px;
    border-radius: 12px;
    textarea {
      max-width: 100%;
      min-width: 100%;
      min-height: 120px;
      max-height: 120px;
      font-family: 'Roboto';
      font-size: 14px;
      padding: 8px;
      border: 1px solid #fff;
      margin: 8px;

      ::-webkit-scrollbar {
        display: none;
      }
    }
    input {
      width: 45%;
      border: none;
      height: 20px;
      margin: 0 5px;
    }
  }
`;