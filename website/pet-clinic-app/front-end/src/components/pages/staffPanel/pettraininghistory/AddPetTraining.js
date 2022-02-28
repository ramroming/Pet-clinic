
const AddPetTraining = ({setAddTraining}) => {
  return (
    <div className="add-training-modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center">
                <div className="x-close"><button
                    onClick={() => setAddTraining(false)}>
                    <i className="fa-solid fa-xmark"></i></button>
                    </div>
                <div className="modal-title">
                    Add new training:
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
                    start date:
                  </label>
                  <input type="date" />
                </div>
                {/* third input */}
                <div className="update-style flex-row fjust-around falign-center gap-16p">
                <label>
                    training:
                  </label>
                  <input type="text" />
                </div>
               
                </form>
                <div className="add-treatment-button-container flex-row gap-24p fjust-center">
                    <button className="btn-rec-purple">Add</button>
                </div>
            </div>
        </div>
  )
}

export default AddPetTraining