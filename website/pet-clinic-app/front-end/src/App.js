import { authContext } from "./components/shared/context/auth-context";
import {pageLoadingContext} from "./components/shared/context/loading-context";
import LoadingPage from './components/utils/loadingpage/LoadingPage';
import ScrollToTop from "./components/utils/ScrollToTop";
import useAuth from "./components/shared/hooks/auth-hook";
import useRoutes from './components/shared/hooks/routes-hook';
import { useState } from 'react';



function App() {

  const { token, login, logout, userId, authedUser, userRole } = useAuth(window)
  const [pageIsLoading, setPageIsLoading] = useState(false)
 

  const routes =  useRoutes(authedUser, userRole)
  return (
    <>
      {/* wrapping all the components with our authcontext so that we can pass the data to the interested components when ever isloggedin changes all the components will be able to receive the change */}
      {/* here we use the doulbe exclamation mark to cast the token string to a boolean value  */}
      <pageLoadingContext.Provider value={{pageIsLoading, setPageIsLoading}}>
        <authContext.Provider value={{ isLoggedIn: !!token, userId, token, login, logout, userRole }}>
          <LoadingPage />
          <ScrollToTop>
            {routes}
          </ScrollToTop>
        </authContext.Provider>
      </pageLoadingContext.Provider>



    </>
  );
}

export default App;
