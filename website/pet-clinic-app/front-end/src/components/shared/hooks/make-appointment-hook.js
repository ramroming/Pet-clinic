
import {useReducer} from 'react'
const appointmentReducer = (state, action) => {
    switch (action.type) {

        case 'successPets': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
              pets: action.data
            }
          }

        case 'successStmems': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
              stmems: action.data
            }
          }
        case 'successTimes': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
              timesArr: action.data
            }
          }
       

      
          
          case 'start': {
              return {
                  ...state,
                  isLoading: true
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
              checkModal: true
            }
          }
          case 'finalConfirm': {
            return {
              ...state,
              finalConfirm: true
            }
          }

          case 'successCreate': {
            return {
              ...state,
              createResponse: action.data,
              responseError: '',
              isLoading: false,
              finalConfirm: false,
              checkModal: false
            }
          }
          case 'failureCreate': {
            return {
              ...state,
              responseError: action.error,
              isLoading: false,
              finalConfirm: false,
              checkModal: false

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
const useMakeAppointment = (initialData) => {
    const [state, dispatch] = useReducer(appointmentReducer, initialData)
    return [state, dispatch]
}

export default useMakeAppointment