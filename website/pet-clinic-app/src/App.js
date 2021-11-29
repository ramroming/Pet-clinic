import Signup from "./components/Signup";
import Login from "./components/Login";
import RegisterPet from "./components/RegisterPet";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/registerpet' element={<RegisterPet />}></Route>
      </Routes>
    </>
  );
}

export default App;
