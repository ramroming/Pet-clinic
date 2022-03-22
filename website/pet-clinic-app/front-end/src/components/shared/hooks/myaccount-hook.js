import { useReducer } from 'react'
import validator from 'validator'
const myAccountReducer = (state, action) => {
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


    case 'successGetMyData': {
      return {
        ...state,
        getMyDataResult: action.data,
        username: {
          ...state.username,
          value: action.data.username,
        },
        email: {
          ...state.email,
          value: action.data.email,
        },
        isLoadingMyData: false,
        responseError: ''
      }
    }
    case 'blurEmail': {
      const isEmail = validator.isEmail(state.email.value)
      if (!state.email.value || isEmail) {
        return {
          ...state,
          email: {
            ...state.email,
            errorMsg: ''
          }
        }
      }
      if (!isEmail) {
        return {
          ...state,
          email: {
            ...state.email,
            errorMsg: 'Invalid Email Address'
          }

        }
      }
      break;

    }
    case 'blurPassword': {

      // empty password field
      if (!state.new_password.value)
        return {
          ...state,
          new_password: {
            ...state.new_password,
            errorMsg: ''
          }
        }
      const isStrong = validator.isStrongPassword(state.new_password.value)

      // strong password
      if (isStrong) {

        // strong and match
        return {
          ...state,
          new_password: {
            ...state.new_password,
            errorMsg: ''
          },

        }
      }

     // weak and match
      return {
        ...state,
        new_password: {
          ...state.new_password,
          errorMsg: 'minlength:8, must include uppercase, numbers and special chars'
        },
      }
    }

    case 'changePassword': {
      return {
        ...state,
        new_password: {
          ...state.new_password,
          value: '',
          errorMsg: ''
        },
        changePassword: state.changePassword === 'yes' ? 'no' : 'yes'

      }
    }
    case 'validate': {

      if (state.isUpdating)
        return state

      if (!state.username.value || !state.email.value)
        return {
          ...state,
          missingInput: true
        }

      if (state.changePassword === 'yes')
        if (!state.new_password.value || !state.old_password.value)
          return {
            ...state,
            missingInput: true
          }
      // incase of errors in the form
      if (state.email.errorMsg || state.new_password.errorMsg)
        return {
          ...state,
          missingInput: false
        }
      const formData = {
        username: state.username.value,
        email: state.email.value,
        changePassword: state.changePassword,
        old_password: state.old_password.value,
        new_password: state.new_password.value,
      }

      
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
const useMyAccount = (initialData) => {
  const [state, dispatch] = useReducer(myAccountReducer, initialData)
  return [state, dispatch]
}
export default useMyAccount