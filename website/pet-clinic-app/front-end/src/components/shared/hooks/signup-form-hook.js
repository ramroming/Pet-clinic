import { useReducer } from 'react'
import validator from 'validator'

// This custom hook is currently adjusted to validate user inputs when signing up using userReducer
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
    // when focus on email input is out
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
      if (!state.password.value)
        return {
          ...state,
          password: {
            ...state.password,
            errorMsg: ''
          }
        }
      const isStrong = validator.isStrongPassword(state.password.value)

      // strong password
      if (isStrong) {

        // strong but empty re_password
        if (!state.re_password.value)
          return {
            ...state,
            password: {
              ...state.password,
              errorMsg: ''
            },
            re_password: {
              ...state.re_password,
              errorMsg: ''
            }
          }

        // strong but dosen't match repassword
        if (state.password.value !== state.re_password.value)
          return {
            ...state,
            password: {
              ...state.password,
              errorMsg: ''
            },
            re_password: {
              ...state.re_password,
              errorMsg: 'password not matched!!'
            }
          }

        // strong and match
        return {
          ...state,
          password: {
            ...state.password,
            errorMsg: ''
          },
          re_password: {
            ...state.re_password,
            errorMsg: ''
          }
        }
      }

      // weak and empty repassword
      if (!state.re_password.value)
        return {
          ...state,
          password: {
            ...state.password,
            errorMsg: 'minlength:8, must include uppercase, numbers and special chars'
          },
          re_password: {
            ...state.re_password,
            errorMsg: ''
          }
        }
      // weak and no match
      if (state.password.value !== state.re_password.value)
        return {
          ...state,
          password: {
            ...state.password,
            errorMsg: 'minlength:8, must include uppercase, numbers and special chars'
          },
          re_password: {
            ...state.re_password,
            errorMsg: 'password not matched!!'
          }
        }
      // weak and match
      return {
        ...state,
        password: {
          ...state.password,
          errorMsg: 'minlength:8, must include uppercase, numbers and special chars'
        },
        re_password: {
          ...state.re_password,
          errorMsg: ''
        }
      }
    }
    case 'blurRePassword': {
      const isMatch = state.password.value === state.re_password.value
      if (!state.re_password.value)
        return {
          ...state,
          re_password: {
            ...state.re_password,
            errorMsg: ''
          }
        }

      if (!isMatch)
        return {
          ...state,
          re_password: {
            ...state.re_password,
            errorMsg: 'password not matched!!'
          }

        }
      return {
        ...state,
        re_password: {
          ...state.re_password,
          errorMsg: ''
        }
      }

    }

    // validating when the signup is pressed
    case 'validate': {

      if (state.isLoading)
        return state

      // incase of missing mandatory inputs
      if (!state.first_name.value || !state.last_name.value || !state.username.value || !state.email.value || !state.address.value || !state.password.value || !state.re_password.value || !state.phone_number.value)
        return {
          ...state,
          missingInput: true
        }

      // incase of errors in the form
      if (state.username.errorMsg || state.email.errorMsg || state.password.errorMsg || state.re_password.errorMsg || state.phone_number.errorMsg)
        return state


      // incase of successfull validation
      return {
        ...state,
        dataToSend: {
          first_name: state.first_name.value,
          last_name: state.last_name.value,
          username: state.username.value,
          phone_number: state.phone_number.value,
          address: state.address.value,
          email: state.email.value,
          password: state.password.value
        },
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


    


    default:
      break
  }
}

const useSignupForm = (initialState) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  return [state, dispatch]
}
export default useSignupForm