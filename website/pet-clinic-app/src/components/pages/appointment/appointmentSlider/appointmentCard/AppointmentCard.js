// Import Animation prerequisites 
import { motion } from "framer-motion"
import { sliderAnimation } from '../viewAppointmentSliderAnimation'
import { AnimatePresence } from "framer-motion"


const sliderMotion = sliderAnimation

const AppointmentCard = (props) => {

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={sliderMotion}
        initial='initial'
        animate='final'
        exit='exit'
        className={props.card.status === 'active' ? 'appointment-card appointment-active flex-col falign-start gap-16p' : 'appointment-card appointment-past flex-col falign-start gap-16p'}>

        {/* appointment type */}
        <div className="flex-row">
          <p>{props.card.type} / </p>
          <p className="app-status"> {props.card.status === 'active' ? 'Active' : 'Past'}</p>
        </div>

        {/* appointment id */}
        <div className="flex-row gap-16p">
          <i className="fas fa-tag"></i>
          <p>{props.card.id}</p>
        </div>
        {/* appointment date */}
        <div className="flex-row gap-16p">
          <i className="fas fa-clock"></i>
          <p>{props.card.date}</p>
        </div>

        {/* Staff mem */}
        <div className="flex-row gap-16p">
          <i className="fas fa-user-nurse"></i>
          <p>{props.card.staffMem}</p>
        </div>

        {/* pet name */}
        <div className="flex-row gap-16p">
          <i className="fas fa-paw"></i>
          <p>{props.card.petName}</p>
        </div>
        {props.card.status === 'active' ? <a href="/#" className="btn-rec-purple">Cancel</a> : ''}


      </motion.div>
    </AnimatePresence>

  )
}

export default AppointmentCard

