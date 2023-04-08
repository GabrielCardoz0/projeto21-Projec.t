import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function NavigationBar(params) {
  const [ currpage, setCurrpage ] = useState("dashboard");
  const navigate = useNavigate();

  function changePage(page) {
    setCurrpage(page);
    navigate(`/dashboard/${page}`);
  }

  return (
    <NavBar>
        {currpage !== "dashboard"
          ? <div onClick={() => changePage('')}>Dashboard</div>
          : <div className="select">Dashboard</div>
        }

        {currpage !== "notes" 
          ? <div onClick={() => changePage('notes')}>Anotações</div>
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
