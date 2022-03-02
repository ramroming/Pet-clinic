import React from 'react'
// datepicker things
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import dateFormat from "dateformat";



const Datepicker = (prop) => {

 
  
  const now = new Date()
  const years = prop.appointment[0].date.split('-')[0]
  const month = prop.appointment[0].date.split('-')[1]
  const day = prop.appointment[0].date.split('-')[2]
  return (
    <>
      <DatePicker selected={new Date(years, month - 1, day, now.getHours())}
        onChange={
          (newDate) => prop.appointment[1]((oldAppointment) => {
            return {...oldAppointment, date: dateFormat(newDate, 'isoDate')}
          })
        }
        minDate={
          new Date()
        }
        disabledKeyboardNavigation
        withPortal
        dateFormat="yyyy-MM-dd" />

    </>
  )
}

export default Datepicker
