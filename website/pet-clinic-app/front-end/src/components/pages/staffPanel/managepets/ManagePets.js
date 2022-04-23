
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useContext, useState, useEffect } from 'react'
import DeletePostModal from "../../profile/myadoptionposts/DeletePostModal"

import EditPet from './EditPet'
import useManagePets from '../../../shared/hooks/managepets-hook';
import { authContext } from '../../../shared/context/auth-context';
import useFetch from '../../../shared/hooks/fetch-hook';
import { pageLoadingContext } from '../../../shared/context/loading-context';
import Modal from '../../../utils/modal/Modal';
import dateFormat from "dateformat"


// this data will be used in the form's date input
const today = new Date()
const maxDate = dateFormat(today, 'isoDate')


const initialData = {
  openModal: false,
  openEditModal: false,

  isFetchingPets: true,
  fetchPetsFailure: '',
  pets: [],

  responseError: '',
  missingInput: false,
  isUpdating: false,
  isLoadingBreeds: false,
  dataToUpdate: null,
  updateResult: '',
  showUpdateMenu: false,
  selectedPet: null,
  pet_type: 'cat',
  breeds: [],
  selectedColors: [],
  isLoadingColors: false,
  colors: [],
  petIndex: null,

  name: {
    value: '',
    errorMsg: ''
  },
  gender: {
    value: 'male',
    errorMsg: ''
  },
  birth_date: {
    value: maxDate,
    errorMsg: ''
  },
  photo: {
    value: '',
    url: '',
    errorMsg: ''
  },
  breed_name: {
    value: '',
    errorMsg: ''
  },
  petToDelete: null,
  isDeletingPet: false,
  deletePetResult: '',
  deletePetFailure: ''
}
const ManagePets = () => {

  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [state, dispatch] = useManagePets(initialData)
  const auth = useContext(authContext)
  const sendRequest = useFetch()
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading

  useEffect(() => {
    let isMount = true
    const fetchPets = async () => {
      try {
        const pets = await sendRequest('http://localhost:5000/receptionist/shelterpets', 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (pets && isMount)
          dispatch({ type: 'successFetchPets', data: pets })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failureFetchPets', error: e.message })
      }
    }
    fetchPets()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isFetchingPets)
  }, [state.isFetchingPets, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const getBreeds = async () => {
      try {

        const parsedData = await sendRequest(`http://localhost:5000/pets/breeds?pet_type=${state.pet_type}`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData && isMount) {
          dispatch({ type: 'getBreedsSuccess', data: parsedData })

        }
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', data: e.message })
      }
    }

    if (state.isLoadingBreeds)
      getBreeds()

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [sendRequest, auth.token, dispatch, setPageIsLoading, state.pet_type, state.isLoadingBreeds])

  useEffect(() => {
    let isMount = true
    if (isMount)
      dispatch({ type: 'getColors' })

    const getColors = async () => {
      try {

        const parsedData = await sendRequest(`http://localhost:5000/pets/colors`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (parsedData && isMount)
          dispatch({ type: 'getColorsSuccess', data: parsedData })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', data: e.message })
      }
    }


    getColors()

    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [sendRequest, auth.token, dispatch, setPageIsLoading])

  useEffect(() => {
    let isMount = true
    const updateData = async () => {
      try {
        const updateResult = await sendRequest(`http://localhost:5000/receptionist/shelterpets/${state.selectedPet && state.selectedPet.id}`, 'PATCH', state.dataToUpdate, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && updateResult)
          dispatch({ type: 'successUpdate', data: updateResult.result })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'failure', error: e.message })
      }
    }
    if (state.isUpdating)
      updateData()
    return () => {
      setPageIsLoading(false)
      isMount = false
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.dataToUpdate, state.isUpdating, state.selectedPet])

  useEffect(() => {
    setPageIsLoading(state.isLoadingBreeds || state.isLoadingColors || state.isUpdating || state.isDeletingPet)
  }, [state.isLoadingBreeds, state.isLoadingColors, state.isUpdating, setPageIsLoading, state.isDeletingPet])

  useEffect(() => {
    if (!openModal && !state.isDeletingPet)
     dispatch({ type: 'selectToDelete', deleteId: null })

  }, [openModal, state.isDeletingPet, dispatch])

  useEffect(() => {

    let isMount = true
    const deletePet = async () => {
      try {
        const result = await sendRequest(`http://localhost:5000/receptionist/shelterpets/${state.petToDelete && state.petToDelete}`, 'DELETE', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (isMount && result)
          dispatch({ type: 'deletePetSuccess', data: result })
      } catch(e) {
        if (isMount)
          dispatch({ type: 'deletePetFailure', error: e.message })
      }
    }
    if (state.isDeletingPet)
      deletePet()
    return () => {
      isMount = false
      setPageIsLoading(false)
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading, state.isDeletingPet, state.petToDelete])

  return (
    <>
      {(state.fetchPetsFailure || state.responseError || state.deletePetFailure) &&
        <Modal
          modalClass='error'
          header='Oops!!'
          body={state.fetchPetsFailure || state.responseError || state.deletePetFailure}
          dispatch={dispatch}
        />}
      {(state.updateResult || state.deletePetResult) &&
        <Modal
          modalClass='success'
          header='Success!!'
          body={state.updateResult || state.deletePetResult}
          dispatch={dispatch}
          refresh={true}
        />}
      <h4>Manage Pets</h4>
      <div>
        <div className="flex-col falign-center fjust-center ">
          {openModal && <DeletePostModal closeModal={setOpenModal} dispatch={dispatch} />}
        </div>

        <div className="flex-col falign-center fjust-center ">
          {openEditModal && <EditPet setOpenEditModal={setOpenEditModal} state={state} dispatch={dispatch} />}
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
                Type
              </Th>
              <Th>
                Gender
              </Th>
              <Th>
                Breed
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

            {state.pets.map((pet, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {pet.id}
                  </Td>
                  <Td>
                    {pet.name}
                  </Td>

                  <Td>
                    {pet.type_name}
                  </Td>
                  <Td>
                    {pet.gender}
                  </Td>
                  <Td>
                    {pet.breed_name}
                  </Td>

                  <Td>


                    <button className="my-great-button margin-bottom"
                      onClick={() => {
                        window.scrollTo(0, 0)
                        dispatch({ type: 'selectPet', data: state.pets[index], index })
                        setOpenEditModal(true)
                        setOpenModal(false)
                      }}><i className="fa-regular fa-pen-to-square"></i></button>


                  </Td>
                  <Td>
                    <button className="my-great-button margin-bottom "
                      onClick={() => { 
                        window.scrollTo(0, 0)
                        dispatch({ type: 'selectToDelete', deleteId: pet.id })
                        setOpenModal(true)
                        setOpenEditModal(false)
                       }}
                    ><i 
                    className={(state.petToDelete && state.petToDelete === pet.id) ? "fa-regular fa-trash-can active" : "fa-regular fa-trash-can"}></i></button>
                  </Td>

                </Tr>
              )
            })}


            {/* second user  */}




          </Tbody>



        </Table>

      </div>
    </>

  )
}

export default ManagePets