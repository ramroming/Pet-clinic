import react from "react"
import { useState, useRef } from "react/cjs/react.development"
const MakeAppointmentSlider = () => {

  const [appointment, setAppointment] = useState({
    appointmentType: 'Examination'
  })
  const [slides, setSlides] = useState([true, false, false, false])


  const position = useRef([0, 0]);

  const moveSlider = (event) => {

    if (event.target.id == 'next') {
      if (position.current[1] + 1 != slides.length) {
        position.current[0] = position.current[1]
        position.current[1] = position.current[1] + 1

        //specify the initial and exit motion based on right movement
        // sliderMotion.initial.x = '97vw'
        // sliderMotion.exit.x = '-97vw'

        setSlides(() => {
          return slides.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })

      }

    } else {

      if (position.current[1] - 1 >= 0) {

        position.current[0] = position.current[1]
        position.current[1] = position.current[1] - 1

        //specify the initial and exit motion based on left movement
        // sliderMotion.initial.x = '-97vw'
        // sliderMotion.exit.x = '97vw'

        // same as right movement idea
        setSlides(() => {
          return slides.map((value, index) => {
            return (index === position.current[0] || index == position.current[1]) ? !value : value
          })
        })

        //If index is out of range similar idea to the right movement
      }
    }
  }
  const selectType = (event) => {
    
    let type = {}
    console.log(event.target.nodeName)
    switch (event.target.nodeName) {
      case 'IMG':
        type = event.target.parentNode.children[0].innerHTML
        break
      case 'P':
        type = event.target.innerHTML
        break
      default:
        type = event.target.children[0].innerHTML
        break

    }

    setAppointment((oldAppointment) => {
      return { ...oldAppointment, appointmentType: type }
    })
  }
  const stop = (event) => {
    event.stopPropagation()
  }

  return (
    <>
      <div className="make-appointment-slider flex-col falign-center gap-24p">
        {slides[0] &&
          <>
            <h1>What appointment do you want to make for your pet?</h1>
            <div className="appointment-types flex-row gap-24p fjust-center">
              <div className={ appointment.appointmentType === 'Examination' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectType(event)} >
                <p className='type'>Examination</p>
                <img src="/media/imgs/pet-examination.png" alt="" />
              </div>
              <div className={ appointment.appointmentType === 'Training' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectType(event)}>
                <p className='type'>Training</p>
                <img src="/media/imgs/pet-training.png" alt="" />
              </div>
              <div className={ appointment.appointmentType === 'Grooming' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectType(event)}>
                <p className='type'>Grooming</p>
                <img src="/media/imgs/pet-grooming.png" alt="" />
              </div>
              <div className={ appointment.appointmentType === 'Adoption' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectType(event)}>
                <p className='type'>Adoption</p>
                <img src="/media/imgs/pet-adoption.png" alt="" />
              </div>
            </div>
            <button id="next" className="btn-rec-purple next"
              onClick={(event) => moveSlider(event)}>Next</button>
          </>
        }
        {
          slides[1] && <>
            <h1>Next Slide</h1>
            <div className="flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>
              <button id="next" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Next</button>
            </div>
          </>
        }

      </div>
    </>
  )
}

export default MakeAppointmentSlider