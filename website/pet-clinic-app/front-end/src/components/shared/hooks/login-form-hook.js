import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when login in using userReducer
const formReducer = (state, action) => {
  switch (action.type) {

    // ***************** Forms input validations *************************
    case 'enterValue': {
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value
        }
      }
    }

    // validating when the Login is pressed
    case 'validate': {


      // incase of missing mandatory inputs
      if (!state.username.value || !state.password.value)
        return {
          ...state,
          missingInput: true
        }
      // incase of successfull validation
      return {
        ...state,
        dataToSend: {
          username: state.username.value,
          password: state.password.value
        },
        isLoading: true,
        missingInput: false
      }
    }
    
   

    // *************** state management when using fetch *******************
    
    
    // when fetching data is succeded 
    case 'success': {
      return {
        ...state,
        responseError: '',
        isLoading: false,
        responseData: action.data
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


    


    default:
      break
  }
}

const useLoginForm = (initialState) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  return [state, dispatch]
}
export default useLoginForm