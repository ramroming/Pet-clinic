// function to fetch adoption post data
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from "../../../adoptionAds/adoptionMotion"

const itemMotion = adoptionMotion

const serverFetch1 = () => {

  return new Promise((resolve, reject) => {

    const posts = []

    for (let i = 0; i < 4; i++) {
      posts.push({
        id: i,
        name: 'cat',
        gender: 'male',
        birthDate: '24 Jan 2021',
        breed: 'breed2',
      })
    }
    //retreiving data from the database 

    //for now simulation to that

    setTimeout(() => {
      resolve(posts)
    }, 3000)
  })
}

const PetInfo = () => {

  const [petsArr, setPetsArr] = useState({
    isLoading: true,
    pets: []
  })

  const [editToggler, setEditToggler] = useState(-1)


  useEffect(() => {
    serverFetch1().then((data) => {
      setPetsArr({ isLoading: false, pets: data })
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div className="profile-data pet-info flex-col falign-center gap-24p">
      <button type="button" className="create-pet-btn btn-rec-purple">
        Add a pet +
      </button>
      <p className='manage-pet-header'>Manage your current pets</p>
      <div className="manage-pets-container flex-col gap-12p">
        <AnimatePresence exitBeforeEnter>
          {petsArr.isLoading &&
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
        {
          petsArr.pets.map((pet) => {
            return (
              <motion.div
                key={pet.id}
                variants={itemMotion}
                initial='initial'
                animate='final'
                className="pet-card-form flex-row fjust-between ">
                <div className="manage-pet-card">
                  <img src="/media/imgs/dog2.jpg" alt="" className="pet-photo-manage" />
                  <button
                    onClick={() => {
                      setEditToggler(pet.id)
                    }}
                    type="button" className="btn-rec edit-pet-btn">Edit  Pet Info&nbsp;<i className="fas fa-pencil-alt"></i></button>
                  <button type="button" className="btn-rec remove-pet-btn">Remove Pet &nbsp;<i className="fas fa-trash-alt"></i></button>
                </div>
                <AnimatePresence>
                  {
                    editToggler === pet.id &&
                    <motion.form
                      variants={itemMotion}
                      initial='initial'
                      animate='final'
                      exit='exit'
                      className="profile-data edit-side-form flex-col falign-center gap-24p">

                      <div className="inputs-wrapper flex-col  gap-16p">
                        <div className="input-wrapper">
                          <label className="half-label" htmlFor="name">Pet Name:
                          </label>
                          <input type="text" name="name" id="name" />
                        </div>

                        <div className="gender-input-wrapper flex-row">
                          <label className="half-label" htmlFor="gender">Pet Gender:
                          </label>
                              <input type="radio" name="gender" id="male" value="male" />
                              <label className='gender-label' htmlFor="male">Male</label>
                            
                              <input type="radio" name="gender" id="female" value="female" />
                              <label className='gender-label' htmlFor="female">Female</label>
                         
                        </div>


                        <div className="input-wrapper  ">
                          <label className="half-label" htmlFor="birth_date">Birth Date:
                          </label>
                          <input type="date" name="birth_date" id="birth_date" />
                        </div>

                        <div className="input-wrapper upload-pet">
                          <label className="half-label">Photo:
                          </label>
                          <label htmlFor="photo" className="btn-r btn-r-outlined-blue ">
                            Press to upload&nbsp;
                            <i className="fas fa-upload"></i>
                          </label>
                          <input type="file" name="photo" id="photo" accept="image/*" />

                        </div>

                        <div className="input-wrapper ">
                          <label className="half-label" htmlFor="breed_name">Select Breed:
                          </label>
                          <select name="breed_name" id="breed_name">
                            <option value="">breed1</option>
                            <option value="">breed2</option>
                            <option value="">breed3</option>
                            <option value="">breed4</option>
                          </select>

                        </div>

                        <button type="submit" className="btn-r btn-r-blue">Update Pet's Info</button>
                      </div>

                    </motion.form>

                  }
                </AnimatePresence>

              </motion.div>
            )

          })
        }


      </div>

    </div>
  )
}

export default PetInfo