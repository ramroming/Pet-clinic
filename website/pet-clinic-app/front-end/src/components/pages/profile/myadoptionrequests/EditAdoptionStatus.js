

const EditAdoptionStatus = ({ closeModal }) => {
    return (
        <div className="modal-background flex-col falign-center fjust-center">
            <div className="modal-container flex-col gap-16p falign-center fjust-center">
                <div className="x-close"><button
                    onClick={() => closeModal(false)}>
                    <i className="fa-solid fa-xmark"></i></button></div>
                <div className="modal-title">
                    Update Request Status:
                </div>
                <div className="edit-modal-buttons-container flex-row  gap-24p fjust-center">
                    <button className="btn-rec-purple">Accept</button>
                    <button
                        className="btn-rec-purple">Reject</button>
                </div>
            </div>
        </div>
    )
}

export default EditAdoptionStatus