
import { useEffect, useContext } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UpdateTraining from './UpdateTraining';
import AddPetTraining from './AddPetTraining';
import { useLocation } from 'react-router-dom'
import { authContext } from '../../../shared/context/auth-context';
import { pageLoadingContext } from '../../../shared/context/loading-context';
import useFetch from '../../../shared/hooks/fetch-hook';
import useTrainingHistory from '../../../shared/hooks/traininghistory-hook';
import Modal from '../../../utils/modal/Modal'
import dateFormat from 'dateformat';

const initialData = {
  updateTrainingModal: false,
  addTrainingModal: false,

  isGettingTrainings: true,
  trainings: null,
  getTrainingsFailure: '',

  presShowId: null,


  startDate: dateFormat(new Date(), 'UTC:yyyy-mm-dd'),
  endDate: dateFormat(new Date(new Date().setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
  minDate: dateFormat(new Date(new Date().setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
  petId: 0,
  appId: 0,
  trainingTypeId: 0,

  trainingId: 0,

  trainingTypes: null,
  isGettingTrainingTypes: true,
  getTrainingTypesFailure: '',

  missingInput: false,
  isSavingTraining: false,
  savingTrainingResult: '',
  savingTrainingFailure: '',

  isUpdatingTraining: false,
  updateTrainingResult: '',
  updateTrainingFailure: ''



}
const PetTrainingHistory = () => {
  const location = useLocation()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()
  const [state, dispatch] = useTrainingHistory(initialData)

  useEffect(() => {
    let isMount = true
    const getTrainings = async (appId) => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}trainer/trainings/${appId}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && response) {
          dispatch({ type: 'getTrainingsSuccess', data: response })
          dispatch({ type: 'prepareAddTraining', data: { petId: location.state.petId, appId: location.state.appId } })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getTrainingsFailure', error: e.message })
      }
    }
    if (location.state) {
      getTrainings(location.state.appId)
    } else
      dispatch({ type: 'getReset' })

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, location.state, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const getTrainingTypes = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}trainer/trainingtypes`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && response) {
          dispatch({ type: 'getTrainingTypesSuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getTrainingTypesFailure', error: e.message })
      }
    }
    if (location.state) {
      getTrainingTypes()
    } else
      dispatch({ type: 'getReset' })

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, location.state, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const saveTraining = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}trainer/trainings`, 'POST', JSON.stringify({
          startDate: state.startDate,
          endDate: state.endDate,
          petId: state.petId,
          appId: state.appId,
          trainingTypeId: state.trainingTypeId,
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (isMount && response) {
          dispatch({ type: 'saveTrainingSuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'saveTrainingFailure', error: e.message })
      }
    }
    
    if (state.isSavingTraining)
      saveTraining()
  

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, state.appId, state.isSavingTraining, state.petId, state.startDate, state.endDate, state.trainingTypeId, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateTraining = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}trainer/trainings`, 'PATCH', JSON.stringify({
          startDate: state.startDate,
          endDate: state.endDate,
          trainingId: state.trainingId,
          petId: state.petId,
          appId: state.appId,
          trainingTypeId: state.trainingTypeId
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (isMount && response) {
          dispatch({ type: 'updateTrainingSuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'updateTrainingFailure', error: e.message })
      }
    }
    
    if (state.isUpdatingTraining)
      updateTraining()
  

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, state.appId, state.isUpdatingTraining, state.trainingId, state.petId, state.startDate, state.endDate, state.trainingTypeId, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isGettingTrainings || state.isSavingTraining || state.isUpdatingTraining || state.getTrainingTypesFailure)
  }, [setPageIsLoading, state.isGettingTrainings, state.isSavingTraining, state.isUpdatingTraining, state.getTrainingTypesFailure])


  return (
    <>
      {(state.savingTrainingResult || state.updateTrainingResult) && <Modal
        modalClass='success'
        header='Success!!'
        body={state.savingTrainingResult || state.updateTrainingResult}
        dispatch={dispatch}
        refresh={true}
      />}
      {(state.getTrainingsFailure ||  state.savingTrainingFailure || state.updateTrainingFailure || state.getTrainingTypesFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.getTrainingsFailure ||  state.savingTrainingFailure || state.updateTrainingFailure || state.getTrainingTypesFailure}
          dispatch={dispatch}
        />}
      <h4>Pet Training</h4>
      {location.state ? <div className="flex-col falign-center fjust-center">
        <div className="search-bar-container flex-row fjust-center falign-center gap-16p">
          {
            <button className="btn-sm"
              onClick={() => {
                dispatch({ type: "addModal", data: true })
              }}>
              Add Training
            </button>
          }
        </div>

        {
          state.updateTrainingModal &&
          <UpdateTraining dispatch={dispatch} state={state} />

        }

        {
          state.addTrainingModal &&
          <AddPetTraining dispatch={dispatch} state={state} />
        }


        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Start Date
              </Th>
              <Th>
                End Date
              </Th>
              <Th>
                Training
              </Th>
              <Th>
                Trainer
              </Th>
              <Th>
                Pet Name
              </Th>
              <Th>
                Edit
              </Th>

            </Tr>
          </Thead>
          <Tbody>
            {state.trainings && state.trainings.map((training, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {dateFormat(training.start_date, 'UTC: yyyy-mm-dd')}
                  </Td>
                  <Td>
                    {dateFormat(training.end_date, 'UTC: yyyy-mm-dd')}
                  </Td>
                  <Td>
                    {training.training_type}
                  </Td>
                  <Td>
                    {`${training.first_name ? training.first_name : '-'} ${training.last_name ? training.last_name : '-'}`}
                  </Td>
                  <Td>
                    {training.pet_name}
                  </Td>
           
              

                  
                  <Td>
                    <button 
                    disabled={training.trainer_id !== auth.userId || !training.trainer_id}
                    className="btn-sm"
                      onClick={() => {
                        dispatch({ type: "updateModal", data: true, trObj: training, trainingId: training.id })
                      }}>
                      Edit
                    </button>

                  </Td>

                </Tr>
              )
            })}
          </Tbody>


        </Table>




      </div> :
        <p>No active appointment is selected at the moment you can select an active appointment from 'Active Appointments' tab to start the training</p>
      }
    </>
  )
}

export default PetTrainingHistory