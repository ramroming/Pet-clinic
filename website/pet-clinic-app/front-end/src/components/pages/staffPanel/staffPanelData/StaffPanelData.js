import Account from "../../myprofile/profiledata/account/Account"
import PersonalInfo from "../../myprofile/profiledata/personalinfo/PersonalInfo"
import AppointmentManagement from "./appointmentmanagement/AppointmentManagement"
import AdoptionManagement from "./adoptionmanagement/AdoptionManagement"
const StaffPanelData = (props) => {
  // which menu is selected
  const selection = props.stateData


  return (
    //render based on the selection
    //the profile animation wrapper will be animated
    <div className="profile-animation-wrapper">


      {
        selection === 1 &&
        <>
          <h4>Public Profile</h4>
          <PersonalInfo />
        </>
      }
      {
        selection === 2 &&

        <>
          <h4>Account Management</h4>
          <Account />
        </>
      }
        {
        selection === 3 &&

        <>
          <h4>Appointments Management</h4>
          <AppointmentManagement />
        </>
      }
        {
        selection === 4 &&

        <>
          <h4>Adoption Management</h4>
          <AdoptionManagement/>
        </>
      }
        {
        selection === 5 &&

        <>
          <h4>Registration</h4>
 
        </>
      }
        {
        selection === 6 &&

        <>
          <h4>Check-in Client</h4>
 
        </>
      }
        {
        selection === 7 &&

        <>
          <h4>Pet treatment history</h4>
 
        </>
      }
        {
        selection === 8 &&

        <>
          <h4>Pet training history</h4>

        </>
      }
   
    </div>
  )
}

export default StaffPanelData