import { useEffect } from "react";
import useFetch from "../../shared/hooks/fetch-hook";
import useForm from "../../shared/hooks/form-hook";

const initialState = {
  username: {
    value: '',
    errorMsg: ''
  },
  password: {
    value: '',
    errorMsg: ''
  },
  dataToSend: {},
  isLoading: false,
  missingInput: false,
  responseError: '',
  responseData: {}
}
const Login = () => {

  const submitForm = (event) => {
    event.preventDefault()
    dispatch({ type: 'validateLogin' })
  }


  // use the form hook
  const [state, dispatch] = useForm(initialState)

  // use the fetch hook
  const sendRequest = useFetch(dispatch)


  useEffect(() => {

    const fetchUser = async () => {
      await sendRequest(
        'http://localhost:5000/users/login',
        'POST',
       JSON.stringify(state.dataToSend),
       {
        'Content-Type': 'application/json'
      })
    }
    if (state.isLoading)
      fetchUser()
  }, [state.isLoading, state.dataToSend, sendRequest])
    return (
        <>
            <div className="background-blue">
                <div className="main-container flex-row">
                    <form 
                    className="form-container flex-col gap-16p falign-center" 
                    onSubmit={(e) => {
                      submitForm(e)
                    }}>

                        <a className="logo-link" href="/#">
                            <img src="/media/imgs/favicon.png" alt="" className="logo"/>
                        </a>


                        <div className="input-wrapper flex-row fjust-between">
                            <label className="half-label" htmlFor="username">Username:
                            </label>
                            <input
                            onChange={(e) => {
                              dispatch({type: 'enterValue', field: 'username',value: e.currentTarget.value})
                            }} 
                            type="text" name="username" id="username"/>
                        </div>


                        <div className="input-wrapper flex-row fjust-between">
                            <label className="half-label" htmlFor="password">Password:
                            </label>
                            <input
                            onChange={(e) => {
                              dispatch({type: 'enterValue', field: 'password', value: e.currentTarget.value})
                            }} 
                            type="password" name="password" id="password"/>

                        </div>

                        {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Username and Password cannot be empty!</p>}
                        {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}

                        <div className="button-wrapper flex-row gap-8p fjust-center">

                            <button type="submit" className={state.isLoading ? "btn-r btn-r-dark disabled" : "btn-r btn-r-dark"}>
                                Login
                            </button>

                            <a href="/#" className="btn-r btn-r-dark">
                                Not a member?
                            </a>
                            <a href="/#" className="btn-r btn-r-purple">
                                Forgot your password?</a>

                        </div>

                    </form>

                    <div className="split-screen-login">
                        <img src="/media/imgs/dog2.jpg" alt=""/>
                    </div>


                </div>
            </div>


        </>
    );
}

export default Login;
