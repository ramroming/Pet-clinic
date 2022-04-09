import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useContext, useEffect } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"
import EditAppointmentStatus from "./EditAppointmentStatus"
import useAppointmentManagement from '../../../shared/hooks/appointmentmanagement-hook';
import useFetch from '../../../shared/hooks/fetch-hook';
import { pageLoadingContext } from '../../../shared/context/loading-context';
import { authContext } from '../../../shared/context/auth-context';
import Modal from '../../../utils/modal/Modal';
import dateFormat from 'dateformat';


const today = new Date()
const minDate = dateFormat(today, 'isoDate')

const initialData = {
  isFetchingAppointments: true,
  appointments: null,
  fetchAppointmentFailure: '',
  amount: 'today',

  isConfirming: false,
  confirmResult: '',
  confirmFailure: '',
  selectedAppointment: null,
  openConfirmModal: false,

  isDeleting: false,
  deleteResult: '',
  deleteFailure: '',
  selectedAppointmentDelete: null,
  openDeleteModal: false,

  createAppointmentTab: false,

  isGettingAppointmentTypes: false,
  appointmentTypes: [],
  gettingAppointmentTypesFailure: '',

  pets: [],
  gettingPetsFailure: '',
  isGettingPets: false,

  stmems: [],
  gettingStmemsFailure: '',
  isGettingStmems: false,

  hours: [],
  gettingHoursFailure: '',
  isGettingHours: false,

  // appointment data
  user_name: '',
  appointment_type: '',
  pet_id: '',
  stmem_id: '',
  date: '',
  hour: '',
  missingInput: false,

  isCreatingAppointment: false,
  creatingAppointmentResult: '',
  isCreatingAppointmentFailure: '',


}

const AppointmentManagement = () => {

  const [state, dispatch] = useAppointmentManagement(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  useEffect(() => {
    let isMount = true
    const fetchAppointments = async () => {
      try {
        const appointments = await sendRequest(`http://localhost:5000/receptionist/appointments?amount=${state.amount}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (appointments && isMount)
          dispatch({ type: 'successFetchAppointment', data: appointments })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    fetchAppointments()

    return () => {
      isMount = false
      setPageIsLoading(false)
    }
  }, [auth.token, dispatch, state.amount, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const confirmAppointment = async () => {
      try {
        const data = await sendRequest(`http://localhost:5000/receptionist/appointments/${state.selectedAppointment}`, 'PATCH', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (data && isMount)
          dispatch({ type: 'successConfirm', data: data.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'confirmFailure', error: e.message })
      }
    }
    if (state.isConfirming)
      confirmAppointment()

    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isConfirming, state.selectedAppointment])

  useEffect(() => {
    let isMount = true
    const deleteAppointment = async () => {
      try {
        const data = await sendRequest(`http://localhost:5000/receptionist/appointments/${state.selectedAppointmentDelete}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (data && isMount)
          dispatch({ type: 'successDelete', data: data.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureDelete', error: e.message })
      }
    }
    if (state.isDeleting)
      deleteAppointment()


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isDeleting, state.selectedAppointmentDelete])
  useEffect(() => {
    let isMount = true
    const getAppointmentTypes = async () => {
      try {
        const appointmentTypes = await sendRequest(`http://localhost:5000/appointment/appointmenttypes`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (appointmentTypes && isMount)
          dispatch({ type: 'successGetAppointmentTypes', data: appointmentTypes })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureGetAppointmentTypes', error: e.message })
      }
    }
    if (state.isGettingAppointmentTypes)
      getAppointmentTypes()


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isGettingAppointmentTypes])

  useEffect(() => {
    let isMount = true
    const getPets = async () => {
      try {
        const pets = await sendRequest(`http://localhost:5000/receptionist/pets?username=${state.user_name}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (pets && isMount)
          dispatch({ type: 'successGetPets', data: pets })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureGetPets', error: e.message })
      }
    }
    if (state.isGettingPets)
      getPets()


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isGettingPets, state.user_name])

  useEffect(() => {
    let isMount = true
    const getStmems = async () => {
      try {
        const stmems = await sendRequest(`http://localhost:5000/appointment/staffmems?appointment_type=${state.appointment_type}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (stmems && isMount)
          dispatch({ type: 'successGetStmems', data: stmems })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureGetStmems', error: e.message })
      }
    }
    if (state.isGettingStmems) {
      getStmems()
    }


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isGettingStmems, state.appointment_type])

  useEffect(() => {
    let isMount = true
    const getHours = async () => {
      try {
        const times = await sendRequest(`http://localhost:5000/appointment/appointmentstimes?stmem_id=${state.stmem_id}&date=${state.date}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (times && isMount)
          dispatch({ type: 'successGetHours', data: times.availableTimes })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureGetHours', error: e.message })
      }
    }
    if (state.isGettingHours) {
      getHours()
    }


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isGettingHours, state.stmem_id, state.date])

  useEffect(() => {
    let isMount = true
    const createAppointment = async () => {
      try {
        const result = await sendRequest(`http://localhost:5000/receptionist/appointments`, 'POST', JSON.stringify({
          appointment_type: state.appointment_type,
          stmem_id: state.stmem_id,
          pet_id: state.pet_id,
          user_name: state.user_name,
          date: state.date,
          hour: state.hour
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'

        })
        if (result && isMount)
          dispatch({ type: 'successCreateAppointment', data: result.response })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureCreateAppointment', error: e.message })
      }
    }
    if (state.isCreatingAppointment) {
      createAppointment()
    }


    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, state.isCreatingAppointment, state.stmem_id, state.date, state.appointment_type, state.hour, state.pet_id, state.user_name])


  useEffect(() => {
    setPageIsLoading(state.isFetchingAppointments || state.isGettingAppointmentTypes || state.isConfirming || state.isDeleting || state.isCreatingAppointment)
  }, [setPageIsLoading, state.isFetchingAppointments, state.isGettingAppointmentTypes, state.isCreatingAppointment, state.isConfirming, state.isDeleting])

  useEffect(() => {
    if (state.confirmResult || state.deleteResult)
      window.location.reload()
  }, [state.confirmResult, state.deleteResult])

  const closeModal = () => {
    dispatch({ type: 'closeDeleteModal' })
  }
  const submitForm = async (event) => {
    event.preventDefault()
    dispatch({ type: 'validate' })
  }

  return (
    <>
      {(state.fetchAppointmentFailure || state.confirmFailure || state.deleteFailure || state.gettingAppointmentTypesFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.fetchAppointmentFailure || state.confirmFailure || state.deleteFailure || state.gettingAppointmentTypesFailure}
          dispatch={dispatch}

        />}
        {state.creatingAppointmentResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.creatingAppointmentResult}
          dispatch={dispatch}
          refresh={true}
        />}
      <h4>Appointment Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {state.openDeleteModal && <DeletePostModal closeModal={closeModal} dispatch={dispatch} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
          {state.openConfirmModal && <EditAppointmentStatus dispatch={dispatch} />}
        </div>
        <button
          onClick={(e) => {
            if (state.amount === 'today')
              return
            dispatch({ type: 'changeTab', data: e.currentTarget.innerText.toLowerCase() })
          }}
          className={state.amount === 'today' ? 'query-button selected' : 'query-button'}>Today</button>
        <button
          onClick={(e) => {
            if (state.amount === 'all')
              return
            dispatch({ type: 'changeTab', data: e.currentTarget.innerText.toLowerCase() })
          }}
          className={state.amount === 'all' ? 'query-button selected' : 'query-button'}>All</button>
        <button
          onClick={() => {
            if (state.createAppointmentTab === true)
              return
            dispatch({ type: 'createAppointmentEnter' })
          }}
          className={state.createAppointmentTab === true ? 'query-button selected' : 'query-button'}>New Appointment +</button>
        {state.amount ?
          <Table className="my-table with-query">
            <Thead>
              <Tr>
                <Th>
                  ID
                </Th>
                <Th>
                  Date and Time
                </Th>
                <Th>
                  StMem
                </Th>
                <Th>
                  Ap-Type
                </Th>
                <Th>
                  Pet Name
                </Th>
                <Th>
                  Owner Name
                </Th>
                <Th>
                  Status
                </Th>
                <Th>
                  Delete
                </Th>

              </Tr>
            </Thead>
            <Tbody>
              {state.appointments && state.appointments.map((appointment, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      {appointment.id}
                    </Td>
                    <Td style={appointment.status === 0 ? { color: 'darkred' } : { color: 'darkgreen' }}>
                      {dateFormat(appointment.date, 'default')}
                    </Td>
                    <Td>
                      {`${appointment.stmem_first_name} ${appointment.stmem_last_name}`}
                    </Td>
                    <Td>
                      {appointment.appointment_type}
                    </Td>
                    <Td>
                      {appointment.pet_name}
                    </Td>
                    <Td>
                      {`${appointment.owner_first_name} ${appointment.owner_last_name}`}
                    </Td>
                    {appointment.confirmed
                      ?
                      <Td style={{ color: 'green' }}>Confirmed</Td>
                      :
                      <Td>
                        {state.amount === 'all' || appointment.status === 0
                          ?
                          <p style={{ color: 'darkmagenta' }}>Unconfirmed</p>
                          :
                          <button
                            appid={appointment.id}
                            className="my-great-button margin-bottom"
                            onClick={(e) => {
                              window.scrollTo(0, 0)
                              if (state.isConfirming)
                                return
                              dispatch({ type: 'selectConfirmAppointment', id: e.currentTarget.getAttribute('appid') })
                            }}>Click to confirm <i className="fa-regular fa-pen-to-square"></i></button>
                        }

                      </Td>
                    }
                    <Td>
                      {appointment.confirmed === 0 && appointment.status === 1 ?
                        <button
                          appdid={appointment.id}
                          className="my-great-button margin-bottom"
                          onClick={(e) => { dispatch({ type: 'selectDeleteAppointment', id: e.currentTarget.getAttribute('appdid') }) }}
                        ><i className="fa-regular fa-trash-can"></i></button>
                        :
                        '-/-'
                      }
                    </Td>



                  </Tr>
                )
              })}





            </Tbody>



          </Table>
          :
          <div className="rec-make-appointment">
            <form className="form-container flex-col gap-16p falign-center" action="/" method="POST"
              onSubmit={(e) => submitForm(e)}>
              <a className="logo-link" href="/#">
                <img src="/media/imgs/favicon.png" alt="" className="logo" />
              </a>

              <div className="input-wrapper flex-row fjust-between">
                <label className="half-label" htmlFor="user_name">username:*
                </label>
                <input type="text" name="user_name" id="user_name"
                  onBlur={() => {
                    if (!state.user_name)
                      return
                    dispatch({ type: 'startGettingPets' })
                  }}
                  onChange={(e) => { dispatch({ type: 'enterValue', field: 'user_name', value: e.currentTarget.value }) }} />
              </div>
              {state.gettingPetsFailure && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.gettingPetsFailure}</p>}
              <div className="input-wrapper flex-row">
                <label className="half-label" htmlFor="pet">pet selection:*
                </label>
                <select

                  disabled={state.gettingPetsFailure || state.isGettingPets || !state.user_name}
                  onChange={(e) => dispatch({ type: 'enterValue', field: 'pet_id', value: e.currentTarget.value })}
                  name="pet_id"
                  id="pet_id">
                  <option value="">Select pet</option>
                  {state.pets && state.pets.map((pet, index) => {
                    return <option key={index} value={pet.id}>{pet.name}</option>
                  })}
                </select>
              </div>
              <div className="input-wrapper flex-row">
                <label className="half-label" htmlFor="appointment_type">appointment type:*
                </label>
                <select
                  disabled={state.isGettingPets}

                  onChange={(e) => {
                    dispatch({ type: 'enterValue', field: 'appointment_type', value: e.currentTarget.value })
                    if (!e.currentTarget.value)
                      return
                    dispatch({ type: 'startGettingStmems' })
                  }}
                  name="appointment_type"
                  id="appointment_type">
                  <option value="">Select appointment type</option>
                  {state.appointmentTypes && state.appointmentTypes.map((appointmentType, index) => {
                    return <option key={index} value={appointmentType.name}>{appointmentType.name}</option>
                  })}
                </select>
              </div>
              {state.gettingAppointmentTypesFailure && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.gettingAppointmentTypesFailure}</p>}
              

              <div className="input-wrapper flex-row">
                <label className="half-label" htmlFor="stmem_id">stmem selection:*
                </label>
                <select

                  disabled={state.gettingStmemsFailure || state.isGettingStmems || !state.appointment_type }
                  onChange={(e) => {
                    
                    dispatch({ type: 'enterValue', field: 'stmem_id', value: e.currentTarget.value })
                  }}
                  name="stmem_id"
                  id="stmem_id">
                  <option value="">Select Stmem</option>
                  {state.stmems && state.stmems.map((stmem, index) => {
                    return <option key={index} value={stmem.id}>{`${stmem.first_name} ${stmem.last_name}`}</option>
                  })}
                </select>
              </div>
              {state.gettingStmemsFailure && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.gettingStmemsFailure}</p>}
              <div className="input-wrapper flex-row">
                <label className="half-label" htmlFor="date">Appointment Date:*
                </label>
                <input
                  disabled={state.gettingStmemsFailure || state.isGettingStmems || !state.stmem_id}
                  onChange={(e) => { 
                    dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'date' }) 
                    dispatch({ type: 'startGettingHours' })
                  }}
                  type="date"
                  name="date"
                  id="date"
                  value={state.date}
                  min={minDate}
                   />
              </div>
              <div className="input-wrapper flex-row">
                <label className="half-label" htmlFor="stmem_id">Hour selection:*
                </label>
                <select

                  disabled={state.gettingHoursFailure || state.isGettingHours ||!state.stmem_id}
                  onChange={(e) => dispatch({ type: 'enterValue', field: 'hour', value: e.currentTarget.value })}
                  name="hour"
                  id="hour">
                  <option value="">Select Hour</option>
                  {state.hours && state.hours.map((hour, index) => {
                    return <option key={index} value={hour}>{parseInt(hour) + 3}</option>
                  })}
                </select>
              </div>
              {state.gettingHoursFailure && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.gettingHoursFailure}</p>}

              {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
              {state.isCreatingAppointmentFailure && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.isCreatingAppointmentFailure}</p>}
              

              <div className="button-wrapper flex-row gap-8p fjust-center">


                <button 
                onClick={() => {
                  if (state.isCreatingAppointment)
                    return
                  dispatch({ type: 'validate' })
                }}
                type="submit" className={state.isLoading ? "btn-r btn-r-dark disabled" : "btn-r btn-r-dark"} disabled={state.isLoading}>
                  create appointment
                </button>

              </div>
            </form>
          </div>
        }


      </div>
    </>

  )
}

export default AppointmentManagement