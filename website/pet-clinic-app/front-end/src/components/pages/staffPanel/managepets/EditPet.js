import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from "../../adoptionAds/adoptionMotion"
import PhotoInfo from "../../../utils/up_photo_info/PhotoInfo"
import InputError from "../../../utils/formErrorMsg/InputError"
import dateFormat from "dateformat"


const itemMotion = adoptionMotion

// this data will be used in the form's date input
const today = new Date()
const maxDate = dateFormat(today, 'isoDate')

const minDate = dateFormat(today.setMonth(today.getMonth() - 30 * 12), 'isoDate')


const EditPet = ({ setOpenEditModal, state, dispatch }) => {

  


  

  const selectColor = (event) => {
    dispatch({ type: 'selectColor', color: event.target.innerHTML })
  }

  return (
    <AnimatePresence>
      {
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

                <InputError style={{ left: '40%' }} class='error-msg' msg={state.photo.errorMsg} />

              }
            </div>
            {state.photo.url &&
              <PhotoInfo
                fileURL={state.photo.url}
                fileName={state.photo.value.name}
                fileSize={Math.round(state.photo.value.size / 1000)} />
            }
            { !state.photo.url && state.pets.length  &&
              <div className="photo-info-wrapper flex-row gap-32p falign-center">
                <img alt='miniphoto' className="mini-pet-photo" src={state.pets[state.petIndex].photo ? URL.createObjectURL(new Blob([new Uint8Array(state.pets[state.petIndex].photo.data)])) : '/media/imgs/cat.png'} />
              </div>
              
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
              <label className="half-label" htmlFor="breed_name">Select Colors max 3:*
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

  )
}

export default EditPet