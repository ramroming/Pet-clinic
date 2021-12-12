import { useState, useRef } from "react"

//Import Animation object from sliderAnimation.js
import { contentSlider } from "./sliderAnimation"

//Import motion for defining entering motion, and AnimatePresence to define exit animation
import { AnimatePresence, motion } from "framer-motion"

// Assign the imported object to local object sliderMotion
const sliderMotion = contentSlider

const Slider = () => {

  // The slider state array represents the state of the slider where true is the current active slide that should be rendered
  const [slider, setSlider] = useState([true, false, false, false])

  // The position Ref is used to determine the direction of the movement right-> left or left->right by keeping the old position as the first index and the new position as the second index
  const position = useRef([0, 0]);

  // moveSlider will be called whenever left or right indicator is pressed and it will set the slider state using setSlider  
  const moveSlider = (event) => {

    //if the pressed indicator has right class it means it's right movement otherwise it is left movement
    if (event.target.className === 'right') {
      // check whether index is out of array range
      if (position.current[1] + 1 !== slider.length) {
        // its a right movement so modify position Ref by making the current index an old index and the new index is the previous new index + 1
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1

        //specify the initial and exit motion based on right movement
        sliderMotion.initial.x = '97vw'
        sliderMotion.exit.x = '-97vw'

        // Modifying the slider state by calling setSlider(), here for each value in the slider array if the value's index is either old or the new index in the position ref then it should be flipped meaning true->false and false->true
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
        })

        // if we reached the end of the array
      } else {

        // when we cannot go right any more and we click right we will back to the begining meaning to the position 0, so the old index will be 3 and the new index will be 0 
        position.current[0] = 3
        position.current[1] = 0

        //specify the initial and exit motion based on right movement
        sliderMotion.initial.x = '97vw'
        sliderMotion.exit.x = '-97vw'

        //call setSlider() to modify the state array, here we are starting from the begining so the first array element will be true and the rest are false
        setSlider(() => {
          return [true, false, false, false]
        })
      }

      // If the movement is to the left meaning the left indicator is pressed
    } else {

      // check whether index is out of array range
      if (position.current[1] - 1 >= 0) {

        // its a left movement so modify position Ref by making the current index an old index and the new index is the previous new index - 1
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1

        //specify the initial and exit motion based on left movement
        sliderMotion.initial.x = '-97vw'
        sliderMotion.exit.x = '97vw'

        // same as right movement idea
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
        })

        //If index is out of range similar idea to the right movement
      } else {
        position.current[0] = 0
        position.current[1] = 3
        setSlider(() => {
          return [false, false, false, true]
        })
      }
    }
  }
  // This function will be called whenever a pagintation is pressed
  const pagSlide = (event) => {
    // each of the pagintations has a class of k-number like k0 k1 k2 k3 so to know which pagintatin is pressed we find the 'k' index and the char after it is the number of the pagintation that was pressed
    const keyIndex = event.target.className.search('k')
    const pagValue = event.target.className[keyIndex + 1]

    //to go to the new position we save the previous position in the old position and we make the new position as the number of the pagintation.
    position.current[0] = position.current[1]
    position.current[1] = Number(pagValue)

    // we determine the direction of the movement left->right or right->left to know which animation values should be used and this is done by checking the position Ref , if for example position has [x, y] and if y>x then it is a right movement else it is a left movement
    sliderMotion.initial.x = position.current[0] <= position.current[1] ? '97vw' : '-97vw'
    sliderMotion.exit.x = position.current[0] >= position.current[1] ? '97vw' : '-97vw'

    // we modify the slider state based on the movement
    setSlider(() => {
      return slider.map((value, index) => {
        return (index === position.current[0] || index === position.current[1]) ? !value : value
      })
    })
  }


  return (
    <>
      <div className="slider-container flex-col gap-16p falign-center">
        <img alt ="direction" src="/media/imgs/right.png" className="right"
          onClick={(event) => moveSlider(event)}></img>
        <img alt ="direction" src="/media/imgs/left.png" className="left"
          onClick={(event) => moveSlider(event)}></img>
        <div className="pag flex-row gap-8p fjust-center">

          {/* we compare each pagintation with the slider array to know whether it is an active pagintation or not so that when can color it differently   */}
          <i onClick={(event) => pagSlide(event)} className={slider[0] === true ? "fas k0 fa-dot-circle active " : "fas k0 fa-dot-circle"}></i>
          <i onClick={(event) => pagSlide(event)} className={slider[1] === true ? "fas k1 fa-dot-circle active " : "fas k1 fa-dot-circle"}></i>
          <i onClick={(event) => pagSlide(event)} className={slider[2] === true ? "fas k2 fa-dot-circle active " : "fas k2 fa-dot-circle"}></i>
          <i onClick={(event) => pagSlide(event)} className={slider[3] === true ? "fas k3 fa-dot-circle active " : "fas k3 fa-dot-circle"}></i>
        </div>
        <div className="animation-container">
          {/* An element that has an exit animation should be wrapped with Animate presence */}
          <AnimatePresence>

            {/* conditional rendering of the slide based on slider array, each element will be rendered will have an entering animation and that is achieved using motion. before the element name, also variants, initial, animate and exit should be specified to indicate the movements object, initial state, final state and exit state accordingly  */}
            {slider[0] && <motion.div
              variants={sliderMotion}
              initial='initial'
              animate='final'
              exit='exit'
              className="slide-content flex-col  gap-24p">
              <h1>Appointments</h1>
              <p>Examination, grooming, check-up and more!</p>
              <a href="/#" className="btn-rec-purple">
                Make an appointment
              </a>
              <img className="slider-img-desktop" src="/media/imgs/appointment.jpg" alt="app" />
              <img className="slider-img-mobile" src="/media/imgs/vertical-appointment.jpg" alt="app" />
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
                exit='exit'
                className="slide-content flex-col  gap-24p">
                <h1>Adoption</h1>
                <p>Find pets to adopt or find a home for your pet</p>
                <a href="/#" className="btn-rec-purple">
                  Go to adoption posts
                </a>
                <img className="slider-img-desktop" src="/media/imgs/shelter.jpg" alt="app" />
                <img className="slider-img-mobile" src="/media/imgs/vertical-shelter.jpg" alt="app" />
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
                exit='exit'
                className="slide-content flex-col  gap-24p">
                <h1>Pet Training</h1>
                <p>Get your pet trained by our professional trainers</p>
                <a href="/#" className="btn-rec-purple">
                  Check trainings
                </a>
                <img className="slider-img-desktop" src="/media/imgs/training.jpg" alt="app" />
                <img className="slider-img-mobile" src="/media/imgs/vertical-training.jpg" alt="app" />
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
                exit='exit'
                className="slide-content flex-col  gap-24p">
                <h1>Register your pet</h1>
                <p>Add your pet to our family</p>
                <a href="/#" className="btn-rec-purple">
                  Register meow!
                </a>
                <img className="slider-img-desktop" src="/media/imgs/registerpet.jpg" alt="app" />
                <img className="slider-img-mobile" src="/media/imgs/vertical-register.jpg" alt="app" />
              </motion.div>

            }
          </AnimatePresence>


        </div>




      </div>

    </>
  )
}

export default Slider
