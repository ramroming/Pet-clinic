

// this custom hook contains the logic of sending a request to the server and getting databack, we wrap it with a useCallback so that it won't create the function every time the component using the hooks rerenders

import { useCallback } from "react"

const useFetch = () => {


  const sendRequest = useCallback(async (
    url,
    method = 'GET',
    body = null,
    headers = {},


  ) => {
    try {
      // 'Content-Type': 'application/json'
      const response = await fetch(url, {
      method,
      headers,
      body,
    })
      const parsedData = await response.json()
  
      if (!response.ok) {
        throw new Error(parsedData.error)
      }
      return parsedData
      
    } catch (e) {
      throw e
    }
    
    
  
  
  }, []) 
  return sendRequest
}
export default useFetch