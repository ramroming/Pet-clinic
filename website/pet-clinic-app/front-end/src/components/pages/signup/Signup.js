import { useReducer } from "react";

const signupReducer = (state, action) => {
  switch (action.type) {
    case 'enterValue': {
      return {
        ...state,
        [action.field]: action.value
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
  first_name: '',
  last_name: '',
  username: '',
  phone_number: '',
  address: '',
  email: '',
  password: '',
  re_password: '',
  error: '',
  isLoading: false
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
    error,
    isLoading,
  } = state


  // fields that require validation has handlers as following

  const emailChange = (e) => {
    dispatch({ type: 'enterValue', field: 'email', value: e.currentTarget.value})
  }
  const submitForm = (event) => {

  }

  return (
    <div className="background-blue">
      <div className="main-container flex-row">
        <form className="form-container flex-col gap-16p falign-center" action="/" method="POST"
        onSubmit={(e) => {submitForm(e)}}>
          <a className="logo-link" href="/#">
            <img src="/media/imgs/favicon.png" alt="" className="logo" />
          </a>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="first_name">First Name:
            </label>
            <input type="text" name="first_name" id="first_name" onChange={(e) => {dispatch({ type: 'enterValue', field: 'first_name', value: e.currentTarget.value})}} />
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="last_name">Last Name:
            </label>
            <input type="text" name="last_name" id="last_name" onChange={(e) => {dispatch({ type: 'enterValue', field: 'last_name', value: e.currentTarget.value})}} />
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="username">Username:
            </label>
            <input type="text" name="username" id="username" onChange={(e) => {dispatch({ type: 'enterValue', field: 'username', value: e.currentTarget.value})}}/>
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="phone_number">Phone Number:
            </label>
            <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80" onChange={(e) => {dispatch({ type: 'enterValue', field: 'phone_number', value: e.currentTarget.value})}}/>
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="address">Address:
            </label>
            <textarea name="address" id="address" cols="30" rows="4" onChange={(e) => {dispatch({ type: 'enterValue', field: 'address', value: e.currentTarget.value})}}></textarea>
          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="email">Email:
            </label>
            <input type="email" name="email" id="email" placeholder="example@gmail.com" onChange={(e) => { emailChange(e)}}/>

          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="password">Password:
            </label>
            <input type="password" name="password" id="password" onChange={(e) => {dispatch({ type: 'enterValue', field: 'password', value: e.currentTarget.value})}}/>

          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="rePassword">Re-password:
            </label>
            <input type="password" name="rePassword" id="rePassword" onChange={(e) => {dispatch({ type: 'enterValue', field: 're_password', value: e.currentTarget.value})}}/>
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
