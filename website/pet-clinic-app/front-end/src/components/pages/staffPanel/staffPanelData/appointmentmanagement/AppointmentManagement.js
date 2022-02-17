

import DeletePostModal from "../../../myprofile/profiledata/myadoptionposts/DeletePostModal"
import { useState } from 'react'
import EditAppointmentStatus from "./EditAppointmentStatus"

const AppointmentManagement = () => {

    const [openModal, setOpenModal] = useState(false)
    const [openStatusModal, setOpenStatusModal] = useState(false)

    return (

        <>
        <div className="flex-col falign-center fjust-center ">
        {openModal && <DeletePostModal closeModal={setOpenModal} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
        {openStatusModal && <EditAppointmentStatus closeModal={setOpenStatusModal} />}
        </div>

        <div className="my-great-table falign-center fjust-center flex-row fgap-16p">
            {/* first column */}
            <div className="flex-col fgap-16p ">
                <p className="table-header">Date & Time</p>
              <p>2022/10/11 13:30PM</p>
            </div>
            {/* second column */}
            <div className="flex-col fgap-16p ">
                <p className="table-header">Pet id</p>
                <p className="margin-bottom">1233</p>
            </div>
        
            {/* third column */}
            <div className="flex-col fgap-16p">
                <p className="table-header">pet name</p>
                <p className="margin-bottom">Mimo</p>

            </div>

             {/* fourth column */}
             <div className="flex-col fgap-16p ">
                <p className="table-header">Delete</p>
                <button className="my-great-button margin-bottom" 
                onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
               
              
            </div>

             {/* fifth column */}
             <div className="flex-col fgap-16p">
                <p className="table-header">Status</p>
                <button className="my-greaat-button margin-bottom" 
                onClick={() => {setOpenStatusModal(true)}}>Active <i className="fa-regular fa-pen-to-square"></i></button>
              
               
            </div>



        </div>
        </>
        
    )
}

export default AppointmentManagement