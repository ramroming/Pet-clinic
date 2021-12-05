import react from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { burgerMenu, burgerItem } from "../animations/headerAnimations"


const menuAnimation = burgerMenu
const burgerAnimation = burgerItem

const Header = () => {

  const [menuTog, setMenuTog] = useState(false)
  const dropList = ['Login', 'Signup', 'Appointment', 'Adoption', 'About', 'Our Staff']

  const toggle = () => {
    setMenuTog((menuTog) => {
      return !menuTog
    })
  }
  return (
    <>
      <nav className="flex-row fjust-between">
        <a className='image-link' href=""><img className='full-logo' src="/media/imgs/fulllogo.jpg" alt="" /></a>

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
          <AnimatePresence>
            {menuTog &&
              <motion.div
                variants={menuAnimation}
                initial="initial"
                animate="final"
                exit='exit'
                className="droplist flex-col falign-center gap-16p">
                {dropList.map( (item, index) => (  
                  <motion.a
                  variants = {burgerAnimation}
                  key = {index}
                  href="" className="droplist-item">{item}
                  </motion.a> )
                )}
              </motion.div>
            }
          </AnimatePresence>


        </div>
      </nav>
    </>
  )
}
export default Header;