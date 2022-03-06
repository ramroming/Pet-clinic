
import {useReducer} from 'react'
const appointmentReducer = (state, action) => {
    switch (action.type) {



       

      
          
          case 'start': {
              return {
                  ...state,
                  isLoading: true
              }
          }
          case 'startDeleting': {
              return {
                  ...state,
                  deleteLoading: true
              }
          }

          case 'checkModalExit': {
            return {
              ...state,
              checkModal: false
            }
          }
          case 'checkModalEnter': {
            return {
              ...state,
              checkModal: true,
              appointmentToDelete: action.appointmentToDelete
            }
          }
          case 'finalConfirm': {
            return {
              ...state,
              finalConfirm: true
            }
          }


          case 'success': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
              activeAppointments: action.active,
              pastAppointments: action.past,
            }
          }
          // when fetching data is failed
          case 'failure': {
            return {
              ...state,
              responseError: action.error,
              isLoading: false
            }
          }
          case 'successDelete': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
              finalConfirm: false,
              checkModal: false,
              deleteResponse: action.data.result,
              deleteLoading: false
            }
          }


          case 'failureDelete': {
            return {
              ...state,
              responseError: action.error,
              isLoading: false, 
              finalConfirm: false,
              checkModal: false,
              deleteLoading: false
            }
          }
          
          case 'errorModalExit': {
            return {
              ...state,
              responseError: ''
            }
          }
          default:
            break
    }
}
const useViewAppointment = (initialData) => {
    const [state, dispatch] = useReducer(appointmentReducer, initialData)
    return [state, dispatch]
}

export default useViewAppointment