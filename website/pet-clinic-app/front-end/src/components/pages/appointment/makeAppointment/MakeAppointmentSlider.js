import { useState, useRef, useEffect, useContext } from "react"
import Datepicker from "../../../utils/datepicker/Datepicker";

//Import Animation object from sliderAnimation.js
import { appointmentSlider } from "../makeAppointment/makeAppointmentAnimation"

//Import motion for defining entering motion, and AnimatePresence to define exit animation
import { AnimatePresence, motion } from "framer-motion"
import useFetch from "../../../shared/hooks/fetch-hook";

import { authContext } from "../../../shared/context/auth-context";
import useMakeAppointment from "../../../shared/hooks/make-appointment-hook";


// Assign the imported object to local object sliderMotion
const sliderMotion = appointmentSlider


const initialData = {
  isLoading: false,
  pets: [],
  stmems: [],
  responseError: ''
}
const MakeAppointmentSlider = () => {

  const auth = useContext(authContext)
  // using the fetch hook
  const sendRequest = useFetch()

  const [slides, setSlides] = useState([true, false, false, false])

  // usign the appointment hook
  const [state, dispatch] = useMakeAppointment(initialData)
  const [appointment, setAppointment] = useState({
    appointmentType: '',
    petName: '',
    staffMem: '',
    date: new Date("October 01, 1991 00:00:00")
  })

  // getting data from the endpoints
  useEffect(() => {
    const getPets = async () => {
      try {
        const pets = await sendRequest('http://localhost:5000/users/me/pets', 'GET', null,
          {
            'Authorization': `Bearer ${auth.token}`
          }
        )
        if (pets) {
          dispatch({ type: 'successPets', data: pets })
        }
      } catch (e) {

        dispatch({ type: 'failure', error: e.error })
      }
    }
    const getSt = async () => {
      try {
        const stmems = await sendRequest(`http://localhost:5000/appointment/staffmems?appointment_type=${appointment.appointmentType}`, 'GET', null,
          {
            'Authorization': `Bearer ${auth.token}`
          }
        )
        if (stmems) {
          dispatch({ type: 'successStmems', data: stmems })
        }
      } catch (e) {

        dispatch({ type: 'failure', error: e.error })
      }
    }
    if (slides[1] === true && !state.pets.length) {
      dispatch({ type: 'start' })

      getPets()
    }
    if (slides[2] === true) {
      dispatch({ type: 'start' })
      getSt()
    }

  }, [slides, auth.token, sendRequest, dispatch, state.pets.length, appointment.appointmentType, state.stmems.length])






  // *************** slider movement related **************

  // for the datepicker
  const [date, setDate] = useState(new Date());

  const position = useRef([0, 0]);




  useEffect(() => {
    const newDate = date
    newDate.setMinutes('00')
    newDate.setSeconds('00')
    newDate.setHours('00')

    setAppointment((oldAppointment) => {
      return { ...oldAppointment, date: newDate }
    })
  }, [date])


  const moveSlider = (event) => {

    if (event.target.id === 'next') {
      if (position.current[1] + 1 !== slides.length) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1



        setSlides(() => {
          return slides.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
        })

      }

    } else {

      if (position.current[1] - 1 >= 0) {

        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1



        // same as right movement idea
        setSlides(() => {
          return slides.map((value, index) => {
            return (index === position.current[0] || index === position.current[1]) ? !value : value
          })
        })

        //If index is out of range similar idea to the right movement
      }
    }
  }


  //generic slide state detector

  const selectOption = (event) => {

    let x = ""
    switch (event.target.nodeName) {
      case 'IMG':
        x = event.target.parentNode.children[1].innerHTML
        break
      case 'P':
        x = event.target.innerHTML
        break
      default:
        x = event.target.children[1].innerHTML
        break

    }

    if (slides[0]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, appointmentType: x }
      })
    }
    if (slides[1]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, petName: x }
      })
    }
    if (slides[2]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, staffMem: x }
      })

    }
  }

  const changeDate = (event) => {
    const hour = event.target.innerHTML.substring(0, 2)
    const newDate = date
    newDate.setHours(hour)
    newDate.setMinutes('00')
    newDate.setSeconds('00')

    setAppointment((oldAppointment) => {
      return { ...oldAppointment, date: newDate }
    })

  }

  return (
    <>
      {/* first slide */}
      <AnimatePresence >
        {slides[0] &&
          <motion.div
            variants={sliderMotion}
            initial='initial'
            animate='final'
            exit='exit' className="make-appointment-slider flex-col falign-center gap-24p">
            <h1>What appointment do you want to make for your pet?</h1>
            <div className="appointment-types flex-row gap-24p fjust-center">
              <div className={appointment.appointmentType === 'Examination' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)} >
                <img src="/media/imgs/pet-examination.png" alt="" />
                <p className='type'>Examination</p>
              </div>
              <div className={appointment.appointmentType === 'Training' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-training.png" alt="" />
                <p className='type'>Training</p>
              </div>
              <div className={appointment.appointmentType === 'Grooming' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-grooming.png" alt="" />
                <p className='type'>Grooming</p>
              </div>
              <div className={appointment.appointmentType === 'Adoption' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-adoption.png" alt="" />
                <p className='type'>Adoption</p>
              </div>
            </div>
            <button
              id="next" className={appointment.appointmentType === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
              onClick={(event) => moveSlider(event)}
              disabled={appointment.appointmentType === '' ? true : false}>Next
            </button>

          </motion.div>

        }
      </AnimatePresence>
      {/* second slide */}
      <AnimatePresence >
        {
          slides[1] &&
          <motion.div
            variants={sliderMotion}
            initial="initial"
            animate="final"
            exit='exit' className="make-appointment-slider flex-col falign-center gap-24p">
            <h1>Select Your Pet:</h1>
            <div className="appointment-types flex-row fjust-center gap-24p">
              {state && state.pets.length && state.pets.map((pet, index) => {
                return (
                  <div key={index} className={appointment.petName === pet.name ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center"}
                    onClick={(event) => selectOption(event)}>
                    <img src={pet.photo ? URL.createObjectURL(new Blob([new Uint8Array(pet.photo.data)])) : '/media/imgs/cat.png'} alt="cat" />
                    <p>{pet.name}</p>
                  </div>
                )
              })}





            </div>

            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>


              <button
                id="next" className={appointment.petName === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
                onClick={(event) => moveSlider(event)}
                disabled={appointment.petName === '' ? true : false}>Next
              </button>



            </div>
          </motion.div>

        }
      </AnimatePresence>
      {/* third slide */}

      <AnimatePresence >
        {
          slides[2] &&
          <motion.div
            variants={sliderMotion}
            initial="initial"
            animate="final"
            exit='exit' className="make-appointment-slider flex-col falign-center gap-24p">
            <h1>Select staff:</h1>
            <div className="appointment-types flex-row fjust-center gap-24p">

              {state && state.stmems.length !==0 && state.stmems.map((stmem, index) => {
                return (
                  <div key={index} className={appointment.staffMem === (stmem.first_name + ' ' + stmem.last_name) ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center"}
                    onClick={(event) => selectOption(event)}>
                    <img src={stmem.photo ? URL.createObjectURL(new Blob([new Uint8Array(stmem.photo.data)])) : '/media/imgs/staff.png'} alt="cat" />
                    <p>{stmem.first_name + ' ' + stmem.last_name }</p>
                  </div>
                )})
              }
              

              {/* /media/imgs/staff.png */ }


            </div>

            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>

              <button
                id="next" className={appointment.staffMem === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
                onClick={(event) => moveSlider(event)}
                disabled={appointment.staffMem === '' ? true : false}>Next
              </button>

            </div>
          </motion.div>

        }
      </AnimatePresence>
      {/* fourth slide */}
      <AnimatePresence >
        {
          slides[3] &&
          <>
            <motion.div
              variants={sliderMotion}
              initial="initial"
              animate="final"
              exit='exit' className="make-appointment-slider flex-col falign-center gap-24p">
              <h1>Select Date:</h1>
              <div className="appointment-types flex-row fjust-center gap-24p ">
                <div className="date-picker-input">
                  <img src="/media/imgs/calendar.png" alt="calendar" />
                  <Datepicker date={[date, setDate]} appointment={[appointment, setAppointment]} />
                </div>
              </div>

              <div className="appointment-types flex-row fjust-center gap-16p date-container">
                <p className="time not-available">09:00 AM</p>
                <p className={appointment.date.getHours() === 10 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >10:00 AM</p>
                <p className={appointment.date.getHours() === 11 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >11:00 AM</p>
                <p className={appointment.date.getHours() === 12 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >12:00 PM</p>
                <p className={appointment.date.getHours() === 13 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >13:00 PM</p>
                <p className="time not-available">14:00 PM</p>
                <p className="time not-available">15:00 PM</p>
                <p className={appointment.date.getHours() === 16 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >16:00 PM</p>
                <p className={appointment.date.getHours() === 17 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >17:00 PM</p>
                <p className={appointment.date.getHours() === 18 ? "time active" : "time"}
                  onClick={(e) => changeDate(e)}
                >18:00 PM</p>
              </div>

              <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
                <button id="back" className="btn-rec-purple next"
                  onClick={(event) => moveSlider(event)}>Back</button>
                <button id="next"
                  className={appointment.date.getHours() === 0 ? "btn-rec-purple next confirm disabled" : "btn-rec-purple next confirm"}
                  disabled={appointment.date.getHours() === 0 ? true : false}
                  onClick={(event) => moveSlider(event)}>Confirm</button>
              </div>
            </motion.div>

          </>

        }
      </AnimatePresence>


    </>
  )
}

export default MakeAppointmentSlider