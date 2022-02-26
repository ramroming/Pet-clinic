
import DeletePostModal from "../myadoptionposts/DeletePostModal"
import { useState } from 'react'
import EditAdoptionStatus from "./EditAdoptionStatus"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom'

const MyAdoptionRequests = () => {

  const [openModal, setOpenModal] = useState(false)
  const [openStatusModal, setOpenStatusModal] = useState(false)


  return (
    <>
      <h4>Adoption Requests Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
          {openStatusModal && <EditAdoptionStatus closeModal={setOpenStatusModal} />}
        </div>

        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Requesting
              </Th>
              <Th>
                Sent At
              </Th>
              <Th>
                Sent From
              </Th>
              <Th>
                Delete
              </Th>
              <Th>
                Edit
              </Th>
            </Tr>
          </Thead>
          <Tbody>

            <Tr>
              <Td>
                <Link className="my-great-button" to='/adoptionad'>
                  Click here to view
                </Link>
              </Td>
              <Td>
                2022/02/17 11:00 PM
              </Td>
              <Td>
                Yasin Ali
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenStatusModal(true) }}>Active <i className="fa-regular fa-pen-to-square"></i></button>
              </Td>
            </Tr>


            <Tr>
              <Td>
                <Link className="my-great-button" to='/adoptionad'>
                  Click here to view
                </Link>
              </Td>
              <Td>
                2022/02/17 11:00 PM
              </Td>
              <Td>
                Yasin Ali
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenStatusModal(true) }}>Active <i className="fa-regular fa-pen-to-square"></i></button>
              </Td>
            </Tr>


            <Tr>
              <Td>
                <Link className="my-great-button" to='/adoptionad'>
                  Click here to view
                </Link>
              </Td>
              <Td>
                2022/02/17 11:00 PM
              </Td>
              <Td>
                Yasin Ali
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
              </Td>
              <Td>
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenStatusModal(true) }}>Active <i className="fa-regular fa-pen-to-square"></i></button>
              </Td>
            </Tr>

          </Tbody>



        </Table>

      </div>
    </>


  )
}

export default MyAdoptionRequests