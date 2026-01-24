import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import Anonymous from "./pages/Anonymous";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />}></Route>
            <Route path="signup" element={<SignupPage />}></Route>
          </Route>
          <Route path="*" element={<Anonymous />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className="w-2/5"
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App;
