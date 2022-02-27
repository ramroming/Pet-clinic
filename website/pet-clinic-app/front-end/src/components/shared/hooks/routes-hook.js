import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./../..//pages/signup/Signup";
import Login from "./../..//pages/login/Login";
import Home from "./../..//pages/home/Home";
import RegisterPet from "./../..//pages/registerpet/RegisterPet";
import Appointment from "./../..//pages/appointment/Appointment";
import Adoption from "./../..//pages/adoption/Adoption";
import AdoptionAds from "./../..//pages/adoptionAds/AdoptionAds";
import AdoptionAd from "./../..//pages/adoptionAd/AdoptionAd";
// import Myprofile from "./../..//pages/myprofile/Myprofile";
import PostAd from "./../..//pages/postAd/PostAd";
import PostPreview from "./../..//pages/postpreview/PostPreview";
import Stafflist from "./../..//pages/stafflist/Stafflist";
import About from "./../..//pages/about/About";
import SideNav from "../../layout/profile_side_nav/SideNav";
import Account from "../../pages/profile/account/Account";
import MyAdoptionPosts from "../../pages/profile/myadoptionposts/MyAdoptionPosts";
import MyAdoptionRequests from "../../pages/profile/myadoptionrequests/MyAdoptionRequests";
import PersonalInfo from "../../pages/profile/personalinfo/PersonalInfo";
import PetInfo from "../../pages/profile/petinfo/PetInfo";
import StaffPanelSideNav from "../../layout/staffpanel_side_nav/StaffPanelSideNav";
import AppointmentManagement from '../../pages/staffPanel/appointmentmanagement/AppointmentManagement';
import AdoptionManagement from '../../pages/staffPanel/adoptionmanagement/AdoptionManagement';
import AdoptionPostsManagement from '../../pages/staffPanel/adoptionpostsmanagement/AdoptionPostsManagement';
import PetTreatmentHistory from '../../pages/staffPanel/pettreatmenthistory/PetTreatmentHistory';
import PetTrainingHistory from '../../pages/staffPanel/pettraininghistory/PetTrainingHistory';
import Registration from '../../pages/staffPanel/registration/Registration'
import ManageUsers from '../../pages/staffPanel/manageusers/ManageUsers'
import ManagePets from '../../pages/staffPanel/managepets/ManagePets'
import ManageProfits from '../../pages/staffPanel/manageProfits/ManageProfits'

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

        {/* user panel routing */}
        <Route path='myprofile' element={<SideNav />}>
          <Route index
            element={<Navigate to='/' />}></Route>
          <Route path='mypersonalinfo'
            element={<PersonalInfo />}></Route>
          <Route path='account'
            element={<Account />}></Route>
          <Route path='myadoptionposts'
            element={<MyAdoptionPosts />}></Route>
          <Route path='myadoptionrequests'
            element={<MyAdoptionRequests />}></Route>
          <Route path='petinfo'
            element={<PetInfo />}></Route>
          <Route path='*'
            element={<Navigate to='/' />}> </Route>
        </Route>

        {/* staff panel routing */}
        <Route path='staffpanel'
          element={<StaffPanelSideNav />}>
          <Route index
            element={<Navigate to='/' />}></Route>
          <Route path='mypersonalinfo'
            element={<PersonalInfo />}></Route>
          <Route path='account'
            element={<Account />}></Route>

          <Route path='manageappointments'
            element={<AppointmentManagement />}></Route>

          <Route path='adoptionrequests'
            element={<AdoptionManagement/>}></Route>

          <Route path='adoptionposts'
            element={<AdoptionPostsManagement/>}></Route>

          <Route path='pettreatmenthistory'
            element={<PetTreatmentHistory />}></Route>

          <Route path='pettraininghistory'
            element={<PetTrainingHistory />}></Route>

          <Route path='registration'
            element={<Registration />}></Route>

          <Route path='manageusers'
            element={<ManageUsers />}></Route>

          <Route path='managepets'
            element={<ManagePets />}></Route>

          <Route path='manageprofits'
            element={<ManageProfits />}></Route>

          <Route path='*'
            element={<Navigate to='/' />}> </Route>

        </Route>

        <Route path='postad'
          element={<PostAd />}> </Route>
        <Route path='postpreview'
          element={<PostPreview />}> </Route>
        <Route path='stafflist'
          element={<Stafflist />}> </Route>
        <Route path='about'
          element={<About />}> </Route>
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