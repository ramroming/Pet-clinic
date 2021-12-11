import Signup from "./components/pages/signup/Signup";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import RegisterPet from "./components/pages/registerpet/RegisterPet";
import {Routes, Route, Link} from "react-router-dom";
import Appointment from "./components/pages/appointment/Appointment";

function App() {
    return (
        <>
            <Nav/>
            <Routes>
                <Route path='/' exact
                    element={<Home/>}></Route>
                <Route path='/home'
                    element={<Home/>}></Route>
                <Route path='/login'
                    element={<Login/>}></Route>
                <Route path='/signup'
                    element={<Signup/>}></Route>
                <Route path='/registerpet'
                    element={<RegisterPet/>}></Route>
                <Route path='/appointment'
                    element={<Appointment/>}></Route>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
