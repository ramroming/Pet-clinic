import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from "../../pages/adoptionAds/adoptionMotion"

const itemMotion = adoptionMotion
const serverFetch1 = () => {

  return new Promise((resolve, reject) => {

    const posts = []

    for (let i = 0; i < 4; i++) {
      posts.push({
        id: i,
        name: 'Micky',
      })
    }
    //retreiving data from the database 

    //for now simulation to that

    setTimeout(() => {
      resolve(posts)
    }, 3000)
  })
}

const PostAd = () => {

  const [petsArr, setPetsArr] = useState({
    isLoading: true,
    pets: []
  })



  useEffect(() => {
    serverFetch1().then((data) => {
      setPetsArr({ isLoading: false, pets: data })
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div className="post-pet-container">
      <div className="post-pet-dark-container flex-col gap-24p falign-center">
        <p className="select-pet">Select your pet that you want to put for adoption: </p>
        
        <div className="post-pets-container flex-col gap-16p falign-center">
        <AnimatePresence exitBeforeEnter>
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
                  <img src="media/imgs/post-image2.jpg" alt="pet-img" className="post-pet-img" />
                  <button className="post-pet-button btn-rec-purple">Put for adoption</button>
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