import AppointmentCard from "./appointmentCard/AppointmentCard"
import { useState, useRef } from "react"

// Import Animation object from sliderAnimation.js
// import { contentSlider } from "./sliderAnimation"

// //Import motion for defining entering motion, and AnimatePresence to define exit animation
// import { AnimatePresence, motion } from "framer-motion"

// Assign the imported object to local object sliderMotion
// const sliderMotion = contentSlider

const cardsArray = (function (num) {
  const array = []
  for (let i = 0; i < num; i++) {
    array.push({
      id: i,
      type: "Examination",
      date: "17/05/2021",
      staffMem: "Ahmet",
      petName: "Popo",
      status: (i % 2 === 0) ? "active" : 'past'
    })
  }
  return array
})(17); //from database


const initiatePag = (cardsNumber, refArr) => {
  const pag = [true]
  if (refArr.current[3] < 768) {
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

const initiateCards = (refArr) => {

  if (refArr.current[3] < 768) {

    if (refArr.current[2] === 0) {

      const cardsGroup = cardsArray.map((obj, index) => {
        if (index < 4) {
          refArr.current[2] += 1
          return <AppointmentCard key={index} card={obj} />
        } else {
          return ''
        }

      })
      return cardsGroup
    }


  } else {
    
    if (refArr.current[2] === 0) {

      const cardsGroup = cardsArray.map((obj, index) => {
        if (index < 8) {
          refArr.current[2] += 1
          return <AppointmentCard key={index} card={obj} />
        } else {
          return ''
        }

      })
      return cardsGroup
    }
   
  }

}

// const cardsArray = [{
//   id: 0,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'
// },
// {
//   id: 1,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 2,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 3,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 4,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 5,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 6,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 7,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 8,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 9,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 10,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 11,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 12,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 13,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 14,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 15,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 16,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// {
//   id: 17,
//   type: "Examination",
//   date: "17/05/2021",
//   staffMem: "Ahmet",
//   petName: "Popo",
//   status: 'active'

// },
// ]




const ViewAppointmentSlider = () => {



  const refArr = useRef([0, 0, 0, window.innerWidth]); // old position, new position, card index, window width

  // Global counter J to know at which card we stop for the rendering
  // const cardIndex = useRef(0)




  const [slider, setSlider] = useState({
    pag: initiatePag(cardsArray.length,refArr), // length of the cards array from database
    cards: initiateCards(refArr)
  })




  // moveSlider will be called whenever left or right indicator is pressed and it will set the slider state using setSlider  
  const moveSlider = (event) => {

    //if the pressed indicator has right class it means it's right movement otherwise it is left movement
    if (event.target.className === 'fas fa-chevron-right') {

      //  check whether index is out of array range
      if (refArr.current[1] + 1 !== slider.pag.length) {
        // its a right movement so modify refArr Ref by making the current index an old index and the new index is the previous new index + 1
        refArr.current[0] = refArr.current[1]
        refArr.current[1] = refArr.current[1] + 1

        const cardsGroup = []



        cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)

        for (let i = refArr.current[2] + 1; i <= cardsArray.length; i++) {
          refArr.current[2] = refArr.current[2] + 1

          if (refArr.current[3] < 768) { // for small screens show maximum 4 cards for each pag
            if ((refArr.current[2] % 4) === 0) {
              break
            }
          } else { // for big screens show maximum 8 cards for each pag
            if ((refArr.current[2] % 8) === 0) {
              break
            }
          }

          if (i === cardsArray.length) {
            break
          }
          else {
            cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[i]} />)

          }

        }




        setSlider((oldSlider) => {

          return {
            ...oldSlider, pag: slider.pag.map((value, index) => {
              return (index === refArr.current[0] || index === refArr.current[1]) ? !value : value
            }), cards: cardsGroup
          }
        })
      }

      

    }

    // If the movement is to the left meaning the left indicator is pressed
    else {

      // check whether index is out of array range
      if (refArr.current[1] - 1 >= 0) {

        // its a left movement so modify refArr Ref by making the current index an old index and the new index is the previous new index - 1
        refArr.current[0] = refArr.current[1]
        refArr.current[1] = refArr.current[1] - 1

        //specify the initial and exit motion based on left movement
        // sliderMotion.initial.x = '-97vw'
        // sliderMotion.exit.x = '97vw'

        const cardsGroup = []


        if (refArr.current[3] < 768) { // for small screens show maximum 4 cards for each pag

          refArr.current[2] = refArr.current[2] - (4 + slider.cards.length)

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)
          for (let i = refArr.current[2] + 1; i < cardsArray.length; i++) {

            refArr.current[2] = refArr.current[2] + 1
            if ((refArr.current[2] % 4) === 0) {
              break
            }
            cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[i]} />)

          }
        } else { // for big screens show maximum 8 cards for each pag

          refArr.current[2] = refArr.current[2] - (8 + slider.cards.length)

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)
          for (let i = refArr.current[2] + 1; i < cardsArray.length; i++) {

            refArr.current[2] = refArr.current[2] + 1
            if ((refArr.current[2] % 8) === 0) {
              break
            }
            cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[i]} />)

          }

        }




        // same as right movement idea
        setSlider((oldSlider) => {
          return {
            ...oldSlider, pag: slider.pag.map((value, index) => {
              return (index === refArr.current[0] || index === refArr.current[1]) ? !value : value
            }), cards: cardsGroup
          }
        })



      }
    }
  }
  const pagSlide = (event) => {
    // each of the pagintations has a class of k-number like k0 k1 k2 k3 so to know which pagintatin is pressed we find the 'k' index and the char after it is the number of the pagintation that was pressed
    const pagValue = event.target.className[1]

    //to go to the new refArr we save the previous refArr in the old refArr and we make the new refArr as the number of the pagintation.
    refArr.current[0] = refArr.current[1]
    refArr.current[1] = Number(pagValue)

    // we determine the direction of the movement left->right or right->left to know which animation values should be used and this is done by checking the refArr Ref , if for example refArr has [x, y] and if y>x then it is a right movement else it is a left movement
    // sliderMotion.initial.x = refArr.current[0] <= refArr.current[1] ? '97vw' : '-97vw'
    // sliderMotion.exit.x = refArr.current[0] >= refArr.current[1] ? '97vw' : '-97vw'


    //fixing the cardsArray after clicking on the numbered pag:


    const cardsGroup = []
    const sub = refArr.current[1] - refArr.current[0] // new - old

    if (refArr.current[3] < 768) { // for small screens show maximum 4 cards for each pag
      // going right
      if (sub > 0) {
        refArr.current[2] = (refArr.current[2] - 4) + (sub * 4 + 1)

        cardsGroup.push(<AppointmentCard key={refArr.current[2] - 1} card={cardsArray[refArr.current[2] - 1]} />)


        for (let i = refArr.current[2]; i < cardsArray.length; i++) {


          if ((refArr.current[2] % 4) === 0) {
            break
          }

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)

          refArr.current[2] = refArr.current[2] + 1

        }


      }
      // going left
      else if (sub < 0) {
        refArr.current[2] = ((refArr.current[2] - slider.cards.length) - (Math.abs(sub) * 4 + 1)) + 2


        cardsGroup.push(<AppointmentCard key={refArr.current[2] - 1} card={cardsArray[refArr.current[2] - 1]} />)

        for (let i = refArr.current[2]; i < cardsArray.length; i++) {


          if ((refArr.current[2] % 4) === 0) {
            break
          }

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)

          refArr.current[2] = refArr.current[2] + 1

        }
      }


    }
    else { // for big screens show maximum 8 cards for each pag

      // going right
      if (sub > 0) {
        refArr.current[2] = (refArr.current[2] - 8) + (sub * 8 + 1)

        cardsGroup.push(<AppointmentCard key={refArr.current[2] - 1} card={cardsArray[refArr.current[2] - 1]} />)


        for (let i = refArr.current[2]; i < cardsArray.length; i++) {


          if ((refArr.current[2] % 8) === 0) {
            break
          }

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)

          refArr.current[2] = refArr.current[2] + 1

        }


      }
      // going left
      else if (sub < 0) {
        refArr.current[2] = ((refArr.current[2] - slider.cards.length) - (Math.abs(sub) * 8 + 1)) + 2


        cardsGroup.push(<AppointmentCard key={refArr.current[2] - 1} card={cardsArray[refArr.current[2] - 1]} />)

        for (let i = refArr.current[2]; i < cardsArray.length; i++) {


          if ((refArr.current[2] % 8) === 0) {
            break
          }

          cardsGroup.push(<AppointmentCard key={refArr.current[2]} card={cardsArray[refArr.current[2]]} />)

          refArr.current[2] = refArr.current[2] + 1

        }
      }
    }


    // we modify the slider state based on the movement
    setSlider((oldSlider) => {
      return {
        ...oldSlider, pag: slider.pag.map((value, index) => {
          return (index === refArr.current[0] || index === refArr.current[1]) ? !value : value
        }), cards: cardsGroup
      }
    })
  }



  return (
    <>
      <div className=" view-appointment-animator flex-row gap-8p fjust-around">
        {/* Cards */}
        {slider.cards.map((value) => {
          return value
        })}

      </div>
      <div className="pag flex-row gap-8p fjust-center">
        <span><i
          onClick={(event) => {
            moveSlider(event)
          }}
          className="fas fa-chevron-left"></i></span>
        {slider.pag.map((value, index) => {
          return <span
            key={index}
            onClick={(event) => {
              pagSlide(event)
            }}
            className={'k' + index + (value === true ? ' active' : '')}>{index + 1}</span>
        })}


        <span><i
          onClick={(event) => {
            moveSlider(event)
          }}
          className="fas fa-chevron-right"></i></span>
      </div>
    </>
  )
}

export default ViewAppointmentSlider