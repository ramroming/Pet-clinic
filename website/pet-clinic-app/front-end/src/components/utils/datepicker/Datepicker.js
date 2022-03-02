import React from 'react'
// datepicker things
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import dateFormat from "dateformat";



const Datepicker = (prop) => {

 

  return (
    <>
      <DatePicker selected={new Date(prop.appointment[0].date)}
        onChange={
          (newDate) => prop.appointment[1]((oldAppointment) => {
            return {...oldAppointment, date: dateFormat(newDate, 'isoDate')}
          })
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
