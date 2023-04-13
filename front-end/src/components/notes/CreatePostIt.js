import { useState } from "react";
import styled from "styled-components";
import { createNote } from "../../services/noteApi";

export default function CreatePostIt(params) {
    const { projectSelectedData, setLoading } = params;
    const [ showNoteForm, setShowNoteForm ] = useState(false);
    const [ note, setNote ] = useState('');

    async function submitNote(e) {
      e.preventDefault();
      try {
          await createNote( projectSelectedData.projectId, note);

          setShowNoteForm(false);
      } catch (error) {
          console.log(error);
          
          alert("erro ao criar nota, por favor tente novamente mais tarde.");
      };
      
      setLoading("loadingCreatePostIt");
    };

    return(
        <>
        {!showNoteForm && <CreateNewPostIt onClick={() => setShowNoteForm(true)}>+</CreateNewPostIt>}

        {showNoteForm && <CreateNewPostIt>
            <form onSubmit={e => submitNote(e)}>
                <textarea placeholder="Ex.: corrigir erro de layout." maxLength={120} onChange={e => setNote(e.target.value)} required />
                <div>
                    <input type="submit" value="criar"/>
                    <input type="button" value="cancelar" className="cancel" onClick={() => setShowNoteForm(false)} />
                </div>
            </form>
        </CreateNewPostIt>}
        </>
    );
};

const CreateNewPostIt = styled.div`
    width: 150px;
    height: 150px;
    margin: 8px 5px;
    border-radius: 5px;
    border: 3px solid #fde87f;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #fde87f;
    cursor: pointer;

    form {
        width: 100%;
        height: 100%;
        background-color: #fde87f;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        font-family: "Roboto";
        div {
            display: flex;
            justify-content: space-around;
            width: 100%;
        }
        textarea {
            background-color: #fde87f;
            max-width: 100%;
            min-width: 100%;
            min-height: 110px;
            max-height: 110px;
            font-size: 14px;
            font-family: "Roboto";
            border: none;
        };
        input {
            border: none;
            border-radius: 5px;
            background-color: #fde87f;
            font-weight: 400;
            cursor: pointer;
        }
        .cancel {
            color: red;
        }
    }
  `;
