import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import useRegisterPetForm from "../../shared/hooks/registerpet-form-hook";
import InputError from "../../utils/formErrorMsg/InputError";
import PhotoInfo from "../../utils/up_photo_info/PhotoInfo";
import { useContext, useEffect } from "react";
import useFetch from "../../shared/hooks/fetch-hook";
import { authContext } from "../../shared/context/auth-context";
import useReDirector from "../../shared/hooks/redirector-hook";


// this data will be used in the form's date input
const today = new Date()
const maxDate = dateFormat(today, 'isoDate')
const minDate = dateFormat(today.setMonth(today.getMonth() - 30 * 12), 'isoDate')



// intial data for the form reducer
const initialData = {
  pet_type: {
    value: 'cat',
    errorMsg: ''
  },
  name: {
    value: '',
    errorMsg: ''
  },
  gender: {
    value: 'male',
    errorMsg: ''
  },
  birth_date: {
    value: maxDate,
    errorMsg: ''
  },
  photo: {
    value: '',
    url: '',
    errorMsg: ''
  },
  breed_name: {
    value: '',
    errorMsg: ''
  },
  missingInput: false,
  isLoading: false,
  responseData: null,
  responseError: '',
  isLoadingBreeds: false,
  breeds: [],
  dataToSend: {},

}
const RegisterPet = () => {

  const [state, dispatch] = useRegisterPetForm(initialData)
  const sendRequest = useFetch(dispatch)
  const auth = useContext(authContext)
  const redirector = useReDirector()

  useEffect(() => {
    dispatch({ type: 'getBreeds' })
    const getBreeds = async () => {
      try {

        const parsedData = await sendRequest(`http://localhost:5000/pets/breeds?pet_type=${state.pet_type.value}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData)
          dispatch({ type: 'getBreedsSuccess', data: parsedData})
      } catch (e) {
        dispatch({ type: 'failure', data: e.message})
      }
    }

    
    getBreeds()
  }, [state.pet_type, sendRequest, auth.token, dispatch])


  useEffect(() => {
    const registerPet = async () => {
      try {
        const parsedData = await sendRequest(`http://localhost:5000/users/me/pets/`, 'POST', state.dataToSend, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData){
          dispatch({ type: 'success', data: parsedData })
          redirector({ redirectTo: '/myprofile/petinfo' })
        }
         
      } catch (e) {
        dispatch({ type: 'failure', error: e.message})
      }
    }
    
    if (state.isLoading){
      registerPet()
    }

  }, [state.isLoading, auth.token, sendRequest, state.dataToSend, dispatch, redirector])
  const submitForm = (e) => {
    e.preventDefault()
    dispatch({ type: 'validate' })
  }
  return (
    <div className="background-dark-blue">
      <div className="main-container flex-row">

        <form
          className="form-container flex-col gap-16p falign-center"
          onSubmit={(e) => submitForm(e)}
        >


          <Link
            to='/'
            className='logo-link'>
            <img src="/media/imgs/favicon.png" alt="" className="logo" />
          </Link>

          <div className="input-wrapper flex-col gap-8p">

            <label className="full-label" htmlFor="type_name">Select your pet:*
            </label>

            <div className="flex-row fjust-evenly icons-wrapper">

              {state.pet_type.errorMsg && <InputError class='error-msg' msg={state.pet_type.errorMsg} />}
              <label >
                <input
                  className="radio-img"
                  type="radio"
                  name="pet_type"
                  id="type_name"
                  defaultChecked
                />
                <img 
                onClick={() => dispatch({ type: 'enterValue', value: 'cat', field: 'pet_type' })}
                className="pet-icon" src="/media/imgs/cat-icon.png" alt="" />
              </label>

              <label  >
                <input
                  className="radio-img"
                  type="radio"
                  name="pet_type"
                  id="type_name"
                />
                <img 
                onClick={() => dispatch({ type: 'enterValue', value: 'dog', field: 'pet_type' })}
                className="pet-icon" src="/media/imgs/dog-icon.jpg" alt="" />
              </label>

              <label >
                <input
                  className="radio-img"
                  type="radio"
                  name="pet_type"
                  id="type_name"
                />
                <img 
                onClick={() => dispatch({ type: 'enterValue', value: 'bird', field: 'pet_type' })}
                className="pet-icon low-op" src="/media/imgs/bird-icon.png" alt="" />
              </label>

            </div>

          </div>

          <div className="input-wrapper flex-row fjust-between">
            <label
              className="half-label"
              htmlFor="name">Pet Name:*
            </label>
            <input
              onChange={(e) => dispatch({ type: 'enterValue', field: 'name', value: e.currentTarget.value })}
              type="text"
              name="name"
              id="name" />
          </div>

          <div className="input-wrapper flex-col gap-8p">
            <label
              className="half-label"
              htmlFor="gender">Pet Gender:*
            </label>
            <div className="input-wrapper flex-row fjust-around">
              <div
                onClick={() => dispatch({ type: 'enterValue', field: 'gender', value: 'male' })}
                className="flex-row radio-wrapper fjust-center gap-8p">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  defaultChecked />
                <label
                  htmlFor="male">Male</label>
              </div>
              <div
                onClick={() => dispatch({ type: 'enterValue', field: 'gender', value: 'female' })}
                className="flex-row radio-wrapper fjust-center gap-8p">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female" />
                <label
                  htmlFor="female">Female</label>
              </div>
            </div>


          </div>


          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="birth_date">Birth Date:*
            </label>
            <input
              onChange={(e) => { dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'birth_date' }) }}
              type="date"
              name="birth_date"
              id="birth_date"
              value={state.birth_date.value}
              min={minDate}
              max={maxDate} />
          </div>

          <div className="input-wrapper flex-row fjust-between">
            {
              state.photo.errorMsg &&

              <InputError class='error-msg' msg={state.photo.errorMsg} />

            }
            <label className="half-label">Photo:
            </label>
            <label htmlFor="photo" className="btn-r btn-r-outlined-blue flex-row fjust-between">
              Press to upload
              <i className="fas fa-upload"></i>
            </label>
            <input
              onChange={(e) => dispatch({ type: 'uploadPhoto', field: 'photo', value: e.currentTarget.files[0], url: URL.createObjectURL(e.currentTarget.files[0]) })}
              type="file"
              name="photo"
              id="photo"
              accept=".png, .jpg, .jpeg" />

          </div>
          {state.photo.url &&
            <PhotoInfo
              fileURL={state.photo.url}
              fileName={state.photo.value.name}
              fileSize={Math.round(state.photo.value.size / 1000)} />
          }

          <div className="input-wrapper flex-row fjust-between">
            <label className="half-label" htmlFor="breed_name">Select Breed:*
            </label>
            <select
              onChange={(e) => dispatch({ type: 'enterValue', field: 'breed_name', value: e.currentTarget.value })}
              name="breed_name"
              id="breed_name">
              <option value="">Select a Breed</option>
              {state.breeds && state.breeds.map((breed, index) => {
                return <option key={index} value={breed.name}>{breed.name}</option>
              })}
            </select>

          </div>

          {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
          {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}


          <div className="button-wrapper flex-row gap-8p fjust-center">

            <button type="submit" className="btn-r btn-r-dark">
              Register Pet
            </button>

            <Link
              to="/"
              className="btn-r btn-r-purple">Go to home page</Link>

          </div>
        </form>

        <div className="split-screen-registerpet">
          <img src="/media/imgs/lovebirds.jpg" alt="" />
        </div>


      </div>
    </div>


  );
}


export default RegisterPet;
