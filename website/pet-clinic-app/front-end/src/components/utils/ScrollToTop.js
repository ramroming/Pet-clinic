import { useEffect } from "react";
import { useLocation } from "react-router";

// this is a wrapper component that will scroll to top every time we navigate to a new compononet
const ScrollToTop = (props) => {

  // location object will change whenever the url changes
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [location])

  return (<>{props.children}</>)
}

export default ScrollToTop