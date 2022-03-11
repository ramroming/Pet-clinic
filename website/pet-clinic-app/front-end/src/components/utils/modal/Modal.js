import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import modalMotion from "./modalMotion"
import { useNavigate } from 'react-router-dom'

const modalVariant = modalMotion

const Modal = (props) => {

  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  return (
    <>
      <div className={`modal modal-${props.modalClass}`}>
        <AnimatePresence>
          {show && <motion.div 
          variants={modalVariant}
          initial='initial'
          animate='final'
          exit='exit'

          className={`modal-container modal-container__${props.modalClass} flex-col gap-16p falign-center`}>

            <header className={`modal-header modal-header__${props.modalClass}`}>
              {props.header}
            </header>
            <div className={`flex-col gap-8p modal-body modal-body__${props.modalClass}`}>
              {props.body}
            </div>
            <footer className={`modal-footer modal-footer__${props.modalClass}`}>
            {props.modalClass === 'check' && 
                <button
                onClick={() => {
                  setShow(false)
                  setTimeout(() => {props.dispatch({ type: 'finalConfirm' })}, 300)
                  
                }}
                className='btn-rec modal-button modal-button__confirm'>Confirm </button>
              }
              <button
                onClick={() => {
                  setShow(false)
                  if (props.refresh)
                    return  setTimeout(() => {window.location.reload()}, 300)
                  if (props.redirectTo)
                    return setTimeout(() => {navigate(props.redirectTo)}, 300)
                    
                  setTimeout(() => {props.dispatch({ type: `${props.modalClass}ModalExit` })}, 300)
                  
                }}
                className={`btn-rec modal-button modal-button__${props.modalClass}`}>{props.modalClass === 'success' ? 'OK' : props.modalClass === 'check' ? 'Cancel' : 'Exit'}</button>

              
              
            </footer>

          </motion.div>}
        </AnimatePresence>


      </div>
    </>

  )
  // modalClass, header, body, modalButtonClass, modalType
}

export default Modal