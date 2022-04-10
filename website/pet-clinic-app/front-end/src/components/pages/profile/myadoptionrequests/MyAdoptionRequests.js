
import DeletePostModal from "../myadoptionposts/DeletePostModal"
import React, { useContext, useEffect, useState, useRef } from 'react'
import EditAdoptionStatus from "./EditAdoptionStatus"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom'
import useMyAdoptionRequests from "../../../shared/hooks/myadoptionrequests-hook";
import { authContext } from "../../../shared/context/auth-context";
import { pageLoadingContext } from "../../../shared/context/loading-context";
import useFetch from "../../../shared/hooks/fetch-hook";
import dateFormat from "dateformat";
import Modal from "../../../utils/modal/Modal";

const initialData = {
  isLoading: true,
  responseData: null,
  responseError: '',
  requestToDelete: '',
  isDeleting: false,
  deleteResult: '',
  showModal: false,
  selectedRequest: null,
  areYouSureSubmit: false,
  isTransferingOwner: false,
  transferOwnerResult: '',
  selectedPet: '',
  selectedAd: '',
  selectedNewOwner: ''



}

const MyAdoptionRequests = (props) => {

  const [openModal, setOpenModal] = useState(false)
  const [openStatusModal, setOpenStatusModal] = useState(false)
  const [state, dispatch] = useMyAdoptionRequests(initialData)
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()
  const modalTopRef = useRef(null)


  const goTopModal = () => {
    modalTopRef.current.scrollIntoView()
  }

  useEffect(() => {
    let isMount = true
    const getMyAdoptionRequests = async () => {
      try {
        const URL = `${(auth.userRole === 'receptionist' || auth.userRole === 'admin') ? `http://localhost:5000/receptionist/adoptionRequests` : `http://localhost:5000/users/me/requests`}`

        const adoptionRequests = await sendRequest(URL, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (adoptionRequests && isMount)
          dispatch({ type: 'success', data: adoptionRequests })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    getMyAdoptionRequests()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, auth.userRole, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const deleteRequest = async () => {
      try {

        const result = await sendRequest(`http://localhost:5000/users/me/requests/${state.requestToDelete ? state.requestToDelete : ''}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`,
        })
        if (result && isMount)
          dispatch({ type: 'successDelete', data: result.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isDeleting && isMount) {
      deleteRequest()
    }
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.isDeleting, state.requestToDelete])


  useEffect(() => {
    let isMount = true
    const transferOwner = async () => {
      try {
        const URL = `${(auth.userRole === 'receptionist' || auth.userRole === 'admin') ? `http://localhost:5000/receptionist/pets/${state.selectedPet && state.selectedPet}/${state.selectedNewOwner && state.selectedNewOwner}/${state.selectedAd && state.selectedAd}` 
        : `http://localhost:5000/users/me/pets/${state.selectedPet && state.selectedPet}/${state.selectedNewOwner && state.selectedNewOwner}/${state.selectedAd && state.selectedAd}`}`

        const result = await sendRequest(URL, 'PATCH', null, {
          'Authorization': `Bearer ${auth.token}`,
        })
        if (result && isMount)
          dispatch({ type: 'successTransfer', data: result.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isTransferingOwner && isMount) {
      transferOwner()
    }
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, auth.userRole, dispatch, sendRequest, setPageIsLoading, state.isTransferingOwner, state.selectedAd, state.selectedPet, state.selectedNewOwner])



  useEffect(() => {
    setPageIsLoading(state.isLoading || state.isDeleting || state.isTransferingOwner)
  }, [setPageIsLoading, state.isLoading, state.isDeleting, state.isTransferingOwner])


  return (
    <>

      {state.responseError &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.responseError}
          dispatch={dispatch}
          redirectTo='/'
        />}
      {state.deleteResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.deleteResult}
          dispatch={dispatch}
          refresh={true}
        />}
      {state.transferOwnerResult &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.transferOwnerResult}
          dispatch={dispatch}
          refresh={true}
        />}
      {state.showModal &&
        <Modal
          modalClass='show'
          header='Your adoption ad wish list'
          body={
            <div
              className="are-you-sure-wrapper">
              <div

                className=" flex-col gap-12p">
                {state.areYouSureSubmit &&

                  <div
                    ref={modalTopRef}
                    className="are-you-sure-container flex-col gap-16p">
                    <p

                      className='are-you-sure-message'>By accepting the request you will be approving that a meeting with the requester has been conducted and the requester you have selected is the right candidate for your pet, and you are willing to transfer your pet's ownership to the requester. Your adoption post will be removed so you can no longer see the requested pet in your profile and all data related to you pet will be handed to the new owner,Also by accepting you will be rejecting all other requesters in the list so is Yes your final answer ?</p>
                    <div className="are-you-sure-buttons-wrapper flex-row gap-8p fjust-center">
                      <button
                        onClick={() => {
                          dispatch({ type: 'areYouSureConfirm' })
                        }
                        }
                        className="btn-r btn-r-blue accept-adoption-final">Yes</button>
                      <button
                        onClick={() => dispatch({ type: 'areYouSureExit' })}
                        className="btn-r btn-r-blue accept-adoption-final">No</button>
                    </div>
                  </div>

                }
                <Table className="my-table">
                  <Thead>
                    <Tr>
                      <Th>Sent AT</Th>
                      <Th>Status</Th>
                      <Th>Requester first name</Th>
                      <Th>Requester last name</Th>
                      <Th>Requester phone number</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      state.responseData && state.responseData.finalReceived[state.selectedRequest].map((request, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Tr>
                              <Td>{dateFormat(request.date, 'default')}</Td>
                              <Td>{request.status}</Td>
                              <Td>{request.requester_first_name}</Td>
                              <Td>{request.requester_last_name}</Td>
                              <Td>{request.requester_phone_number}</Td>
                              <Td><button
                                reqid={request.requester_id}
                                onClick={(e) => {
                                  dispatch({ type: 'selectRequester', data: e.currentTarget.getAttribute('reqid')})
                                  dispatch({ type: 'areYouSureEnter' })
                                  setTimeout(() => {
                                    goTopModal()
                                  }, 300);
                                }
                                }
                                disabled={state.areYouSureSubmit}
                                style={{
                                  backgroundColor: state.areYouSureSubmit ? 'grey' : '',
                                  color: state.areYouSureSubmit ? 'white' : '', cursor: state.areYouSureSubmit ? 'default' : 'pointer'
                                }}
                                className="btn-r btn-r-blue accept-adoption">Accept</button></Td>
                            </Tr>

                          </React.Fragment>


                        )
                      })
                    }


                  </Tbody>


                </Table>
              </div>
            </div>
          }
          dispatch={dispatch}
        />}
      <h4>Adoption Requests Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} dispatch={dispatch} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
          {openStatusModal && <EditAdoptionStatus closeModal={setOpenStatusModal} />}
        </div>
        {!props.onlyReceived &&
          <>
            <h3>Sent Adoption Requests</h3>
        <Table className="my-table">

          {state.responseData && state.responseData.sentRequests && state.responseData.sentRequests.length === 0 &&
          <Thead>
            <Tr>
              <Th>
                No sent requests
              </Th>
            </Tr>
          </Thead>
          }
          {state.responseData && state.responseData.sentRequests && state.responseData.sentRequests.length !== 0 &&
            <>
              <Thead>
                <Tr>
                  <Th>Pet You Requested</Th>
                  <Th>Sent At</Th>
                  <Th>Status</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>

                {state.responseData.sentRequests.map((request, index) => {
                  return (
                    <Tr key={`${index + '-tr'}`}>
                      <Td>
                        {request.status === 'pending' ?
                          <Link className="my-great-button" to={`/adoptionad/${request.adoption_ad_id}`}
                            target={'_blank'}>
                            Click here to view
                          </Link>
                          : request.status === 'accepted' ?
                            <Link
                              className="my-great-button" to={`/myprofile/petinfo`}
                            >
                              Check out your new pet
                            </Link>
                            :
                            'Post got removed'
                        }

                      </Td>
                      <Td>
                        {dateFormat(request.date, 'default')}
                      </Td>
                      <Td style={request.status === 'accepted' ? { color: 'green' } : request.status === 'rejected' ? { color: 'red' } : { color: 'black' }}>
                        {request.status === 'accepted' ? 'Your adoption request got accepted ': request.status === 'rejected' ? 'Pet got adopted by others': request.status}
                      </Td>

                      {request.status === 'pending' ? 
                      <Td>
                        <button
                          disabled={openModal}
                          style={{ color: openModal ? 'grey' : '', cursor: openModal ? 'default' : 'pointer' }}
                          className="my-great-button margin-bottom"
                          id={request.adoption_ad_id}
                          onClick={(e) => {
                            window.scrollTo(0, 0)
                            dispatch({ type: 'selectRequestToDelete', data: e.currentTarget.id })
                            setOpenModal(true)
                          }}
                        ><i className="fa-regular fa-trash-can"></i></button>
                      </Td> 
                      :
                        <Td>
                          -/-
                        </Td>
                      }


                    </Tr>
                  )
                })}

              </Tbody>
            </>

          }

        </Table>
          </>
        }
        

        <h3>Received Adoption Requests</h3>

        <Table className="my-table">

          {state.responseData && state.responseData.finalReceived && state.responseData.finalReceived.length === 0 &&
            <Thead>
              <Tr>
                <Th>
                  No received requests
                </Th>
              </Tr>
            </Thead>
          }
          {state.responseData && state.responseData.finalReceived && state.responseData.finalReceived.length !== 0 &&
            <>
              <Thead>
                <Tr>
                  <Th>Your Requested Pet</Th>
                  <Th>Requesters</Th>
                </Tr>
              </Thead>
              <Tbody>

                {state.responseData.finalReceived.map((request, index) => {
                  return (
                    <React.Fragment key={`index-${index}`}>
                      <Tr >
                        <Td>
                          <Link className="my-great-button" to={`/adoptionad/${request[0].adoption_ad_id}`}
                            target={'_blank'}>
                            Click here to view
                          </Link>
                        </Td>

                        <Td>
                          <button
                            id={index}
                            petid={request[0].pet_id}
                            adid={request[0].adoption_ad_id}
                            className="my-great-button margin-bottom"
                            onClick={(e) => {
                              dispatch({ type: 'ownershipData', petId: e.currentTarget.getAttribute('petid'),
                              adId: e.currentTarget.getAttribute('adid')
                              })
                              dispatch({ type: 'showModalEnter', data: e.currentTarget.id })
                            }}
                          >You have {request.length} request(s) click to check <i className="fa-solid fa-circle-exclamation"></i></button>
                        </Td>
                      </Tr>

                    </React.Fragment>


                  )
                })}

              </Tbody>
            </>

          }

        </Table>


      </div>
    </>


  )
}

export default MyAdoptionRequests