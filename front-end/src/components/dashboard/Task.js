import styled from "styled-components";
import { IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import getColor from "../../assets/COLORS";
import { deleteTask } from "../../services/taskApi";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function Task(params) {
  const { task, taskColumnType } = params;
  const { setLoading } = useContext(UserContext);

  if(!task) return;

  if(task.status !== taskColumnType) return;

  async function deleteTaskById(id) {
    const response = prompt('Digite "sim" para continuar.');
    try {
        if( !response || response.toLowerCase() !== "sim") return;
        await deleteTask(id);

        alert("Sucesso!");

        setLoading("tasksLoading");
    } catch (error) {
        console.log(error);

        alert("Não foi possível deletar a task, por favor tente novamente mais tarde.");
    };
  };

// createdAt
// : 
// "2023-04-11T21:22:39.530Z"
// description
// : 
// ""
// endsAt
// : 
// null
// id
// : 
// 11
// responsible
// : 
// "Gabriel"
// sprintId
// : 
// 51
// status
// : 
// "w.i.p"
// task
// : 
// "task top 1"

//   console.log("params", task);

  return (
    <>
        <TaskContent>
            <div>
                <h1>Responsável: {task.responsible}</h1>
                {task.endsAt ? <h2 className="date">{task.endsAt}</h2> : ""}
                
                <BsTrash className="trash" onClick={() => deleteTaskById(task.id)}/>
            </div>

            <div className="content">{task.task}</div>

            <div>
                {taskColumnType !== "backlog" ? <IoMdArrowDropleft className="arrow" /> : <div/>}
                {taskColumnType !== "done" ? <IoMdArrowDropright className="arrow" /> : <div/>}
            </div>
        </TaskContent>
    </>
  );
};


const TaskContent = styled.li`
    background-color: ${() => getColor("wht")};
    width: 280px;
    max-height: 120px;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 400;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    svg {
        cursor: pointer;
    }
    .content {
        height: 60px;
        font-weight: 400;
        font-size: 14px;
        align-items: flex-start;
        margin: 8px 0;
    }
    div {
        font-weight: 500;
        min-height: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .trash {
            color: red;
            font-size: 15px;
        }
        .arrow {
            color: #d5e1f0;
            font-size: 35px;
        }
        .date {
            background-color: green;
            width: 60px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            color: #FFF;
        }
    }
`;
