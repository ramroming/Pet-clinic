
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"

import EditPet from './EditPet'
import { Link } from 'react-router-dom';

const ManagePets = () => {

    //state for handling the delete modal
    const [openModal, setOpenModal] = useState(false)

    //state for handling edit role and data modal
    const [openEditModal, setOpenEditModal] = useState(false)


    return (
        <>
            <h4>Manage Pets</h4>
            <div>
                <div className="flex-col falign-center fjust-center ">
                    {openModal && <DeletePostModal closeModal={setOpenModal} />}
                </div>

                <div className="flex-col falign-center fjust-center ">
                    {openEditModal && <EditPet setOpenEditModal={setOpenEditModal} />}
                </div>

                <Table className="my-table">
                    <Thead>
                        <Tr>
                            <Th>
                                ID
                            </Th>
                            <Th>
                                Name
                            </Th>
                            <Th>
                                Owner
                            </Th>
                            <Th>
                                Type
                            </Th>
                            <Th>
                                Gender
                            </Th>
                            <Th>
                                Breed
                            </Th>
                            <Th>
                                Post for adoption
                            </Th>
                            <Th>
                                Edit
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
                                mimo
                            </Td>
                            <Td>
                                Reem Alhalbouni
                            </Td>
                            <Td>
                                cat
                            </Td>
                            <Td>
                                female
                            </Td>
                            <Td>
                                British longhair
                            </Td>
                            <Td>
                                <Link className="my-adoption-link" to="/postpreview">post</Link>
                            </Td>
                            <Td>


                                <button className="my-great-button margin-bottom"
                                    onClick={() => {
                                        setOpenEditModal(true)
                                    }}><i className="fa-regular fa-pen-to-square"></i></button>


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
        </>

    )
}

export default ManagePets