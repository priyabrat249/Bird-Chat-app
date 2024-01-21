import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Home"
import { AuthContext } from "./AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./style.scss"
import { useContext } from "react";
function App() {
  // const {currentUser}=useContext(AuthContext)
  // console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
