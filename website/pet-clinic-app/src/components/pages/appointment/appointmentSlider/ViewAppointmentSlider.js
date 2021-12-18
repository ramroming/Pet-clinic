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

const initiateCards = (position) => {

  if (window.innerWidth < 768) {

    if (position.current[2] === 0) {

      const cardsGroup = cardsArray.map((obj, index) => {
        if (index < 4) {
          position.current[2] += 1
          return <AppointmentCard key={index} card={obj} />
        } else {
          return ''
        }

      })
      return cardsGroup
    }


  }

}



const ViewAppointmentSlider = () => {





  const position = useRef([0, 0, 0]);

  // Global counter J to know at which card we stop for the rendering
  // const cardIndex = useRef(0)


  const [slider, setSlider] = useState({
    pag: initiatePag(cardsArray.length), // length of the cards array from database
    cards: initiateCards(position)
  })




  // moveSlider will be called whenever left or right indicator is pressed and it will set the slider state using setSlider  
  const moveSlider = (event) => {

    //if the pressed indicator has right class it means it's right movement otherwise it is left movement
    if (event.target.className === 'fas fa-chevron-right') {

      //  check whether index is out of array range
      if (position.current[1] + 1 !== slider.pag.length) {
        // its a right movement so modify position Ref by making the current index an old index and the new index is the previous new index + 1
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1

        const cardsGroup = []

        cardsGroup.push(<AppointmentCard key={position.current[2]} card={cardsArray[position.current[2]]} />)

        for (let i = position.current[2] + 1; i <= cardsArray.length; i++) {
          position.current[2] = position.current[2] + 1
          if ((position.current[2] % 4) === 0) {
            break
          }
          if(i === cardsArray.length) {
            break
          }
          else {
            cardsGroup.push(<AppointmentCard key={position.current[2]} card={cardsArray[i]} />)

          }

        }

        setSlider((oldSlider) => {

          return {
            ...oldSlider, pag: slider.pag.map((value, index) => {
              return (index === position.current[0] || index === position.current[1]) ? !value : value
            }), cards: cardsGroup
          }
        })
      }

      // }

    }

   // If the movement is to the left meaning the left indicator is pressed
    else {

      // check whether index is out of array range
      if (position.current[1] - 1 >= 0) {

        // its a left movement so modify position Ref by making the current index an old index and the new index is the previous new index - 1
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1

        //specify the initial and exit motion based on left movement
        // sliderMotion.initial.x = '-97vw'
        // sliderMotion.exit.x = '97vw'

        const cardsGroup = []
       

        
        position.current[2] = position.current[2] - (4 + slider.cards.length)

        cardsGroup.push(<AppointmentCard key={position.current[2]} card={cardsArray[position.current[2]]} />)
        for (let i = position.current[2] + 1; i < cardsArray.length; i++) {
          console.log(position.current[2])
          position.current[2] = position.current[2] + 1
          if ((position.current[2] % 4) === 0) {
    
            break
          }
          cardsGroup.push(<AppointmentCard key={position.current[2]} card={cardsArray[i]} />)

        }
      

        
        // same as right movement idea
        setSlider((oldSlider) => {
          return {
            ...oldSlider, pag: slider.pag.map((value, index) => {
              return (index === position.current[0] || index === position.current[1]) ? !value : value
            }), cards : cardsGroup
          }
        })



      }
    }
  }
  const pagSlide = (event) => {
    // each of the pagintations has a class of k-number like k0 k1 k2 k3 so to know which pagintatin is pressed we find the 'k' index and the char after it is the number of the pagintation that was pressed
    const pagValue = event.target.className[1]

    //to go to the new position we save the previous position in the old position and we make the new position as the number of the pagintation.
    position.current[0] = position.current[1]
    position.current[1] = Number(pagValue)

    // we determine the direction of the movement left->right or right->left to know which animation values should be used and this is done by checking the position Ref , if for example position has [x, y] and if y>x then it is a right movement else it is a left movement
    // sliderMotion.initial.x = position.current[0] <= position.current[1] ? '97vw' : '-97vw'
    // sliderMotion.exit.x = position.current[0] >= position.current[1] ? '97vw' : '-97vw'

    // we modify the slider state based on the movement
    setSlider((oldSlider) => {
      return {
        ...oldSlider, pag: slider.pag.map((value, index) => {
          return (index === position.current[0] || index === position.current[1]) ? !value : value
        })
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