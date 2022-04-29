
import { useEffect, useContext } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UpdateTreatment from './UpdateTreatment';
import AddPetTreatment from './AddPetTreatment';
import { useLocation } from 'react-router-dom'
import { authContext } from '../../../shared/context/auth-context';
import { pageLoadingContext } from '../../../shared/context/loading-context';
import useFetch from '../../../shared/hooks/fetch-hook';
import useTreatmentHistory from '../../../shared/hooks/treatmenthistory-hook';
import dateFormat from 'dateformat';

const initialData = {
  updateTreatmentModal: false,
  addTreatmentModal: false,

  isGettingTreatments: true,
  treatments: null,
  getTreatmentsFailure: '',

}
const PetTreatmentHistory = () => {

  const location = useLocation()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()
  const [state, dispatch] = useTreatmentHistory(initialData)

  useEffect(() => {
    let isMount = true
    const getTreatments = async (appId) => {
      try {
        const treatments = await sendRequest(`http://localhost:5000/vet/treatments/${appId}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && treatments)
          dispatch({ type: 'getTreatmentsSuccess', data: treatments })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getTreatmentsFailure', error: e.message })
      }
    }
    if (location.state) {
      console.log('fetching')
      getTreatments(location.state.appId)
    } else
      dispatch({ type: 'getTreatmentsSuccess', data: null })

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, location.state, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isGettingTreatments)
  }, [setPageIsLoading, state.isGettingTreatments])


  return (
    <>
      <h4>Pet Treatment</h4>
      <div className="flex-col falign-center fjust-center">
        <div className="search-bar-container flex-row fjust-center falign-center gap-16p">
          {
            <button className="btn-sm"
              onClick={() => {
                dispatch({ type: "addModal", data: true })
              }}>
              Add treatment
            </button>
          }
        </div>

        {
          state.updateTreatmentModal &&
          <UpdateTreatment dispatch={ dispatch } />

        }

        {
          state.addTreatmentModal &&
          <AddPetTreatment dispatch={dispatch} />
        }


        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Date
              </Th>
              <Th>
                Pet name
              </Th>
              <Th>
                Vet
              </Th>
              <Th>
                Case
              </Th>
              <Th>
                Vaccine
              </Th>
              <Th>
                Prescription
              </Th>
              <Th>
                Edit
              </Th>

            </Tr>
          </Thead>
          <Tbody>
            {state.treatments && state.treatments.map((treatment, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {dateFormat(treatment.date)}
                  </Td>
                  <Td>
                    {treatment.pet_name}
                  </Td>
                  <Td>
                    {`${treatment.first_name} ${treatment.last_name}`}
                  </Td>
                  <Td>
                    {treatment.case_name}
                  </Td>
                  <Td>
                    {treatment.vaccine_name ? treatment.vaccine_name : '--'}
                  </Td>

                  <Td>
                  <button className="btn-sm"
                      
                      >
                      Edit
                    </button>
                  </Td>
                  <Td>
                    <button className="btn-sm"
                      onClick={() => {
                        dispatch({ type: "updateModal", data: true })
                      }}>
                      Edit
                    </button>

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

export default PetTreatmentHistory