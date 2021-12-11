import react from "react";
import { useState } from "react";
import Burgerlist from "./burgerlist/Burgerlist";




const Nav = () => {


  return (
    <>
      <nav className="flex-row fjust-between">
        <a className='image-link' href=""><img className='full-logo' src="/media/imgs/fulllogo.jpg" alt="" /></a>

        <div className="nav-items flex-row fjust-around falign-center">
          <div className="links-wrapper flex-row fjust-around ">
            <a href="" className="nav-item">Home</a>
            <a href="" className="nav-item">Appointment</a>
            <a href="" className="nav-item">Adoption</a>
            <a href="" className="nav-item">About</a>
            <a href="" className="nav-item">Add pet</a>
          </div>

          <div className="btn-wrapper flex-row fjust-start gap-8p">
            <button href="" className="btn-s">Login</button>
            <button href="" className="btn-s">Signup</button>
          </div>
        </div>
        
        <Burgerlist />
        
      </nav>
    </>
  )
}
export default Nav;