import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import CreatePostIt from "../../components/notes/CreatePostIt";
import PostIt from "../../components/notes/PostIt";

export default function Notes() {
  const { projectSelectedData } = useContext(UserContext);
  const str = "toptopop sfdg sdf sfd sff sf sdfgsdfgsdf sdfg sdfg sfg sdfg sdfg sdfg  sdf gs dfg s dfg s dfgsdfgsdfg sdfgsdfg sdfg sdfg";

  return (
    <>
    <NotesContent>
        <CreatePostIt projectSelectedData={projectSelectedData} />

        <PostIt note={str} />
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
    }
`;

