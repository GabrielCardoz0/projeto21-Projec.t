import styled from "styled-components";

export default function TaskColumnContainer(params) {
  return (
    <BacklogColumnContainer>
        <div>
            <span>Backlog</span>
            <ul>
                <li>Olá</li>
                <li>Olá</li>
                <li>Olá</li>
                <li>Olá</li>
                <li>Olá</li>
                <li>Olá</li>
            </ul>
            <span>Adicionar</span>
        </div>
    </BacklogColumnContainer>
  );
};


const BacklogColumnContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Roboto";
  div {
    width: 300px;
    height: 600px;
    background-color: #d5e1f0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    ul {
        /* background-color: blue; */
        height: 530px;
        /* width: 290px; */
        overflow: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
        li {
            background-color: #FFF;
            width: 280px;
            height: 180px;
            margin-bottom: 8px;
            font-size: 12px;
            font-weight: 400;
            padding: 10px;
            border-radius: 5px;
        }
    }
    span {
        margin: 10px;
        color: #334357;
        font-weight: 500;
    }
  }
`;
