import { useReducer } from 'react'
const appointmentManagementReducer = (state, action) => {
  switch(action.type) {
    case 'successFetchAppointment':
      return {
        ...state,
        isFetchingAppointments: false,
        appointments: action.data
      }
    case 'failure':
      return {
        ...state,
        isFetchingAppointments: false,
        fetchAppointmentFailure: action.error
      }
    case 'errorModalExit': 
      return {
        ...state,
        fetchAppointmentFailure: '',
        confirmFailure: '',
        deleteFailure: '',

      }
    case 'changeTab': 
      return {
        ...state,
        amount: state.amount === 'today' ? 'all' : 'today',
        isFetchingAppointments: true
      }
    case 'selectConfirmAppointment': 
      return {
        ...state,
        openConfirmModal: true,
        selectedAppointment: action.id
      }
    case 'selectDeleteAppointment':
      return {
        ...state,
        openDeleteModal: true,
        selectedAppointmentDelete: action.id
      }
    case 'closeDeleteModal':
      return {
        ...state,
        openDeleteModal: false,
      }
    case 'closeConfirmModal':
      return {
        ...state,
        openConfirmModal: false,
      }
    case 'startConfirming':
      return {
        ...state,
        openConfirmModal: false,
        isConfirming: true,
        confirmFailure: ''
      }
    case 'startDeleting':
      return {
        ...state,
        isDeleting: true,
        deleteFailure: ''
      }
    case 'successConfirm':
      return {
        ...state,
        isConfirming: false,
        confirmFailure: '',
        confirmResult: action.data
      }
    case 'successDelete':
      return {
        ...state,
        isDeleting: false,
        deleteFailure: '',
        deleteResult: action.data
      }
    case 'confirmFailure': 
      return {
        ...state,
        isConfirming: false,
        confirmFailure: action.error
      }
    case 'failureDelete':
      return {
        ...state,
        isDeleting: false,
        deleteFailure: action.error
      }
    default:
      break
  }
}
const useAppointmentManagement = (initialData) => {
  const [state, dispatch] = useReducer(appointmentManagementReducer, initialData)
  return [state, dispatch]
}
export default useAppointmentManagement