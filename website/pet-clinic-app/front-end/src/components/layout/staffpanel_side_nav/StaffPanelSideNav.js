import { NavLink } from "react-router-dom";
import { Outlet } from "react-router";

const StaffPanelSideNav = () => {


  return (
    <div className="home-container myprofile-wrapper">
      <div className="myprofile-container flex-row">
        <div className="bio-container flex-row gap-8p falign-center">
          <img className="avatar-photo" alt='avatar' src='/media/imgs/avatar.jpg' />
          <div className="bio-info flex-col gap-4p">
            <p className="user-name">
              public Name/Surname
            </p>
            <p>Your professional panel</p>
          </div>
        </div>
        <div className="profile-menu flex-col ">
          <NavLink
            to='/staffpanel/mypersonalinfo'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Personal Info</NavLink>
          <NavLink
            to='/staffpanel/account'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Account</NavLink>
          <NavLink
            to='/staffpanel/manageappointments'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Appointments</NavLink>
          <NavLink
            to='/staffpanel/adoptionrequests'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Adoption Requests</NavLink>
          <NavLink
            to='/staffpanel/adoptionposts'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Adoption Posts</NavLink>
          <NavLink
            to='/staffpanel/pettreatmenthistory'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Pet Treatment History</NavLink>
          <NavLink
            to='/staffpanel/pettraininghistory'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Pet Training History</NavLink>
          <NavLink
            to='/staffpanel/registration'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Registration</NavLink>
          <NavLink
            to='/staffpanel/manageusers'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Users</NavLink>
          <NavLink
            to='/staffpanel/managepets'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Pets</NavLink>
          <NavLink
            to='/staffpanel/manageprofits'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Profits</NavLink>

        </div>
        <div className="profile-animation-wrapper">
          <Outlet />
        </div>

      </div>
    </div>
  )

}

export default StaffPanelSideNav