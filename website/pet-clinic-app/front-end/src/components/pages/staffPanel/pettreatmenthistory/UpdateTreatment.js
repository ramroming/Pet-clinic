

const UpdatetTeatment = ({dispatch}) => {

  return (
    <div className="update-modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center">
                <div className="x-close"><button
                    onClick={() => dispatch({ type: 'updateModal', data: false})}>
                    <i className="fa-solid fa-xmark"></i></button>
                    </div>
                <div className="modal-title">
                    Update Treatment History:
                </div>
                <form className="flex-col falign-center fjust-center
                 gap-16p">
                  {/* first input */}
                <div className="update-style flex-row fjust-between falign-center gap-16p">
                <label>
                    case:
                  </label>
                  <input type="text" />
                </div>
                {/* second input */}
                <div className="update-style flex-row fjust-between  falign-center gap-16p">
                <label>
                    prescription:
                  </label>
                  <input type="text" />
                </div>
                {/* third input */}
                <div className="update-style flex-row fjust-between  falign-center gap-16p">
                <label>
                    dose:
                  </label>
                  <input type="text" />
                </div>
                {/* fourth input */}
                <div className="update-style flex-row fjust-between falign-center gap-16p">
                <label>
                    medicine:
                  </label>
                  <input type="text" />
                </div>
                
                </form>
                <div className="add-treatment-button-container flex-row gap-24p fjust-center">
                    <button className="btn-rec-purple">Update</button>
                </div>
            </div>
        </div>
    
  )
}

export default UpdatetTeatment