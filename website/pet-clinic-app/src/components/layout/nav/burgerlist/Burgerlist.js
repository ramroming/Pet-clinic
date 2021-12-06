import react from "react";
import { AnimatePresence, motion } from "framer-motion";
import { burgerMenu, burgerItem } from "./burgerAnimation"
import { useState } from "react";

const menuAnimation = burgerMenu
const burgerAnimation = burgerItem

const Burgerlist = () => {

    const [menuTog, setMenuTog] = useState(false)
    const dropList = ['Login', 'Signup', 'Appointment', 'Adoption', 'About', 'Our Staff']
  
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
                        <motion.a variants={burgerAnimation}
                            key={index}
                            href=""
                            className="droplist-item">
                            {item} </motion.a>
                    ))
                } </motion.div>
            } </AnimatePresence>
        </div>
    )
}

export default Burgerlist
