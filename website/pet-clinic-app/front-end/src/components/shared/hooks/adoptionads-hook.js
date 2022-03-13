import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
const adoptionAds = (state, action) => {
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
    case 'noMore': {
      return {
        ...state,
        isLoading: false,
        noMore: true
      }
    }
    case 'getFirstTime': {
      return { 
        ...state, 
        isLoading: false, 
        posts: [...state.posts, ...action.data] }
    }
    case 'getNotFirst': {
      return { 
        ...state, 
        isLoading: false, 
        posts: action.data }
    }
    

    // when fetching data is failed
    case 'failure': {
      return {
        ...state,
        responseError: action.error,
        isLoading: false,
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

const useAdoptionAds = (initialState) => {
  const [state, dispatch] = useReducer(adoptionAds, initialState)
  return [state, dispatch]
}
export default useAdoptionAds