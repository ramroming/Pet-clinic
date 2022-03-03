import React, { useState, useRef, useEffect, useContext } from "react"
import Datepicker from "../../../utils/datepicker/Datepicker";

//Import Animation object from sliderAnimation.js
import { appointmentSlider } from "../makeAppointment/makeAppointmentAnimation"

//Import motion for defining entering motion, and AnimatePresence to define exit animation
import { AnimatePresence, motion } from "framer-motion"
import useFetch from "../../../shared/hooks/fetch-hook";

import { authContext } from "../../../shared/context/auth-context";
import useMakeAppointment from "../../../shared/hooks/make-appointment-hook";
import dateFormat from "dateformat";
import Modal from "../../../utils/modal/Modal";
import { Link } from 'react-router-dom'

// Assign the imported object to local object sliderMotion
const sliderMotion = appointmentSlider


const initialData = {
  isLoading: false,
  pets: [],
  stmems: [],
  timesArr: null,
  responseError: '',
  createResponse: '',
  checkModal: false,
  finalConfirm: false,

}
const MakeAppointmentSlider = () => {

  const auth = useContext(authContext)
  // using the fetch hook
  const sendRequest = useFetch()

  const [slides, setSlides] = useState([true, false, false, false])
  const position = useRef([0, 0]);
  

  // usign the appointment hook
  const [state, dispatch] = useMakeAppointment(initialData)
  const [appointment, setAppointment] = useState({
    appointment_type: '',
    stmem_id: '',
    pet_id: '',
    // date: new Date("October 01, 1991 00:00:00"),
    hour: '',
    date: dateFormat(new Date(), 'isoDate'),
    stmemName: '',
    petName: ''
  })
  

  useEffect(() => {

    const getTimes = async () => {
      try {
        const result = await sendRequest(`http://localhost:5000/appointment/appointmentstimes?stmem_id=${appointment.stmem_id}&date=${appointment.date}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`,

        })
        if (result)
          dispatch({ type: 'successTimes', data: result })
      } catch (e) {
        dispatch({ type: 'failure', error: e.message })
      }
    }

    if (slides[3] === true) {
      dispatch({ type: 'start' })
      getTimes()
    }
    // const newDate = dateFormat(date, 'isoDate')
    //   setAppointment((oldAppointment) => {
    //     return { ...oldAppointment, date: newDate }
    //   })


  }, [appointment.date, appointment.stmem_id, auth.token, dispatch, sendRequest, slides])

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

        dispatch({ type: 'failure', error: e.message })
      }
    }
    const getSt = async () => {
      try {
        const stmems = await sendRequest(`http://localhost:5000/appointment/staffmems?appointment_type=${appointment.appointment_type}`, 'GET', null,
          {
            'Authorization': `Bearer ${auth.token}`
          }
        )
        if (stmems) {
          dispatch({ type: 'successStmems', data: stmems })
        }
      } catch (e) {

        dispatch({ type: 'failure', error: e.message })
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


  }, [slides, auth.token, sendRequest, dispatch, state.pets.length, appointment.appointment_type])


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

    let x, y = ""
    switch (event.target.nodeName) {
      case 'IMG':
        x = event.target.parentNode.id
        y = event.target.parentNode.getAttribute('refid')
        break
      case 'P':
        x = event.target.parentNode.id
        y = event.target.parentNode.getAttribute('refid')

        break
      default:
        x = event.target.id
        y = event.target.getAttribute('refid')

        break

    }

    if (slides[0]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, appointment_type: x }
      })
    }
    if (slides[1]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, pet_id: x, petName: state.pets[y].name }
      })
    }
    if (slides[2]) {
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, stmem_id: x, stmemName: state.stmems[y].first_name + ' ' + state.stmems[y].last_name }
      })

    }
  }

  const changeDate = (event) => {
    const selectedHour = parseInt(event.target.innerHTML.substring(0, 2)).toString()

    setAppointment((oldAppointment) => {
      return { ...oldAppointment, hour: selectedHour }
    })

  }

  useEffect(() => {

    if (state.finalConfirm && !state.isLoading) {
      const createAppointment = async () => {

        dispatch({ type: 'start' })
        const dataToSend = {
          appointment_type: appointment.appointment_type,
          stmem_id: appointment.stmem_id,
          pet_id: appointment.pet_id,
          // date: new Date("October 01, 1991 00:00:00"),
          hour: appointment.hour,
          date: appointment.date,

        }
        try {
          const result = await sendRequest('http://localhost:5000/users/appointment', 'POST', JSON.stringify(dataToSend), {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          })
          if (result)
            dispatch({ type: 'successCreate', data: result.response })
        } catch (e) {
          dispatch({ type: 'failureCreate', error: e.message })
        }

      }
      createAppointment()
    }

  }, [state.finalConfirm, state.isLoading, dispatch, auth.token, appointment.stmem_id, appointment.appointment_type, appointment.date, appointment.hour, appointment.pet_id, sendRequest])
  // creating appointment



  return (
    <>
      {/* UI modals */}
      {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
        />}
      {state.checkModal &&
        <Modal
          modalClass='check'
          header='Check your appointment data!'
          body={
            <>
              <p>Appointment: <span>{' ' + appointment.appointment_type}</span> </p>
              <p>For your pet: <span>{' ' + appointment.petName}</span></p>
              <p>staff: <span>{' ' + appointment.stmemName}</span></p>
              <p>Date:  <span>{' ' + appointment.date}</span></p>
              <p>At:  <span>{' ' + appointment.hour < 10 ? '0' + appointment.hour + ':00' : appointment.hour + ':00'}</span></p>
            </>
          }
          dispatch={dispatch}
        />}
      {state.createResponse &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.createResponse}
          dispatch={dispatch}
          refresh={true}
        />}
      {/* first slide */}
      <AnimatePresence >
        {slides[0] &&
          <motion.div
            variants={sliderMotion}
            initial='initial'
            animate='final'
            exit='exit' className="make-appointment-slider flex-col falign-center gap-24p">
            <h1>What appointment do you want to make for your pet?</h1>
            <div className="appointment-types flex-row gap-32p fjust-center">
              <div id="Examination" className={appointment.appointment_type === 'Examination' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)} >
                <img src="/media/imgs/pet-examination.png" alt="" />
                <p className='type'>Examination</p>
              </div>
              <div id="Training" className={appointment.appointment_type === 'Training' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-training.png" alt="" />
                <p className='type'>Training</p>
              </div>
              <div id="Grooming" className={appointment.appointment_type === 'Grooming' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-grooming.png" alt="" />
                <p className='type'>Grooming</p>
              </div>
              <div id="Adoption" className={appointment.appointment_type === 'Adoption' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"}
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-adoption.png" alt="" />
                <p className='type'>Adoption</p>
              </div>
            </div>
            <button
              id="next" className={appointment.appointment_type === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
              onClick={(event) => moveSlider(event)}
              disabled={appointment.appointment_type === '' ? true : false}>Next
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
              {state && state.pets.length !== 0 && state.pets.map((pet, index) => {
                return (
                  <div id={pet.id} key={index} refid={index} className={appointment.pet_id === pet.id.toString() ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center"}
                    onClick={(event) => selectOption(event)}>
                    <img src={pet.photo ? URL.createObjectURL(new Blob([new Uint8Array(pet.photo.data)])) : '/media/imgs/cat.png'} alt="cat" />
                    <p>{pet.name}</p>
                  </div>
                )
              })}
              {state && state.pets.length === 0 &&
                <div className="flex-col falign-center gap-24p" style={{width: '70%'}}>
                  <p style={{ color: 'white' }}>Looks like you have no registered pets, you can register your pet from here</p>
                  <Link
                  to={`/registerpet`}
                  // state={{ from: '/registerpet'}}
                  className="btn-r btn-r-blue"
                  style={{width: '9rem', padding: '.5rem'}}>
                    Register pet
                  </Link>
                </div>
              }







            </div>

            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>


              <button
                id="next" className={appointment.pet_id === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
                onClick={(event) => moveSlider(event)}
                disabled={appointment.pet_id === '' ? true : false}>Next
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

              {state && state.stmems.length !== 0 && state.stmems.map((stmem, index) => {
                return (
                  <div id={stmem.id} refid={index} key={index} className={appointment.stmem_id === (stmem.id.toString()) ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center"}
                    onClick={(event) => selectOption(event)}>
                    <img src={stmem.photo ? URL.createObjectURL(new Blob([new Uint8Array(stmem.photo.data)])) : '/media/imgs/staff.png'} alt="cat" />
                    <p>{stmem.first_name + ' ' + stmem.last_name}</p>
                  </div>
                )
              })
              }





            </div>

            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>

              <button
                id="next" className={appointment.stmem_id === '' ? "btn-rec-purple next disabled" : "btn-rec-purple next"}
                onClick={(event) => moveSlider(event)}
                disabled={appointment.stmem_id === '' ? true : false}>Next
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
                  <Datepicker appointment={[appointment, setAppointment]} />
                </div>
              </div>

              <div className="appointment-types flex-row fjust-center gap-16p date-container">
                {state.timesArr && state.timesArr.availableTimes.length !== 0 && state.timesArr.CLINIC_WORKING_HOURS.map((time, index) => {
                  return (
                    <React.Fragment key={index}>
                      {state.timesArr.availableTimes.includes(time) ?
                        <p className={appointment.hour === time.toString() ? "time active" : "time"}
                          onClick={(e) => changeDate(e)}
                        >{`${time >= 10 ? time : '0' + time}:00 ${time > 11 ? 'PM' : 'AM'}`}</p>
                        :
                        <p className="time not-available">{`${time >= 10 ? time : '0' + time}:00 ${time > 11 ? 'PM' : 'AM'}`}</p>}
                    </React.Fragment>
                  )
                })}
                {state.timesArr && state.timesArr.availableTimes.length === 0 &&
                  <p style={{ color: 'white' }}>No Available appointments on the day specified</p>
                }

              </div>
              {/* {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>} */}
              {/* modalClass, header, body, modalButtonClass, modalType */}


              <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
                <button id="back" className="btn-rec-purple next"
                  onClick={(event) => moveSlider(event)}>Back</button>
                <button id="next"
                  className={appointment.hour === '' ? "btn-rec-purple next confirm disabled" : "btn-rec-purple next confirm"}
                  disabled={appointment.hour === '' ? true : false}
                  onClick={() => dispatch({ type: 'checkModalEnter' })}>Confirm</button>
              </div>


            </motion.div>

          </>

        }
      </AnimatePresence>


    </>
  )
}

export default MakeAppointmentSlider