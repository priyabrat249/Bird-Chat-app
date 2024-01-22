import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Home"
import { AuthContext } from "./AuthContext";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./style.scss"
import { useContext } from "react";
function App() {
  const {currentUser}=useContext(AuthContext)
  console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"/>
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          {/* <Route path="/" element={<Homepage />} />   */}
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
