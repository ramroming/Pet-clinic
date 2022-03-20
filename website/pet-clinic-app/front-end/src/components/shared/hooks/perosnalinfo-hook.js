import { useReducer } from 'react'
import validator from 'validator'
const personalInfoReducer = (state, action) => {
  switch (action.type) {

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


    case 'uploadPhoto': {
      // if the image is greater than 10Mb
      if (action.value.size > 10000000)
        return {
          ...state,
          [action.field]: {
            value: '',
            URL: '',
            errorMsg: 'Image size is greater than 10Mb!'
          }
        }
      return {
        ...state,
        photoChanged: 'yes',
        [action.field]: {
          value: action.value,
          URL: URL.createObjectURL(action.value),
          errorMsg: ''
        }
      }
    }
    case 'removePhoto': {
      return {
        ...state,
        photoChanged: 'yes',
        photo: {
          ...state.photo,
          URL: '',
          value: '',
          errorMsg: ''

        }
      }
    }
    // when focus on phone input is out
    case 'blurPhone': {
      const isPhone = validator.isMobilePhone(state.phone_number.value)
      if (!state.phone_number.value || isPhone) {
        return {
          ...state,
          phone_number: {
            ...state.phone_number,
            errorMsg: ''
          }
        }
      }
      if (!isPhone) {
        return {
          ...state,
          phone_number: {
            ...state.phone_number,
            errorMsg: 'Invalid Phone number'
          }
        }
      }
      break;


    }
    case 'successGetMyData': {
      return {
        ...state,
        getMyDataResult: action.data,
        first_name: {
          ...state.first_name,
          value: action.data.first_name,
        },
        last_name: {
          ...state.last_name,
          value: action.data.last_name,
        },
        phone_number: {
          ...state.phone_number,
          value: action.data.phone_number,
        },
        address: {
          ...state.address,
          value: action.data.address,
        },
        photo: action.data.photo ? {
          ...state.photo,
          URL: URL.createObjectURL(new Blob([new Uint8Array(action.data.photo.data)])),
        } : state.photo,
        isLoadingMyData: false,
        responseError: ''
      }
    }


    case 'validate': {

      if (state.isUpdating)
        return state

      if (!state.first_name.value || !state.last_name.value || !state.address.value || !state.phone_number.value)
        return {
          ...state,
          missingInput: true
        }
      // incase of errors in the form
      if (state.photo.errorMsg || state.phone_number.errorMsg || state.address.errorMsg)
        return {
          ...state,
          missingInput: false
        }
      // incase of successfull validation, here we create FormData() object because we are not sending json, we are sending multipart/form-data 
      var formData = new FormData()
      formData.append('first_name', state.first_name.value)
      formData.append('last_name', state.last_name.value)
      formData.append('phone_number', state.phone_number.value)
      formData.append('address', state.address.value)
      formData.append('photoChanged', state.photoChanged)
      if(state.photo.value)
        formData.append('photo', state.photo.value)

      
      return {
        ...state,
        dataToUpdate: formData,
        isUpdating: true,
        missingInput: false,
        responseError: ''
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
        isLoadingMyData: false,
        isUpdating: false,
        responseError: action.error
      }
    }
    case 'errorModalExit': {
      return {
        ...state,
        responseError: ''
      }
    }
    default: break
  }
}
const usePersonalInfo = (initialData) => {
  const [state, dispatch] = useReducer(personalInfoReducer, initialData)
  return [state, dispatch]
}
export default usePersonalInfo