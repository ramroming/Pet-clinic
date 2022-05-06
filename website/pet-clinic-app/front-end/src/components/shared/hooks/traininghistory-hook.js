import { useReducer } from 'react'
import dateFormat from 'dateformat'

const trainingHistoryReducer = (state, action) => {
  switch (action.type) {
    case 'updateModal': {
      if (action.data === false)
        return {
          ...state,
          updateTrainingModal: action.data,
          TrainingId: 0,
          trainingTypeId: 0,
          missingInput: false,
          startDate: dateFormat(new Date(), 'UTC:yyyy-mm-dd'),
          endDate: dateFormat(new Date(new Date().setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
          minDate: dateFormat(new Date(new Date().setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
        }
      else
        return {
          ...state,
          missingInput: false,
          updateTrainingModal: action.data,
          addTrainingModal: false,
          trainingId: action.trainingId,
          startDate: dateFormat(action.trObj.start_date, 'UTC:yyyy-mm-dd'),
          endDate: dateFormat(action.trObj.end_date, 'UTC:yyyy-mm-dd'),
          minDate: dateFormat(new Date(new Date(action.trObj.start_date).setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
          trainingTypeId: action.trObj.training_type_id,
        }
    }
    case 'addModal': {

      return {
        ...state,
        addTrainingModal: action.data,
        updateTrainingModal: false,
        trainingTypeId: 0,
        missingInput: false,
      }

    }

    case 'getTrainingsSuccess':
      return {
        ...state,
        isGettingTrainings: false,
        trainings: action.data
      }
    case 'getTrainingsFailure':
      return {
        ...state,
        isGettingTrainings: false,
        getTrainingsFailure: action.error
      }
    case 'getTrainingTypesSuccess':
      return {
        ...state,
        isGettingTrainingTypes: false,
        trainingTypes: action.data

      }
    case 'getTrainingTypesFailure':
      return {
        ...state,
        isGettingTrainingTypes: false,
        getTrainingTypesFailure: action.error
      }

    case 'getReset':
      return {
        isGettingTrainings: false,
      }

    case 'prepareAddTraining':
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
    case 'enterDate':
      if (action.field === 'startDate')
        return {
          ...state,
          [action.field]: action.data,
          minDate: dateFormat(new Date(new Date(action.data).setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd'),
          endDate: dateFormat(new Date(new Date(action.data).setUTCHours(new Date().getUTCHours() + 24)), 'UTC:yyyy-mm-dd')
        }
      return {
        ...state,
        [action.field]: action.data
      }


    case 'startTraining': {
      // validation
      if (!state.trainingTypeId)
        return {
          ...state,
          missingInput: true
        }
      return {
        ...state,
        missingInput: false,
        isSavingTraining: true
      }

    }
    case 'startUpdating': {
      if (!state.trainingTypeId)
        return {
          ...state,
          missingInput: true
        }
      return {
        ...state,
        missingInput: false,
        isUpdatingTraining: true
      }

    }
    case 'saveTrainingSuccess':
      return {
        ...state,
        isSavingTraining: false,
        savingTrainingResult: action.data.result,
        savingTrainingFailure: ''
      }
    case 'updateTrainingSuccess':
      return {
        ...state,
        isUpdatingTraining: false,
        updateTrainingResult: action.data.result,
        updateTrainingFailure: ''
      }
    case 'saveTrainingFailure':
      return {
        ...state,
        isSavingTraining: false,
        savingTrainingFailure: action.error
      }
    case 'updateTrainingFailure':
      return {
        ...state,
        isUpdatingTraining: false,
        updateTrainingFailure: action.error
      }
    case 'errorModalExit':
      return {
        ...state,
        getTrainingsFailure: '',
        savingTrainingFailure: '',
        updateTrainingFailure: ''
      }
    default:
      break
  }
}
const useTrainingHistory = (initialData) => {
  const [state, dispatch] = useReducer(trainingHistoryReducer, initialData)
  return [state, dispatch]
}
export default useTrainingHistory