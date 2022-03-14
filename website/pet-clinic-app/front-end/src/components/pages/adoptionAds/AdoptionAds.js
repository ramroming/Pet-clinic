import { useEffect, useCallback, useRef, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from '../adoptionAds/adoptionMotion'
import { authContext } from '../../shared/context/auth-context'
import useFetch from '../../shared/hooks/fetch-hook'
import dateFormat from "dateformat"
import { Link } from "react-router-dom"
import React from 'react'
import useAdoptionAds from "../../shared/hooks/adoptionads-hook"
import Modal from '../../utils/modal/Modal'
import { pageLoadingContext } from "../../shared/context/loading-context"

// import {
//   useWhatChanged,
// } from '@simbathesailor/use-what-changed';





const MotionLink = motion(Link, { forwardMotionProps: true })
const initialData = {
  isLoading: true,
  isLoadingColors: false,
  getMore: false,
  posts: [],
  breeds: [],
  colors: [],
  selectedColors: [],
  noMore: false,
  responseError: '',
  ad_type: '',
  breed_name: '',
  gender: '',
  lastPost: ''
}

const AdoptionAds = () => {

  const sendRequest = useFetch()
  const [postState, dispatch] = useAdoptionAds(initialData)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const auth = useContext(authContext)


  const firstRender = useRef(true)
  const isMountedEffect = useRef(true)

  //setup the infinite scrolling
  // we want to preserve the observer's values all the time that why we use ref
  const observer = useRef()

  // every time the last node get mounted the lastpost is changed to the new last node
  const lastPost = useRef(null)




  const getAdoptionAds = useCallback(async (lastPost, ad_type, breed_name, gender, selectedColors = [], newRender) => {
    try {
      
      const adoptionAds = await sendRequest(`http://localhost:5000/adoptionads?last_date=${lastPost ? lastPost : ''}&ad_type=${ad_type ? ad_type : ''}&breed_name=${breed_name ? breed_name : ''}&gender=${gender ? gender : ''}&colors=${selectedColors.length ? selectedColors.join(',') : ''}`, 'GET', null, {
        'Authorization': `Bearer ${auth.token}`
      })
      if (adoptionAds.result.length === 0)
        dispatch({ type: 'noMore' })

      if (newRender) {
        if (isMountedEffect.current)
          dispatch({ type: 'otherRenders', data: adoptionAds })
      }
      else {
        if (isMountedEffect.current)
          dispatch({ type: 'firstRender', data: adoptionAds })
      }



    } catch (e) {
      if (isMountedEffect.current)
        dispatch({ type: 'failure', error: e.message })
    }
  }, [auth.token, sendRequest, dispatch])

  // what happens onload
  useEffect(() => {
    isMountedEffect.current = true
    getAdoptionAds()
    return () => {
      isMountedEffect.current = false
    }
  }, [getAdoptionAds])

  useEffect(() => {
    if (firstRender.current) {
      return
    }
    getAdoptionAds(null, postState.ad_type, postState.breed_name, postState.gender, postState.selectedColors, true)
  },
    [postState.ad_type, postState.breed_name, postState.gender, postState.selectedColors, getAdoptionAds])



  const observeLast = useCallback(() => {
    // remove the attachment to the previous node so that scrolling up back to the previous last node wont fire a set
    if (observer.current) {
      observer.current.disconnect()
    }


    // create new attachment to the last node every thing written inside the arrow function will be called when there is an intersecting
    observer.current = new IntersectionObserver((entries) => {

      // if we are not intersecting with  the node or if loading is hapenning we do nothing
      if (!entries[0].isIntersecting || postState.getMore) return

      // When we touch the last node
      dispatch({ type: 'start' })
      


    })

    if (lastPost.current) {
      observer.current.observe(lastPost.current)
    }
  }, [postState.getMore, dispatch])
  //fetch from the database as the button gets pressed and update the posts array
  // useWhatChanged([postState.getMore, observeLast, getAdoptionAds,postState.lastPost, postState.ad_type, postState.breed_name, postState.gender])
  useEffect(() => {
    isMountedEffect.current = true

    if (!postState.noMore && postState.posts)
      observeLast()
    if (!firstRender.current) {
      if (postState.getMore) {
        getAdoptionAds(postState.lastPost, postState.ad_type, postState.breed_name, postState.gender, postState.selectedColors)
      }
    }
    else {
      firstRender.current = false
    }
    return () => {
      isMountedEffect.current = false
    }
  }, [postState.noMore, postState.getMore, observeLast, getAdoptionAds, postState.lastPost, postState.ad_type, postState.breed_name, postState.gender, postState.selectedColors, postState.posts])

  // getting pets colors from the database
  useEffect(() => {
    let isMount = true
    if (isMount)
      dispatch({ type: 'getColors' })

    const getColors = async () => {
      try {
        const colors = await sendRequest(`http://localhost:5000/pets/colors`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (colors && isMount)
          dispatch({ type: 'getColorsSuccess', data: colors })
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
    setPageIsLoading(postState.isLoadingColors)
  }, [setPageIsLoading, postState.isLoadingColors])

  const itemMotion = adoptionMotion
  return (
    <>
      {/* UI modals */}
      {postState.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={postState.responseError}
          dispatch={dispatch}
          redirectTo='/'
        />}

      <div className="adoption-container home-container flex-col falign-center fjust-start gap-24p">

        {/* first flex item */}
        <div className=" adoption-filter-wrapper flex-col falign-center fjust-center fgap-16p">

          {/* first mini flex item */}
          <p>
            Find your perfect pet!
          </p>

          {/* second  mini flex item */}
          <div className="filter-container flex-col falign-center fjust-center gap-16p">

            <div className="flex-col falign-start fjust-center filter-item gap-8p">
              <label htmlFor="pet-type">
                Pet:
              </label>
              <select
                disabled={postState.isLoading}
                onChange={
                  (e) => {
                    dispatch({ type: 'enterValue', field: 'ad_type', value: e.currentTarget.value })
                  }}
                name="pet-type" id="pet-type"
                defaultValue={''}
              >
                <option value="">All</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
              </select>

            </div>

            <div className="flex-col falign-start fjust-center filter-item gap-8p">
              <label htmlFor="pet-breed">
                Breed:
              </label>
              <select
                disabled={postState.isLoading || !postState.ad_type}
                onChange={
                  (e) => {
                    dispatch({ type: 'enterValue', field: 'breed_name', value: e.currentTarget.value })
                  }}
                name="pet-breed" id="pet-breed" value={postState.breed_name}>
                <option value="">All</option>
                {postState.breeds.length && postState.breeds.map((breed, index) => {
                  return (
                    <option key={index} value={breed.name}>{breed.name}</option>
                  )
                })}
              </select>

            </div>


            <div className="flex-col falign-start fjust-center filter-item gap-8p">
              <label htmlFor="pet-gender">
                Gender:
              </label>
              <select
                disabled={postState.isLoading}
                onChange={
                  (e) => {
                    dispatch({ type: 'enterValue', field: 'gender', value: e.currentTarget.value })
                  }}
                name="pet-gender" id="pet-gender" defaultValue={''}>
                <option value="">Both</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
              </select>

            </div>

            <div className="flex-col fjust-center filter-item gap-8p">
              {/* <button className="find-pets btn-rec-purple"
                onClick={() => { findPets() }}>Find Pets</button> */}
            </div>

          </div>
        </div>

        <p style={{ fontSize: '1.5rem', color: 'purple' }}>Filter by color</p>
        <div className="flex-row" style={{ width: '80%' }}>
          {postState.colors.length !== 0 && !postState.isLoadingColors &&
            postState.colors.map((color, index) => {
              return (
                <div
                  className={postState.selectedColors.length && postState.selectedColors.includes(color.name) ? "color-tag  color-selected-purple" : "color-tag bright"}
                  key={index}
                >
                  <p
                    disabled={true}
                    onClick={(event) => {
                      if (postState.isLoading)
                        return
                      dispatch({ type: 'selectColor', color: event.target.innerHTML })
                    }}
                    colorid={index}
                  >{color.name}</p>
                </div>
              )
            })

          }
        </div>

        <p className='posts-title'>Recently posted ads</p>


        {/* here we put the ads */}

        {/* The non flex container that contains the animation container */}
        <div className="posts-main-container">
          <div className="posts-animated-container flex-row fjust-center gap-16p">


            <AnimatePresence exitBeforeEnter>
              {postState.isLoading &&
                <motion.div
                  variants={itemMotion}
                  initial='initial'
                  animate='final'
                  exit='exit'
                  key={'1s'}
                  className="loaderWrapper-top flex-row fjust-center">
                  <div className="lds-ripple"><div></div><div></div></div>
                </motion.div>

              }

            </AnimatePresence>
            
              {postState.posts.map((post, index) => {
                // mark the last post
                if (postState.posts.length === index + 1) {
                  if (postState.lastPost !== post.date)
                    dispatch({ type: 'lastPost', data: post.date })
                  return (
                    <MotionLink
                      key={post.id}
                      variants={itemMotion}
                      initial='initial'
                      animate='final'
                      exit='exit'
                      to={`/adoptionad/${post.id}`}
                      ref={lastPost}  //marking the last post
                      className="adoption-post gap-8p flex-col falign-center ">
                      <img src={URL.createObjectURL(new Blob([new Uint8Array(post.photo.data)]))} alt="" className="post-image" />
                      <p><span>{post.ad_type} - </span><span>{post.breed}</span></p>
                      <p className="pTitle">{post.breed_name}</p>
                      <p><i className="fa fa-clock"></i>&nbsp;{dateFormat(post.date, 'default')}</p>
                      <button className="btn-rec-blue">
                        View Post
                      </button>
                    </MotionLink>
                  )
                }
                else
                  return (
                    <MotionLink
                      key={post.id}
                      variants={itemMotion}
                      initial='initial'
                      animate='final'
                      exit='exit'
                      to={`/adoptionad/${post.id}`}
                      className="adoption-post gap-8p flex-col falign-center ">
                      <img src={URL.createObjectURL(new Blob([new Uint8Array(post.photo.data)]))} alt="" className="post-image" />
                      <p><span>{post.ad_type}  </span><span>{post.breed}</span></p>
                      <p className="pTitle">{post.breed_name}</p>
                      <p><i className="fa fa-clock"></i>&nbsp;{dateFormat(post.date, 'default')}</p>
                      <button
                        className="btn-rec-blue">
                        View Post
                      </button>
                    </MotionLink>
                  )

              }
              )}
            
            <AnimatePresence exitBeforeEnter>
              {postState.getMore &&
                <motion.div
                  variants={itemMotion}
                  initial='initial'
                  animate='final'
                  exit='exit'
                  className="loaderWrapper flex-row fjust-center">
                  <div className="lds-ripple"><div></div><div></div></div>
                </motion.div>
              }

            </AnimatePresence>

          </div>
            {postState.noMore && <div className="no-more"></div>}
        </div>
      </div>
    </>

  )
}

export default AdoptionAds
