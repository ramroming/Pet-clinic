import { useReducer } from "react"
import dateFormat from "dateformat"

const managePetsReducer = (state, action) => {
  switch (action.type) {
    case 'successFetchPets':
      return {
        ...state,
        isFetchingPets: false,
        fetchPetsFailure: '',
        pets: action.data
      }

    case 'failureFetchPets':
      return {
        ...state,
        isFetchingPets: false,
        fetchPetsFailure: action.error,
      }
    case 'errorModalExit':
      return {
        ...state,
        fetchPetsFailure: '',
        responseError: ''
      }

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
            errorMsg: 'Image too big!'
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



    case 'successGetPetData': {
      return {
        ...state,
        isLoadingPets: false,
        getPetsResult: action.data,
      }
    }
    case 'selectPet': {
      return {
        ...state,
        petIndex: action.index,
        isLoadingBreeds: true,
        isUpdating: false,
        missingInput: false,
        breeds: [],
        selectedPet: action.data,
        pet_type: action.data.type_name,
        selectedColors: [],
        name: {
          value: action.data.name,
          errorMsg: ''
        },
        gender: {
          value: action.data.gender,
          errorMsg: ''
        },
        birth_date: {
          value: dateFormat(action.data.birth_date, 'UTC:yyyy-mm-dd'),
          errorMsg: ''
        },
        photo: {
          url: '',
          value: '',
          errorMsg: ''
        },
        breed_name: {
          value: action.data.breed_name,
          errorMsg: ''
        },
        showUpdateMenu: true
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
          })
        }
      }
      if (state.selectedColors.length === 3)
        return state
      return {
        ...state,
        selectedColors: [...state.selectedColors, action.color]
      }
    }



    // validating when the registerpet is pressed
    case 'validate': {

      if (state.isUpdating)
        return state

      if (!state.name.value || !state.breed_name.value || state.selectedColors.length === 0)
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
      formData.append('pet_type', state.pet_type)
      formData.append('breed_name', state.breed_name.value)
      formData.append('photo', state.photo.value)
      formData.append('colors', state.selectedColors.join(':'))

      return {
        ...state,
        dataToUpdate: formData,
        isUpdating: true,
        missingInput: false
      }
    }
    case 'successUpdate': {
      return {
        ...state,
        isUpdating: false,
        updateResult: action.data
      }
    }

    case 'failure': {
      return {
        ...state,
        isLoadingPets: false,
        isLoadingBreeds: false,
        isLoadingColors: false,
        isUpdating: false,
        responseError: action.error
      }
    }

    case 'selectToDelete': 
      return {
        ...state,
        petToDelete: action.deleteId
      }
    case 'startDeleting': 
      return {
        ...state,
        isDeletingPet: true,
        deletePetResult: '',
        deletePetFailure: ''
      }
    case 'deletePetSuccess':
      return {
        ...state,
        isDeletingPet: false,
        deletePetResult: action.data.result,
        deletePetFailure: ''
      }
    case 'deletePetFailure':
      return {
        ...state,
        isDeletingPet: false,
        deletePetFailure: action.error
      }
    default:
      break
  }
}
const useManagePets = (initialData) => {
  const [state, dispatch] = useReducer(managePetsReducer, initialData)
  return [state, dispatch]
}
export default useManagePets