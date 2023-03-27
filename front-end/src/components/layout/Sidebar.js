import styled from "styled-components";
import { FaTimes } from "react-icons/fa"

export default function Sidebar(params) {
  const { setSidebar } = params;

  const closeSidebar = () => setSidebar(false);

  return(
    <SidebarContainer setSidebar={setSidebar}>
        <FaTimes onClick={closeSidebar} />
        <Content>
            <div>Oi</div>
            <div className="select">Olá</div>
            <div className="createProjectButton">Criar novo projeto</div>
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
    div{
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
