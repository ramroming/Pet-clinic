

// this custom hook contains the logic of sending a request to the server and getting databack, we wrap it with a useCallback so that it won't create the function every time the component using the hooks rerenders

import { useCallback } from "react"

const useFetch = (dispatch) => {


  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {
    try {
      // 'Content-Type': 'application/json'
      const response = await fetch(url, {
      method,
      headers,
      body,
    })
      const parsedData = await response.json()
  
      // in case of any error code 
      if (!response.ok) {
        throw new Error(parsedData.error)
      }
      dispatch({ type: 'success', data: parsedData })
      
    } catch (e) {
      dispatch({ type: 'failure', error: e.message})

      // here we throw the error again to make the component that using the hook knows that there was an error
      throw e
    }
    
    
  
  
  }, [dispatch]) 
  return sendRequest
}
export default useFetch