import { useReducer } from 'react'

// This custom hook is currently adjusted to validate registerpet inputs when registering a new pet
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
    case 'uploadPhoto': {
      // if the image is greater than 10Mb
      if (action.value.size > 10000000)
        return {
          ...state,
          [action.field]: {
            value: '',
            url: '',
            errorMsg: 'Image size is greater than 10Mb!'
          }
        }
      return {
        ...state,
        [action.field]: {
          value: action.value,
          url: action.url,
          errorMsg: ''
        }
      }
    }

    // validating when the registerpet is pressed
    case 'validate': {

      if (state.isLoading)
        return state

      if (!state.name.value || !state.breed_name.value)
        return {
          ...state,
          missingInput: true
        } 
      // incase of errors in the form
      if (state.photo.errorMsg)
        return {
          ...state,
          missingInput: false
        } 
      // incase of successfull validation, here we create FormData() object because we are not sending json, we are sending multipart/form-data 
      var formData = new FormData()
      formData.append('name', state.name.value)
      formData.append('gender', state.gender.value)
      formData.append('birth_date', state.birth_date.value)
      formData.append('pet_type', state.pet_type.value)
      formData.append('breed_name', state.breed_name.value)
      formData.append('photo', state.photo.value)
      return {
        ...state,
        dataToSend: formData,
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


    case 'getBreeds': {
      return {
        ...state,
        isLoadingBreeds: true
      }
    }
    case 'getBreedsSuccess': {
      return {
        ...state,
        responseError: '',
        isLoadingBreeds: false,
        breeds: action.data
      }
    }
    


    default:
      break
  }
}

const useRegisterPetForm = (initialState) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  return [state, dispatch]
}
export default useRegisterPetForm