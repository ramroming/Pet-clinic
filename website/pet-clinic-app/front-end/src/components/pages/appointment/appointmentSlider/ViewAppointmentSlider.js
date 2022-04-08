import AppointmentCard from "./appointmentCard/AppointmentCard"
import { useState, useRef, useEffect } from "react"
import LoadingSpinner from "../../../utils/loadingspinner/LoadingSpinner";







// // data from the database to be rendered with the component
// const cardsArray = (function (num) {
//   const array = []
//   for (let i = 0; i < num; i++) {
//     array.push({
//       appointment_type: "Examination",
//       date: "17/05/2021",
//       pet_name: "Popo",
//       first_name: '',
//       last_name: '',
//       status: (i % 2 === 0) ? 1 : 0
//     })
//   }
//   return array
// })(9); //from database


// initiate the pagination based on the number of cards retreived from the database, divArray is used to determine the division of the paginations,
// refArr is also used to keep track of the card index 
// this will retrun an array of paginations
const initiatePag = (cardsNumber, refArr, divArray) => {
  const pag = [true]
  if (divArray) {
    for (let i = 0; i < divArray.length; i++) {
      if (refArr.current[3] < divArray[i].size) {
        for (let j = divArray[i].cardsNum + 1; j <= cardsNumber; j++) {
          if ((j - 1) % divArray[i].cardsNum === 0) {
            pag.push(false)
          }
        }
        break
      }
    }
  }

  return pag

}

// initiate the first set of cards to appear in the first pag, this is also determined by divArray and refArr
// this will return an array of components
const initiateCards = (refArr, divArray, cardsArray) => {

  if (divArray) {
    for (let i = 0; i < divArray.length; i++) {
      if (refArr.current[3] < divArray[i].size) {
        if (refArr.current[2] === 0) {
          const cardsGroup = []
          for (let index = 0; index < cardsArray.length; index++) {
            if (index < divArray[i].cardsNum) {
              refArr.current[2] += 1
              // Component's index to be rendered 
              cardsGroup.push(index)
            }
          }
          return cardsGroup
        }

        break
      }

    }
  }

}

// move the card index when right arrow is pressed 
// the movement depends on the current card index and the division array
// an array of components is returned
const rightArrowRender = (refArr, divArray, cardsArray) => {
  const cardsGroup = []


  cardsGroup.push(refArr.current[2])

  for (let j = 0; j < divArray.length; j++) {
    if (refArr.current[3] < divArray[j].size) {
      for (let i = refArr.current[2] + 1; i <= cardsArray.length; i++) {
        refArr.current[2] = refArr.current[2] + 1
        if ((refArr.current[2] % divArray[j].cardsNum) === 0) {
          break
        }
        if (i === cardsArray.length) {
          break
        } else {

          cardsGroup.push(refArr.current[2])

        }
      }
      break
    }
  }
  return cardsGroup
}

// move the card index when left arrow is pressed 
// the movement depends on the current card index and the division array also it depends on the number of cards in the current pagination
// an array of components is returned
const leftArrowRender = (refArr, divArray, cardsLength, cardsArray) => {
  const cardsGroup = []
  for (let j = 0; j < divArray.length; j++) {
    if (refArr.current[3] < divArray[j].size) {
      refArr.current[2] = refArr.current[2] - (divArray[j].cardsNum + cardsLength)

      cardsGroup.push(refArr.current[2])
      for (let i = refArr.current[2] + 1; i < cardsArray.length; i++) {

        refArr.current[2] = refArr.current[2] + 1
        if ((refArr.current[2] % divArray[j].cardsNum) === 0) {
          break
        }

        cardsGroup.push(refArr.current[2])


      }

      break
    }
  }
  return cardsGroup
}

// move the card index when pagination is pressed 
// the movement depends on the current card index and the division array also it depends on the number of cards in the current pagination
// an array of components is returned
const pagRender = (refArr, divArray, cardsLength, cardsArray) => {
  const cardsGroup = []
  for (let j = 0; j < divArray.length; j++) {
    if (refArr.current[3] < divArray[j].size) {
      const sub = refArr.current[1] - refArr.current[0] // new - old
      if (sub > 0) {
        refArr.current[2] = (refArr.current[2] - divArray[j].cardsNum) + (sub * divArray[j].cardsNum + 1)


        cardsGroup.push(refArr.current[2] - 1)

        for (let i = refArr.current[2]; i < cardsArray.length; i++) {
          if ((refArr.current[2] % divArray[j].cardsNum) === 0) {
            break
          }

          cardsGroup.push(refArr.current[2])
          refArr.current[2] = refArr.current[2] + 1
        }
        break

      } else if (sub < 0) {
        refArr.current[2] = ((refArr.current[2] - cardsLength) - (Math.abs(sub) * divArray[j].cardsNum + 1)) + 2


        cardsGroup.push(refArr.current[2] - 1)


        for (let i = refArr.current[2]; i < cardsArray.length; i++) {
          if ((refArr.current[2] % divArray[j].cardsNum) === 0) {
            break
          }


          cardsGroup.push(refArr.current[2])

          refArr.current[2] = refArr.current[2] + 1
        }
        break
      }
    }
  }
  return cardsGroup
}


 // division array that is an array of object each object represents the screen width and the maximum number of cards allowed for each size
 const divArray = [{ size: 767, cardsNum: 2 }, { size: Infinity, cardsNum: 4 }]


const ViewAppointmentSlider = (props) => {
  
  // array of global referances it is used to store 
  // - slider's old and new position at indexes 0 and 1 accordingly
  // - Card's index at index 2
  // - screen width at index 3
  const refArr = useRef([0, 0, 0, window.innerWidth]);
  
 
  
  // initiating the pag and cards array
  const [slider, setSlider] = useState({})
  
  
  useEffect(() => {
    if (props.appointments.length !== 0)
      setSlider({
        pag: initiatePag(props.appointments.length, refArr, divArray),
        cards: initiateCards(refArr, divArray, props.appointments)
      })
  }, [props.appointments])


  // useEffect(() => {
  //   if (props.appointments && slider.cards) {

  //     console.log(props.appointments)
  //     console.log(slider.cards)
  //     console.log(slider.cards.filter((value => props.appointments[value].status === props.status)))
  //   }
  // }, [props.appointments, props.cards, slider.cards, props.status])

  const moveSlider = (event) => {

    //if the pressed indicator has right class it means it's right movement otherwise it is left movement
    if (event.target.className === 'fas fa-chevron-right') {

      //  check whether index is out of array range
      if (refArr.current[1] + 1 !== slider.pag.length) {
        // its a right movement so modify refArr Ref by making the current index an old index and the new index is the previous new index + 1
        refArr.current[0] = refArr.current[1]
        refArr.current[1] = refArr.current[1] + 1

        // using the rightArrowRender function whenever right movement occurs
        const cardsGroup = rightArrowRender(refArr, divArray, props.appointments)
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

        // using the leftArrowRender function whenever left movement occurs

        const cardsGroup = leftArrowRender(refArr, divArray, slider.cards.length, props.appointments)
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
    // each of the paginations has a class of k-number like k0 k1 k2 k3 so to know which pagintatin is pressed we find the 'k' index and the char after it is the number of the pagination that was pressed
    const pagValue = event.target.className[1]

    //to go to the new refArr we save the previous refArr in the old refArr and we make the new refArr as the number of the pagination.
    refArr.current[0] = refArr.current[1]
    refArr.current[1] = Number(pagValue)

    // we determine the direction of the movement left->right or right->left to know which animation values should be used and this is done by checking the refArr Ref , if for example refArr has [x, y] and if y>x then it is a right movement else it is a left movement


    // using the pagRender function whenever pag movement occurs
    const cardsGroup = pagRender(refArr, divArray, slider.cards.length, props.appointments)


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
      
      {props.status === 1 ? <h2>Your Active Appointments in local Time</h2> : <h2>Your previous Appointments in local Time</h2>}
      <div className=" view-appointment-animator flex-row gap-8p fjust-around">
        {/* Cards */}
        {props.isLoading && <LoadingSpinner color='dark' />}
        {!props.isLoading && props.appointments && slider.cards && slider.cards.map((value) => {
          return (
            <div key={value}>
              <AppointmentCard card={props.appointments[value]} dispatch={props.dispatch} />
            </div>

          )

        })}
        {/* {slider.cards.map((value, index) => {

          if (cardsArray[value].status === props.status) {
            return (
              <div key={value}>
                  <AppointmentCard  card={cardsArray[value]}/>
              </div>

            )
          }
        })} */}

      </div>
      {props.appointments && props.appointments.length !== 0 &&
        <div className="pag-app flex-row gap-8p fjust-center">
        <span><i
          onClick={(event) => {
            moveSlider(event)
          }}
          className="fas fa-chevron-left"></i></span>
        {slider.pag && slider.pag.map((value, index) => {
          return <span
            key={index}
            onClick={(event) => {
              // disable the functionality of an active pagination number
              if (event.target.className.search('active') !== -1)
                return
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
      }
      
    </>
  )
}

export default ViewAppointmentSlider