import { useEffect, useContext } from "react";
import useFetch from "../../shared/hooks/fetch-hook";
import useLoginForm from "../../shared/hooks/login-form-hook";
import { authContext } from "../../shared/context/auth-context";
import { Link } from "react-router-dom";
import { pageLoadingContext } from "../../shared/context/loading-context";

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
    dispatch({ type: 'validate' })
  }


  // use the form hook
  const [state, dispatch] = useLoginForm(initialState)

  // use the fetch hook
  const sendRequest = useFetch(dispatch)

  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  
  // useWhatChanged([state.isLoading, state.dataToSend, sendRequest, auth, state.responseData])

  // if we have async operation inside use effect we have to wrap the operation with an async function inside the useeffect and then we should call the same function again inside the useEffect without using await
  useEffect(() => {

    let isMount = true
    const fetchUser = async () => {
      try {
        console.log(process.env.REACT_APP_BACKEND_URL)
        const parsedData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/login`,
          'POST',
         JSON.stringify(state.dataToSend),
         {
          'Content-Type': 'application/json'
        })  
        if (parsedData && isMount)
          dispatch({ type: 'success', data: parsedData})      
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
      
      
    }
    // isLoading changes from false to true if the validation process  passed successfully 
    if (state.isLoading)
      fetchUser()

    return () => {
      isMount = false
      setPageIsLoading(false)

    }
  }, [state.isLoading, state.dataToSend, sendRequest, dispatch,  setPageIsLoading])

  useEffect(() => {
      setPageIsLoading(state.isLoading)
  
  }, [state.isLoading, setPageIsLoading])

  // after data been fetched if we have a token inside the data that means the login was successfull so we login
  useEffect(() => {
    if (state.responseData.token)
      auth.login(state.responseData.user.id, state.responseData.token, state.responseData.user.stmem_type)
  }, [state.responseData, auth])

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

                            <Link to='/signup' className="btn-r btn-r-dark" >
                            Not a member?
                            </Link>
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
