import Account from "../../myprofile/profiledata/account/Account"
import PersonalInfo from "../../myprofile/profiledata/personalinfo/PersonalInfo"
import AppointmentManagement from "./appointmentmanagement/AppointmentManagement"
import AdoptionManagement from "./adoptionmanagement/AdoptionManagement"
import AdoptionPostsManagement from "./adoptionpostsmanagement/AdoptionPostsManagement"
import Registration from "./registration/Registration"
import PetTreatmentHistory from "./pettreatmenthistory/PetTreatmentHistory"
import PetTrainingHistory from "./pettraininghistory/PetTrainingHistory"


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
          <h4>Adoption Request Management</h4>
          <AdoptionManagement/>
        </>
      }
       
        {
        selection === 5 &&

        <>
          <h4>Adoption Posts Managment</h4>
          <AdoptionPostsManagement/>
        </>
      }
        {
        selection === 6 &&

        <>
          <h4>Pet Treatment history</h4>
          <PetTreatmentHistory/>
        </>
      }
        {
        selection === 7 &&

        <>
          <h4>Pet Training history</h4>
          <PetTrainingHistory/>
        </>
      }
        {
        selection === 8 &&

        <>
          <h4>Registration</h4>
          <Registration/>
        </>
      }
   
    </div>
  )
}

export default StaffPanelData