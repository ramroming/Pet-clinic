import { useNavigate } from 'react-router-dom';

const useReDirector = () => {
  const navigate = useNavigate()
  // reads the redirectTo property out of the locationstate and make redirecting this function will be called whenever a login operation occurs
  const redirector = (locationState) => {
    if (locationState)
      return navigate(`${locationState.redirectTo}`)
  }
  return redirector
}
export default useReDirector