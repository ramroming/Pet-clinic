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

}

const AppointmentManagement = () => {

  const [state, dispatch] = useAppointmentManagement(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  const closeModal = () => {
    dispatch({ type: 'closeDeleteModal' })
  }

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
    setPageIsLoading(state.isFetchingAppointments)
  }, [setPageIsLoading, state.isFetchingAppointments])

  useEffect(() => {
    if (state.confirmResult || state.deleteResult)
      window.location.reload()
  }, [state.confirmResult, state.deleteResult])

  return (
    <>
      {(state.fetchAppointmentFailure || state.confirmFailure || state.deleteFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.fetchAppointmentFailure || state.confirmFailure || state.deleteFailure}
          dispatch={dispatch}

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
          onClick={() => {
            if (state.amount === 'today')
              return
            dispatch({ type: 'changeTab' })
          }}
          className={state.amount === 'today' ? 'query-button selected' : 'query-button'}>Today</button>
        <button
          onClick={() => {
            if (state.amount === 'all')
              return
            dispatch({ type: 'changeTab' })
          }}
          className={state.amount === 'all' ? 'query-button selected' : 'query-button'}>All</button>
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
                  <Td style={appointment.status === 0 ? {color: 'darkred'} : {color: 'darkgreen'}}>
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

      </div>
    </>

  )
}

export default AppointmentManagement