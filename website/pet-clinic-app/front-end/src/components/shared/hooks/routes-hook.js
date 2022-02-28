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

  if (authedUser !== null)
  {

    return (
      // public routes
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='home'
          element={<Home />}></Route>           
        <Route path='about'
          element={<About />}> </Route>
        <Route path='stafflist'
        element={authedUser ? <Stafflist /> : <Navigate to='/login' />}> </Route>
        <Route path='login'
          element={authedUser ? <Navigate to='/' /> : <Login />}></Route>
        <Route path='signup' state={{ redirectTo: '/'}}
          element={authedUser ? <Navigate to='/' /> : <Signup />}></Route>


        {/* private routes */}
        <Route path='registerpet'
          element={authedUser ? <RegisterPet /> : <Navigate to='/login' state={{ redirectTo: 'registerpet' }} />}></Route>

        <Route path='appointment'
          element={authedUser ? <Appointment /> : <Navigate to='/login' state={{ redirectTo: 'appointment' }} />}></Route>

        <Route path='adoption'
          element={authedUser ? <Adoption /> : <Navigate to='/login' state={{ redirectTo: 'adoption' }} />}></Route>

        <Route path='adoptionads'
          element={authedUser ? <AdoptionAds /> : <Navigate to='/login' state={{ redirectTo: 'adoptionads' }} />}></Route>

        <Route path='adoptionad'
          element={authedUser ? <AdoptionAd /> : <Navigate to='/login' state={{ redirectTo: 'adoptionad' }} />}></Route>
        <Route path='postad'
          element={authedUser ? <PostAd /> : <Navigate to='/login' state={{ redirectTo: 'postad' }}/>}> </Route>

        <Route path='postpreview'
          element={authedUser ? <PostPreview /> : <Navigate to='/login' state={{ redirectTo: 'postpreview' }}/>}> </Route>

        {/* My profile related paths */}
        <Route path='myprofile' element={  <SideNav /> }>
          <Route index
            element={<Navigate to='/' />}></Route>
          <Route path='mypersonalinfo'
            element={authedUser ? <PersonalInfo /> : <Navigate to='/login' state={{ redirectTo: 'myprofile/mypersonalinfo' }} />}></Route>
          <Route path='account'
            element={authedUser ? <Account /> : <Navigate to='/login' state={{ redirectTo: 'myprofile/account' }} />}></Route>
          <Route path='myadoptionposts'
            element={authedUser ? <MyAdoptionPosts /> : <Navigate to='/login' state={{ redirectTo: 'myprofile/myadoptionposts' }} />}></Route>
          <Route path='myadoptionrequests'
            element={authedUser ? <MyAdoptionRequests /> : <Navigate to='/login' state={{ redirectTo: 'myprofile/myadoptionrequests' }} />}></Route>
          <Route path='petinfo'
            element={authedUser ? <PetInfo /> : <Navigate to='/login' state={{ redirectTo: 'myprofile/petinfo' }} />}></Route>
          <Route path='*'
            element={<Navigate to='/' />}> </Route>
        </Route>
        

        {/* staff panel routing */}
        <Route path='staffpanel'
          element={<StaffPanelSideNav />}>
          <Route index
            element={<Navigate to='/' />}></Route>
          <Route path='mypersonalinfo'
            element={authedUser ? <PersonalInfo /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/mypersonalinfo' }} />}></Route>
          <Route path='account'
            element={authedUser ? <Account /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/account' }} />}></Route>

          <Route path='manageappointments'
            element={authedUser ? <AppointmentManagement /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/manageappointments' }} />}></Route>

          <Route path='adoptionrequests'
            element={authedUser ? <AdoptionManagement/> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/adoptionrequests' }} />}></Route>

          <Route path='adoptionposts'
            element={authedUser ? <AdoptionPostsManagement/> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/adoptionposts' }} />}></Route>

          <Route path='pettreatmenthistory'
            element={authedUser ? <PetTreatmentHistory /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/pettreatmenthistory' }} />}></Route>

          <Route path='pettraininghistory'
            element={authedUser ? <PetTrainingHistory /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/pettraininghistory' }} />}></Route>

          <Route path='registration'
            element={authedUser ? <Registration /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/registration' }} />}></Route>

          <Route path='manageusers'
            element={authedUser ? <ManageUsers /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/manageusers' }} />}></Route>

          <Route path='managepets'
            element={authedUser ? <ManagePets /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/managepets' }} />}></Route>

          <Route path='manageprofits'
            element={authedUser ? <ManageProfits /> : <Navigate to='/login' state={{ redirectTo: 'staffpanel/manageprofits' }} />}></Route>

          <Route path='*'
            element={<Navigate to='/' />}> </Route>

        </Route>

        
          {/* no path matched */}
        <Route path='*'
          element={<Navigate to='/' />}> </Route>
      </Routes>
    )
  }
      
  return(<></>)
}
export default useRoutes