import usePostPreview from "../../shared/hooks/postpreview-hook"
import { useEffect, useContext } from 'react'
import useFetch from "../../shared/hooks/fetch-hook"
import { useParams } from "react-router"
import { authContext } from "../../shared/context/auth-context"
import { pageLoadingContext } from "../../shared/context/loading-context"
import { Link } from "react-router-dom"
import InputError from "../../utils/formErrorMsg/InputError"
import React from 'react'
import Modal from '../../utils/modal/Modal'


const initialData = {
  isLoading: false,
  isCreating: false,
  responseData: {},
  responseError: '',
  story: {
    value: '',
    error: ''
  },
  missingStory: '',
  responseCreate: '',

}
const PostReview = () => {

  const { id } = useParams()
  const [state, dispatch] = usePostPreview(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  useEffect(() => {
    let isMount = true
    const getPet = async () => {
      if (isMount)
        dispatch({ type: 'start' })
      try {
        const pet = await sendRequest(`http://localhost:5000/users/me/pets/${id}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (pet && isMount)
          dispatch({ type: 'success', data: pet })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getPet()
    return () => {
      isMount = false
    }
  }, [auth.token, dispatch, id, sendRequest])

  useEffect(() => {
    setPageIsLoading(state.isLoading)
  }, [state.isLoading, setPageIsLoading])

  // post creating
  useEffect(() => {
    let isMount = true
    if (isMount)
      setPageIsLoading(state.isCreating)
    const createPost = async () => {
      try {
        const result = await sendRequest('http://localhost:5000/users/me/adoptionads/', 'POST', JSON.stringify({
          pet_id: id,
          story: state.story.value
        }), {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        })
        if (result && isMount)
          dispatch({ type: 'successCreate', data: result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isCreating)
      createPost()

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [state.isCreating, setPageIsLoading, auth.token, dispatch, id, sendRequest, state.story])

  const createAd = () => {
    dispatch({ type: 'validate' })
  }
  return (
    <>
      {/* UI modals */}
      {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
        />}
        {state.responseCreate &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.responseCreate.response}
          dispatch={dispatch}
          redirectTo={`/adoptionad/${state.responseCreate.ad_id}`}
        />}
      <div className=" adoption-ad-wrapper home-container flex-col falign-center gap-24p ">

        <p className="post-review-header">This is a preview of how your adoption ad would be viewed by others</p>

        <p className="post-review-header-small">
          The info here is retrieved from your pet's profile,
          you can edit the info from<Link className="link" target={'blank'} to="/myprofile/petinfo"> here </Link>:).<br />
          feel free to provide more details in the pet's story box!
        </p>

        {/* first main flex item ++ pet intro, info and photo ++ */}
        <div className="pet-basic-info-wrapper flex-col falign-center fjust-center gap-24p">

          {/* first mini flex */}

          <div className=" wrapper flex-col falign-center fjust-center gap-16p">

            <div className="intro flex-col falign-center fjust-center gap-16p">
              <p className="intro-hi">hi i'm</p>
              <p className="pet-name">{state.responseData.pet_name && state.responseData.pet_name}</p>
              <p className="pet-breed">Breed: {state.responseData.breed_name && state.responseData.breed_name}</p>
            </div>

            <div className="pet-info flex-col gap-16p">

              <div className="flex-row gap-8p">
                <label>Age: </label>
                <p>{state.responseData.birth_date && state.responseData.birth_date}</p>
              </div>

              <div className="flex-row gap-8p">
                <label>Gender: </label>
                <p>{state.responseData.gender && state.responseData.gender}</p>
              </div>

              <div className="flex-row gap-8p">
                <label>Color: </label>
                {state.responseData.colors &&
                  <p>{state.responseData.colors}</p>
                }
              </div>

              <div className="flex-row gap-8p">
                <label>Located At: </label>
                <p>Owner house</p>
              </div>

            </div>


          </div>

          {/* second mini flex */}
          <div className="flex-col fjust-center falign-center pet-image-container">
            {state.responseData.photo ?
              <img src={URL.createObjectURL(new Blob([new Uint8Array(state.responseData.photo.data)]))} alt="pet" />
              :
              <>
                <img src="/media/imgs/nophotopet.jpg" alt='pet' />

                <Link target={'blank'} to="/myprofile/petinfo" className="btn-rec adopt-btn special">Dont forget to add a photo for your pet!</Link>
              </>

            }

          </div>

        </div>

        {/* second main flex item ++ pet story & trainings ++ */}
        <div className="pet-story flex-col gap-16p">

          <div className="adopt-story flex-col">
            <h2>My story</h2>
            {state.story.error && <InputError direction='bottom' style={{ top: '50%', margin: '.5rem' }} class='error-msg' msg={state.story.error} />}
            <textarea
              className="story-textarea" placeholder={`example: Looking for a cute, energetic little kitten? Come meet me and see if I'm the one for you!...`}
              value={state.story.value}
              onChange={(e) => dispatch({ type: 'enterValue', value: e.currentTarget.value, field: 'story' })}

            ></textarea>

            {state.missingStory && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto', padding: '0.5rem' }}>{state.missingStory}</p>}

            <input
              onClick={createAd}
              className="btn-rec-purple" type="submit" />
          </div>

          <div className="training-story flex-col gap-8p">


            {state.responseData.trainings &&
              <>
                <h2>My trainings <i className="fas fa-medal"></i></h2>

                {state.responseData.trainings.length === 0 ?
                  <p>No Previous trainings for this pet </p> :
                  state.responseData.trainings.map((training, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="flex-row gap-8p">
                          <label>Training: </label>
                          <p>{training.training}</p>
                        </div>

                        <div className="flex-row gap-8p">
                          <label>Trained by: </label>
                          <p>{training.trainer_first_name + ' ' + training.trainer_last_name}</p>
                        </div>
                        <br />
                      </React.Fragment>
                    )
                  })

                }
              </>
            }





          </div>



        </div>



      </div>
    </>

  )
}
export default PostReview