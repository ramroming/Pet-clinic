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

  let dropList

  if (auth.userRole === null){
     dropList = [
      auth.isLoggedIn ? 'Logout' : 'Login',
      auth.isLoggedIn ? 'My profile' : 'Signup',
       'Register pet', 'Appointment', 'Adoption', 'About']
  } else {
    dropList = ['Logout']
  }


  // const dropList = [
  //   { title: 'Logout' },
  //   { title: 'My profile', href: '/myprofile'},
  //   { title: 'Appointment', href: '/appointment'},
  //   { title: 'Adoption', href: '/myprofile'},
  //   { title: 'My profile', href: '/myprofile'},
  //   { title: 'My profile', href: '/myprofile'},
  // ]

  const toggle = (isLogout = false) => {
    setMenuTog((menuTog) => {
      return !menuTog
    })
    if (isLogout) {
      auth.logout()
    }
  }

  return (
    <div className="dropdown">
      <i className="fa-solid fa-bars  burger-icon"
        onClick={() => toggle()}></i>
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
                    to={item.toLowerCase().replace(' ', '') === 'myprofile' ? 'myprofile/mypersonalinfo' : item.toLowerCase().replace(' ', '')}
                    className="droplist-item"
                    onClick={() => toggle(item === 'Logout')}>
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
