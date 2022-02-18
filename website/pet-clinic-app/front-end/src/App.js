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


function App() {

  // creating the states that will be sent via the context
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  
  const login = useCallback((uid, token) => {
    setToken(token)
    setUserId(uid)
    localStorage.setItem('userData', JSON.stringify({uid, token}))
  }, [])

  const logout = useCallback( async () => {

    setToken(null)
    setUserId(null)
    localStorage.removeItem('userData')
    
    
  }, [])

  // to check if the user is logged in when refreshing the page this is done by checking the local storage to find user's data
  useEffect(() => {
    const storedData =JSON.parse(localStorage.getItem('userData'))
    if (storedData && storedData.token) {
      login(storedData.uid, storedData.token)
    }
  }, [login])
  
  // creating auth and nonauth routes
  const routes = token ? (
    <Routes>
      <Route path='/' exact
        element={<Home />}></Route>
      <Route path='/home'
        element={<Home />}></Route>
      <Route path='/registerpet'
        element={<RegisterPet />}></Route>
      <Route path='/appointment'
        element={<Appointment />}></Route>
      <Route path='/adoption'
        element={<Adoption />}></Route>
      <Route path='/adoptionads'
        element={<AdoptionAds />}></Route>
      <Route path='/adoptionad'
        element={<AdoptionAd />}></Route>
      <Route path='/myprofile'
        element={<Myprofile />}> </Route>
      <Route path='/postad'
        element={<PostAd />}> </Route>
      <Route path='/postpreview'
        element={<PostPreview />}> </Route>
      <Route path='/stafflist'
        element={<Stafflist />}> </Route>
      <Route path='/staffpanel'
        element={<StaffPanel />}> </Route>
      <Route path='*'
        element={<Navigate to='/' />}> </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path='/' exact
        element={<Home />}></Route>
      <Route path='/home'
        element={<Home />}></Route>
      <Route path='/login'
        element={<Login />}></Route>
      <Route path='/signup'
        element={<Signup />}></Route>
      <Route path='/stafflist'
        element={<Stafflist />}> </Route>
      <Route path='*' 
        element={<Navigate to='/login' />}></Route>
    </Routes>
  )
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
