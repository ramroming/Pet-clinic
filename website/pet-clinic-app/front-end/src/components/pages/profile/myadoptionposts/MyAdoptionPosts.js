import DeletePostModal from "./DeletePostModal"
import { useState, useEffect, useContext } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom'
import useMyAdoptionAds from '../../../shared/hooks/myadoptionads-hook'
import { pageLoadingContext } from "../../../shared/context/loading-context";
import useFetch from "../../../shared/hooks/fetch-hook";
import { authContext } from "../../../shared/context/auth-context";
import dateFormat from "dateformat";
import Modal from "../../../utils/modal/Modal";
import InputError from "../../../utils/formErrorMsg/InputError";


const initialData = {
  isLoading: false,
  responseData: null,
  responseError: '',
  postToDelete: '',
  isDeleting: false,
  deleteResult: '',
  editPost: false,
  postToUpdate: '',
  newStory: {
    value : '',
    errorMsg: ''
  },
  oldStory: '',
  isUpdating: false,
  updateResult: '',
  
}
const MyAdoptionPosts = () => {

  const [openModal, setOpenModal] = useState(false)
  const [state, dispatch] = useMyAdoptionAds(initialData)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()
  const auth = useContext(authContext)

  useEffect(() => {
    let isMount = true
    const getMyAdoptionAds = async () => {
      if (isMount)
        dispatch({ type: 'start' })
      try {
        const myAdoptionAds = await sendRequest('http://localhost:5000/users/me/adoptionads/', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (myAdoptionAds && isMount)
          dispatch({ type: 'success', data: myAdoptionAds })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getMyAdoptionAds()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])
  useEffect(() => {
    let isMount = true
    const deletePost = async () => {
      try {

        const result = await sendRequest(`http://localhost:5000/users/me/adoptionads/${state.postToDelete ? state.postToDelete : ''}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`,
        })
        if (result && isMount )
          dispatch({ type: 'successDelete', data: result.result})
      } catch (e) {
        if(isMount) 
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isDeleting && isMount){
      deletePost()
    }
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.isDeleting, state.postToDelete])
  useEffect(() => {
    let isMount = true
    const updatePost = async () => {
      try {
        const updateResult = await sendRequest(`http://localhost:5000/users/me/adoptionads/${state.postToUpdate}`, 'PATCH', JSON.stringify({
          story: state.newStory.value
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (isMount && updateResult)
          dispatch({ type: 'successUpdate', data: updateResult.result})
      } catch (e) {
        dispatch({ type: 'failure', error: e.message })
      }
    }
    if(state.isUpdating) {
      console.log('updating')
      console.log(JSON.stringify({story: state.newStory.value}))
      updatePost()
    }
    
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [dispatch, auth.token, sendRequest, state.isUpdating, state.newStory.value, setPageIsLoading, state.postToUpdate])


  useEffect(() => {
    setPageIsLoading(state.isLoading || state.isDeleting || state.isUpdating)
  }, [setPageIsLoading, state.isLoading, state.isDeleting, state.isUpdating])
  

  return (
    <>
      {/* UI modals */}
      {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
          redirectTo='/'
        />}
      {/* UI modals */}
      {state.deleteResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.deleteResult}
          dispatch={dispatch}
          refresh={true}
        />}
      {/* UI modals */}
      {state.editPost &&
        <Modal
          modalClass='edit'
          header='Edit your adoption post story'
          body={
            <>
              <p><b>Your post's old story:</b></p>
              <p style={{color: 'darkcyan', overflowY: 'auto'}}>"{state.oldStory}"</p>
              <p>{state.newStory.errorMsg && <InputError  style={{ top: '10%', margin: '.5rem' }} class='error-msg ' msg={state.newStory.errorMsg} />}</p>
              <textarea 
              name="story" 
              id="story"
              cols="35" 
              rows="5" 
              placeholder="New story for your post"
              value={state.newStory.value}
              onChange={(e) => dispatch({ type: 'enterValue', field: 'newStory', value: e.currentTarget.value})}>
              </textarea>
              
            </>
          }
          dispatch={dispatch}
        />}
      {state.updateResult &&
      <Modal
        modalClass='success'
        header='Success!!'
        body={state.updateResult}
        dispatch={dispatch}
        refresh={true}
      />}
      <h4>Adoption Posts Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} dispatch={dispatch} />}
        </div>


        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Post
              </Th>
              <Th>
                Created At
              </Th>
              <Th>
                Edit
              </Th>
              <Th>
                Status
              </Th>
              <Th>
                Delete
              </Th>

            </Tr>
          </Thead>
          <Tbody>

            {state.responseData && state.responseData.map((adoptionAd, index) => {
              return (
                <Tr key={index}>
                  <Td>
                  {adoptionAd.status === 0 ? 'Removed' : 
                    <Link 
                    target={'_blank'}
                    className="my-great-button" to={`/adoptionad/${adoptionAd.id}`}>
                      Click here to view
                    </Link>}
                    
                  </Td>
                  <Td>
                    {dateFormat(adoptionAd.date, 'default')}
                  </Td>
                  <Td>
                    {adoptionAd.status === 0 ? "Can't Edit" : <button 
                    id={index}
                    ad_id={adoptionAd.id}
                    onClick={(e) => {
                      dispatch({ type: 'selectpostToUpdate', data: e.currentTarget.id, realId: e.currentTarget.getAttribute('ad_id')})                       
                      dispatch({ type: 'editModalEnter' })
                    }}
                    className="my-great-button">
                      Click here to edit
                    </button>}
                    
                  </Td>
                  <Td style={{color: adoptionAd.status === 0 ? 'Green' : ''}}>
                    {adoptionAd.status === 0 ? 'Found new home' : 'Looking for new owner'}
                  </Td>
                  <Td>
                    {adoptionAd.status === 0 ? '-/-' : 
                    <button 
                    disabled={openModal}
                    style={{ color: openModal ? 'grey' : '', cursor: openModal ? 'default' : 'pointer'}}
                    className="my-great-button margin-bottom"
                      id={adoptionAd.id}
                      onClick={(e) => { 
                        window.scrollTo(0,0) 
                        dispatch({ type: 'selectPostToDelete', data: e.currentTarget.id})                       
                        setOpenModal(true)
                       }}
                    ><i className="fa-regular fa-trash-can"></i></button>}
                    
                  </Td>

                </Tr>
              )
            })}

          </Tbody>



        </Table>

      </div>

    </>


  )
}

export default MyAdoptionPosts