import react from "react";
import { useState } from "react";

const Header = () => {

  const [menuTog, setMenuTog] = useState(false)

  const toggle = () => {
    setMenuTog((menuTog) => {
      return !menuTog
    })
  }
  return (
    <>
      <nav className="flex-row fjust-between">
        <img className='full-logo' src="/media/imgs/fulllogo.jpg" alt="" />
        <div className="nav-items flex-row fjust-around falign-center">
          <div className="links-wrapper flex-row fjust-around ">
            <a href="" className="nav-item">Appointment</a>
            <a href="" className="nav-item">Adoption</a>
            <a href="" className="nav-item">About</a>
            <a href="" className="nav-item">Our Staff</a>
          </div>

          <div className="btn-wrapper flex-row fjust-center gap-8p">
            <button href="" className="btn-s">Login</button>
            <button href="" className="btn-s">Signup</button>
          </div>

        </div>
        <div className="dropdown">
          <i className="fa-solid fa-bars  burger-icon"
            onClick={toggle}></i>
          {menuTog &&
            <div className="droplist flex-col falign-center gap-16p">
              <a href="" className="droplist-item">Login</a>
              <a href="" className="droplist-item">Signup</a>
              <a href="" className="droplist-item">Appointment</a>
              <a href="" className="droplist-item">Adoption</a>
              <a href="" className="droplist-item">About</a>
              <a href="" className="droplist-item">Our Staff</a>
            </div>
          }

        </div>
      </nav>
    </>
  )
}
export default Header;