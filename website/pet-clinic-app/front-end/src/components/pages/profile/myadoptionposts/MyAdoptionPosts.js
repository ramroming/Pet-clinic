import DeletePostModal from "./DeletePostModal"
import { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from 'react-router-dom'

const MyAdoptionPosts = () => {

  const [openModal, setOpenModal] = useState(false)


  return (
    <>
      <h4>Adoption Posts Management</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} />}
        </div>


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
                Edit
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
                <Link className="my-great-button" to='/postpreview'>
                  Click here to edit
                </Link>
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
                <Link className="my-great-button" to='/postpreview'>
                  Click here to edit
                </Link>
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
                <Link className="my-great-button" to='/postpreview'>
                  Click here to edit
                </Link>
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

export default MyAdoptionPosts