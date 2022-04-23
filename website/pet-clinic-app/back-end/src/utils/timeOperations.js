import petClinicRules from './petclinicrules.js'
import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'

const { CLINIC_TIME_ZONE_OFFSET, CLINIC_WORKING_HOURS, CLINIC_APPOINTMENT_GAP } = petClinicRules
const convert_to_turkish_date = (date, zero = false) => {
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

const get_available_times = async (stmemId, userDate) => {

  // this will get the time in turkey
  const currentDate = new Date(new Date().setUTCHours(0, 0, 0, 0))
  const currentTime = new Date()
  const user_date = new Date(new Date(userDate).setUTCHours(0, 0, 0, 0))

  const availableTimes = CLINIC_WORKING_HOURS
  let unavailableTimes

  try {
    const conn = await createConnection(connData)
    const [appointments] = await conn.execute('SELECT * FROM appointments WHERE (stmem_id= ? AND DATE(date)= ? AND (status=1 OR confirmed=1))', [stmemId, userDate])
    await conn.end()

    // if there are some unavailable times
    if (appointments.length) {

      unavailableTimes = appointments.map((appointment) => {
        return ((appointment.date).getUTCHours())
      })


      // if the user making an appointment in the same day but some are not available
      if (currentDate.getTime() === user_date.getTime()) {
        return (availableTimes.filter((time) => {
          return (!unavailableTimes.includes(time) && currentTime.getUTCHours() + CLINIC_APPOINTMENT_GAP < time)
        }))
      }
      // if the user making an appointment in a future day but some are not available
      return (availableTimes.filter((time) => {
        return (!unavailableTimes.includes(time))
      }))
    }
    else {
      // if the user making an appointment in the same day and all dates are available
      if (currentDate.getTime() === user_date.getTime()) {
        return (availableTimes.filter((time) => {
          return (currentTime.getUTCHours() + CLINIC_APPOINTMENT_GAP < time)
        }))
      }
      // if the user making an appointment in a future day and all dates are available
      return availableTimes
    }


  } catch (e) {
    throw e
  }



}
const calculate_pet_age = (birth_date) => {
  const now = new Date()
  const ageInDays = (now.getTime() - birth_date.getTime())/(1000 * 3600 * 24)
  if (ageInDays >= 365)
    return `About ${Math.round(ageInDays/365)} Year(s) old`
  if (ageInDays >= 30)
    return `About ${Math.round(ageInDays/30)} Month(s) old`
  if (ageInDays >= 1)
    return `About ${Math.round(ageInDays)} Day(s) old`

    return `New Born`
}


export default {
  get_available_times,
  convert_to_turkish_date,
  calculate_pet_age,
}