import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { adoptionMotion } from '../adoptionAds/adoptionMotion'
import { useRef } from "react/cjs/react.development"




// function to fetch adoption post data


const serverFetch1 = () => {

  return new Promise((resolve, reject) => {

    const posts = []

    for (let i = 0; i < 10; i++) {
      posts.push({
        id: i,
        type: 'cat',
        breed: 'British',
        title: 'Ads info Lorem ipsum dolor sit amet consectetur adipisicing elit.ipsum dolor sit amet consectetur adipisicing elit.',
        img: "media/imgs/post-image.jpg",
        createdAt: '24 Jan 2021'
      })
    }
    //retreiving data from the database 

    //for now simulation to that

    setTimeout(() => {
      resolve(posts)
    }, 3000)
  })
}
const serverFetch2 = () => {

  return new Promise((resolve, reject) => {

    const posts = []

    for (let i = 40; i < 70; i++) {
      posts.push({
        id: i,
        type: 'cat',
        breed: 'British',
        title: 'Ads info Lorem ipsum dolor sit amet consectetur adipisicing elit.ipsum dolor sit amet consectetur adipisicing elit.',
        img: "media/imgs/post-image2.jpg",
        createdAt: '24 Jan 2021'

      })
    }
    //retreiving data from the database 

    //for now simulation to that

    setTimeout(() => {
      resolve(posts)
    }, 3000)
  })
}






const AdoptionAds = () => {


  const [postArr, setPostArr] = useState({
    isLoading: true,
    posts: []
  })
  const isMounted = useRef(false)
  const samePage = useRef(true)

  //setup the infinite scrolling
  // we want to preserve the observer's values all the time that why we use ref
  const observer = useRef()

  // every time the last node get mounted the lastpost is changed to the new last node
  const lastPost = useRef(null)

  const observeLast = useCallback(() => {
    // remove the attachment to the previous node so that scrolling up back to the previous last node wont fire a set
    if (observer.current) observer.current.disconnect()

    // create new attachment to the last node every thing written inside the arrow function will be called when there is an intersecting
    observer.current = new IntersectionObserver((entries) => {

      // if we are not intersecting with  the node or if loading is hapenning we do nothing
      if (!entries[0].isIntersecting || postArr.isLoading) return


      // When we touch the last node
      setPostArr((oldObj) => {
        return { ...oldObj, isLoading: true }
      })

    })

    if (lastPost.current) observer.current.observe(lastPost.current)
  }, [postArr.isLoading]);

  // const observeLast = (lastPost) => {



  //   // remove the attachment to the previous node so that scrolling up back to the previous last node wont fire a set
  //   if (observer.current) observer.current.disconnect()

  //   // create new attachment to the last node every thing written inside the arrow function will be called when there is an intersecting
  //   observer.current = new IntersectionObserver((entries) => {

  //     // if we are not intersecting with  the node or if loading is hapenning we do nothing
  //     if (!entries[0].isIntersecting || postArr.isLoading) return


  //     // When we touch the last node
  //     setPostArr((oldObj) => {
  //       return { ...oldObj, isLoading: true }
  //     })

  //   })

  //   if (lastPost) observer.current.observe(lastPost)
  // }


  // what happens onload
  useEffect(() => {
    serverFetch1().then((result) => {
      setPostArr({ isLoading: false, posts: result })
    }).catch((error) => {
      console.log(error)
    })
  }, [])




  //fetch from the database as the button gets pressed and update the posts array
  useEffect(() => {
    observeLast()
    if (isMounted.current) {
      if (postArr.isLoading) {
        if (samePage.current) {
          serverFetch2().then((result) => {
            setPostArr((oldPosts) => {
              return { isLoading: false, posts: [...oldPosts.posts, ...result] }
            })
          }).catch((error) => {
            console.log(error)
          })
        } else {
          serverFetch2().then((result) => {
            samePage.current = true
            setPostArr({ isLoading: false, posts: result })
          }).catch((error) => {
            console.log(error)
          })
        }

      }
    }
    else {
      isMounted.current = true
    }
  }, [postArr, observeLast])

  // find pets based of filters this will triggers the loading message by changing the loading state to true
  const findPets = () => {
    if (!postArr.isLoading) {
      samePage.current = false
      setPostArr((oldObj) => {
        return { ...oldObj, isLoading: true }
      })
    }
  }




  const itemMotion = adoptionMotion

  return (
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
            <select name="pet-type" id="pet-type">
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="bird">Bird</option>
            </select>

          </div>

          <div className="flex-col falign-start fjust-center filter-item gap-8p">
            <label htmlFor="pet-breed">
              Breed:
            </label>
            <select name="pet-breed" id="pet-breed">
              <option value="british">British</option>
              <option value="retriever">Retriever</option>
              <option value="momo">Momo</option>
            </select>

          </div>


          <div className="flex-col falign-start fjust-center filter-item gap-8p">
            <label htmlFor="pet-gender">
              Gender:
            </label>
            <select name="pet-gender" id="pet-gender">
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="everything">Both</option>
            </select>

          </div>

          <div className="flex-col fjust-center filter-item gap-8p">
            <button className="find-pets btn-rec-purple"
              onClick={() => { findPets() }}>Find Pets</button>
          </div>

        </div>



      </div>



      <p className='posts-title'>Recently posted ads</p>


      {/* here we put the ads */}

      {/* The non flex container that contains the animation container */}
      <div className="posts-main-container">
        <div className="posts-animated-container flex-row fjust-center gap-16p">


          <AnimatePresence exitBeforeEnter>
            {postArr.isLoading &&
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
            {postArr.posts.map((post, index) => {
              // mark the last post
              if (postArr.posts.length === index + 1)
                return (
                  <motion.a
                    key={post.id}
                    variants={itemMotion}
                    initial='initial'
                    animate='final'
                    exit='exit'
                    href="/#"
                    ref={lastPost}  //marking the last post
                    className="adoption-post gap-8p flex-col falign-center ">
                    <img src={post.img} alt="" className="post-image" />
                    <p>{post.id}</p>
                    <p><span>{post.type} - </span><span>{post.breed}</span></p>
                    <p className="pTitle">{post.title}</p>
                    <p><i className="fa fa-clock"></i>&nbsp;{post.createdAt}</p>
                    <button href="/#" className="btn-rec-blue">
                      View Post
                    </button>
                  </motion.a>
                )
              else
                return (
                  <motion.a
                    key={post.id}
                    variants={itemMotion}
                    initial='initial'
                    animate='final'
                    exit='exit'
                    href="/#"
                    className="adoption-post gap-8p flex-col falign-center ">
                    <img src={post.img} alt="" className="post-image" />
                    <p>{post.id}</p>
                    <p><span>{post.type} - </span><span>{post.breed}</span></p>
                    <p className="pTitle">{post.title}</p>
                    <p><i className="fa fa-clock"></i>&nbsp;{post.createdAt}</p>
                    <button href="/#" className="btn-rec-blue">
                      View Post
                    </button>
                  </motion.a>
                )

            }
            ) }
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter>
            {postArr.isLoading &&
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
  )
}

export default AdoptionAds
