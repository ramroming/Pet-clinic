import Account from "./account/Account"
import PersonalInfo from "./personalinfo/PersonalInfo"
import PetInfo from "./petinfo/PetInfo"

const ProfileData = (props) => {
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
          <h4>Pets Management</h4>
          <PetInfo />
        </>
      }
    </div>
  )
}

export default ProfileData