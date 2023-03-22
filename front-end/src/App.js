import GlobalStyle from "./assets/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <>
    <GlobalStyle/>
    <Router>
      <Routes>
        <Route path="/a" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
    </>
  );
}
