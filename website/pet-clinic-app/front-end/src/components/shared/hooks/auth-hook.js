import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router'
import useReDirector from './redirector-hook'

// a pointer to our timer
let logoutTimer

const useAuth = () => {
  // creating the states that will be sent via the context
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState()

  // using this state to tell the routes that the user is logged in
  const [authedUser, setAuthedUser] = useState(null)

  const location = useLocation()
  const redirector = useReDirector()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setAuthedUser(true)
    // create an expiration date for the token when loginin, if the user refresh the page or re-enter the browser the useEffect will work and will call the login so if the token is still valid override the date in the storage with itself so nothing will change
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7 )
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem('userData', JSON.stringify({ uid, token, expiration: tokenExpirationDate.toISOString() }))



  }, [])

  const logout = useCallback(async (isUserLogout = false) => {

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

  // setting the timer for auto logout: 
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)

      //  here is when the login operation is completed and we can navigate to the page that the user came from
      redirector(location.state)

    } else {

      // if the user logs out manually we need to make sure that the current timeout will be cleared otherwise we are going to log the user out again
      clearTimeout(logoutTimer)
      // redirector({ redirectTo: '/' })

    }
  }, [token, logout, tokenExpirationDate, location.state, redirector])

  

  return { token, login, logout, userId, authedUser }
}

export default useAuth