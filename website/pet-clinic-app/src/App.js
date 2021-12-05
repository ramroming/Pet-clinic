import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPet from "./components/RegisterPet";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/registerpet' element={<RegisterPet />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
