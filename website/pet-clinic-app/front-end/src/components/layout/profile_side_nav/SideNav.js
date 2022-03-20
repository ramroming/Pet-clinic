import { NavLink } from "react-router-dom";
import { Outlet } from "react-router";

const SideNav = () => {

  return (
    <div className="home-container myprofile-wrapper">
      <div className="myprofile-container flex-row">
        {/* <div className="bio-container flex-row gap-8p falign-center">
          <img className="avatar-photo" alt='avatar' src='/media/imgs/avatar.jpg' />
          <div className="bio-info flex-col gap-4p">
            <p className="user-name">
              public Name/Surname
            </p>
            <p>Your personal account</p>
          </div>
        </div> */}
        <div className="profile-menu flex-col ">
          <NavLink
            to='/myprofile/mypersonalinfo'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Personal Info</NavLink>
          <NavLink
            to='/myprofile/account'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Account</NavLink>
          <NavLink
            to='/myprofile/petinfo'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>Manage Pets</NavLink>
          <NavLink
            to='/myprofile/myadoptionposts'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>My Adoption posts</NavLink>
          <NavLink
            to='/myprofile/myadoptionrequests'
            className={({ isActive }) =>
              isActive ? 'profile-option selected' : 'profile-option'
            }>My Adoption Requests</NavLink>
        </div>
        <div className="profile-animation-wrapper">
          <Outlet />
        </div>  
      </div>

    </div>
  )

}

export default SideNav