
import React from 'react'

const UpdatetTraining = ({ dispatch, state }) => {

  return (
    <div className="update-modal-background flex falign-center fjust-center">
      <div className="modal-container flex-col fgap-16p falign-center">
        <div className="x-close"><button
          onClick={() => dispatch({ type: 'updateModal', data: false })}>
          <i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="modal-title">
          Update Training History:
        </div>
        <form className="flex-col falign-center fjust-center
                 gap-16p">
          {/* first input */}

          {/* second input */}
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              Training:
            </label>
            <select
              value={state.trainingTypeId}
              onChange={(e) => {
                dispatch({ type: 'enterValue', data: e.currentTarget.value, field: 'trainingTypeId' })
              }}
            >
              <option value='0'>Select Training</option>
              {state.trainingTypes && state.trainingTypes.map((trainingType, index) => {
                return (<option key={index} value={trainingType.id}>{trainingType.name}</option>)
              })}
            </select>
          </div>
          {/* second input */}
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              Start date:
            </label>
            <input
              type={'date'}
              value={state.startDate}
              onChange={(e) => {
                dispatch({ type: 'enterDate', data: e.currentTarget.value, field: 'startDate' })
              }}
            />
          </div>
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              End date:
            </label>
            <input
              type={'date'}
              min={state.minDate}
              value={state.endDate}
              onChange={(e) => {
                dispatch({ type: 'enterDate', data: e.currentTarget.value, field: 'endDate' })
              }}
            />
          </div>

       
 

        </form>
        <div className="add-treatment-button-container flex-row gap-24p fjust-center">
          {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto', marginTop: '1rem' }}>Please Select all necessary fields </p>}
          <button
            disabled={state.isUpdatingTraining}
            onClick={() => {
              dispatch({ type: 'startUpdating' })
            }}
            className="btn-rec-purple">Update</button>
        </div>
      </div>
    </div>

  )
}

export default UpdatetTraining