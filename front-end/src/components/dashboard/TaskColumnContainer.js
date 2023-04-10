import styled from "styled-components";
import Task from "./Task";
import getColor from "../../assets/COLORS";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function TaskColumnContainer(params) {
  const { projectSelectedData } = useContext(UserContext);

  console.log("columns", projectSelectedData);
  return (
    <BacklogColumnContainer>
        <div className="columnContent">
            <div className="columnInfo">Backlog</div>
            <div className="tasksList">
              <ul>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
              </ul>
            </div>
            <div className="columnInfo" >adicionar</div>
        </div> 

        <div className="columnContent">
            <div className="columnInfo">In progress</div>
            <div className="tasksList">
              <ul>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
              </ul>
            </div>
        </div> 

        <div className="columnContent">
            <div className="columnInfo">Done</div>
            <div className="tasksList">
              <ul>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
              </ul>
            </div>
        </div> 
    </BacklogColumnContainer>
  );
};


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

