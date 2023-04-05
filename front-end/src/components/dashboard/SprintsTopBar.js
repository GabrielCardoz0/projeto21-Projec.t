import { useState } from "react";
import styled from "styled-components";

export default function SprintsTopBar(params) {
  const sprintList = [{ id: 1, numb: 1  }, { id: 2, numb: 2  }, { id: 3, numb: 3  }, { id: 4, numb: 4  }];
  const [ sprintSelect, setSelectSprint ] = useState(0);
  return (
    <Content>
        <ul>

            {sprintList.map(s => {
                if(sprintSelect === s.id) return <li className="select"> sprint { s.numb }</li>
                return <li onClick={() => setSelectSprint(s.id)} > sprint { s.numb } </li>
            })}

            <li className="addButton">adicionar</li>
        </ul>
    </Content>
  );
};

const Content = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    ul, li {
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
    .select{
        color: #d5e1f0;
        border-bottom: 3px solid #d5e1f0;
    }
`;