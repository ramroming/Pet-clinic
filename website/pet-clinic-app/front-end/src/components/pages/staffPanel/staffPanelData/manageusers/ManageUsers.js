
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react'
import DeletePostModal from "../../../myprofile/profiledata/myadoptionposts/DeletePostModal"
import EditUser from './EditUser'


const ManageUsers = () => {

    //state for handling the delete modal
    const [openModal, setOpenModal] = useState(false) 

    //state for handling edit role and data modal
    const [openEditModal, setOpenEditModal] = useState(false)


    return (
        <div>
            <div className="flex-col falign-center fjust-center ">
                {openModal && <DeletePostModal closeModal={setOpenModal} />}
            </div>

            <div className="flex-col falign-center fjust-center ">
        {openEditModal && <EditUser setOpenEditModal={setOpenEditModal} />}
        </div>

            <Table className="my-table">
                <Thead>
                    <Tr>
                        <Th>
                            ID
                        </Th>
                        <Th>
                            Username
                        </Th>
                        <Th>
                            first name
                        </Th>
                        <Th>
                            Last name
                        </Th>
                        <Th>
                            email
                        </Th>
                        <Th>
                            Role
                        </Th>
                        <Th>
                            Delete
                        </Th>

                    </Tr>
                </Thead>
                <Tbody>

                    {/* first user */}

                    <Tr>
                        <Td>
                            1394
                        </Td>
                        <Td>
                            front-end
                        </Td>
                        <Td>
                            Reem
                        </Td>
                        <Td>
                            Alhalbouni
                        </Td>
                        <Td>
                            frontend@hotmail.com
                        </Td>
                        <Td>


                            <button className="my-great-button margin-bottom"
                            onClick={() => {
                                setOpenEditModal(true)
                            }}>stmem <i className="fa-regular fa-pen-to-square"></i></button>


                        </Td>
                        <Td>
                            <button className="my-great-button margin-bottom"
                                onClick={() => { setOpenModal(true) }}
                            ><i className="fa-regular fa-trash-can"></i></button>
                        </Td>

                    </Tr>

                    {/* second user  */}
                   



                </Tbody>



            </Table>

        </div>

    )
}

export default ManageUsers