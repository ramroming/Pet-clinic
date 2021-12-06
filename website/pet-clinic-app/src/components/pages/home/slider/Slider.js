import react from "react"
import { useState, useEffect, useRef } from "react"



const Slider = () => {

  const [slider, setSlider] = useState([true, false, false, false])
  const position = useRef([0, 0]);


  const moveSlider = (event) => {
    console.log('moveSlider')

    if (event.target.className == 'right') {
      console.log('right pressed')
      if (position.current[1] + 1 != slider.length) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })
      }

    } else {
      if (position.current[1] - 1 >= 0) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1
        setSlider(() => {
          return slider.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })
      }
    }
  }
  const pagSlide = (event) => {
    const keyIndex = event.target.className.search('k')
    const pagValue = event.target.className[keyIndex + 1]
    position.current[0] = position.current[1]
    position.current[1] = Number(pagValue)
    setSlider(() => {
      return slider.map((value, index) => {
        return (index === position.current[0] || index == position.current[1]) ? !value : value
      })
    })
  }


  return (
    <>
      <div className="slider-container flex-col gap-16p falign-center">
        <img src="/media/imgs/right.png" className="right"
          onClick={(event) => moveSlider(event)}></img>
        <img src="/media/imgs/left.png" className="left"
          onClick={(event) => moveSlider(event)}></img>
        {slider[0] && <div className="slide-content flex-col falign-center gap-24p">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, harum.</p>
          <h1>Lorem ipsum dolor sit amet.</h1>
          <a href="" className="btn-rec-purple">
            I'm a button
          </a>
          <img className="slider-img-desktop" src="/media/imgs/appointment.jpg" alt="app-image" />
          <img className="slider-img-mobile" src="/media/imgs/vertical-appointment.jpg" alt="app-image" />
        </div>
        }
        {
          slider[1] &&
          <div className="slide-content flex-col falign-center gap-24p">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, harum.</p>
            <h1>Lorem ipsum dolor sit amet.</h1>
            <a href="" className="btn-rec-purple">
              I'm a kooko
            </a>
            <img className="slider-img-desktop" src="/media/imgs/appointment.jpg" alt="app-image" />
            <img className="slider-img-mobile" src="/media/imgs/vertical-appointment.jpg" alt="app-image" />
          </div>

        }



      </div>
      <div className="pag flex-row gap-8p fjust-center">
        <i onClick={(event) => pagSlide(event)} className={slider[0] == true ?"fas k0 fa-dot-circle active ": "fas k0 fa-dot-circle"}></i>
        <i onClick={(event) => pagSlide(event)} className={slider[1] == true ?"fas k1 fa-dot-circle active ": "fas k1 fa-dot-circle"}></i>
        <i onClick={(event) => pagSlide(event)} className={slider[2] == true ?"fas k2 fa-dot-circle active ": "fas k2 fa-dot-circle"}></i>
        <i onClick={(event) => pagSlide(event)} className={slider[3] == true ?"fas k3 fa-dot-circle active ": "fas k3 fa-dot-circle"}></i>
      </div>
    </>
  )
}

export default Slider
