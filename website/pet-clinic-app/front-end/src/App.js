import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Signup from "./components/pages/signup/Signup";
import Login from "./components/pages/login/Login";
import Home from "./components/pages/home/Home";
import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import RegisterPet from "./components/pages/registerpet/RegisterPet";
import Appointment from "./components/pages/appointment/Appointment";
import Adoption from "./components/pages/adoption/Adoption";
import AdoptionAds from "./components/pages/adoptionAds/AdoptionAds";
import AdoptionAd from "./components/pages/adoptionAd/AdoptionAd";
import Myprofile from "./components/pages/myprofile/Myprofile";
import PostAd from "./components/pages/postAd/PostAd";
import PostPreview from "./components/pages/postpreview/PostPreview";
import Stafflist from "./components/pages/stafflist/Stafflist";
import { authContext } from "./components/shared/context/auth-context";
import StaffPanel from "./components/pages/staffPanel/StaffPanel";
import ScrollToTop from "./components/utils/ScrollToTop";

// a pointer to our timer
let logoutTimer

function App() {

  // creating the states that will be sent via the context
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // using this state to tell the routes that the user is logged in
  const [authedUser, setAuthedUser] = useState(null)


  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setAuthedUser(true)
    // create an expiration date for the token when loginin, if the user refresh the page or re-enter the browser the useEffect will work and will call the login so if the token is still valid override the date in the storage with itself so nothing will change
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({ uid, token, expiration: tokenExpirationDate.toISOString() }))
  }, [])

  const logout = useCallback(async () => {

    setToken(null)
    setUserId(null)
    setTokenExpirationDate(null)
    setAuthedUser(false)
    localStorage.removeItem('userData')


  }, [])

  //Auto Login : to check if the user is logged in when refreshing the page this is done by checking the local storage to find user's data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    // in order to login the storage must have a valid token, the token is valid if the expration date is later than the current date
    if (storedData && storedData.token) {
      if (new Date(storedData.expiration) > new Date()) {
        login(storedData.uid, storedData.token)
      } else {

        setAuthedUser(false)
        localStorage.removeItem('userData')
      }
    } else {
      setAuthedUser(false)
    }
  }, [login])

  // Auto Logout: 
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {

      // if the user logs out manually we need to make sure that the current timeout will be cleared otherwise we are going to log the user out again
      clearTimeout(logoutTimer)


    }
  }, [token, logout, tokenExpirationDate])

  return (
    <>
      {/* wrapping all the components with our authcontext so that we can pass the data to the interested components when ever isloggedin changes all the components will be able to receive the change */}
      {/* here we use the doulbe exclamation mark to cast the token string to a boolean value  */}
      <authContext.Provider value={{ isLoggedIn: !!token, userId, token, login, logout }}>
        <Nav />
        <ScrollToTop>
          {authedUser === true &&
            <Routes>
              <Route path='/'
                element={<Home />}></Route>
              <Route path='home'
                element={<Home />}></Route>
              <Route path='registerpet'
                element={<RegisterPet />}></Route>
              <Route path='appointment'
                element={<Appointment />}></Route>
              <Route path='adoption'
                element={<Adoption />}></Route>
              <Route path='adoptionads'
                element={<AdoptionAds />}></Route>
              <Route path='adoptionad'
                element={<AdoptionAd />}></Route>
              <Route path='myprofile'
                element={<Myprofile />}> </Route>
              <Route path='postad'
                element={<PostAd />}> </Route>
              <Route path='postpreview'
                element={<PostPreview />}> </Route>
              <Route path='stafflist'
                element={<Stafflist />}> </Route>
              <Route path='staffpanel'
                element={<StaffPanel />}> </Route>
              <Route path='*'
                element={<Navigate to='/' />}> </Route>
            </Routes>
          }
          {authedUser === false &&
            <Routes>
              <Route path='/' exact
                element={<Home />}></Route>
              <Route path='home'
                element={<Home />}></Route>
              <Route path='login'
                element={<Login />}></Route>
              <Route path='signup'
                element={<Signup />}></Route>
              <Route path='stafflist'
                element={<Stafflist />}> </Route>
              <Route path='*'
                element={<Navigate to='/login' />}></Route>
            </Routes>
          }
        </ScrollToTop>
        <Footer />
      </authContext.Provider>

    </>
  );
}

export default App;
