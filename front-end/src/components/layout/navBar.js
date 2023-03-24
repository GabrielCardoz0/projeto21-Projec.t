import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavigationBar(params) {
  const [ currpage, setCurrpage ] = useState("dashboard");
  console.log("renderizou navbar");

  return (
    <NavBar>
        {currpage !== "dashboard"
          ? <Link to="/dashboard"><div onClick={() => setCurrpage('dashboard')}>Dashboard</div></Link>
          : <div className="select">Dashboard</div>
        }

        {currpage !== "anotacoes" 
          ? <Link to="/notes"><div onClick={() => setCurrpage('anotacoes')}>Anotações</div></Link>
          : <div className="select">Anotações</div>
        }
    </NavBar>
  );
};

const NavBar = styled.div`
    width: 110px;
    height: calc(100vh - 60px);
    background-color: #334357;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 700;
    div {
        margin-bottom: 100px;
        cursor: pointer;
        color: #fff;
        width: 90px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .select {
        color: #607da3;
        border-right: 3px solid #607da3;
    }
`;
