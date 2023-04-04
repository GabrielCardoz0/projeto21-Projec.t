import GlobalStyle from "./assets/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import SigninPage from "./pages/sign-in";

export default function App() {

  console.log("renderizou app");

  return (
    <>
    <GlobalStyle/>
    <Router>
      <Routes>

        <Route path="/" element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="notes" element={<PostIt/>} />
        </Route>

        <Route path="/sign-in" element={<SigninPage/>} />

      </Routes>
    </Router>
    </>
  );
}

const PostIt = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
  width: 150px;
  height: 150px;
  background-color: #fde87f;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 16px;
  font-family: "Roboto";
  margin: 0 20px 5px 0;
`;