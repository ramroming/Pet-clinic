import { useReducer } from "react"
import validator from 'validator'
import InputError from "../../utils/formErrorMsg/InputError"

const signupReducer = (state, action) => {
  switch (action.type) {
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


    case 'signup': {
      return {
        ...state,
        error: '',
        isLoading: true,
      }

    }
    default:
      break
  }
}
const initialState = {
  first_name: {
    value: '',
    errorMsg: '' 
  },
  last_name: {
    value: '',
    errorMsg: '' 
  },
  username: {
    value: '',
    errorMsg: '' 
  },
  phone_number: {
    value: '',
    errorMsg: '' 
  },
  address: {
    value: '',
    errorMsg: '' 
  },
  email: {
    value: '',
    errorMsg: '' 
  },
  password: {
    value: '',
    errorMsg: '' 
  },
  re_password: {
    value: '',
    errorMsg: '' 
  },
  formValid: false

}

const Signup = () => {

  const [state, dispatch] = useReducer(signupReducer, initialState)
  const {
    first_name,
    last_name,
    username,
    phone_number,
    address,
    email,
    password,
    re_password,
    formValid
  } = state



  const submitForm = (event) => {

  }

  return (
    <div className="background-blue">
      <div className="main-container flex-row">
        <form className="form-container flex-col gap-16p falign-center" action="/" method="POST"
          onSubmit={(e) => { submitForm(e) }}>
          <a className="logo-link" href="/#">
            <img src="/media/imgs/favicon.png" alt="" className="logo" />
          </a>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="first_name">First Name:
            </label>
            <input type="text" name="first_name" id="first_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'first_name', value: e.currentTarget.value }) }} />
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="last_name">Last Name:
            </label>
            <input type="text" name="last_name" id="last_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'last_name', value: e.currentTarget.value }) }} />
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="username">Username:
            </label>
            <input type="text" name="username" id="username" onChange={(e) => { dispatch({ type: 'enterValue', field: 'username', value: e.currentTarget.value }) }} />
            {username.errorMsg && <InputError class='error-msg' msg={username.errorMsg} />}
          </div>



          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="phone_number">Phone Number:
            </label>
            <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80"
              onChange={(e) => { dispatch({ type: 'enterValue', field: 'phone_number', value: e.currentTarget.value }) }}
              onBlur={() => { dispatch({ type: 'blurPhone' }) }} />

            {phone_number.errorMsg && <InputError class='error-msg' msg={phone_number.errorMsg} />}
          </div>



          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="address">Address:
            </label>
            <textarea name="address" id="address" cols="30" rows="4" onChange={(e) => { dispatch({ type: 'enterValue', field: 'address', value: e.currentTarget.value }) }}></textarea>
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="email">Email:
            </label>
            <input type="email" name="email" id="email" placeholder="example@gmail.com"
              onChange={(e) => { dispatch({ type: 'enterValue', field: 'email', value: e.currentTarget.value }) }}
              onBlur={() => { dispatch({ type: 'blurEmail' }) }}
            />
            {email.errorMsg && <InputError class='error-msg' msg={email.errorMsg} />}

          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="password">Password:
            </label>
            <input type="password" name="password" id="password"
              onChange={(e) => { dispatch({ type: 'enterValue', field: 'password', value: e.currentTarget.value }) }}
              onBlur={() => { dispatch({ type: 'blurPassword' }) }}
            />
            {password.errorMsg && <InputError class='error-msg' msg={password.errorMsg} />}
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="rePassword">Re-password:
            </label>
            <input type="password" name="rePassword" id="rePassword"
              onChange={(e) => { dispatch({ type: 'enterValue', field: 're_password', value: e.currentTarget.value }) }}
              onBlur={() => { dispatch({ type: 'blurRePassword' }) }}
            />
            {re_password.errorMsg && <InputError class='error-msg' msg={re_password.errorMsg} />}
          </div>

          <div className="button-wrapper flex-row gap-8p fjust-center">


            <button type="submit" className="btn-r btn-r-dark">
              Sign up
            </button>

            <a href="/#" className="btn-r btn-r-purple">Already a member?</a>

          </div>
        </form>

        <div className="split-screen-signup">
          <img src="/media/imgs/sleeping-cat.jpg" alt="" />
        </div>


      </div>
    </div>

  )

}
export default Signup;
