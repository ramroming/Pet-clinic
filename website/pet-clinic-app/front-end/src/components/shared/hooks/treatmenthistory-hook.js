import { useReducer } from 'react'

const treatmentHistoryReducer = (state, action) => {
  switch (action.type) {
    case 'updateModal': {
      if (action.data === false) 
        return {
          ...state,
          updateTreatmentModal: action.data,
          caseId: 0,
          medDoses: [{
            medId: 0,
            dose: 1
          }],
          vaccineId: 0,
          treatmentId: 0,
          missingInput: false,
        }
      else
        return {
          ...state,
          missingInput: false,
          updateTreatmentModal: action.data,
          addTreatmentModal: false,
          medDoses: action.trObj.dose_med,
          caseId: action.trObj.case_id,
          vaccineId: action.trObj.vaccine_id ? action.trObj.vaccine_id : 0,
          treatmentId: action.treatmentId

        }
    }
    case 'addModal': {
     
        return {
          ...state,
          addTreatmentModal: action.data,
          updateTreatmentModal: false,
          caseId: 0,
          medDoses: [{
            medId: 0,
            dose: 1
          }],
          vaccineId: 0,
          missingInput: false,
        }
      
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
        [action.field]: parseInt(action.data)
      }
    case 'enterMed': {
      return {
        ...state,
        medDoses: state.medDoses.map((medDose, index) => {
          return { ...medDose, medId: (index === action.index) ? parseInt(action.data) : medDose.medId }
        })
      }
    }
    case 'enterDose': {
      if (isNaN(action.data))
        return state
      return {
        ...state,
        medDoses: state.medDoses.map((medDose, index) => {
          return { ...medDose, dose: (index === action.index) ? parseInt(action.data) : medDose.dose }
        })
      }
    }
    case 'addMedicine':
      return {
        ...state,
        medDoses: [...state.medDoses, ...[{ medId: 0, dose: 1 }]]
      }
    case 'removeMedicine': {
      if (state.medDoses.length === 1)
        return state
      return {
        ...state,
        medDoses: state.medDoses.filter((medDose, index) => {
          return (index !== state.medDoses.length - 1)
        })
      }
    }
    case 'startTreatment': {
      if (!state.caseId)
        return {
          ...state,
          missingInput: true
        }
      if (state.caseId === 1 && !state.vaccineId)
        return {
          ...state,
          missingInput: true
        }
      if(state.caseId !== 1) {
        const isFilled = (med_dose) => {
          return med_dose.medId !== 0
        } 
        if (!state.medDoses.every(isFilled))   
          return {
            ...state,
            missingInput: true
          }    
      }
      return {
        ...state,
        missingInput: false,
        isSavingTreatment: true
      }
        
    }
    case 'startUpdating': {
      if (!state.caseId)
        return {
          ...state,
          missingInput: true
        }
      if (state.caseId === 1 && !state.vaccineId)
        return {
          ...state,
          missingInput: true
        }
      if(state.caseId !== 1) {
        const isFilled = (med_dose) => {
          return med_dose.medId !== 0
        } 
        if (!state.medDoses.every(isFilled))   
          return {
            ...state,
            missingInput: true
          }    
      }
      return {
        ...state,
        missingInput: false,
        isUpdatingTreatment: true
      }
        
    }
    case 'saveTreatmentSuccess': 
      return {
        ...state,
        isSavingTreatment: false,
        savingTreatmentResult: action.data.result,
        savingTreatmentFailure: ''
      }
    case 'updateTreatmentSuccess': 
      return {
        ...state,
        isUpdatingTreatment: false,
        updateTreatmentResult: action.data.result,
        updateTreatmentFailure: ''
      }
    case 'saveTreatmentFailure': 
      return {
        ...state,
        isSavingTreatment: false,
        savingTreatmentFailure: action.error
      }
    case 'updateTreatmentFailure': 
      return {
        ...state,
        isUpdatingTreatment: false,
        updateTreatmentFailure: action.error
      }
    case 'errorModalExit':
      return {
        ...state,
        getTreatmentsFailure: '',
        getMVCfailure: '',
        savingTreatmentFailure: '',
        updateTreatmentFailure: ''
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