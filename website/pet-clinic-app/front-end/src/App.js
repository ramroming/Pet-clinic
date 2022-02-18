import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import { authContext } from "./components/shared/context/auth-context";
import ScrollToTop from "./components/utils/ScrollToTop";
import useAuth from "./components/shared/hooks/auth-hook";
import useRoutes from './components/shared/hooks/routes-hook';



function App() {

  const { token, login, logout, userId, authedUser} = useAuth()
  const routes = useRoutes(authedUser)
 
  return (
    <>
      {/* wrapping all the components with our authcontext so that we can pass the data to the interested components when ever isloggedin changes all the components will be able to receive the change */}
      {/* here we use the doulbe exclamation mark to cast the token string to a boolean value  */}
      <authContext.Provider value={{ isLoggedIn: !!token, userId, token, login, logout }}>
        <Nav />
        <ScrollToTop>
          {routes}
        </ScrollToTop>
        <Footer />
      </authContext.Provider>

    </>
  );
}

export default App;
