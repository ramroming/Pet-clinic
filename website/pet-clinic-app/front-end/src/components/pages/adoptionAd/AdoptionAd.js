import useAdoptionAd from "../../shared/hooks/adoptionad-hook"
import useFetch from '../../shared/hooks/fetch-hook'
import { useContext, useEffect } from 'react'
import { authContext } from '../../shared/context/auth-context'
import { useParams } from "react-router-dom"
import { pageLoadingContext } from "../../shared/context/loading-context"
import Modal from "../../utils/modal/Modal"
import React from 'react'
import dateFormat from "dateformat"
import InputError from "../../utils/formErrorMsg/InputError"
import { useNavigate } from "react-router-dom"


const initialData = {
  comment: {
    value: '',
    errorMsg: ''
  },
  isLoading: false,
  isCommenting: false,
  responseData: null,
  responseError: '',
  missingComment: '',
  

}
const AdoptionAd = () => {

  const [state, dispatch] = useAdoptionAd(initialData)
  const sendRequest = useFetch()
  const auth = useContext(authContext)
  const { id } = useParams()
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const navigate = useNavigate()

  useEffect(() => {
    let isMount = true
    const getAdoptionAd = async () => {
      dispatch({ type: 'start' })
      try {
        const adoptionAd = await sendRequest(`http://localhost:5000/adoptionads/${id}`, 'GET', null, {

          'Authorization': `Bearer ${auth.token}`
        })
        if (adoptionAd && isMount)
          dispatch({ type: 'success', data: adoptionAd })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getAdoptionAd()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, id, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isLoading)
  }, [state.isLoading, setPageIsLoading])

  const submitComment = () => {
    if (!state.isLoading)
      dispatch({ type: 'validate' })
  }
  useEffect(() => {
    let isMount = true
    setPageIsLoading(state.isCommenting)
    if(state.isCommenting) {
      const submitComment = async () => {
        try {
          const result = await sendRequest('http://localhost:5000/users/me/comments/', 'POST', JSON.stringify({
            ad_id: id,
            comment: state.comment.value
          }), {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          })
          if (result && isMount){
            dispatch({ type: 'successComment'})
            window.location.reload()
          }
        } catch (e) {
          if(isMount)
            dispatch({ type: 'failure', error: e.message })
        }
      }
      submitComment()
    }
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, id, sendRequest, setPageIsLoading, state.comment.value, state.isCommenting, navigate])
  return (
    <>
      {/* UI modals */}
      {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
          redirectTo={'/'}
        />}
      <div className=" adoption-ad-wrapper home-container flex-col falign-center gap-24p ">

        {/* first main flex item ++ pet intro, info and photo ++ */}
        <div className="pet-basic-info-wrapper flex-col falign-center fjust-center gap-24p">

          {/* first mini flex */}

          <div className=" wrapper flex-col falign-center fjust-center gap-16p">

            <div className="intro flex-col falign-center fjust-center gap-16p">
              <p className="intro-hi">hi i'm</p>
              <p className="pet-name">{state.responseData && state.responseData.adoptionAd.pet_name}</p>
              <p className="pet-breed">Breed: {state.responseData && state.responseData.adoptionAd.breed_name}</p>
            </div>

            <div className="pet-info flex-col gap-16p">

              <div className="flex-row gap-8p">
                <label>Age: </label>
                <p>{state.responseData && state.responseData.adoptionAd.birth_date}</p>
              </div>

              <div className="flex-row gap-8p">
                <label>Gender: </label>
                <p>{state.responseData && state.responseData.adoptionAd.gender}</p>
              </div>

              <div className="flex-row gap-8p">
                <label>Color: </label>
                <p>{state.responseData && state.responseData.adoptionAd.colors}</p>
              </div>

              <div className="flex-row gap-8p">
                <label>Located At: </label>
                <p>Owner house</p>
              </div>

            </div>


          </div>

          {/* second mini flex */}
          <div className="flex-col gap-16p fjust-center falign-center pet-image-container">
            <p>Posted By: <b>{state.responseData && state.responseData.adoptionAd.username}</b></p>
            <p>On: <b>{state.responseData && dateFormat(state.responseData.adoptionAd.date, 'default')}</b></p>
            {state.responseData && state.responseData.adoptionAd.photo ?
              <>
                <img src={URL.createObjectURL(new Blob([new Uint8Array(state.responseData.adoptionAd.photo.data)]))} alt="pet" />
                <button className="btn-rec adopt-btn">Adopt me!</button>
              </>
              :
              <>
                <img src="/media/imgs/nophotopet.jpg" alt='pet' />


              </>

            }
          </div>

        </div>

        {/* second main flex item ++ pet story & trainings ++ */}
        <div className="pet-story flex-col gap-16p">

          <div className="adopt-story flex-col">
            <h2>My story</h2>
            <p>{state.responseData && state.responseData.adoptionAd.story}</p>
          </div>

          <div className="training-story flex-col gap-8p">

            {state.responseData &&
              <>
                <h2>My trainings <i className="fas fa-medal"></i></h2>

                {!state.responseData.adoptionAd.trainings.length ?
                  <p>No Previous trainings for this pet </p> :
                  state.responseData.adoptionAd.trainings.map((training, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="flex-row gap-8p training-wrapper">
                          <label>Training: </label>
                          <p>{training.training}</p>
                        </div>

                        <div className="flex-row gap-8p training-wrapper">
                          <label>Trained by: </label>
                          <p>{training.trainer_first_name + ' ' + training.trainer_last_name}</p>
                        </div>
                      </React.Fragment>
                    )
                  })

                }
              </>
            }



          </div>





        </div>



        {/* third main flex item ++ check comments and leave a comment ++ */}

        <div className="comments-area-wrapper flex-col falign-center gap-8p">


          {/* wrapper of the comment text area and button to send comment */}
          <div className="leave-comment-wrapper flex-col falign-center gap-16p">
            {state.comment.errorMsg && <InputError direction='bottom' style={{ top: '2%', margin: '.5rem' }} class='error-msg' msg={state.comment.errorMsg} />}
            <textarea 
            name="comment" 
            id="comment"
            cols="35" 
            rows="5" 
            placeholder="feel free to share a comment!"
            value={state.comment.value}
            onChange={(e) => dispatch({ type: 'enterValue', field: 'comment', value: e.currentTarget.value})}>
            
            </textarea>
            {state.missingComment && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto', padding: '0.5rem' }}>{state.missingComment}</p>}
            <input 
            onClick={submitComment}
            className="btn-rec-purple" 
            type="submit" />
          </div>


          {/*wrapper of all the comments, I'm guessing we'll use pagination again :') */}
          <div className="all-comments-wrapper flex-col falign-center gap-8p">


            {/* each single comment wrapper */}
            {state.responseData &&
              <>
                {!state.responseData.comments.length
                  ?
                  <div className="single-comment-wrapper flex-col gap-8p">
                    {/* user's comment */}
                    <p>No comments yet on this post </p>

                  </div>
                  :
                  state.responseData.comments.map((comment, index) => {
                    return (
                      <div key={index} className="single-comment-wrapper flex-col gap-8p">

                        {/* the username */}
                        <div><i className="fas fa-user"></i>{state.responseData.adoptionAd.owner_id === comment.user_id ? 'Owner' : comment.username}</div>
                        <div><i className="fas fa-clock"></i>{dateFormat(comment.date, 'default')}</div>
                        {/* user's comment */}
                        <p>{comment.text}</p>

                      </div>
                    )
                  })}
              </>

            }


          </div>

        </div>


      </div>


    </>

  )
}

export default AdoptionAd
