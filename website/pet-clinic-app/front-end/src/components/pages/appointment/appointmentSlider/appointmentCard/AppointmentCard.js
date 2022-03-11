// Import Animation prerequisites 
import { motion } from "framer-motion"
import { sliderAnimation } from '../viewAppointmentSliderAnimation'
import { AnimatePresence } from "framer-motion"
import dateFormat from "dateformat"

const sliderMotion = sliderAnimation

const AppointmentCard = (props) => {

  const deleteAppointment = (event) => {
    props.dispatch({ type: 'checkModalEnter', appointmentToDelete: event.target.getAttribute("apid")})
  }
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={sliderMotion}
        initial='initial'
        animate='final'
        exit='exit'
        className={props.card.status === 1 ? 'appointment-card appointment-active flex-col falign-start gap-16p' : 'appointment-card appointment-past flex-col falign-start gap-16p'}>

        {/* appointment type */}
        <div className="flex-row">
          <p>{props.card.appointment_type} / </p>
          <p className="app-status"> {props.card.status === 1 ? 'Active' : 'Past'}</p>
        </div>

       
        {/* appointment date */}
        <div className="flex-row gap-16p">
          <i className="fas fa-clock"></i>
          <p>{dateFormat(props.card.date, 'default')}</p>
        </div>

        {/* Staff mem */}
        <div className="flex-row gap-16p">
          <i className="fas fa-user-nurse"></i>
          <p>{props.card.first_name + ' ' + props.card.last_name}</p>
        </div>

        {/* pet name */}
        <div className="flex-row gap-16p">
          <i className="fas fa-paw"></i>
          <p>{props.card.pet_name}</p>
        </div>
        {props.card.status === 1 ? <button 
        onClick={(event)=> deleteAppointment(event)}
        apid={props.card.id} className="btn-rec-purple">Cancel</button> : ''}


      </motion.div>
      
    </AnimatePresence>

  )
}

export default AppointmentCard

