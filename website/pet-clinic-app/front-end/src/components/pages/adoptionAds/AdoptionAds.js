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

import {
  useWhatChanged,
  setUseWhatChange,
} from '@simbathesailor/use-what-changed';





const MotionLink = motion(Link, { forwardMotionProps: true })
const initialData = {
  isLoading: true,
  posts: [],
  noMore: false,
  responseError: '',
  ad_type: '',
  breed_name: '',
  gender: ''
}

const AdoptionAds = () => {

  const sendRequest = useFetch()
  const [postState, dispatch] = useAdoptionAds(initialData)
  const auth = useContext(authContext)


 
  const isMounted = useRef(false)
  const isMountedEffect = useRef(true)
  const samePage = useRef(true)

  //setup the infinite scrolling
  // we want to preserve the observer's values all the time that why we use ref
  const observer = useRef()

  // every time the last node get mounted the lastpost is changed to the new last node
  const lastPost = useRef(null)

  console.log(lastPost.current)
  useWhatChanged([postState.isLoading, postState.noMore, dispatch])
  const observeLast = useCallback(() => {
    // remove the attachment to the previous node so that scrolling up back to the previous last node wont fire a set
    if (observer.current) observer.current.disconnect()

    // create new attachment to the last node every thing written inside the arrow function will be called when there is an intersecting
    observer.current = new IntersectionObserver((entries) => {

      // if we are not intersecting with  the node or if loading is hapenning we do nothing
      if (!entries[0].isIntersecting || postState.isLoading || postState.noMore) return


      console.log('observer')
      console.log(postState.isLoading)
      // When we touch the last node
      dispatch({ type: 'start' })


    })

    if (lastPost.current) observer.current.observe(lastPost.current)
  }, [postState.isLoading, postState.noMore, dispatch]);


  const getAdoptionAds = useCallback(async (ad_type, breed_name, gender) => {
    try {
      console.log(`http://localhost:5000/adoptionads?last_date=${lastPost.current ? lastPost.current.id : ''}&ad_type=${ad_type ? ad_type : ''}&breed_name=${breed_name ? breed_name : ''}&gender=${gender ? gender : ''}`)

      const adoptionAds = await sendRequest(`http://localhost:5000/adoptionads?last_date=${lastPost.current ? lastPost.current.id : ''}&ad_type=${ad_type ? ad_type : ''}&breed_name=${breed_name ? breed_name : ''}&gender=${gender ? gender : ''}`, 'GET', null, {
        'Authorization': `Bearer ${auth.token}`
      })
      if (adoptionAds.length === 0)
        dispatch({ type: 'noMore' })
      if (samePage.current){
        if (isMountedEffect.current)
          dispatch({ type: 'getFirstTime', data: adoptionAds})
      } else {
        if (isMountedEffect.current){
          samePage.current = true
          dispatch({ type: 'getNotFirst', data: adoptionAds})
        }
      }
    } catch (e) {
      if (isMountedEffect.current)
        dispatch({ type: 'failure', error: e.message })
    }
  }, [auth.token, sendRequest, dispatch])

  // what happens onload
  useEffect(() => {
    isMountedEffect.current = true
    console.log('fetch')
      getAdoptionAds()
    return () => {
      isMountedEffect.current = false
    }
  }, [getAdoptionAds])


  //fetch from the database as the button gets pressed and update the posts array
  useEffect(() => {
    isMountedEffect.current = true

    observeLast()
    if (isMounted.current) {
      if (postState.isLoading) {
        console.log('fetch 2')
        getAdoptionAds(postState.ad_type, postState.breed_name ,postState.gender)
      }
    }
    else {
      isMounted.current = true
    }
    return () => {
      isMountedEffect.current = false
    }
  }, [postState.isLoading, observeLast, getAdoptionAds, postState.ad_type, postState.breed_name, postState.gender])

  // find pets based of filters this will triggers the loading message by changing the loading state to true
  // const findPets = () => {

  //   if (!postState.isLoading) {
  //     samePage.current = false
  //     setPostState((oldObj) => {
  //       return { ...oldObj, isLoading: true }
  //     })
  //   }
  // }



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
              onChange={
                (e) => {
                  samePage.current = false
                  dispatch({ type: 'enterValue', field: 'ad_type', value: e.currentTarget.value})}}
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
              <select name="pet-breed" id="pet-breed" defaultValue={''}>
                <option value="">All</option>
                <option value="british">British</option>
                <option value="retriever">Retriever</option>
                <option value="momo">Momo</option>
              </select>

            </div>


            <div className="flex-col falign-start fjust-center filter-item gap-8p">
              <label htmlFor="pet-gender">
                Gender:
              </label>
              <select name="pet-gender" id="pet-gender" defaultValue={''}>
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
                  className="loaderWrapper-top flex-row fjust-center">
                  <div className="lds-ripple"><div></div><div></div></div>
                </motion.div>
              }
            </AnimatePresence>
            <AnimatePresence>
              {postState.posts.map((post, index) => {
                // mark the last post
                if (postState.posts.length === index + 1)
                  return (
                    <MotionLink
                      key={post.id}
                      id={post.date}
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
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
              {postState.isLoading &&
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
        </div>
      </div>
    </>

  )
}

export default AdoptionAds
