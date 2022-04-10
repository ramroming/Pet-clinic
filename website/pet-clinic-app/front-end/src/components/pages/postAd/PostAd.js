import { useState, useEffect, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from "../../pages/adoptionAds/adoptionMotion"
import useFetch from '../../shared/hooks/fetch-hook'
import { Link } from "react-router-dom"

import { authContext } from "../../shared/context/auth-context"

const itemMotion = adoptionMotion


const PostAd = () => {

  const [petsArr, setPetsArr] = useState({
    isLoading: true,
    pets: [],
    responseError: false,
  })
  const sendRequest = useFetch()
  const auth = useContext(authContext)


  useEffect(() => {
    let isMount = true
    if (isMount)
      setPetsArr((oldState) => {
        return {...oldState, isLoading: true}
      })
    
    const getPets = async () => {
      try {
        const pets = await sendRequest('http://localhost:5000/users/me/pets/', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (pets && isMount) {
          setPetsArr((oldState) => {
            return {...oldState, isLoading: false, pets: pets}
          })
        }
      } catch (e) {
        if (isMount)
          setPetsArr((oldState) => {
            return {...oldState, responseError: e.message, isLoading: false}
          })
      }
    }
    getPets()
    return () => {
      isMount = false
    }

  }, [auth.token, sendRequest])

  return (
    <div className="post-pet-container">
      <div className="post-pet-dark-container flex-col gap-24p falign-center">
        <p className="select-pet">Select your pet that you want to put up for adoption: </p>
        {petsArr.isLoading &&
            <motion.div
              variants={itemMotion}
              initial='initial'
              animate='final'
              exit='exit'
              className="flex-row fjust-center">
              <div className="lds-ripple"><div></div><div></div></div>
            </motion.div>
          }
        <div className="post-pets-container flex-col gap-16p falign-center">
        <AnimatePresence exitBeforeEnter>
          
          {petsArr && petsArr.pets.length === 0 && !petsArr.isLoading &&
                <div className="flex-col falign-center gap-24p" style={{ width: '70%' }}>
                  <p style={{ color: 'white' }}>Looks like you have no registered pets, you can register your pet from here</p>
                  <Link
                    to={`/registerpet`}
                    state={{ from: '/postad' }}
                    className="btn-r btn-r-blue"
                    style={{ width: '9rem', padding: '.5rem' }}>
                    Register pet
                  </Link>
                </div>
              }
        </AnimatePresence>
          {
            petsArr.pets.map((pet, index) => {
              return (
                <motion.div
                  key={pet.id}
                  variants={itemMotion}
                  initial='initial'
                  animate='final'
                  className="pet-to-post flex-col gap-8p falign-center">
                  <p className="post-pet-name">{pet.name}</p>
                  <img src={pet.photo ? URL.createObjectURL(new Blob([new Uint8Array(pet.photo.data)])) : '/media/imgs/cat.png'} alt="pet-img" className="post-pet-img" />
                  <Link
                  className="post-pet-button btn-rec-purple"
                  to={`/postpreview/${pet.id}`}
                  >Put up for adoption</Link>
                </motion.div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
export default PostAd