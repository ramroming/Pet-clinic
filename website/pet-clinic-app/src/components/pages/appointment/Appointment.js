import ViewAppointmentSlider from "./appointmentSlider/ViewAppointmentSlider";
import MakeAppointmentSlider from './makeAppointment/MakeAppointmentSlider'
const Appointment = () => {
  return (
    <>
      <div className="home-container flex-col gap-24p">
        <div className="make-appointment-wrapper">
          <MakeAppointmentSlider />
        </div>
        <div className="view-appointment-wrapper">
          <ViewAppointmentSlider />
        </div>

      </div>
    </>
  )
}

export default Appointment;