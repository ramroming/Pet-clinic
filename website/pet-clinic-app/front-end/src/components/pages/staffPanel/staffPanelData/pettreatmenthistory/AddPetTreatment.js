


import React from 'react'

const AddPetTreatment = ({setAddTreatment}) => {
  return (
    <div className="add-modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center">
                <div className="x-close"><button
                    onClick={() => setAddTreatment(false)}>
                    <i className="fa-solid fa-xmark"></i></button>
                    </div>
                <div className="modal-title">
                    Add new treatment:
                </div>
                <form className="flex-col falign-center fjust-center
                 gap-16p">
                  {/* first input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    Staff Member:
                  </label>
                  <input type="text" />
                </div>
                {/* second input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    case:
                  </label>
                  <input type="text" />
                </div>
                {/* third input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    prescription:
                  </label>
                  <input type="text" />
                </div>
                {/* fourth input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    vaccine:
                  </label>
                  <input type="text" />
                </div>
                {/* fifth input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    Medicine:
                  </label>
                  <input type="text" />
                </div>
                
                </form>
                <div className="flex-row fgap-24p fjust-between">
                    <button className="btn-rec-purple">Add</button>
                </div>
            </div>
        </div>
  )
}

export default AddPetTreatment