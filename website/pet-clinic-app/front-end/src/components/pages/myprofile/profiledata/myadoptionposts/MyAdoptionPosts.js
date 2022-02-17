import DeletePostModal from "./DeletePostModal"
import { useState } from 'react'

const MyAdoptionPosts = () => {

    const [openModal, setOpenModal] = useState(false)

    return (

        <>
        <div className="flex-col falign-center fjust-center ">
        {openModal && <DeletePostModal closeModal={setOpenModal} />}

        </div>
           
            <div className="my-great-table falign-center fjust-center flex-row gap-16p">


                {/* first column */}
                <div className="flex-col gap-16p ">
                    <p className="table-header">View post</p>
                    <a className="margin-bottom" href="/#">click here to view</a>
                    <a className="margin-bottom" href="/#">click here to view</a>
                    <a className="margin-bottom" href="/#">click here to view</a>
                </div>
                {/* second column */}
                <div className="flex-col gap-16p ">
                    <p className="table-header">Created At</p>
                    <p className="margin-bottom">13-4-2022 15:00 PM</p>
                    <p className="margin-bottom">13-4-2022 15:00 PM</p>
                    <p className="margin-bottom">13-4-2022 15:00 PM</p>
                </div>
                {/* third column */}
                <div className="flex-col gap-16p ">
                    <p className="table-header">Delete post</p>
                    <button className="margin-bottom  my-great-button delete-modal"
                        onClick={() => { setOpenModal(true) }}
                    ><i className="fa-regular fa-trash-can"></i></button>
                    <button className="my-great-button margin-bottom delete-modal"><i className="fa-regular fa-trash-can"></i></button>
                    <button className="my-great-button margin-bottom delete-modal" ><i className="fa-regular fa-trash-can"></i></button>
                </div>
                {/* fourth column */}
                <div className="flex-col gap-16p">
                    <p className="table-header">Edit Post</p>
                    <button className="my-great-button margin-bottom" ><i className="fa-regular fa-pen-to-square"></i></button>
                    <button className="my-great-button margin-bottom" ><i className="fa-regular fa-pen-to-square"></i></button>
                    <button className="my-great-button margin-bottom" ><i className="fa-regular fa-pen-to-square"></i></button>
                </div>

              



            </div>
        </>

    )
}

export default MyAdoptionPosts