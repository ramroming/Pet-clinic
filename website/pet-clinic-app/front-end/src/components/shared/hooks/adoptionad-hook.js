import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
const adoptionAd = (state, action) => {
  switch (action.type) {

    // ***************** Forms input validations *************************
    case 'enterValue': {
      if (action.value.length > 400)
        return {
          ...state,
          [action.field]: {
            ...state[action.field],
            errorMsg: 'Max Characters length is 400 !!',
          }
        }
      return {
        ...state,
        [action.field]: {
          errorMsg: '',
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
        responseData: action.data,

      }
    }
    case 'successComment': {
      return {
        ...state,
        responseError: '',
        isCommenting: false,

      }
    }
    case 'successAdopting': {
      return {
        ...state,
        responseError: '',
        isAdopting: false,
        adoptResponse: action.data
      }
    }

    // when fetching data is failed
    case 'failure': {
      return {
        ...state,
        responseError: action.error,
        isLoading: false,
        isCommenting: false,
        isAdopting: false
      }
    }


    case 'validate': {
      if (!state.comment.value)
        return {
          ...state,
          missingComment: 'Please fill a story about your pet'
        }
      return {
        ...state,
        isCommenting: true,
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
        isAdopting: true,
        checkModal: false

      }
    }


    default:
      break
  }
}

const useAdoptionAd = (initialState) => {
  const [state, dispatch] = useReducer(adoptionAd, initialState)
  return [state, dispatch]
}
export default useAdoptionAd