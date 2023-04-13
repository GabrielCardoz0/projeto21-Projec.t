import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import CreatePostIt from "../../components/notes/CreatePostIt";
import PostIt from "../../components/notes/PostIt";
import { useState } from "react";
import { useEffect } from "react";
import { getNotesByProjectId } from "../../services/noteApi";

export default function Notes() {
  const { projectSelectedData, loading, setLoading } = useContext(UserContext);
  const [ notesList, setNotesList ] = useState([]);

  useEffect(() => {
    if(!projectSelectedData.projectId) return;

    if(loading !== "loading") return setLoading("loading");

    async function getNotesList() {
        try {
            const notes = await getNotesByProjectId(projectSelectedData.projectId);

            setNotesList(notes);
        } catch (error) {
            console.log(error);

            alert("Não foi possível achar as notas para o projeto selecionado.");
        };
    };

    getNotesList();

  }, [projectSelectedData, loading, setLoading]);

  return (
    <>
    <NotesContent>
        <CreatePostIt projectSelectedData={projectSelectedData} setLoading={setLoading}/>

        {notesList.map(n => <PostIt key={n.id} note={n} setLoading={setLoading}/>)}
    </NotesContent>
    </>
  );
};

const NotesContent = styled.div`
    width: 100%;
    flex-wrap: wrap;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    };
`;

