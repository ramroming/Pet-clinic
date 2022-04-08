



const EditAppointmentStatus = ({ dispatch }) => {
    return (
        <div className="edit-modal modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col  falign-center fjust-center">
                <div className="x-close"><button
                    onClick={() => dispatch({ type: 'closeConfirmModal' })}>
                    <i className="fa-solid fa-xmark"></i></button></div>
                <div className="modal-title flex-col gap-16p">
                    Update Appointment Status:
                    <p>Confirm the appointment if the client has already paid the appointment fees</p>
                </div>
                <div className="flex-row gap-16p fjust-between">
                    <button 
                    onClick={() => {
                      dispatch({ type: 'startConfirming' })
                    }}
                    className="btn-rec-purple">Confirm</button>
                    
                </div>
            </div>
        </div>
    )
}

export default EditAppointmentStatus