import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
const adoptionAds = (state, action) => {
  switch (action.type) {

    // ***************** Forms input validations *************************
    case 'enterValue': {
      return {
        ...state,
        isLoading: true,
        noMore: false,
        [action.field]: action.value
      }
    }
   
   

  
    // *************** state management when using fetch *******************
    
    case 'start': {
      return {
        ...state,
        responseError: '',
        getMore: true,
      }
    }
    case 'noMore': {
      return {
        ...state,
        isLoading: false,
        noMore: true
      }
    }
    case 'firstRender': {
      return { 
        ...state, 
        isLoading: false, 
        getMore: false,
        connectObserver: !state.connectObserver,
        posts: [...state.posts, ...action.data] }
    }
    case 'otherRenders': {
      return { 
        ...state, 
        connectObserver: !state.connectObserver,
        getMore: false, 
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

    case 'lastPost': {
      return {
        ...state,
        lastPost: action.data
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