import { useReducer } from 'react'

const activeAppointmentsReducer = (state, action) => {
  switch (action.type) {
    case 'getAppointmentsSuccess':
      return {
        ...state,
        isGettingAppointments: false,
        appointments: action.data
      }
    case 'getAppointmentsFailure':
      return {
        ...state,
        isGettingAppointments: false,
        gettingAppointmentsFailure: action.error
      }

    case 'errorModalExit':
      return {
        ...state,
        gettingAppointmentsFailure: ''
      }
    default:
      break
  }
}
const useActiveAppointments = (initialData) => {
  const [state, dispatch] = useReducer(activeAppointmentsReducer, initialData)
  return [state, dispatch]
}
export default useActiveAppointments