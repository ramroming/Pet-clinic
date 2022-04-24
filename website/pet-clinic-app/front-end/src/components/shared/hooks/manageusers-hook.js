import { useReducer } from 'react'

const manageUsersReducer = (state, action) => {
  switch (action.type) {
    case 'getUsersSuccess':
      return {
        ...state,
        isGettingUsers: false,
        users: action.data
      }
    case 'getUsersFailure':
      return {
        ...state,
        isGettingUsers: false,
        gettingUsersFailure: action.error
      }
    case 'selectUserToChange':
      return {
        ...state,
        userToChange: action.data,
        username: action.data2,
        currentRole: action.data3,
        newRole: 'unselected'
      }
    case 'selectRole': 
      return {
        ...state,
        newRole: action.value
      }
    case 'updateRole':
      return {
        ...state,
        isUpdatingRole: true
      }
    case 'updateRoleSuccess':
      return {
        ...state,
        isUpdatingRole: false,
        updateRoleResult: action.data
      }
    case 'updateRoleFailure':
      return {
        ...state,
        isUpdatingRole: false,
        updateRoleFailure: action.error
      }
    case 'errorModalExit':
      return {
        ...state,
        updateRoleFailure: '',
        gettingUsersFailure: '',
        deleteUserFailure: ''
      }

    case 'selectUserToDelete':
      return {
        ...state,
        userToDelete: action.data,
      }
    case 'startDeleting':
      return {
        ...state,
        isDeletingUser: true,
      }
    case 'deleteUserSuccess':
      return {
        ...state,
        isDeletingUser: false,
        deleteUserResult: action.data
      }
    case 'deleteUserFailure':
      return {
        ...state,
        isDeletingUser: false,
        deleteUserFailure: action.error
      }
    case 'clearUserToDelete':
      return {
        ...state,
        userToDelete: null
      }
    case 'clearUserToChange':
      return {
        ...state,
        userToChange: null
      }
    default:
      break
  }
}
const useManageUsers = (initialData) => {
  const [state, dispatch] = useReducer(manageUsersReducer, initialData)
  return [state, dispatch]
}
export default useManageUsers