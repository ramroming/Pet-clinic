import ViewAppointmentSlider from "./appointmentSlider/ViewAppointmentSlider";
import MakeAppointmentSlider from './makeAppointment/MakeAppointmentSlider'

const Appointment = () => {
  return (
    <>
      <div className="home-container flex-col  gap-24p">
        <div className="make-appointment-wrapper">
          <MakeAppointmentSlider />
        </div>
        <div className="view-appointment-wrapper flex-row falign-center fjust-start gap-36p">

          <div className="view-appointment-wrapper ref">
            <ViewAppointmentSlider  status='active' />
          </div>

          <div className="view-appointment-wrapper ref">
            <ViewAppointmentSlider status='past' />
          </div>
        </div>

      </div>
    </>
  )
}

export default Appointment;