


import React from 'react'

const AddPetTreatment = ({ dispatch, state }) => {
  return (
    <div className="add-modal-background flex falign-center fjust-center">
      <div className="modal-container flex-col fgap-16p falign-center">
        <div 
        className="x-close"><button
          onClick={() => {
            if (state.isSavingTreatment)
              return
            dispatch({ type: 'addModal', data: false })}

          }>
          <i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="modal-title">
          Add new treatment:
        </div>
        <form className="flex-col falign-center fjust-center
                 gap-16p">
          {/* first input */}

          {/* second input */}
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              case:
            </label>
            <select
              value={state.caseId}
              onChange={(e) => {
                dispatch({ type: 'enterValue', data: e.currentTarget.value, field: 'caseId' })
              }}
            >
              <option value='0'>Select Case</option>
              {state.cases && state.cases.map((cAse, index) => {
                return (<option key={index} value={cAse.id}>{cAse.name}</option>)
              })}
            </select>
          </div>

          {/* fourth input */}
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              vaccine:
            </label>
            <select
              disabled={state.caseId !== 1}
              value={state.vaccineId}
              onChange={(e) => {
                dispatch({ type: 'enterValue', data: e.currentTarget.value, field: 'vaccineId' })
              }}
            >
              <option value='0'>Select Vaccine</option>
              {state.vaccines && state.vaccines.map((vaccine, index) => {
                return (<option key={index} value={vaccine.id}>{vaccine.name}</option>)
              })}
            </select>
          </div>
          {/* fifth input */}
          {
            state.medDoses.length && state.medDoses.map((medDose, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="update-style flex-row fjust-between falign-center gap-16p">
                    <label>
                      Medicine:
                    </label>
                    <select
                      disabled={state.caseId === 1 || !state.caseId}
                      value={medDose.medId}
                      onChange={(e) => {
                        dispatch({ type: 'enterMed', data: e.currentTarget.value, index })
                      }}
                    >
                      <option value='0'>Select Medicine</option>
                      {state.medicines && state.medicines.map((medicine, index) => {
                        return (<option key={index} value={medicine.id}>{medicine.name}</option>)
                      })}
                    </select>
                  </div>
                  <div className="update-style flex-row fjust-between falign-center gap-16p">
                    <label>
                      Daily Dosage:
                    </label>
                    <input
                      disabled={state.caseId === 1 || !state.caseId}

                      value={state.medDoses[index].dose}
                      onChange={(e) => {
                        dispatch({ type: 'enterDose', data: e.currentTarget.value, index })
                      }}
                      
                      type="number" id="dosage" name="dosage" min="1" max="10" 
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </div>
                </React.Fragment>)
            })
          }
          <div className="update-style flex-row fjust-between falign-center gap-16p">
            <label>
              Add/remove medicine:
            </label>
            <button
              disabled={state.caseId === 1 || !state.caseId}

              onClick={() => {
                dispatch({ type: 'removeMedicine' })
              }}
              type='button'>-</button>
            <button
              disabled={state.caseId === 1 || !state.caseId}

              onClick={() => {
                dispatch({ type: 'addMedicine' })
              }}
              type='button'>+</button>
          </div>

        </form>
        <div className="add-treatment-button-container flex-row gap-24p fjust-center">
          {state.missingInput && <p style={{ color: 'red', textAlign: 'center', width: '70%', margin: 'auto', marginTop: '1rem' }}>Please Select all necessary fields </p>}
          <button 
          onClick={() => {
            if (state.isSavingTreatment)
              return
            dispatch({ type: 'startTreatment' })
          }}
          className="btn-rec-purple">Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddPetTreatment