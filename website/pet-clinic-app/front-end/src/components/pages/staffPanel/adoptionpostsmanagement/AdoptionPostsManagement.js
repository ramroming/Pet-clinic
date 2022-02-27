import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"
// import EditAdoptionStatus from "../../../profile/myadoptionrequests/EditAdoptionStatus"

import { Link } from 'react-router-dom'

const AdoptionPostsManagement = () => {

  const [openModal, setOpenModal] = useState(false)
  // const [openStatusModal, setOpenStatusModal] = useState(false)


  return (
    <>

      <h4>Adoption Posts Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} />}
        </div>

        {/* <div className="flex-col falign-center fjust-center ">
        {openStatusModal && <EditAdoptionStatus closeModal={setOpenStatusModal} />}
        </div> */}


        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                Post
              </Th>
              <Th>
                Created At
              </Th>
              <Th>
                Delete
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
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
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
                <button className="my-great-button margin-bottom"
                  onClick={() => { setOpenModal(true) }}
                ><i className="fa-regular fa-trash-can"></i></button>
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

export default AdoptionPostsManagement