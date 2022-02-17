import Burgerlist from "./burgerlist/Burgerlist";
import { useContext } from "react";
import { authContext } from "../../shared/context/auth-context";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {

  const auth = useContext(authContext)
  return (
    <>
      <nav className="flex-row fjust-between">
        <Link to='/' className="image-link"><img className='full-logo' src="/media/imgs/fulllogo.jpg" alt="" /></Link>

        <div className="nav-items flex-row fjust-around falign-center">
          <div className="links-wrapper flex-row fjust-around ">
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? 'nav-item active-link' : 'nav-item'
              }>Home</NavLink>
            <NavLink
              to='/appointment'
              className={({ isActive }) =>
                isActive ? 'nav-item active-link' : 'nav-item'
              }
            >Appointment</NavLink>
            <NavLink
              to='/adoption'
              className={({ isActive }) =>
                isActive ? 'nav-item active-link' : 'nav-item'
              }
            >Adoption</NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive ? 'nav-item active-link' : 'nav-item'
              }
            >About</NavLink>
            <NavLink
              to='/registerpet'
              className={({ isActive }) =>
                isActive ? 'nav-item active-link' : 'nav-item'
              }
            >Add pet</NavLink>
            
          </div>

          <div className="btn-wrapper flex-row fjust-start gap-8p">
            {auth.isLoggedIn && 
            <Link
            className="btn-s" 
            to='/myprofile'>My profile</Link>}
            {auth.isLoggedIn && <button  className="btn-s">Logout</button>}
            {!auth.isLoggedIn && 
            <Link
            className="btn-s" 
            to='/login'>Login</Link>}
            {!auth.isLoggedIn && 
            <Link
            className="btn-s" 
            to='/signup'>Signup</Link>}
            
          </div>
        </div>

        <Burgerlist />

      </nav>
    </>
  )
}
export default Nav;