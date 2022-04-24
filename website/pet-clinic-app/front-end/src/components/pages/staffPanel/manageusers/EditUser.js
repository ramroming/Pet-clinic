import React from 'react'
import { Link } from 'react-router-dom'

const EditUser = ({ setOpenEditModal, state, dispatch }) => {
  return (


    <>
      <Link
        to='/'
        className='logo-link'>
        <img src="/media/imgs/favicon.png" alt="" className="logo" />
      </Link>
      <div className="input-wrapper flex-row fjust-between">
        <div className="flex-col gap-8p falign-center" style={{ marginTop: '1rem'}}>
          <label className="">Select new role for <span style={{ fontWeight: 'bold' }}>({state.username})</span>
          </label>
          <label className="">Current role <span style={{ fontWeight: 'bold' }}>({state.currentRole})</span>
          </label>
        </div>
        <select
          value={state.newRole}
          onChange={(e) => dispatch({ type: 'selectRole', value: e.currentTarget.value })}
          name="newRole"
          id="Role">
          <option value="unselected">Select Role</option>
          <option value="">Client</option>
          <option value="admin">Admin</option>
          <option value="receptionist">Receptionist</option>
          <option value="vet">Vet</option>
          <option value="groomer">Groomer</option>
          <option value="trainer">Trainer</option>
        </select>

      </div>


      <div className="button-wrapper flex-row gap-8p fjust-center">

        <button 
        disabled={state.newRole === 'unselected' }
        onClick={() => {
          dispatch({ type: 'updateRole' })
        }}
        type="submit" className={state.newRole === 'unselected' ? "btn-r btn-r-dark disabled" : "btn-r btn-r-dark"}>
          Update user role
        </button>
        <button className="btn-r btn-r-dark"
          onClick={() => {
            setOpenEditModal(false)
          }}>
          Cancel
        </button>

      </div>
    </>

  )
}

export default EditUser