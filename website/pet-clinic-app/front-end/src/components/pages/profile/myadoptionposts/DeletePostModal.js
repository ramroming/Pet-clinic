
const DeletePostModal = ({ closeModal, dispatch }) => {
    return (
        <div className="modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center fjust-center">
                <div className="x-close"><button
                onClick={() => closeModal(false)}>
                <i className="fa-solid fa-xmark"></i></button></div>
                <div className="modal-title">
                    Are you sure you want to delete?
                </div>
                <div className="flex-row edit-modal-buttons-container gap-24p fjust-center">
                    <button 
                    onClick={() => {
                      closeModal(false)
                      dispatch({ type: 'startDeleting' })
                    }}
                    className="btn-rec-purple">Yes</button>
                    <button onClick={() => closeModal(false)}
                        className="btn-rec-purple">No</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal