import ViewAppointmentSlider from "./appointmentSlider/ViewAppointmentSlider";
import MakeAppointmentSlider from './makeAppointment/MakeAppointmentSlider';
import useViewAppointment from "../../shared/hooks/view-appointment-hook";
import useFetch from "../../shared/hooks/fetch-hook";
import { authContext } from "../../shared/context/auth-context";
import Modal from "../../utils/modal/Modal";
import { useContext, useEffect } from 'react'
import { pageLoadingContext } from "../../shared/context/loading-context";

// import {
//   useWhatChanged,
//   setUseWhatChange,
// } from '@simbathesailor/use-what-changed';

const initialData = {
  isLoading: false,
  checkModal: false,
  finalConfirm: false,
  responseError: '',
  deleteResponse: '',
  activeAppointments: [],
  pastAppointments: [],
  appointmentToDelete: null,
  deleteLoading: false
}

const Appointment = () => {
  const [state, dispatch] = useViewAppointment(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  // useWhatChanged([state.isLoading, auth.token, dispatch, sendRequest])
  useEffect(() => {
    let isMount = true
    const getAppointments = async () => {
      if(isMount)
        dispatch({ type: 'start' })
      try {
        const appointments = await sendRequest('http://localhost:5000/users/me/appointments',
          'GET',
          null,
          {
            'Authorization': `Bearer ${auth.token}`
          })
        if (appointments){

          const activeAppointments = []
          const pastAppointments = []
          appointments.forEach(appointment => {
            if(appointment.status === 1)
              activeAppointments.push(appointment)
            else {
              pastAppointments.push(appointment)
            } 
          });
          if(isMount)
            dispatch({ type: 'success', active: activeAppointments, past: pastAppointments})
        }
      } catch (e) {
        if(isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
      getAppointments()

    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest])

  useEffect(() => {
    let isMount = true
    const deleteAppointment = async () => {
      if (isMount)
        dispatch({ type: 'startDeleting' })
      try {
        const result = await sendRequest(`http://localhost:5000/users/me/appointments/${state.appointmentToDelete}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (result && isMount)
          dispatch({ type: 'successDelete', data: result })
  
      }
      catch (e) {
        if (isMount)
          dispatch({ type: 'failureDelete', error: e.message })
      }
    }
    if (state.finalConfirm)
      deleteAppointment()

    return () => {
      isMount = false
    }
  }, [state.finalConfirm, auth.token, sendRequest, dispatch, state.appointmentToDelete])
  useEffect(() => {
    setPageIsLoading(state.deleteLoading)
  }, [setPageIsLoading, state.deleteLoading])

  return (
    <>
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
          header=''
          body={
            <>
              <p>Are you sure you want to cancel the appointment ?</p>
            </>
          }
          dispatch={dispatch}
        />}
        {state.deleteResponse && <Modal
          modalClass='success'
          header='Success!!'
          body={state.deleteResponse}
          dispatch={dispatch}
          refresh={true}
        />}
      <div className="home-container flex-col  gap-24p">
        <div className="make-appointment-wrapper">
          <MakeAppointmentSlider />
        </div>
        <div className="view-appointment-wrapper flex-row falign-center fjust-start gap-36p">

          <div className="view-appointment-wrapper ref">
            <ViewAppointmentSlider  status={1} isLoading={state.isLoading} appointments={state.activeAppointments} dispatch={dispatch}/>
          </div>

          <div className="view-appointment-wrapper ref">
            <ViewAppointmentSlider status={0} isLoading={state.isLoading} appointments={state.pastAppointments} dispatch={dispatch} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Appointment;