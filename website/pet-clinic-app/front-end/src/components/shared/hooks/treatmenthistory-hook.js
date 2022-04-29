import { useReducer } from 'react' 

const treatmentHistoryReducer = (state, action) => {
  switch(action.type) {
    case 'updateModal':
      return {
        ...state,
        updateTreatmentModal: action.data
      }
    case 'addModal':
      return {
        ...state,
        addTreatmentModal: action.data
      }
    case 'showMiniModal':
      return {
        ...state,
        presShowId: action.data
      }
    case 'hideMiniModal':
      return {
        ...state,
        presShowId: null
      }
    case 'showMiniModalClick':
      return {
        ...state,
        presShowId: state.presShowId ? null : action.data
      }
    case 'getTreatmentsSuccess':
      return {
        ...state,
        isGettingTreatments: false,
        treatments: action.data
      }
    case 'getTreatmentsFailure':
      return {
        ...state,
        isGettingTreatments: false,
        getTreatmentsFailure: action.error
      }
    case 'getMVCsuccess':
      return {
        ...state,
        isGettingMVC: false,
        vaccines: action.data.vaccines,
        medicines: action.data.medicines,
        cases: action.data.cases
      }
    case 'getMVCfailure':
      return {
        ...state,
        isGettingMVC: false,
        getMVCfailure: action.error
      }
    case 'getReset':
      return {
        isGettingMVC: false,
        isGettingTreatments: false,
      }

    case 'prepareAddTreatment':
      return {
        ...state,
        appId: action.data.appId,
        petId: action.data.petId

      }
    case 'enterValue': 
      return {
        ...state,
        [action.field]: action.data
      }
    case 'enterMed':{
      return {
        ...state,
        medDoses: state.medDoses.map((medDose, index) => {
          return {...medDose, medId: (index === action.index) ? action.data: medDose.medId}
        })
      }
    }
    case 'enterDose':{
      if (isNaN(action.data))
        return state
      return {
        ...state,
        medDoses: state.medDoses.map((medDose, index) => {
          return {...medDose, dose: (index === action.index) ? action.data: medDose.dose}
        })
      }
    }
    case 'addMedicine': 
      return {
        ...state,
        medDoses: [...state.medDoses, ...[{medId: '', dose: ''}] ]
      }
    case 'removeMedicine': {
      if (state.medDoses.length === 1)
        return state
      return {
        ...state,
        medDoses: state.medDoses.filter((medDose, index) => {
          return (index !== state.medDoses.length-1)
        })
      }
    }
    case 'errorModalExit': 
      return {
        ...state, 
        getTreatmentsFailure: '',
        getMVCfailure: '',
      }
    default: 
      break
  }
}
const useTreatmentHistory = (initialData) => {
  const [state, dispatch] = useReducer(treatmentHistoryReducer, initialData)
  return [state, dispatch]
}
export default useTreatmentHistory