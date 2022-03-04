import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useState } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"
import EditAppointmentStatus from  "./EditAppointmentStatus"


const AppointmentManagement = () => {

    const [openModal, setOpenModal] = useState(false)
    const [openStatusModal, setOpenStatusModal] = useState(false)


  return (
    <>
    <h4>Appointment Management</h4>
    <div>
         <div className="flex-col falign-center fjust-center ">
        {openModal && <DeletePostModal closeModal={setOpenModal} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
        {openStatusModal && <EditAppointmentStatus closeModal={setOpenStatusModal} />}
        </div>

        <Table className="my-table">
         <Thead>
         <Tr>
           <Th>
             ID
           </Th>
           <Th>
             Date and Time
           </Th>
           <Th>
            Vet
           </Th>
           <Th>
             Ap-Type
           </Th>
           <Th>
             Pet Name
           </Th>
           <Th>
             Owner Name
           </Th>
           <Th>
            Status
           </Th>
           <Th>
           Delete
           </Th>
          
         </Tr>
       </Thead>
       <Tbody>
        
            <Tr>
            <Td>
              1394
            </Td>
            <Td>
            2022/02/17 11:00 PM
            </Td>
            <Td>
            Yara Halimeh
            </Td>
            <Td>
            Training
            </Td>
            <Td>
            Mimo
            </Td>
            <Td>
            Mehmet Kaya
            </Td>
            <Td>
            <button className="my-great-button margin-bottom" 
            onClick={() => {setOpenStatusModal(true)}}>Active <i className="fa-regular fa-pen-to-square"></i></button>
            </Td>
            <Td>
            <button className="my-great-button margin-bottom" 
            onClick={() => { setOpenModal(true) }}
            ><i className="fa-regular fa-trash-can"></i></button>
            </Td>
          
          </Tr>

          <Tr>
            <Td>
              1394
            </Td>
            <Td>
            2022/02/17 11:00 PM
            </Td>
            <Td>
            Yara Halimeh
            </Td>
            <Td>
            Training
            </Td>
            <Td>
            Mimo
            </Td>
            <Td>
            Mehmet Kaya
            </Td>
            <Td>
            <button className="my-great-button margin-bottom" 
            onClick={() => {setOpenStatusModal(true)}}>Active <i className="fa-regular fa-pen-to-square"></i></button>
            </Td>
            <Td>
            <button className="my-great-button margin-bottom" 
            onClick={() => { setOpenModal(true) }}
            ><i className="fa-regular fa-trash-can"></i></button>
            </Td>
          
          </Tr>


          <Tr>
            <Td>
              1394
            </Td>
            <Td>
            2022/02/17 11:00 PM
            </Td>
            <Td>
            Yara Halimeh
            </Td>
            <Td>
            Training
            </Td>
            <Td>
            Mimo
            </Td>
            <Td>
            Mehmet Kaya
            </Td>
            <Td>
            <button className="my-great-button margin-bottom" 
            onClick={() => {setOpenStatusModal(true)}}>Not Active<i className="fa-regular fa-pen-to-square"></i></button>
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

export default AppointmentManagement