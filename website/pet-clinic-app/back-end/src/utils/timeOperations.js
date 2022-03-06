import { createConnection } from 'mysql2/promise'
import petClinicRules from './petclinicrules.js'
import connData from '../database/pet-clinic-db.js'

const { CLINIC_TIME_ZONE_OFFSET, CLINIC_WORKING_HOURS, CLINIC_APPOINTMENT_GAP } = petClinicRules
const convertToTurkishDate = (date, zero = false) => {
  if (!date) {
    const turkishDate = new Date(new Date().setUTCHours(new Date().getUTCHours() + CLINIC_TIME_ZONE_OFFSET))
    if (zero)
      new Date(turkishDate.setUTCHours(0, 0, 0, 0))

    return turkishDate
  }


  const turkishDate = new Date(date.setUTCHours(date.getUTCHours() + CLINIC_TIME_ZONE_OFFSET))

  if (zero)
    return new Date(turkishDate.setUTCHours(0, 0, 0, 0))

  return turkishDate
}

const getAvailableTimes = async (stmemId, userDate) => {

  // this will get the time in turkey
  const dateInTurkey = convertToTurkishDate(undefined, true)
  const timeInTurkey = convertToTurkishDate(undefined)
  const userTurkishDate = convertToTurkishDate(new Date(userDate), true)

  const availableTimes = CLINIC_WORKING_HOURS
  let unavailableTimes

  try {
    const conn = await createConnection(connData)
    const [appointments] = await conn.execute('SELECT * FROM appointments WHERE stmem_id= ? AND DATE(date)= ? AND status=1', [stmemId, userDate])
    await conn.end()

    // if there are some unavailable times
    if (appointments.length) {

      unavailableTimes = appointments.map((appointment) => {
        return (convertToTurkishDate(appointment.date).getUTCHours())
      })


      // if the user making an appointment in the same day but some are not available
      if (dateInTurkey.getTime() === userTurkishDate.getTime()) {
        return (availableTimes.filter((time) => {
          return (!unavailableTimes.includes(time) && timeInTurkey.getUTCHours() + CLINIC_APPOINTMENT_GAP < time)
        }))
      }
      // if the user making an appointment in a future day but some are not available
      return (availableTimes.filter((time) => {
        return (!unavailableTimes.includes(time))
      }))
    }
    else {
      // if the user making an appointment in the same day and all dates are available
      if (dateInTurkey.getTime() === userTurkishDate.getTime()) {
        return (availableTimes.filter((time) => {
          return (timeInTurkey.getUTCHours() + CLINIC_APPOINTMENT_GAP < time)
        }))
      }
      // if the user making an appointment in a future day and all dates are available
      return availableTimes
    }


  } catch (e) {
    throw e
  }



}


export default {
  getAvailableTimes,
  convertToTurkishDate
}