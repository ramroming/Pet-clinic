import React from 'react'
// datepicker things
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"



const Datepicker = (prop) => {

 

  return (
    <>
      <DatePicker selected={prop.date[0]}
        onChange={
          (date) => prop.date[1](date)
        }
        minDate={
          new Date()
        }
        disabledKeyboardNavigation
        withPortal />

    </>
  )
}

export default Datepicker
