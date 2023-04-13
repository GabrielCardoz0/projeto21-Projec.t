import styled from "styled-components";
import { FaTimes } from "react-icons/fa"
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { useState } from "react";
import { createProject } from "../../services/projectsApi";

export default function Sidebar(params) {
  const { setSidebar } = params;
  const { projectsList, projectSelectedData, setProjectSelectedData, setSelectedSprint } = useContext(UserContext);

  const [createProjectInput, setCreateProjectInput] = useState(false);
  const [projectName, setProjectName] = useState('');

  const closeSidebar = () => setSidebar(false);

  async function submitProject(e) {
    e.preventDefault();
    try {
      await createProject(projectName);
    } catch (error) {
      if(error.response.status === 409) return alert("Você já tem um projeto com este nome.");

      alert('erro ao criar projeto. Por favor, tente novamente mais tarde.');
    };

    setCreateProjectInput(false);
  };

  function changeSelectedProject(p) {
    setSelectedSprint(0);
    setProjectSelectedData(p)
  }

  return(
    <SidebarContainer setSidebar={setSidebar}>
        <FaTimes onClick={closeSidebar} />
        <Content>

            {projectsList.map(p => {
              if(p.projectId === projectSelectedData.projectId) {
                return <div className="project select" key={p.projectId}>{p.Project.name}</div>
              }
              return <div className="project" key={p.projectId} onClick={() => changeSelectedProject(p)}>{p.Project.name}</div>
            })}

            {!createProjectInput && <div className="cursorPointer" onClick={() => setCreateProjectInput(true)}>Criar novo projeto</div>}

            {createProjectInput && <form onSubmit={submitProject}>
              <span>Criar novo projeto</span>

              <input type={"text"} placeholder="project name" required onChange={e => setProjectName(e.target.value)}/>
              <input type={"submit"} value="create" className="cursorPointer"/>

              <span className="cursorPointer cancel" onClick={() => setCreateProjectInput(false)}>cancelar</span>
            </form>}
        </Content>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 260px;
  height: 100%;
  background-color: #607da3;
  position: fixed;
  top: 0;
  left: 0;
  left: ${props => props.setSidebar ? "0" : "-100%"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #d5e1f0;
  font-weight: 500;
  font-size: 16px;
  z-index: 1;

  animation: showSidebar .4s;

  > svg {
    position: fixed;
    top: 0;
    color: #fff;
    width: 25px;
    height: 25px;
    margin-top: 20px;
    margin-left: 20px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
        opacity: 0;
        width: 0;
    }
    to {
        opacity: 1;
        width: 260px;
    }
  }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .select {
        border: 2px solid #d5e1f0;
    }
    .project {
        background-color: #334357;
        width: 220px;
        height: 60px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        cursor: pointer;
    }

    form {
      /* background-color: red; */
      height: 100px;
      width: 220px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input {
        border-radius: 5px;
        height: 40px;
        width: 220px;
        margin: 5px 0;
        border: none;
        padding: 10px;
      }
    }

    .cancel {
        color: #FFF;
        font-size: 12px;
    }

    .cursorPointer {
      cursor: pointer;
    }

    animation: showSidebar .4s;
    @keyframes showSidebar {
        from {
            opacity: 0;
            width: 0;
        }
        to {
            opacity: 1;
            width: 260px;
        }
    }
`;
