

const EditAdoptionStatus = ({ closeModal }) => {
    return (
        <div className="modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center fjust-center">
                <div className="x-close"><button
                    onClick={() => closeModal(false)}>
                    <i className="fa-solid fa-xmark"></i></button></div>
                <div className="modal-title">
                    Update Request Status:
                </div>
                <div className="flex-row fgap-24p fjust-between">
                    <button className="btn-rec-purple">Accept</button>
                    <button
                        className="btn-rec-purple">Reject</button>
                </div>
            </div>
        </div>
    )
}

export default EditAdoptionStatus