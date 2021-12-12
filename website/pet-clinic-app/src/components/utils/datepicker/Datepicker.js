import React from 'react'
// datepicker things
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'



const Datepicker = () => {

    // for the datepicker
const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <DatePicker selected={startDate}
                onChange={
                    (date) => setStartDate(date)
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
