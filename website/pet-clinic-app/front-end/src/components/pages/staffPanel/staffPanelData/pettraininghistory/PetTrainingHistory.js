
import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import UpdateTraining from './UpdateTraining';

const PetTrainingHistory = () => {

    const [trainingHistory, setTrainingHistory] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div className="flex-row falign-center fjust-center">
                <div className="search-bar-container flex-row fjust-center falign-center gap-16p">
                    <label>Enter pet's id:</label>
                    <input className="search-bar" type="text" />
                    <button className="btn-sm"
                        onClick={() => {
                            setTrainingHistory(true)
                        }}>
                        find
                    </button>
                </div>

                {
                    openModal &&
                    <UpdateTraining setOpenModal={setOpenModal}/>

                }

                {
                    trainingHistory &&
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
                                    start date
                                </Th>
                                <Th>
                                    Training type
                                </Th>
                                <Th>
                                    Trained by
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
                                    Catch
                                </Td>
                                <Td>
                                    Yasin Ahmet
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

export default PetTrainingHistory