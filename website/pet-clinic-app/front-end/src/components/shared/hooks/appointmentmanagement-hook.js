import { useReducer } from 'react'
const appointmentManagementReducer = (state, action) => {
  switch(action.type) {
    case 'enterValue': {
      if (action.field === 'appointment_type' && !action.value)
        return {
          ...state,
          [action.field]: action.value,
          stmem_id: ''
        }
      if (action.field === 'user_name' && !action.value)
        return {
          ...state,
          [action.field]: action.value,
          pet_id: ''
        }
      if (action.field === 'stmem_id')
        return {
          ...state,
          [action.field]: action.value,
          date: '',
          hours: []
        }
      return {
        ...state,
        [action.field]: action.value
      }
    }
    
    case 'successFetchAppointment':
      return {
        ...state,
        isFetchingAppointments: false,
        appointments: action.data.arrayToSend,
        fees: action.data.fees
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
        amount: action.data,
        createAppointmentTab: false,
        isFetchingAppointments: true
      }
    case 'createAppointmentEnter': 
      return {
        ...state,
        amount: '',
        createAppointmentTab: true,
        isGettingAppointmentTypes: true,
        appointmentTypes: [],
        gettingAppointmentTypesFailure: '',
        pets: [],
        gettingPetsFailure: '',
        isGettingPets: false,
        stmems: [],
        gettingStmemsFailure: '',
        isGettingStmems: false,

        hours: [],
        gettingHoursFailure: '',
        isGettingHours: false,
        user_name: '',
        appointment_type: '',
        pet_id: '',
        stmem_id: '',
        date: ''
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
    case 'startGettingPets':
      return {
        ...state,
        pets: [],
        isGettingPets: true,
        gettingPetsFailure: ''
      }
    case 'startGettingStmems':
      return {
        ...state,
        stmems: [],
        stmem_id: '',
        isGettingStmems: true,
        gettingStmemsFailure: ''
      }
    case 'startGettingHours':
      return {
        ...state,
        isGettingHours: true,
        gettingHoursFailure: ''
      }
    case 'successConfirm':
      return {
        ...state,
        // isConfirming: false,
        confirmFailure: '',
        confirmResult: action.data
      }
    case 'successDelete':
      return {
        ...state,
        // isDeleting: false,
        deleteFailure: '',
        deleteResult: action.data
      }
    case 'successGetAppointmentTypes': 
      return {
        ...state,
        isGettingAppointmentTypes: false,
        gettingAppointmentTypesFailure: '',
        appointmentTypes: action.data
      }
    case 'successGetPets': 
      return {
        ...state,
        isGettingPets: false,
        gettingPetsFailure: '',
        pets: action.data
      }
    case 'successGetStmems':
      return {
        ...state,
        isGettingStmems: false,
        gettingStmemsFailure: '',
        stmems: action.data
      }
    case 'successGetHours':
      return {
        ...state,
        isGettingHours: false,
        gettingHoursFailure: '',
        hours: action.data

      }
    case 'successCreateAppointment':
      return {
        ...state,
        isCreatingAppointment: false,
        isCreatingAppointmentFailure: '',
        creatingAppointmentResult: action.data
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
    case 'failureGetPets':
      return {
        ...state,
        isGettingPets: false,
        gettingPetsFailure: action.error
      }
    case 'failureGetStmems':
      return {
        ...state,
        isGettingStmems: false,
        gettingStmemsFailure: action.error
      }
    case 'failureGetHours':
      return {
        ...state,
        isGettingHours: false,
        gettingHoursFailure: action.error
      }
    case 'failureCreateAppointment':
      return {
        ...state,
        isCreatingAppointment: false,
        isCreatingAppointmentFailure: action.error
      }
    case 'validate': {
      if (!state.user_name || !state.pet_id || !state.stmem_id || !state.date || !state.hour || !state.appointment_type)
        return {
          ...state,
          missingInput: true
        }
      return {
        ...state,
        missingInput: false,
        isCreatingAppointment: true
      }
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