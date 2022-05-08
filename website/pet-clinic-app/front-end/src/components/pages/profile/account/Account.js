import {  useContext, useEffect } from "react"
import { authContext } from "../../../shared/context/auth-context"
import { pageLoadingContext } from "../../../shared/context/loading-context"
import useFetch from "../../../shared/hooks/fetch-hook"
import useMyAccount from "../../../shared/hooks/myaccount-hook"
import InputError from "../../../utils/formErrorMsg/InputError"
import Modal from "../../../utils/modal/Modal"
const initialData = {
  isLoadingMyData: true,
  getMyDataResult: null,
  responseError: '',
  username: {
    value: '',
    errorMsg: ''
  },
  email: {
    value: '',
    errorMsg: ''
  },
  changePassword: 'no',

  old_password: {
    value: '',
    errorMsg: ''
  },
  new_password: {
    value: '',
    errorMsg: ''
  },
  missingInput: false,
  isUpdating: false,
  dataToUpdate: null,
  updateResult: '',

}
const Account = () => {
  const [state, dispatch] = useMyAccount(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

   useEffect(() => {
    let isMount = true
    const getMyData = async () => {
      try {
        const myData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}users/me`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && myData)
          dispatch({ type: 'successGetMyData', data: myData })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getMyData()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateData = async () => {
      try {
        const updateResult = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}users/me/account`, 'PATCH', JSON.stringify(state.dataToUpdate), {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && updateResult)
          dispatch({ type: 'successUpdate', data: updateResult.result })
      } catch (e) {
        if(isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isUpdating)
      updateData()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  } ,[auth.token, dispatch, sendRequest, setPageIsLoading, state.dataToUpdate, state.isUpdating])
  useEffect(() => {
    setPageIsLoading(state.isLoadingMyData || state.isUpdating)
  }, [state.isLoadingMyData, state.isUpdating, setPageIsLoading])

  const togglePass = () => {
    dispatch({ type: 'changePassword' })
  }
  return (
    
    <>
    {state.updateResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.updateResult}
          dispatch={dispatch}
          refresh={true}
        />}
      <h4>Account Management</h4>
      <form className="profile-data account-data flex-col gap-24p">

      <div className="inputs-wrapper flex-col gap-16p">
        <div className="input-wrapper">
          <label htmlFor="user_name">User Name:* </label>
          <input 
          value={state.username.value}
          onChange={(e) => {
            dispatch({ type: 'enterValue', field: 'username', value: e.currentTarget.value })
          }}
          type="text" name="username" id="user_name"  />
        </div>
        <div className="input-wrapper">
          <label htmlFor="e_mail">Email:* </label>
          <input 
          value={state.email.value}
          onChange={(e) => {
            dispatch({ type: 'enterValue', field: 'email', value: e.currentTarget.value })
          }}
          onBlur={() => { dispatch({ type: 'blurEmail' }) }}
          type="text" name="lastName" id="e_mail"  />
          {state.email.errorMsg && <InputError style={{ left: '80%' }} class='error-msg' msg={state.email.errorMsg} />}
        </div>
        <button
          onClick={togglePass}
          type="button" className="btn-r btn-r-dark change-pass">Change Password</button>
        {
          state.changePassword === 'yes' &&
          <>
            <div className="input-wrapper">
              <label htmlFor="old_pass">Old Password:* </label>
              <input 
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'old_password', value: e.currentTarget.value })
              }}
              type="password" name="old_pass" id="old_pass"  />
              
            </div>
            <div className="input-wrapper">
              <label htmlFor="new_pass">New Password:* </label>
              <input 
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'new_password', value: e.currentTarget.value })
              }}
              onBlur={() => { dispatch({ type: 'blurPassword' }) }}
              type="password" name="new_pass" id="new_pass"  />
              {state.new_password.errorMsg && <InputError style={{ left: '80%' }} class='error-msg' msg={state.new_password.errorMsg} />}
            </div>
          </>

        }
        {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
          {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}
        <button 
        onClick={() => {
          dispatch({ type: 'validate' })
        }}
        type="button" className="btn-r btn-r-blue">Update Account Info</button>
      </div>

    </form>
    </>
    
  )
}

export default Account