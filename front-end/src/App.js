import GlobalStyle from "./assets/globalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import SigninPage from "./pages/sign-in";
import SignupPage from "./pages/sign-up";
import { UserProvider } from "./contexts/userContext";
import Notes from "./pages/notes";

export default function App() {
  console.log("renderizou app");

  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SigninPage />} />

            <Route path="/sign-up" element={<SignupPage />} />

            <Route path="/dashboard" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="notes" element={<Notes />} />
            </Route>
            
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

