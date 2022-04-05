import { pageLoadingContext } from '../../../components/shared/context/loading-context'
import { useContext } from 'react'
const LoadingPage = () => {
  const pageIsLoading = useContext(pageLoadingContext).pageIsLoading
  return (
    <>
      {pageIsLoading === true &&
        <div className="loading-page">

          <div className="lds-ripple-page"><div></div><div></div></div>
        </div>
      }
    </>

  )
}
export default LoadingPage