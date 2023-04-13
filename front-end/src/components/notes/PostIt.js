import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { deleteNoteById } from "../../services/noteApi";

export default function PostIt(params) {
    const { note, setLoading} = params;

    async function deleteNote(id) {
      try {
        const response = prompt('Digite "sim" para continuar.');

        if(response.toLocaleLowerCase() !== "sim") return;
        
        await deleteNoteById(id);

        setLoading("loadingDeleteNote");
      } catch (error) {
        console.log(error);

        alert("Não foi possível deletar a anotação, por favor tente novamente mais tarde.");
      };
    };

    return (
        <PostItStyle>
            <BsTrash onClick={() => deleteNote(note.id)}/>
            { note.note }
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

