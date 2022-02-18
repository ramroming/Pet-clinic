import {useState} from 'react'

const UpdatetTeatment = ({setOpenModal}) => {

  return (
    <div className="modal-background flex falign-center fjust-center">
            <div className="modal-container flex-col fgap-16p falign-center">
                <div className="x-close"><button
                    onClick={() => setOpenModal(false)}>
                    <i className="fa-solid fa-xmark"></i></button>
                    </div>
                <div className="modal-title">
                    Update Training:
                   <p>if the training is completed set it to done</p>
                </div>
                
                <div className="flex-row fgap-24p fjust-between">
                    <button className="btn-rec-purple">Done!</button>
                    <button className="btn-rec-purple">Delete</button>
                </div>
            </div>
        </div>
    
  )
}

export default UpdatetTeatment