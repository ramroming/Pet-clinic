// function to fetch adoption post data
import { useEffect, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from "../../adoptionAds/adoptionMotion"
import { Link } from 'react-router-dom'
import usePetInfo from "../../../shared/hooks/petinfo-hook"
import useFetch from "../../../shared/hooks/fetch-hook"
import { authContext } from "../../../shared/context/auth-context"
import { pageLoadingContext } from "../../../shared/context/loading-context"
import dateFormat from "dateformat"
import PhotoInfo from "../../../utils/up_photo_info/PhotoInfo"
import Modal from "../../../utils/modal/Modal"
import InputError from "../../../utils/formErrorMsg/InputError"
const itemMotion = adoptionMotion


// this data will be used in the form's date input
const today = new Date()
const maxDate = dateFormat(today, 'isoDate')

const minDate = dateFormat(today.setMonth(today.getMonth() - 30 * 12), 'isoDate')

const initialData = {
  isLoadingPets: true,
  getPetsResult: null,
  responseError: '',
  missingInput: false,
  isUpdating: false,
  isLoadingBreeds: false,
  dataToUpdate: null,
  updateResult: '',
  showUpdateMenu: false,
  selectedPet: null,
  pet_type: 'cat',
  breeds: [],
  selectedColors: [],
  isLoadingColors: false,
  colors: [],

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


}

const PetInfo = () => {


  const [state, dispatch] = usePetInfo(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  useEffect(() => {
    let isMount = true
    const getPet = async () => {
      try {
        const petData = await sendRequest('http://localhost:5000/users/me/pets/', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && petData)
          dispatch({ type: 'successGetPetData', data: petData })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getPet()
    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest])

  useEffect(() => {
    let isMount = true
    const getBreeds = async () => {
      try {

        const parsedData = await sendRequest(`http://localhost:5000/pets/breeds?pet_type=${state.pet_type}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData && isMount)
          dispatch({ type: 'getBreedsSuccess', data: parsedData })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', data: e.message })
      }
    }

    if (state.isLoadingBreeds)
      getBreeds()

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [sendRequest, auth.token, dispatch, setPageIsLoading, state.pet_type, state.isLoadingBreeds])

  useEffect(() => {
    let isMount = true
    if (isMount)
      dispatch({ type: 'getColors' })

    const getColors = async () => {
      try {

        const parsedData = await sendRequest(`http://localhost:5000/pets/colors`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData && isMount)
          dispatch({ type: 'getColorsSuccess', data: parsedData })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', data: e.message })
      }
    }


    getColors()

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [sendRequest, auth.token, dispatch, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateData = async () => {
      try {
        const updateResult = await sendRequest(`http://localhost:5000/users/me/pet/${state.selectedPet && state.selectedPet.id}`, 'PATCH', state.dataToUpdate, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && updateResult)
          dispatch({ type: 'successUpdate', data: updateResult.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isUpdating)
      updateData()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.dataToUpdate, state.isUpdating, state.selectedPet])

  useEffect(() => {
    setPageIsLoading(state.isLoadingBreeds || state.isLoadingColors || state.isUpdating)
  }, [state.isLoadingBreeds, state.isLoadingColors, state.isUpdating, setPageIsLoading])

  const selectColor = (event) => {
    dispatch({ type: 'selectColor', color: event.target.innerHTML })
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
      <h4>Pets Management</h4>
      <div className="profile-data pet-info flex-col falign-center gap-24p">
        {/* <button type="button" className="create-pet-btn btn-rec-purple">
        Add a pet +
      </button> */}
        <Link to='/registerpet' className="create-pet-btn btn-rec-purple">
          Add a pet +
        </Link>

        {state.responseError && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>{state.responseError}</p>}
        <p className='manage-pet-header'>Manage your current pets select to change</p>
        <div className="manage-pets-container flex-col gap-24p">
          <AnimatePresence exitBeforeEnter>
            {state.isLoadingPets &&
              <motion.div
                variants={itemMotion}
                initial='initial'
                animate='final'
                exit='exit'
                className="pets-loader flex-row fjust-center">
                <div className="lds-ripple-dark"><div></div><div></div></div>
              </motion.div>
            }
          </AnimatePresence>
          <div className="pet-slider flex-row fjust-center gap-8p">
            {state.getPetsResult && state.getPetsResult.map((pet, index) => {
              return (
                <div
                  key={index}
                  className={state.selectedPet && state.selectedPet.id === state.getPetsResult[index].id ? "pet-mini-card flex-col falign-center gap-8p selected" : "pet-mini-card flex-col falign-center gap-8p"}
                  onClick={() => {
                    dispatch({ type: 'selectPet', data: state.getPetsResult[index] })
                  }}
                >
                  <p>{pet.name}</p>
                  <img alt='miniphoto' className="mini-pet-photo" src={pet.photo ? URL.createObjectURL(new Blob([new Uint8Array(pet.photo.data)])) : '/media/imgs/cat.png'} />
                </div>
              )
            })}
          </div>
          <AnimatePresence>
            {
              state.showUpdateMenu &&
              <motion.form
                variants={itemMotion}
                initial='initial'
                animate='final'
                exit='exit'
                className="profile-data edit-side-form flex-col falign-center gap-24p">

                <div className="inputs-wrapper flex-col  falign-center gap-16p">
                  <div className="input-wrapper">
                    <label className="half-label" htmlFor="name">Pet Name:*
                    </label>
                    <input
                      type="text" name="name" id="name"
                      value={state.name.value}
                      onChange={(e) => { dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'name' }) }}
                    />
                  </div>

                  <div style={{ width: 'fit-content' }} className="gender-input-wrapper flex-row gap-8p">
                    <label className="" htmlFor="gender">Pet Gender:
                    </label>
                    <input type="radio" name="gender" id="male" value="male"
                      onChange={(e) => { dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'gender' }) }}
                      checked={state.gender.value === 'male'} />

                    <label className='' htmlFor="male">Male</label>

                    <input
                      type="radio" name="gender" id="female" value="female"
                      onChange={(e) => { dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'gender' }) }}
                      checked={state.gender.value === 'female'} />
                    <label className='' htmlFor="female">Female</label>

                  </div>


                  <div className="input-wrapper  ">
                    <label className="half-label" htmlFor="birth_date">Birth Date:*
                    </label>
                    <input
                      onChange={(e) => { dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'birth_date' }) }}
                      value={dateFormat(state.birth_date.value, 'isoDate')}
                      min={minDate}
                      max={maxDate}
                      type="date" name="birth_date" id="birth_date" />
                  </div>

                  <div className="input-wrapper upload-pet">
                    
                    <label className="half-label">Photo:
                    
                    </label>
                    <label htmlFor="photo" className="btn-r btn-r-outlined-blue ">
                      Press to upload&nbsp;
                      <i className="fas fa-upload"></i>
                    </label>
                    <input
                      onChange={(e) => {
                        if (e.currentTarget.files.length !== 0)
                          return dispatch({ type: 'uploadPhoto', field: 'photo', value: e.currentTarget.files[0], url: URL.createObjectURL(e.currentTarget.files[0]) })
                        return
                      }}
                      type="file"
                      name="photo"
                      id="photo"
                      accept=".png, .jpg, .jpeg" />


                  {
                      state.photo.errorMsg &&

                      <InputError style={{left: '40%'}} class='error-msg' msg={state.photo.errorMsg} />

                    }
                  </div>
                  {state.photo.url &&
                    <PhotoInfo
                      fileURL={state.photo.url}
                      fileName={state.photo.value.name}
                      fileSize={Math.round(state.photo.value.size / 1000)} />
                  }

                  <div className="input-wrapper ">
                    <label className="half-label" htmlFor="breed_name">Select Breed:*
                    </label>
                    {state.breeds.length !== 0 &&
                      <select
                        onChange={(e) => dispatch({ type: 'enterValue', field: 'breed_name', value: e.currentTarget.value })}
                        name="breed_name"
                        id="breed_name"
                        defaultValue={state.selectedPet.breed_name}>
                        <option value="">Select a Breed</option>
                        {state.breeds && state.breeds.map((breed, index) => {
                          return <option key={index} value={breed.name}>{breed.name}</option>
                        })}
                      </select>}

                  </div>
                  <div className="input-wrapper flex-row">
                    <label className="half-label" htmlFor="breed_name">Select Select Colors max 3:*
                    </label>
                    {state.colors && state.colors.length !== 0 && !state.isLoadingColors && state.selectedColors &&
                      state.colors.map((color, index) => {
                        return (
                          <div
                            className={state.selectedColors.length !== 0 && state.selectedColors.includes(color.name) ? "color-tag color-selected" : "color-tag"}
                            key={index}
                          >
                            <p
                              onClick={(event) => {
                                selectColor(event)
                              }}
                              colorid={index}
                            >{color.name}</p>
                          </div>
                        )
                      })

                    }

                  </div>
                  {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto' }}>Please Fill mandatory fields *</p>}
                  <button
                    onClick={() => dispatch({ type: 'validate' })}
                    type="button" className="btn-r btn-r-blue">Update Pet's Info</button>
                </div>

              </motion.form>

            }
          </AnimatePresence>




        </div>

      </div>
    </>

  )
}

export default PetInfo