import { createContext } from 'react'
export const pageLoadingContext = createContext({
  pageIsLoading: false,
  setPageIsLoading: () => {}
})