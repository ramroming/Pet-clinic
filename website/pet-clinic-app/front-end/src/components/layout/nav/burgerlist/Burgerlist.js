import { AnimatePresence, motion } from "framer-motion";
import { burgerMenu, burgerItem } from "./burgerAnimation"
import { useState, useContext } from "react";
import { authContext } from "../../../shared/context/auth-context";
import { Link } from "react-router-dom";

const menuAnimation = burgerMenu
const burgerAnimation = burgerItem

const Burgerlist = () => {

  const [menuTog, setMenuTog] = useState(false)
  const auth = useContext(authContext)

  const dropList = [
    auth.isLoggedIn ? 'Logout' : 'Login',
    auth.isLoggedIn ? 'My profile' : 'Signup',
    'Appointment', 'Adoption', 'About', 'Register pet']

  // const dropList = [
  //   { title: 'Logout' },
  //   { title: 'My profile', href: '/myprofile'},
  //   { title: 'Appointment', href: '/appointment'},
  //   { title: 'Adoption', href: '/myprofile'},
  //   { title: 'My profile', href: '/myprofile'},
  //   { title: 'My profile', href: '/myprofile'},
  // ]

  const toggle = () => {
    setMenuTog((menuTog) => {
      return !menuTog
    })
  }

  return (
    <div className="dropdown">
      <i className="fa-solid fa-bars  burger-icon"
        onClick={toggle}></i>
      <AnimatePresence> {
        menuTog && <motion.div variants={menuAnimation}
          initial="initial"
          animate="final"
          exit='exit'
          className="droplist flex-col falign-center gap-16p">
          {
            dropList.map((item, index) => (
              <motion.div 
                variants={burgerAnimation}
                key={index}
                >
                
                  <Link
                    to={item.toLowerCase().replace(' ', '')}
                    className="droplist-item"
                    onClick={toggle}>
                    {item}
                  </Link>
              </motion.div>
            ))
          } </motion.div>
      } </AnimatePresence>
    </div>
  )
}

export default Burgerlist
