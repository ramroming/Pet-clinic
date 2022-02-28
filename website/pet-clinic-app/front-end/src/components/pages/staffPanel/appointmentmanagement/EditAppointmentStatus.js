



const EditAppointmentStatus = ({ closeModal }) => {
    return (
        <div className="edit-modal modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col  falign-center fjust-center">
                <div className="x-close"><button
                    onClick={() => closeModal(false)}>
                    <i className="fa-solid fa-xmark"></i></button></div>
                <div className="modal-title flex-col gap-16p">
                    Update Appointment Status:
                    <p>if the client has paid, activate the appointment</p>
                </div>
                <div className="flex-row gap-16p fjust-between">
                    <button className="btn-rec-purple">Activate</button>
                    
                </div>
            </div>
        </div>
    )
}

export default EditAppointmentStatus