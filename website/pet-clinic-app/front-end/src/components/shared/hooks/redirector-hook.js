import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useReDirector = () => {
  const navigate = useNavigate()
  // reads the redirectTo property out of the locationstate and make redirecting this function will be called whenever a login operation occurs
  const redirector = useCallback((locationState) => {
      if (locationState)
        return navigate(`${locationState.redirectTo}`)
  }, [navigate])
  return redirector

}
export default useReDirector