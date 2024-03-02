import "./input.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layouts/Header.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Home from "./Pages/Home.jsx";
import Tickets from "./Pages/Tickets.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";
import Create from "./Pages/Create.jsx";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/tickets" element={<Tickets />}></Route>
            <Route path="/create" element={<Create />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
