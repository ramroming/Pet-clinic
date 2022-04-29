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
    default: 
      break
  }
}
const useTreatmentHistory = (initialData) => {
  const [state, dispatch] = useReducer(treatmentHistoryReducer, initialData)
  return [state, dispatch]
}
export default useTreatmentHistory