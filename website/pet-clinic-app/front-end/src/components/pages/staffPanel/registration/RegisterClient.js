import { useEffect, useContext } from "react"
import InputError from "../../../utils/formErrorMsg/InputError"
import useFetch from "../../../shared/hooks/fetch-hook"
import useSignupForm from "../../../shared/hooks/signup-form-hook"
import { pageLoadingContext } from '../../../shared/context/loading-context';
import Modal from '../../../utils/modal/Modal';




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
  dataToSend: {},
  isLoading: false,
  missingInput: false,
  responseError: '',
  responseData: {}

}



const RegisterClient = () => {

  // using the form-hook
  const [state, dispatch] = useSignupForm(initialState)

  // using the fetch hook
  const sendRequest = useFetch()



  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading



  const submitForm = async (event) => {
    event.preventDefault()
    dispatch({ type: 'validate' })
  }
  

  // if we have async operation inside use effect we have to wrap the operation with an async function inside the useeffect and then we should call the same function again inside the useEffect without using await
  useEffect(() => {


    // wrapper function to enable us to use async functions inside useEffect
    const fetchUser = async () => {
      try {
        const parsedData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users`,
          'POST', JSON.stringify(state.dataToSend),
          {
            'Content-Type': 'application/json'
          })
        if (parsedData)
          dispatch({ type: 'success', data: parsedData })
      } catch (e) {
        dispatch({ type: 'failure', error: e.message })
      }

    }

    // isLoading changes from false to true if the validation process  passed successfully 
    if (state.isLoading) {
      fetchUser()
    }
  }, [state.dataToSend, state.isLoading, sendRequest, dispatch])

  useEffect(() => {
    setPageIsLoading(state.isLoading)
  }, [state.isLoading, setPageIsLoading])
  

  return (
    <>
      {state.responseData.token &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={'Client has been registered successfully'}
          dispatch={dispatch}
          refresh={true}
        />}
      <h4>Registration</h4>
      
      <div className="flex-col falign-center" style={{ paddingTop: '1rem' }}>
          <form className="form-container flex-col gap-16p falign-center" action="/" method="POST"
            onSubmit={(e) => submitForm(e)}>
            <a className="logo-link" href="/#">
              <img src="/media/imgs/favicon.png" alt="" className="logo" />
            </a>

            {/* <div className="x-close-panel"><button
                onClick={() =>setRegisterUser(false)}>
                <i className="fa-solid fa-xmark"></i></button></div> */}

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="first_name">First Name:*
              </label>
              <input type="text" name="first_name" id="first_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'first_name', value: e.currentTarget.value }) }} />
            </div>

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="last_name">Last Name:*
              </label>
              <input type="text" name="last_name" id="last_name" onChange={(e) => { dispatch({ type: 'enterValue', field: 'last_name', value: e.currentTarget.value }) }} />
            </div>

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="username">Username:*
              </label>
              <input type="text" name="username" id="username" onChange={(e) => { dispatch({ type: 'enterValue', field: 'username', value: e.currentTarget.value }) }} />
              {state.username.errorMsg && <InputError class='error-msg' msg={state.username.errorMsg} />}
            </div>



            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="phone_number">Phone Number:
              </label>
              <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80"
                onChange={(e) => { dispatch({ type: 'enterValue', field: 'phone_number', value: e.currentTarget.value }) }}
                onBlur={() => { dispatch({ type: 'blurPhone' }) }} />

              {state.phone_number.errorMsg && <InputError class='error-msg' msg={state.phone_number.errorMsg} />}
            </div>



            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="address">Address:*
              </label>
              <textarea name="address" id="address" cols="30" rows="4" onChange={(e) => { dispatch({ type: 'enterValue', field: 'address', value: e.currentTarget.value }) }}></textarea>
            </div>

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="email">Email:*
              </label>
              <input type="text" name="email" id="email" placeholder="example@gmail.com"
                onChange={(e) => { dispatch({ type: 'enterValue', field: 'email', value: e.currentTarget.value }) }}
                onBlur={() => { dispatch({ type: 'blurEmail' }) }}
              />
              {state.email.errorMsg && <InputError class='error-msg' msg={state.email.errorMsg} />}

            </div>

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="password">Password:*
              </label>
              <input type="password" name="password" id="password"
                onChange={(e) => { dispatch({ type: 'enterValue', field: 'password', value: e.currentTarget.value }) }}
                onBlur={() => { dispatch({ type: 'blurPassword' }) }}
              />
              {state.password.errorMsg && <InputError class='error-msg' msg={state.password.errorMsg} />}
            </div>

            <div className="input-wrapper flex-row fjust-between">
              <label className="half-label" htmlFor="rePassword">Re-password:*
              </label>
              <input type="password" name="rePassword" id="rePassword"
                onChange={(e) => { dispatch({ type: 'enterValue', field: 're_password', value: e.currentTarget.value }) }}
                onBlur={() => { dispatch({ type: 'blurRePassword' }) }}
              />
              {state.re_password.errorMsg && <InputError class='error-msg' msg={state.re_password.errorMsg} />}
            </div>

            {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
            {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}

            <div className="button-wrapper flex-row gap-8p fjust-center">


              <button type="submit" className={state.isLoading ? "btn-r btn-r-dark disabled" : "btn-r btn-r-dark"} disabled={state.isLoading}>
                Register Client
              </button>


            </div>
          </form>
      </div>
    </>
  )
}

export default RegisterClient