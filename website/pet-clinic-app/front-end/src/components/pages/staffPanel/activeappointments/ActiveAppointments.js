import useActiveAppointments from "../../../shared/hooks/activeappointments-hook"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from "../../../utils/modal/Modal";
import dateFormat from "dateformat"
import { authContext } from "../../../shared/context/auth-context";
import { useEffect, useContext } from 'react'
import { pageLoadingContext } from "../../../shared/context/loading-context";
import useFetch from "../../../shared/hooks/fetch-hook";
import { Link } from "react-router-dom";

const initialData = {
  isGettingAppointments: true,
  gettingAppointmentsFailure: '',
  appointments: []
}
const ActiveAppointments = () => {
  const [state, dispatch] = useActiveAppointments(initialData)
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()

  useEffect(() => {
    let isMount = true
    const getAppointments = async () => {
      try {
        const appointments = await sendRequest('http://localhost:5000/vet/appointments', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && appointments)
          dispatch({ type: 'getAppointmentsSuccess', data: appointments })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getAppointmentsFailure', error: e.message })
      }
    }
    getAppointments()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isGettingAppointments)
  }, [setPageIsLoading, state.isGettingAppointments])

  return (

    <>
      {(state.gettingAppointmentsFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.gettingAppointmentsFailure}
          dispatch={dispatch}
        />}

      <h4>Active Appointments</h4>
      <div>
        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>  
                Time
              </Th>
              <Th>
                confirmed
              </Th>

              <Th>
                First name
              </Th>
              <Th>
                Last name
              </Th>
              <Th>
                Phone number
              </Th>

              <Th>
                Pet name
              </Th>
              <Th>
                Type
              </Th>
              <Th>
                Breed
              </Th>
              <Th>

              </Th>

            </Tr>
          </Thead>
          <Tbody>

            {/* first user */}

            {state.appointments.map((appointment, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {<p style={{ color: appointment.status === 1 ? 'darkgreen' : 'darkred' }}>{dateFormat(appointment.date, "h:MM TT")}</p>}
                  </Td>
                  <Td>
                    <p style={{ color: appointment.confirmed ? 'darkgreen' : 'darkmagenta' }}>{appointment.confirmed === 1 ? 'Yes' : 'No'}</p>
                  </Td>

                  <Td>
                    {appointment.first_name}
                  </Td>
                  <Td>
                    {appointment.last_name}
                  </Td>
                  <Td>
                    {appointment.phone_number}
                  </Td>
                  <Td>
                    {appointment.pet_name}
                  </Td>
                  <Td>
                    {appointment.pet_type}
                  </Td>
                  <Td>
                    {appointment.breed_name}
                  </Td>
                  {auth.userRole !== 'groomer' &&
                    <Td>
                      {appointment.confirmed ? <Link
                        to={`/staffpanel/${appointment.appointment_type_id === 1 ? 'pettreatmenthistory': 'pettraininghistory'}`}
                        className="start-treatment"
                        state={{ appId: appointment.id, petId: appointment.pet_id }}
                      >
                        {appointment.appointment_type_id === 1 ? 'Start Treatment' : 'Start Training'}<i className="fa-regular fa-pen-to-square"></i>
                      </Link> :
                        <p style={{ color: 'darkgray' }}>Waiting confirmation</p>}
                    </Td>
                  }


                </Tr>
              )
            })}


            {/* second user  */}




          </Tbody>



        </Table>

      </div>
    </>

  )
}
export default ActiveAppointments