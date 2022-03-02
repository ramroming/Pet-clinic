
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
        case 'successCreate': {
            return {
              ...state,
              responseError: '',
              isLoading: false,
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
          case 'start': {
              return {
                  ...state,
                  isLoading: true
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