import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import RegisterClient from '../../pages/staffPanel/registration/RegisterClient'
import PutForAdoption from "../../pages/staffPanel/putforadoption/PutForAdoption";
import RegisterPetRec from '../../pages/staffPanel/registration/RegisterPetRec'
import ManageUsers from '../../pages/staffPanel/manageusers/ManageUsers'
import ManagePets from '../../pages/staffPanel/managepets/ManagePets'
import ManageProfits from '../../pages/staffPanel/manageProfits/ManageProfits'
import ActiveAppointments from "../../pages/staffPanel/activeappointments/ActiveAppointments";
import Nav from "../../layout/nav/Nav";
import Footer from "../../layout/footer/Footer";
// A hook that contains the routing logic and it uses the authed user state to determine whether the user is allowed to navigate to private Routes
const useRoutes = (authedUser, stmemType) => {

  const location = useLocation()
  if (authedUser !== null) {
    return (
      <>
        {/* // public routes */}
        <Nav />
        <Routes>
          {stmemType === null
            ?
            <>
              <Route path='home'
                element={<Home />}></Route>
              <Route path='about'
                element={<About />}> </Route>
              <Route path='login'
                element={authedUser ? <Navigate to='/' /> : <Login />}></Route>
              <Route path='signup' state={{ redirectTo: '/' }}
                element={authedUser ? <Navigate to='/' /> : <Signup />}></Route>

              <Route path='stafflist'
                element={<Stafflist />} > </Route>


              <Route path='appointment'
                element={authedUser ? <Appointment /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
              <Route path='registerpet'
                element={authedUser ? <RegisterPet /> : <Navigate to='/login' state={{ redirectTo: 'registerpet' }} />}></Route>


              <Route path='adoption'
                element={authedUser ? <Adoption /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

              <Route path='adoptionads'
                element={authedUser ? <AdoptionAds /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

              <Route path='adoptionad/:id'
                element={authedUser ? <AdoptionAd /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
              <Route path='postad'
                element={authedUser ? <PostAd /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}> </Route>

              <Route path='postpreview/:id'
                element={authedUser ? <PostPreview /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}> </Route>

              {/* My profile related paths */}
              <Route path='myprofile' element={<SideNav />}>
                <Route index
                  element={<Navigate to='/' />}></Route>
                <Route path='mypersonalinfo'
                  element={authedUser ? <PersonalInfo /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='account'
                  element={authedUser ? <Account /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='myadoptionposts'
                  element={authedUser ? <MyAdoptionPosts /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='myadoptionrequests'
                  element={authedUser ? <MyAdoptionRequests /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='petinfo'
                  element={authedUser ? <PetInfo /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='*'
                  element={<Navigate to='/' />}> </Route>
              </Route>


              {/* staff panel routing */}



              <Route exact path='/' element={<Home />}></Route>
              {/* no path matched */}
              <Route path='*'
                element={<Navigate to='/' />}> </Route>
            </>
            :
            <>
              {(stmemType === 'receptionist' || stmemType === 'admin') &&

                <>
                  <Route path='postpreview/:id'
                    element={authedUser ? <PostPreview /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}> </Route>
                  <Route path='adoptionad/:id'
                    element={authedUser ? <AdoptionAd /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                </>
              }


              <Route path='staffpanel'
                element={<StaffPanelSideNav />}>
                <Route index
                  element={<Navigate to='/' />}></Route>
                <Route path='mypersonalinfo'
                  element={authedUser ? <PersonalInfo /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                <Route path='account'
                  element={authedUser ? <Account /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                {(stmemType === 'receptionist' || stmemType === 'admin') &&
                  <>
                    <Route path='manageappointments'
                      element={authedUser ? <AppointmentManagement /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                    <Route path='registerclient'
                      element={authedUser ? <RegisterClient /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                    <Route path='registerpet'
                      element={authedUser ? <RegisterPetRec /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                    <Route path='managepets'
                      element={authedUser ? <ManagePets /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                    <Route path='putforadoption'
                      element={authedUser ? <PutForAdoption /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                    <Route path='adoptionrequests'
                      element={authedUser ? <AdoptionManagement /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                    <Route path='adoptionposts'
                      element={authedUser ? <AdoptionPostsManagement /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                  </>

                }
                {(stmemType === 'vet' || stmemType === 'admin') &&
                  <>
                  <Route path='pettreatmenthistory'
                    element={authedUser ? <PetTreatmentHistory /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                  <Route path='activeappointments'
                    element={authedUser ? <ActiveAppointments /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>
                  </>
                }
                {(stmemType === 'trainer' || stmemType === 'admin') &&
                  <Route path='pettraininghistory'
                    element={authedUser ? <PetTrainingHistory /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                }
                {stmemType === 'admin' &&
                  <>

                    <Route path='manageusers'
                      element={authedUser ? <ManageUsers /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                    <Route path='manageprofits'
                      element={authedUser ? <ManageProfits /> : <Navigate to='/login' state={{ redirectTo: location.pathname }} />}></Route>

                  </>


                }
                <Route path='*'
                  element={<Navigate to='/' />}> </Route>

              </Route>
              <Route path='*'
                element={<Navigate to='staffpanel/mypersonalinfo' />}> </Route>

            </>

          }

        </Routes>
        <Footer />
      </>
    )



  }

  return (<></>)
}
export default useRoutes