import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Link } from 'react-router-dom'
import usePutForAdoption from '../../../shared/hooks/putforadoption-hook';
import { useContext, useEffect } from 'react'
import { pageLoadingContext } from '../../../shared/context/loading-context';
import { authContext } from '../../../shared/context/auth-context';
import useFetch from '../../../shared/hooks/fetch-hook';

const initialData = {
  isLoadingPets: true,
  loadingPetsFailure: '',
  shelterPets: []
}
const PutForAdoption = () => {
  const [state, dispatch] = usePutForAdoption(initialData)
  const setPageIsLoading = useContext(pageLoadingContext).setPageIsLoading
  const auth = useContext(authContext)
  const sendRequest = useFetch()



  useEffect(() => {
    let isMount = true
    const getShelterPets = async () => {
      try {
        const shelterPets = await sendRequest(`http://localhost:5000/receptionist/shelterpets`, 'GET', null, {
          'Authorization': `Bearer ${auth.token}`
        })
        if (shelterPets && isMount)
          dispatch({ type: 'getPetsSuccess', data: shelterPets })
      } catch (e) {
        if (isMount)
          dispatch({ type: 'getPetsFailure', error: e.message })
      }
    }
    getShelterPets()
    return () => {
      isMount = false
      setPageIsLoading(false)
    }
  }, [auth.token, dispatch, sendRequest, setPageIsLoading])

  useEffect(() => {
    setPageIsLoading(state.isLoadingPets)
  }, [setPageIsLoading, state.isLoadingPets])


  return (
    <>
      <h4>Put pet up for adoption</h4>


      {!state.shelterPets.length ?
      <Table className="my-table">
        <Thead>
          <Tr>
            <Th>
              No available pets to put for adoption
            </Th>
          </Tr>
        </Thead>
      </Table>
        
        :
        <Table className="my-table">
          <Thead>
            <Tr>
              <Th>
                name
              </Th>
              <Th>
                Type
              </Th>
              <Th>
                Breed
              </Th>
              <Th>
                Gender
              </Th>
              <Th>
                Age
              </Th>

            </Tr>
          </Thead>
          <Tbody>

            {state.shelterPets.map((pet, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    {pet.name}
                  </Td>
                  <Td>
                    {pet.type_name}
                  </Td>
                  <Td>
                    {pet.breed_name}
                  </Td>
                  <Td>
                    {pet.gender}
                  </Td>
                  <Td>
                    {pet.age}
                  </Td>
                  <Td>
                    {pet.hasPost ? <p style={{ color: 'green' }}>Already posted</p> : <Link className="my-great-button" to={`/postpreview/${pet.id}`}
                      target={'_blank'}>
                      Post an ad
                    </Link>}
                  </Td>

                </Tr>
              )

            })}





          </Tbody>


        </Table>
      }

    </>

  )
}
export default PutForAdoption