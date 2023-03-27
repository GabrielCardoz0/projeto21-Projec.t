import styled from "styled-components";
import Task from "./Task";

export default function TaskColumnContainer(params) {
  return (
    <BacklogColumnContainer>
        <div className="columnContent">
            <span>Backlog</span>
            <ul>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
            </ul>
            <span>Adicionar</span>
        </div>
    </BacklogColumnContainer>
  );
};


const BacklogColumnContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Roboto";
  .columnContent {
    width: 300px;
    height: 540px;
    background-color: #d5e1f0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    ul {
        height: 530px;
        overflow: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
    }
    span {
        margin: 10px;
        color: #334357;
        font-weight: 500;
    }
  }
`;
