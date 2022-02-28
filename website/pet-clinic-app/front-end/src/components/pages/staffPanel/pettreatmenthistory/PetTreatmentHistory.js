
import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UpdateTreatment from './UpdateTreatment';
import AddPetTreatment from './AddPetTreatment';

const PetTreatmentHistory = () => {

    const [treatmentHistory, setTreatmentHistory] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [addTreatment, setAddTreatment] = useState(false)

    return (
        <>
            <h4>Pet Treatment History</h4>
            <div className="flex-col falign-center fjust-center">
                <div className="search-bar-container flex-row fjust-center falign-center gap-16p">
                    <label>Enter pet's id:</label>
                    <input className="search-bar" type="text" />
                    <button className="btn-sm"
                        onClick={() => {
                            setTreatmentHistory(true)
                        }}>
                        find
                    </button>
                    {treatmentHistory &&
                        <button className="btn-sm"
                            onClick={() => {
                                setAddTreatment(true)
                            }}>
                            Add treatment
                        </button>
                    }
                </div>

                {
                    openModal &&
                    <UpdateTreatment setOpenModal={setOpenModal} />

                }

                {
                    addTreatment &&
                    <AddPetTreatment setAddTreatment={setAddTreatment} />
                }

                {
                    treatmentHistory &&
                    <Table className="my-table">
                        <Thead>
                            <Tr>
                                <Th>
                                    Pet id
                                </Th>
                                <Th>
                                    Pet name
                                </Th>
                                <Th>
                                    owner
                                </Th>
                                <Th>
                                    date
                                </Th>
                                <Th>
                                    staff member
                                </Th>
                                <Th>
                                    case
                                </Th>
                                <Th>
                                    vaccine
                                </Th>
                                <Th>
                                    History
                                </Th>

                            </Tr>
                        </Thead>
                        <Tbody>

                            <Tr>
                                <Td>
                                    1234
                                </Td>
                                <Td>
                                    Mimo
                                </Td>
                                <Td>
                                    Rami Sadettin
                                </Td>
                                <Td>
                                    2021/0/2/18 1:07 PM
                                </Td>
                                <Td>
                                    Rami Sadettin
                                </Td>
                                <Td>
                                    check up
                                </Td>
                                <Td>
                                    none
                                </Td>
                                <Td>
                                    <button className="btn-sm"
                                        onClick={() => {
                                            setOpenModal(true)
                                        }}>
                                        Update
                                    </button>

                                </Td>

                            </Tr>


                        </Tbody>


                    </Table>


                }

            </div>
        </>
    )
}

export default PetTreatmentHistory