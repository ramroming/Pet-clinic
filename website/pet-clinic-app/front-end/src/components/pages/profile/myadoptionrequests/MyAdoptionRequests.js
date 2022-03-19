
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



}

const MyAdoptionRequests = () => {

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
        const adoptionRequests = await sendRequest('http://localhost:5000/users/me/requests', 'GET', null, {
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
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

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
    setPageIsLoading(state.isLoading || state.isDeleting)
  }, [setPageIsLoading, state.isLoading, state.isDeleting])


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
                      
                      className='are-you-sure-message'>By accepting the request you will be approving that a meeting with the requester has been conducted and the requester you have selected is the right candidate for your pet, and you are willing to transfer your pet's ownership to the requester. You can no longer see the requested pet in your profile and all data related to you pet will be handed to the new owner,Also by accepting you will be rejecting all other requesters in the list so is Yes your final answer ?</p>
                    <div className="are-you-sure-buttons-wrapper flex-row gap-8p fjust-center">
                      <button
                        onClick={() => dispatch({ type: 'areYouSure' })}
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
                                onClick={(e) => {
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
        <h3>Sent Adoption Requests</h3>
        <Table className="my-table">

          {!state.responseData || !state.responseData.sentRequests || !state.responseData.sentRequests.length ?
            <Thead>
              <Tr>
                <Th>
                  No sent requests
                </Th>
              </Tr>
            </Thead>
            :
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
                        <Link className="my-great-button" to={`/adoptionad/${request.adoption_ad_id}`}
                          target={'_blank'}>
                          Click here to view
                        </Link>
                      </Td>
                      <Td>
                        {dateFormat(request.date, 'default')}
                      </Td>
                      <Td>
                        {request.status}
                      </Td>

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

                    </Tr>
                  )
                })}

              </Tbody>
            </>

          }

        </Table>

        <h3>Received Adoption Requests</h3>

        <Table className="my-table">

          {state.responseData && state.responseData.finalReceived && !state.responseData.finalReceived.length &&
            <Thead>
              <Tr>
                <Th>
                  No received requests
                </Th>
              </Tr>
            </Thead>
          }
          {state.responseData && state.responseData.finalReceived && state.responseData.finalReceived.length &&
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
                            className="my-great-button margin-bottom"
                            onClick={(e) => {
                              dispatch({ type: 'showModalEnter', data: e.currentTarget.id })
                            }}
                          >You have {request.length} requests click to check <i className="fa-solid fa-circle-exclamation"></i></button>
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