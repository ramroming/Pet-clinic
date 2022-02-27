
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"




const ManageProfits = () => {

    //state for handling the delete modal
    const [openModal, setOpenModal] = useState(false)




    return (
        <>
            <h4>Manage Profits</h4>
            <div>
                <div className="flex-col falign-center fjust-center ">
                    {openModal && <DeletePostModal closeModal={setOpenModal} />}
                </div>


                <Table className="my-table">
                    <Thead>
                        <Tr>
                            <Th>
                                ID
                            </Th>
                            <Th>
                                Amount
                            </Th>
                            <Th>
                                Paid by
                            </Th>
                            <Th>
                                Pet name
                            </Th>
                            <Th>
                                Appointment
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
                                50 tl
                            </Td>
                            <Td>
                                mimo
                            </Td>
                            <Td>
                                Reem Alhalbouni
                            </Td>
                            <Td>
                                Checkup
                            </Td>


                            <Td>
                                <button className="my-great-button margin-bottom"
                                    onClick={() => { setOpenModal(true) }}
                                ><i className="fa-regular fa-trash-can"></i></button>
                            </Td>

                        </Tr>






                    </Tbody>



                </Table>

            </div>
        </>
    )
}

export default ManageProfits