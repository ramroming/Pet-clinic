import { useReducer } from 'react'
const putForAdoptionReducer = (state, action) => {
  switch (action.type) {

    case 'getPetsSuccess': {
      return {
        ...state,
        isLoadingPets: false,
        shelterPets: action.data
      }
    }
    case 'getPetsFailure': {
      return {
        ...state,
        isLoadingPets: false,
        responseError: action.error
      }
    }
    
    default: break
  }
}
const usePutForAdoption = (initialData) => {
  const [state, dispatch] = useReducer(putForAdoptionReducer, initialData)
  return [state, dispatch]
}
export default usePutForAdoption