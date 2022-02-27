import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./../..//pages/signup/Signup";
import Login from "./../..//pages/login/Login";
import Home from "./../..//pages/home/Home";
import RegisterPet from "./../..//pages/registerpet/RegisterPet";
import Appointment from "./../..//pages/appointment/Appointment";
import Adoption from "./../..//pages/adoption/Adoption";
import AdoptionAds from "./../..//pages/adoptionAds/AdoptionAds";
import AdoptionAd from "./../..//pages/adoptionAd/AdoptionAd";
import Myprofile from "./../..//pages/myprofile/Myprofile";
import PostAd from "./../..//pages/postAd/PostAd";
import PostPreview from "./../..//pages/postpreview/PostPreview";
import Stafflist from "./../..//pages/stafflist/Stafflist";
import StaffPanel from "./../..//pages/staffPanel/StaffPanel";
import About from "./../..//pages/about/About";

// A hook that contains the routing logic and it uses the authed user state to determine whether the user is allowed to navigate to private Routes
const useRoutes = (authedUser) => {
  if (authedUser === true)

    // Private Routes
    return (
      <Routes>
        <Route path='/'
          element={<Home />}></Route>
        <Route path='home'
          element={<Home />}></Route>
        <Route path='registerpet'
          element={<RegisterPet />}></Route>
        <Route path='appointment'
          element={<Appointment />}></Route>
        <Route path='adoption'
          element={<Adoption />}></Route>
        <Route path='adoptionads'
          element={<AdoptionAds />}></Route>
        <Route path='adoptionad'
          element={<AdoptionAd />}></Route>
        <Route path='myprofile'
          element={<Myprofile />}>
        </Route>
        <Route path='postad'
          element={<PostAd />}> </Route>
        <Route path='postpreview'
          element={<PostPreview />}> </Route>
        <Route path='stafflist'
          element={<Stafflist />}> </Route>
        <Route path='about'
          element={<About />}> </Route>
        <Route path='staffpanel'
          element={<StaffPanel />}> </Route>
        <Route path='*'
          element={<Navigate to='/' />}> </Route>
      </Routes>
    )
  if (authedUser === false)

    // Public Routes
    return (
      <Routes>
        <Route path='/' exact
          element={<Home />}></Route>
        <Route path='home'
          element={<Home />}></Route>
        <Route path='login'
          element={<Login />}></Route>
        <Route path='signup'
          element={<Signup />}></Route>
        <Route path='stafflist'
          element={<Stafflist />}> </Route>
        <Route path='about'
          element={<About />}> </Route>
        <Route path='*'
          element={<Navigate to='/login' />}></Route>
      </Routes>
    )
  return (<></>)
}
export default useRoutes