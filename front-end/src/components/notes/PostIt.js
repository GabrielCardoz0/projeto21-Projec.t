import styled from "styled-components";
import { BsTrash } from "react-icons/bs";

export default function PostIt(params) {
    const { note } = params;
    return (
        <PostItStyle>
            <BsTrash/>
            { note }
        </PostItStyle>
    );
};

const PostItStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
  background-color: #fde87f;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 25px 5px;
  font-size: 16px;
  font-family: "Roboto";
  margin: 8px 5px;
  position: relative;
  svg {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;

