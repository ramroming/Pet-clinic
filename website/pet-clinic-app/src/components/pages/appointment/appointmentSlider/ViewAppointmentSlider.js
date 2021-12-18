import AppointmentCard from "./appointmentCard/AppointmentCard"
import { useState, useRef } from "react"

// Import Animation object from sliderAnimation.js
// import { contentSlider } from "./sliderAnimation"

// //Import motion for defining entering motion, and AnimatePresence to define exit animation
// import { AnimatePresence, motion } from "framer-motion"

// Assign the imported object to local object sliderMotion
// const sliderMotion = contentSlider
const cardsNumber = [{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "active"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
{
  type: "Examination",
  date: "17/05/2021",
  staffMem: "Ahmet",
  petName: "Popo",
  status: "past"
},
] //from database




const initiatePag = (cardsNumber) => {
  const pag = [true]
  if (window.innerWidth < 768) {
    for (let i = 5; i <= cardsNumber; i++) {
      if ((i - 1) % 4 === 0) {
        pag.push(false)
      }
    }
  } else {
    for (let i = 9; i <= cardsNumber; i++) {
      if ((i - 1) % 8 === 0) {
        pag.push(false)
      }
    }

  }

  return pag

}

const ViewAppointmentSlider = () => {

  // console.log(initiatePag(5))

  const [slider, setSlider] = useState(initiatePag(cardsNumber))
  const position = useRef([0, 0]);

  
  // moveSlider will be called whenever left or right indicator is pressed and it will set the slider state using setSlider  
  const moveSlider = (event) => {

    //if the pressed indicator has right class it means it's right movement otherwise it is left movement
    if (event.target.className === 'fa fa-chevron-right') {
      // check whether index is out of array range
      if (position.current[1] + 1 !== slider.length) {
        // its a right movement so modify position Ref by making the current index an old index and the new index is the previous new index + 1
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1

        //specify the initial and exit motion based on right movement
        // sliderMotion.initial.x = '97vw'
        // sliderMotion.exit.x = '-97vw'

        // Modifying the slider state by calling setSlider(), here for each value in the slider array if the value's index is either old or the new index in the position ref then it should be flipped meaning true->false and false->true
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
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
        // sliderMotion.initial.x = '-97vw'
        // sliderMotion.exit.x = '97vw'

        // same as right movement idea
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
        })

    
      } 
    }
  }

  return (
    <>
      <div className=" view-appointment-animator flex-row gap-8p fjust-around">
        {for(i = 1; i <= cardsNumber ; i++){
            <AppointmentCard status={'active'} />
        }}
        <AppointmentCard status={'active'} />
        <AppointmentCard status={'past'} />
        <AppointmentCard status={'active'} />
        <AppointmentCard status={'active'} />
        <AppointmentCard status={'past'} />
        <AppointmentCard status={'past'} />
      </div>
      <div className="pag flex-row gap-8p fjust-center">
        <span><i className="fas fa-chevron-left"></i></span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span><i className="fas fa-chevron-right"></i></span>
      </div>
    </>
  )
}

export default ViewAppointmentSlider