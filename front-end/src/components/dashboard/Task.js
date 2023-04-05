import styled from "styled-components";
import { IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import getColor from "../../assets/COLORS";

export default function Task(params) {
  return (
    <>
        <TaskContent>
            <div>
                <h1>Responsável: Gabriel Cardozo</h1>
                <h2 className="date">12 jan</h2>
                <BsTrash className="trash"/>
            </div>

            <div className="content">jçlakjfgçlk sldkfjgçslkjdfg lkjsdfglkjsdf lkjsf jksfl jlks jglçskjfgçlkj lkjsdfglkj lkjsdf kj lkjk lkj lkjsfdgkjlkdf lk gkk kjflkgflk</div>

            <div>
                <IoMdArrowDropleft className="arrow" />
                <IoMdArrowDropright className="arrow" />
            </div>
        </TaskContent>
    </>
  );
};


const TaskContent = styled.li`
    background-color: ${() => getColor("wht")};
    width: 280px;
    height: 140px;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 400;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .content {
        height: 60px;
        font-weight: 400;
        font-size: 14px;
        align-items: flex-start;
    }
    div {
        font-weight: 500;
        height: 20px;
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
