import { useReducer } from 'react'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
const adoptionAds = (state, action) => {
  switch (action.type) {

    // ***************** Forms input validations *************************
    case 'enterValue': {
      if (action.field === 'post_type')
        return {
          ...state,
          posts: [],
          isLoading: true,
          noMore: false,
          breed_name: '',
          [action.field]: action.value
        }
      return {
        ...state,
        posts: [],
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
        breeds: action.data.breeds,
        posts: [...state.posts, ...action.data.result]
      }
    }
    case 'otherRenders': {
      return {
        ...state,
        getMore: false,
        isLoading: false,
        breeds: action.data.breeds,
        posts: action.data.result
      }
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


    case 'getColors': {
      return {
        ...state,
        isLoadingColors: true
      }
    }
    case 'getColorsSuccess': {
      return {
        ...state,
        responseError: '',
        isLoadingColors: false,
        colors: action.data
      }
    }

    case 'selectColor': {
      var index = state.selectedColors.indexOf(action.color);
      
      if (index !== -1) {
        return {
          ...state,
          selectedColors: state.selectedColors.filter((color) => {
            return color !== action.color
          }),
          posts: [],
          isLoading: true,
          noMore: false,
        }
      }
      if (state.selectedColors.length === 3)
        return state
      return {
        ...state,
        selectedColors: [...state.selectedColors, action.color],
        posts: [],
        isLoading: true,
        noMore: false,
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