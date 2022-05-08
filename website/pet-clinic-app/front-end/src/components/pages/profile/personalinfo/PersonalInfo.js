import { useState, useContext, useEffect } from "react"
import { authContext } from "../../../shared/context/auth-context"
import { pageLoadingContext } from "../../../shared/context/loading-context"
import useFetch from "../../../shared/hooks/fetch-hook"
import usePersonalInfo from "../../../shared/hooks/perosnalinfo-hook"
import InputError from "../../../utils/formErrorMsg/InputError"
import Modal from "../../../utils/modal/Modal"

const initialData = {
  isLoadingMyData: true,
  getMyDataResult: null,
  responseError: '',
  first_name: {
    value: '',
    errorMsg: ''
  },
  last_name: {
    value: '',
    errorMsg: ''
  },
  address: {
    value: '',
    errorMsg: ''
  },
  phone_number: {
    value: '',
    errorMsg: ''
  },
  photo: {
    URL: '',
    value: '',
    errorMsg: ''
  },
  missingInput: false,
  isUpdating: false,
  dataToUpdate: null,
  updateResult: '',
  photoChanged: 'no',
}
const PersonalInfo = () => {
  const [editButton, setEditButton] = useState(false)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const [state, dispatch] = usePersonalInfo(initialData)

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
        const updateResult = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}users/me`, 'PATCH', state.dataToUpdate, {
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

  return (
    <>
    {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
          refresh={true}
        />}
      {state.updateResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.updateResult}
          dispatch={dispatch}
          refresh={true}
        />}
      <h4>Public Profile</h4>
      <form className="profile-data flex-col gap-24p">
        <div className="change-pic flex-col gap-8p">
          {
            state.photo.errorMsg &&

            <InputError class='error-msg' style={{ left: 0, top: 0, margin:0 }} msg={state.photo.errorMsg} />

          }
          <img

            src={state.photo.URL ? state.photo.URL : "/media/imgs/avatar.jpg"}
            alt="avatar" />
          <div className="change-pic-wrapper">
            <button
              onClick={() => setEditButton((oldState) => !oldState)}
              type="button" className="btn-rec"><i className="fas fa-pencil-alt"></i> Edit</button>

            {editButton &&
              <div className="change-pic-list flex-col gap-12p">

                <label htmlFor="profile_photo">
                  Press to upload
                  <i className="fas fa-upload"></i>
                </label>

                <input type="file" name="photo" id="profile_photo" onChange={(e) => {
                  setEditButton(false)
                  if (e.currentTarget.files.length !== 0)
                    return dispatch({ type: 'uploadPhoto', field: 'photo', value: e.currentTarget.files[0] })
                  return
                }}
                  accept=".png, .jpg, .jpeg" />
                <p 
                onClick={() => {
                  setEditButton(false)
                  dispatch({ type: 'removePhoto' })
                }}>Remove Photo</p>

              </div>
            }
          </div>
        </div>
        <div className="inputs-wrapper flex-col gap-16p">
          <div className="input-wrapper">
            <label htmlFor="first_name">First Name:* </label>
            <input type="text" name="firstName"
              id="first_name"
              value={state.first_name.value}
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'first_name', value: e.currentTarget.value })
              }}
               />
          </div>
          <div className="input-wrapper">
            <label htmlFor="last_name">Last Name:* </label>
            <input type="text" name="lastName" id="last_name"
              value={state.last_name.value}
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'last_name', value: e.currentTarget.value })
              }}
               />
          </div>
          <div className="input-wrapper">
            <label htmlFor="address">Address:* </label>
            <textarea name="address" id="address"
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'address', value: e.currentTarget.value })
              }}
              value={state.address.value} />
            {state.address.errorMsg && <InputError style={{ left: '90%' }} class='error-msg' msg={state.address.errorMsg} />}
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone_number">Phone Number:* </label>
            <input type="text" name="phoneNumber" id="phone_number"
              onChange={(e) => {
                dispatch({ type: 'enterValue', field: 'phone_number', value: e.currentTarget.value })

              }}
              onBlur={() => { dispatch({ type: 'blurPhone' }) }}
              value={state.phone_number.value} />
            {state.phone_number.errorMsg && <InputError style={{ left: '80%' }} class='error-msg' msg={state.phone_number.errorMsg} />}
          </div>
          {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
          {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}
          <button 
          type="button" 
          className="btn-r btn-r-blue"
          onClick={() => {
            dispatch({ type: 'validate' })
          }}
          >Update Profile</button>
        </div>

      </form>
    </>

  )
}
export default PersonalInfo