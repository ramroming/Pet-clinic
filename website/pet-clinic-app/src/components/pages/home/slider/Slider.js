import react from "react"
import { useState, useEffect, useRef } from "react"
import { contentSlider } from "./sliderAnimation"
import { AnimatePresence, motion } from "framer-motion"


const sliderMotion = contentSlider

const Slider = () => {

  const [slider, setSlider] = useState([true, false, false, false])
  const position = useRef([0, 0]); //first: old, second: new


  const moveSlider = (event) => {

    if (event.target.className == 'right') {
      if (position.current[1] + 1 != slider.length) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1
        sliderMotion.initial.x = '97vw'
        sliderMotion.exit.x = '-97vw'
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })
      } else {
        position.current[0] = 3
        position.current[1] = 0
        sliderMotion.initial.x = '97vw'
        sliderMotion.exit.x = '-97vw'
        setSlider(() => {
         return [true, false, false, false]
        })
      }

    } else {
      if (position.current[1] - 1 >= 0) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1
        sliderMotion.initial.x = '-97vw'
        sliderMotion.exit.x = '97vw'
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })
      } else {
        position.current[0] = 0
        position.current[1] = 3
        setSlider(()=> {
          return [false, false, false, true]
        })
      }
    }
  }
  const pagSlide = (event) => {
    const keyIndex = event.target.className.search('k')
    const pagValue = event.target.className[keyIndex + 1]
    position.current[0] = position.current[1]
    position.current[1] = Number(pagValue)
    console.log(position)
    sliderMotion.initial.x = position.current[0] <= position.current[1] ? '97vw' : '-97vw'
    sliderMotion.exit.x = position.current[0] >= position.current[1] ? '97vw' : '-97vw'
    setSlider(() => {
      return slider.map((value, index) => {
        return (index === position.current[0] || index == position.current[1]) ? !value : value
      })
    })
  }


  return (
    <>
      <div className="slider-container flex-col gap-16p falign-center">
        <img src="/media/imgs/right.png" className="right"
          onClick={(event) => moveSlider(event)}></img>
        <img src="/media/imgs/left.png" className="left"
          onClick={(event) => moveSlider(event)}></img>
          <div className="pag flex-row gap-8p fjust-center">
            <i onClick={(event) => pagSlide(event)} className={slider[0] == true ?"fas k0 fa-dot-circle active ": "fas k0 fa-dot-circle"}></i>
            <i onClick={(event) => pagSlide(event)} className={slider[1] == true ?"fas k1 fa-dot-circle active ": "fas k1 fa-dot-circle"}></i>
            <i onClick={(event) => pagSlide(event)} className={slider[2] == true ?"fas k2 fa-dot-circle active ": "fas k2 fa-dot-circle"}></i>
            <i onClick={(event) => pagSlide(event)} className={slider[3] == true ?"fas k3 fa-dot-circle active ": "fas k3 fa-dot-circle"}></i>
         </div>
        <div className="animation-container">
          <AnimatePresence>
          {slider[0] && <motion.div
          variants={sliderMotion}
          initial='initial'
          animate='final'
          exit = 'exit'
          className="slide-content flex-col  gap-24p">
            <h1>Appointments</h1>
            <p>Examination, grooming, check-up and more!</p>
            <a href="" className="btn-rec-purple">
              Make an appointment
            </a>
            <img className="slider-img-desktop" src="/media/imgs/appointment.jpg" alt="app-image" />
            <img className="slider-img-mobile" src="/media/imgs/vertical-appointment.jpg" alt="app-image" />
          </motion.div>
          } 
          </AnimatePresence>
          <AnimatePresence>
          {
            slider[1] &&
            <motion.div 
            variants={sliderMotion}
            initial="initial"
            animate="final"
            exit = 'exit'
            className="slide-content flex-col  gap-24p">
              <h1>Adoption</h1>
              <p>Find pets to adopt or find a home for your pet</p>
              <a href="" className="btn-rec-purple">
                Go to adoption posts
              </a>
              <img className="slider-img-desktop" src="/media/imgs/shelter.jpg" alt="app-image" />
              <img className="slider-img-mobile" src="/media/imgs/vertical-shelter.jpg" alt="app-image" />
            </motion.div>

          }
          </AnimatePresence>
          <AnimatePresence>
          {
            slider[2] &&
            <motion.div 
            variants={sliderMotion}
            initial="initial"
            animate="final"
            exit = 'exit'
            className="slide-content flex-col  gap-24p">
              <h1>Pet Training</h1>
              <p>Get your pet trained by our professional trainers</p>
              <a href="" className="btn-rec-purple">
                Check trainings
              </a>
              <img className="slider-img-desktop" src="/media/imgs/training.jpg" alt="app-image" />
              <img className="slider-img-mobile" src="/media/imgs/vertical-training.jpg" alt="app-image" />
            </motion.div>

          }
          </AnimatePresence>
          <AnimatePresence>
          {
            slider[3] &&
            <motion.div 
            variants={sliderMotion}
            initial="initial"
            animate="final"
            exit = 'exit'
            className="slide-content flex-col  gap-24p">
              <h1>Register your pet</h1>
              <p>Add your pet to our family</p>
              <a href="" className="btn-rec-purple">
                Register meow!
              </a>
              <img className="slider-img-desktop" src="/media/imgs/registerpet.jpg" alt="app-image" />
              <img className="slider-img-mobile" src="/media/imgs/vertical-register.jpg" alt="app-image" />
            </motion.div>

          }
          </AnimatePresence>
      
          
        </div>
        



      </div>
      
    </>
  )
}

export default Slider
