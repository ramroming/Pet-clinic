import Account from "./account/Account"
import PersonalInfo from "./personalinfo/PersonalInfo"
import PetInfo from "./petinfo/PetInfo"
import MyAdoptionPosts from './myadoptionposts/MyAdoptionPosts'
import MyAdoptionRequests from './myadoptionrequests/MyAdoptionRequests'
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
       {
        selection === 4 &&

        <>
          <h4>Adoption Posts Management</h4>
          <MyAdoptionPosts />
        </>
      }
       {
        selection === 5 &&

        <>
          <h4>Adoption Requests Management</h4>
          <MyAdoptionRequests/>
        </>
      }
    </div>
  )
}

export default ProfileData