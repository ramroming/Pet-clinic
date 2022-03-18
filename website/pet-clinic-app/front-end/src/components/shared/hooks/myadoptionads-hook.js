import { useReducer } from 'react'

// This custom hook is currently adjusted to validate registerpet inputs when registering a new pet
const myAdoptionAds = (state, action) => {
  switch (action.type) {



    // *************** state management when using fetch *******************

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

    case 'start': {
      return {
        ...state,
        responseError: '',
        isLoading: true
      }
    }
    case 'selectPostToDelete': {
      return {
        ...state,
        postToDelete: action.data
      }
    }
    case 'startDeleting': {
      return {
        ...state,
        responseError: '',
        isDeleting: true
      }
    }
    case 'success': {
      return {
        ...state,
        responseError: '',
        isLoading: false,
        responseData: action.data
      }
    }
    case 'successDelete': {
      return {
        ...state,
        responseError: '',
        isDeleting: false,
        deleteResult: action.data
      }
    }

    

    case 'failure': {
      return {
        ...state,
        responseError: action.error,
        isLoading: false,
        isDeleting: false,
        isUpdating: false,
      }
    }
    case 'errorModalExit': {
      return {
        ...state,
        responseError: ''
      }
    }
    case 'selectpostToUpdate': {
      return {
        ...state,
        postToUpdate: action.realId,
        oldStory: state.responseData[action.data].story

      }
    }
    case 'editModalEnter': {
      return {
        ...state,
        editPost: true
      }
    }
    case 'editModalExit': {
      return {
        ...state,
        newStory: {value: '', errorMsg: ''},
        editPost: false
      }
    }

    case 'finalConfirm': {
      return {
        ...state,
        editPost: false,
        isUpdating: true
      }
    }
    case 'successUpdate': {
      return {
        ...state,
        responseError: '',
        isUpdating: false,
        updateResult: action.data
      }
    }




    default:
      break
  }
}

const useMyAdoptionAds = (initialState) => {
  const [state, dispatch] = useReducer(myAdoptionAds, initialState)
  return [state, dispatch]
}
export default useMyAdoptionAds