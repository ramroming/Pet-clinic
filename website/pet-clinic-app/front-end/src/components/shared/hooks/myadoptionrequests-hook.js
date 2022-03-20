import { useReducer } from 'react'

// This custom hook is currently adjusted to validate registerpet inputs when registering a new pet
const myAdoptionRequests = (state, action) => {
  switch (action.type) {



    // *************** state management when using fetch *******************

   

    case 'start': {
      return {
        ...state,
        responseError: '',
        isLoading: true
      }
    }
    case 'selectRequestToDelete': {
      return {
        ...state,
        requestToDelete: action.data
      }
    }
    case 'startDeleting': {
      return {
        ...state,
        responseError: '',
        isDeleting: true
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

    case 'success': {
      return {
        ...state,
        responseError: '',
        isLoading: false,
        responseData: action.data
      }
    }

  
    case 'failure': {
      return {
        ...state,
        responseError: action.error,
        isLoading: false,
        isDeleting: false,
        isTransferingOwner: false
 
      }
    }
    case 'errorModalExit': {
      return {
        ...state,
        responseError: ''
      }
    }

    case 'showModalEnter': {
      return {
        ...state,
        showModal: true, 
        selectedRequest: action.data

      }
    }
    case 'showModalExit': {
      return {
        ...state,
        showModal: false, 
        areYouSureSubmit: false

      }
    }
   
  
   case 'ownershipData': {
    return {
      ...state,
      selectedAd: action.adId,
      selectedPet: action.petId
    }
   }
   case 'selectRequester': {
    return {
      ...state,
      selectedNewOwner: action.data,

    }
   }

   
    case 'areYouSureEnter': {
      return {
        ...state,
        areYouSureSubmit: !state.areYouSureSubmit
      }
    }
    case 'areYouSureExit': {
      return {
        ...state,
        areYouSureSubmit: false
      }
    }
    case 'areYouSureConfirm': {
      return {
        ...state,
        isTransferingOwner: true,
        showModal: false, 
      }
    }
   
    case 'successTransfer': {
      return {
        ...state,
        isTransferingOwner: false,
        transferOwnerResult: action.data
      }
    }


  
  




    default:
      break
  }
}

const useMyAdoptionRequests = (initialState) => {
  const [state, dispatch] = useReducer(myAdoptionRequests, initialState)
  return [state, dispatch]
}
export default useMyAdoptionRequests