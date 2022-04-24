
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState, useContext, useEffect } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"

import EditUser from './EditUser'
import useManageUsers from '../../../shared/hooks/manageusers-hook';
import { authContext } from '../../../shared/context/auth-context'
import { pageLoadingContext } from '../../../shared/context/loading-context'
import useFetch from '../../../shared/hooks/fetch-hook'
import Modal from '../../../utils/modal/Modal';

const initialData = {

  isGettingUsers: true,
  users: null,
  gettingUsersFailure: '',

  userToChange: null,
  username: '',
  currentRole: '',
  newRole: 'unselected',
  isUpdatingRole: false,
  updateRoleResult: '',
  updateRoleFailure: '',

  userToDelete: null,
  isDeletingUser: false,
  deleteUserResult: '',
  deleteUserFailure: '',

}

const ManageUsers = () => {

  //state for handling the delete modal
  const [openModal, setOpenModal] = useState(false)

  //state for handling edit role and data modal
  const [openEditModal, setOpenEditModal] = useState(false)

  const [state, dispatch] = useManageUsers(initialData)
  const auth = useContext(authContext)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const sendRequest = useFetch()

  useEffect(() => {
    let isMount = true
    const getUsers = async () => {
      try {
        const users = await sendRequest('http://localhost:5000/admin/users', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (users && isMount)
          dispatch({ type: 'getUsersSuccess', data: users })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getUsersFailure', error: e.message })
      }
    }
    getUsers()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateRole = async () => {
      try {
        const response = await sendRequest(`http://localhost:5000/admin/users/${state.userToChange}`, 'PATCH', JSON.stringify({
          newRole: state.newRole
        }), {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        })
        if (response && isMount)
          dispatch({ type: 'updateRoleSuccess', data: response.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'updateRoleFailure', error: e.message })
      }
    }
    if (state.isUpdatingRole){
      updateRole()
    }
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.isUpdatingRole, state.newRole, state.userToChange])
  useEffect(() => {
    let isMount = true
    const deleteUser = async () => {
      try {
        const response = await sendRequest(`http://localhost:5000/admin/users/${state.userToDelete}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`,
        })
        if (response && isMount)
          dispatch({ type: 'deleteUserSuccess', data: response.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'deleteUserFailure', error: e.message })
      }
    }
    if (state.isDeletingUser)
     deleteUser()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.isDeletingUser, state.userToDelete])

  useEffect(() => {
    setPageIsLoading(state.isGettingUsers || state.isUpdatingRole || state.isDeletingUser)
  }, [setPageIsLoading, state.isGettingUsers, state.isUpdatingRole, state.isDeletingUser])

  useEffect(() => {
    if (!openModal && !state.isDeletingUser)
      dispatch({ type: 'clearUserToDelete' })
    if (!openEditModal && !state.isDeletingUser)
      dispatch({ type: 'clearUserToChange' })
  }, [openModal, openEditModal, dispatch, state.isDeletingUser])

  return (

    <>
      {(state.gettingUsersFailure || state.updateRoleFailure || state.deleteUserFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.gettingUsersFailure || state.updateRoleFailure || state.deleteUserFailure }
          dispatch={dispatch}
        />}
      {(state.updateRoleResult || state.deleteUserResult) && 
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.updateRoleResult || state.deleteUserResult}
          dispatch={dispatch}
          refresh={true}
        />}

      <h4>Manage Users</h4>

      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} dispatch={dispatch} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
          {openEditModal && <EditUser setOpenEditModal={setOpenEditModal} state={state} dispatch={dispatch} />}
        </div>

        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                ID
              </Th>
              <Th>
                Username
              </Th>
              <Th>
                first name
              </Th>
              <Th>
                Last name
              </Th>
              <Th>
                email
              </Th>
              <Th>
                Role
              </Th>
              <Th>
                Change Role
              </Th>
              <Th>
                Delete
              </Th>

            </Tr>
          </Thead>
          <Tbody>

            {/* first user */}

            {
              state.users && state.users.map((user, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      {user.id}
                    </Td>
                    <Td>
                      {user.username}
                    </Td>
                    <Td>
                      {user.first_name}
                    </Td>
                    <Td>
                      {user.last_name}
                    </Td>
                    <Td>
                      {user.email}
                    </Td>
                    <Td>
                      {user.stmem_type ? user.stmem_type : 'client'}
                    </Td>
                    <Td>


                      <button className="my-great-button margin-bottom"
                        onClick={() => {
                          window.scrollTo(0, 0)
                          setOpenEditModal(true)
                          setOpenModal(false)
                          dispatch({ type: 'selectUserToChange', data: user.id, data2: user.username, data3: user.stmem_type ? user.stmem_type : 'client' })
                        }}><i className={state.userToChange === user.id ? "fa-regular fa-pen-to-square active" : "fa-regular fa-pen-to-square"}></i></button>


                    </Td>
                    <Td>
                      <button className="my-great-button margin-bottom"
                        onClick={() => { 
                          window.scrollTo(0, 0)
                          setOpenModal(true)
                          setOpenEditModal(false)
                          dispatch({ type: 'selectUserToDelete', data: user.personal_id })
                         }}
                      ><i className={state.userToDelete === user.personal_id ?
                        "fa-regular fa-trash-can active" : "fa-regular fa-trash-can" }></i></button>
                    </Td>

                  </Tr>
                )
              })
            }
          </Tbody>



        </Table>

      </div>
    </>
  )
}

export default ManageUsers