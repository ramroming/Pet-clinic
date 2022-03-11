import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
const defaultStateReducer = (state, action) => {
  switch (action.type) {

    // ***************** Forms input validations *************************
    case 'enterValue': {
      if (action.value.length > 400)
        return {
          ...state,
          [action.field]: {
            ...state[action.field],
            error: 'Max Characters length is 400 !!',
          }
        }
      return {
        ...state,
        [action.field]: {
          error: '',
          value: action.value
        }
      }
    }
   
   

  
    // *************** state management when using fetch *******************
    
    case 'start': {
      return {
        ...state,
        responseError: '',
        isLoading: true,

      }
    }
    
    // when fetching data is succeded 
    case 'success': {
      return {
        ...state,
        responseError: '',
        isLoading: false,
        responseData: action.data
      }
    }
    case 'successCreate': {
      return {
        ...state,
        responseError: '',
        isCreating: false,
        responseCreate: action.data
      }
    }

    // when fetching data is failed
    case 'failure': {
      return {
        ...state,
        responseError: action.error,
        isLoading: false,
        isCreating: false
      }
    }


    case 'validate': {
      if (!state.story.value)
        return {
          ...state,
          missingStory: 'Please fill a story about your pet'
        }
      return {
        ...state,
        isCreating: true,
        missingStory: '',
        responseError: ''
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

const useDefaultReducer = (initialState) => {
  const [state, dispatch] = useReducer(defaultStateReducer, initialState)
  return [state, dispatch]
}
export default useDefaultReducer