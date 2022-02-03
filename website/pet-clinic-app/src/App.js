import { Routes, Route } from "react-router-dom";
import Signup from "./components/pages/signup/Signup";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import RegisterPet from "./components/pages/registerpet/RegisterPet";
import Appointment from "./components/pages/appointment/Appointment";
import Adoption from "./components/pages/adoption/Adoption";
import AdoptionAds from "./components/pages/adoptionAds/AdoptionAds";
import AdoptionAd from "./components/pages/adoptionAd/AdoptionAd";
import Myprofile from "./components/pages/myprofile/Myprofile";
import PostAd from "./components/pages/postAd/PostAd";
import PostPreview from "./components/pages/postpreview/PostPreview";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' exact
          element={<Home />}></Route>
        <Route path='/home'
          element={<Home />}></Route>
        <Route path='/login'
          element={<Login />}></Route>
        <Route path='/signup'
          element={<Signup />}></Route>
        <Route path='/registerpet'
          element={<RegisterPet />}></Route>
        <Route path='/appointment'
          element={<Appointment />}></Route>
        <Route path='/adoption'
          element={<Adoption />}></Route>
        <Route path='/adoptionads'
          element={<AdoptionAds />}></Route>
        <Route path='/adoptionad'
          element={<AdoptionAd />}></Route>
        <Route path='/myprofile'
          element={<Myprofile />}> </Route>
        <Route path='/postad'
          element={<PostAd />}> </Route>
        <Route path='/postreview'
          element={<PostPreview />}> </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
