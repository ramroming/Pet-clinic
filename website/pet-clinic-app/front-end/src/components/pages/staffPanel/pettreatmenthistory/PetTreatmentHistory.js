
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
import Modal from '../../../utils/modal/Modal'
import dateFormat from 'dateformat';

const initialData = {
  updateTreatmentModal: false,
  addTreatmentModal: false,

  isGettingTreatments: true,
  treatments: null,
  getTreatmentsFailure: '',

  presShowId: null,

  isGettingMVC: true,
  getMVCfailure: '',
  vaccines: null,
  medicines: null,
  cases: null,

  date: null,
  petId: null,
  caseId: 0,
  medDoses: [{
    medId: 0,
    dose: 1
  }],
  appId: null,
  vaccineId: 0,
  treatmentId: 0,

  missingInput: false,
  isSavingTreatment: false,
  savingTreatmentResult: '',
  savingTreatmentFailure: '',

  isUpdatingTreatment: false,
  updateTreatmentResult: '',
  updateTreatmentFailure: ''



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
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}vet/treatments/${appId}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && response) {
          const treatments = response.map((treatment) => {
            const dose_med = []
            if (!treatment.vaccine_name) {
              let doses = treatment.doses.split(',')
              let meds = treatment.med_names.split(',')
              let medIds = treatment.med_ids.split(',')
              for (let i = 0; i < doses.length; i++)
                dose_med.push({ med: meds[i], medId: medIds[i], dose: doses[i] })
              return {
                ...treatment,
                dose_med
              }
            } else
              return treatment
          })
          dispatch({ type: 'getTreatmentsSuccess', data: treatments })
          dispatch({ type: 'prepareAddTreatment', data: { petId: location.state.petId, appId: location.state.appId } })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getTreatmentsFailure', error: e.message })
      }
    }
    if (location.state) {
      getTreatments(location.state.appId)
    } else
      dispatch({ type: 'getReset' })

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, location.state, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const getMVC = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}vet/casemedvac`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && response) {
          dispatch({ type: 'getMVCsuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getMVCfailure', error: e.message })
      }
    }
    if (location.state) {
      getMVC()
    } else {
      dispatch({ type: 'getReset' })
    }

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, location.state, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const saveTreatment = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}vet/treatments`, 'POST', JSON.stringify({
          date: dateFormat(new Date(), "UTC:yyyy-mm-dd HH:MM:ss"),
          petId: state.petId,
          caseId: state.caseId,
          medDoses: state.medDoses,
          appId: state.appId,
          vaccineId: state.vaccineId
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (isMount && response) {
          dispatch({ type: 'saveTreatmentSuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'saveTreatmentFailure', error: e.message })
      }
    }
    
    if (state.isSavingTreatment)
      saveTreatment()
  

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, state.appId, state.caseId, state.isSavingTreatment, state.medDoses, state.petId, state.vaccineId, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateTreatment = async () => {
      try {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}vet/treatments`, 'PATCH', JSON.stringify({
          treatmentId: state.treatmentId,
          petId: state.petId,
          caseId: state.caseId,
          medDoses: state.medDoses,
          appId: state.appId,
          vaccineId: state.vaccineId
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (isMount && response) {
          dispatch({ type: 'updateTreatmentSuccess', data: response })
        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'updateTreatmentFailure', error: e.message })
      }
    }
    
    if (state.isUpdatingTreatment)
      updateTreatment()
  

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, state.appId, state.caseId, state.isUpdatingTreatment, state.treatmentId, state.medDoses, state.petId, state.vaccineId, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isGettingTreatments || state.isGettingMVC || state.isSavingTreatment || state.isUpdatingTreatment)
  }, [setPageIsLoading, state.isGettingTreatments, state.isGettingMVC, state.isSavingTreatment, state.isUpdatingTreatment])


  return (
    <>
      {(state.savingTreatmentResult || state.updateTreatmentResult) && <Modal
        modalClass='success'
        header='Success!!'
        body={state.savingTreatmentResult || state.updateTreatmentResult}
        dispatch={dispatch}
        refresh={true}
      />}
      {(state.getTreatmentsFailure || state.getMVCfailure || state.savingTreatmentFailure || state.updateTreatmentFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.getTreatmentsFailure || state.getMVCfailure || state.savingTreatmentFailure || state.updateTreatmentFailure}
          dispatch={dispatch}
        />}
      <h4>Pet Treatment</h4>
      {location.state ? <div className="flex-col falign-center fjust-center">
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
          <UpdateTreatment dispatch={dispatch} state={state} />

        }

        {
          state.addTreatmentModal &&
          <AddPetTreatment dispatch={dispatch} state={state} />
        }


        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Date Modified
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
                    {`${treatment.first_name ? treatment.first_name : '-'} ${treatment.last_name ? treatment.last_name : '-'}`}
                  </Td>
                  <Td>
                    {treatment.case_name}
                  </Td>
                  <Td>
                    {treatment.vaccine_name ? treatment.vaccine_name : '--'}
                  </Td>

                  <Td className="prescription-td">
                    {
                      !treatment.vaccine_name ?
                        <button className="btn-sm show-prescription"
                          onMouseEnter={() => {
                            dispatch({ type: 'showMiniModal', data: treatment.id })
                          }}
                          onMouseLeave={() => {
                            dispatch({ type: 'hideMiniModal' })
                          }}
                          onClick={() => {
                            dispatch({ type: 'showMiniModalClick', data: treatment.id })
                          }}
                        >
                          Show
                          {state.presShowId === treatment.id && <div className="mini-modal flex-column gap-8p">
                            {
                              treatment.dose_med.map((doseMed, index) => {
                                return (
                                  <p key={index}>
                                    {`Med: ${doseMed.med}, Dose: ${doseMed.dose} a day`}
                                  </p>
                                )
                              })
                            }
                          </div>}
                        </button>
                        :
                        "--"
                    }

                  </Td>
                  <Td>
                    <button 
                    disabled={treatment.doctor_id !== auth.userId || !treatment.doctor_id}
                    className="btn-sm"
                      onClick={() => {
                        console.log(treatment)
                        dispatch({ type: "updateModal", data: true, trObj: treatment, treatmentId: treatment.id })
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
        <p>No active appointment is selected at the moment you can select an active appointment from 'Active Appointments' tab to start the treatment</p>
      }
    </>
  )
}

export default PetTreatmentHistory