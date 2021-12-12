import react from "react"
import { useState, useRef } from "react/cjs/react.development"
import Datepicker from "../../../utils/datepicker/Datepicker";



const MakeAppointmentSlider = () => {

  const [appointment, setAppointment] = useState({
    appointmentType: 'Examination',
    petName: 'Pet 1',
    staffMem: 'Staff 1',
    date: undefined
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

  //generic slide state detector

  const selectOption = (event) => {

    let x = ""
    console.log(event.target.nodeName)
    switch (event.target.nodeName) {
      case 'IMG':
        x= event.target.parentNode.children[1].innerHTML
        break
      case 'P':
        x = event.target.innerHTML
        break
      default:
        x = event.target.children[1].innerHTML
        break

    }

    if(slides[0]){
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, appointmentType: x }
      })
    }
    if(slides[1]){
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, petName: x }
      })  
    }
    if(slides[2]){
      setAppointment((oldAppointment) => {
        return { ...oldAppointment, staffMem: x }
      })
  
    }
  }


  return (
    <>
      <div className="make-appointment-slider flex-col falign-center gap-24p">
        {/* first slide */}
        {slides[0] &&
          <>
            <h1>What appointment do you want to make for your pet?</h1>
            <div className="appointment-types flex-row gap-24p fjust-center">
              <div className={ appointment.appointmentType === 'Examination' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectOption(event)} >
                <img src="/media/imgs/pet-examination.png" alt="" />
                <p className='type'>Examination</p>
              </div>
              <div className={ appointment.appointmentType === 'Training' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-training.png" alt="" />
                <p className='type'>Training</p>
              </div>
              <div className={ appointment.appointmentType === 'Grooming' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-grooming.png" alt="" />
                <p className='type'>Grooming</p>
              </div>
              <div className={ appointment.appointmentType === 'Adoption' ? "appointment-type flex-col gap-8p falign-center active " : "appointment-type flex-col gap-8p falign-center"  }
                onClick={(event) => selectOption(event)}>
                <img src="/media/imgs/pet-adoption.png" alt="" />
                <p className='type'>Adoption</p>
              </div>
            </div>
            <button id="next" className="btn-rec-purple next"
              onClick={(event) => moveSlider(event)}>Next</button>
          </>
        }
        {/* second slide */}
        {
          slides[1] && <>
            <h1>Select Your Pet:</h1>
            <div className="appointment-types flex-row fjust-center gap-24p">

            <div className={ appointment.petName === 'Pet 1' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
            onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/cat.png" alt="cat"/>
              <p>Pet 1</p>
            </div>

            <div className={ appointment.petName === 'Pet 2' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/cat.png" alt="cat" />
              <p>Pet 2</p>
            </div>
            
            <div className={ appointment.petName === 'Pet 3' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/cat.png" alt="cat" />
              <p>Pet 3</p>
            </div>

            <div className={ appointment.petName === 'Pet 4' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/cat.png" alt="cat" />
              <p>Pet 4</p>
            </div>
           

            </div>
       
            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>
              <button id="next" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Next</button>
            </div>
          </>
        }
         {/* third slide */}
        {
          slides[2] && <>
            <h1>Select staff:</h1>
            <div className="appointment-types flex-row fjust-center gap-24p">

            <div className={ appointment.staffMem === 'Staff 1' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
            onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/staff.png" alt="cat"/>
              <p>Staff 1</p>
            </div>

            <div className={ appointment.staffMem === 'Staff 2' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/staff.png" alt="cat" />
              <p>Staff 2</p>
            </div>
            
            <div className={ appointment.staffMem === 'Staff 3' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/staff.png" alt="cat" />
              <p>Staff 3</p>
            </div>

            <div className={ appointment.staffMem === 'Staff 4' ? "appointment-type flex-col fjust-start gap-16p falign-center active" : "appointment-type flex-col fjust-start gap-16p falign-center" }
              onClick={(event) => selectOption(event)}>
              <img src="/media/imgs/staff.png" alt="cat" />
              <p>Staff 4</p>
            </div>
           

            </div>
       
            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
              <button id="back" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Back</button>
              <button id="next" className="btn-rec-purple next"
                onClick={(event) => moveSlider(event)}>Next</button>
            </div>
          </>
        }
         {/* fourth slide */}
        {
          slides[3] && <>
            <h1>Select Date:</h1>
            <div className="appointment-types flex-row fjust-center gap-24p">
              <Datepicker/>
        
            </div>
       
            <div className="appointment-buttons-wrapper flex-row fjust-around button-wrapper">
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