const ProfileMenu = (props) => {

  const {selection, setSelection} = props.stateData
  const selecting = (index) => {
    setSelection(index)
  }
  return (
    <div className="profile-menu flex-col ">
      <p  
      onClick ={ () => selecting(1)}
      className={ selection === 1 ? "profile-option selected" :"profile-option"}>Manage Personal Info</p>
      <p  
      onClick ={ () => selecting(2)}
      className={ selection === 2 ? "profile-option selected" :"profile-option"}>Manage Account</p>
      <p  
      onClick ={ () => selecting(3)}
      className={ selection === 3 ? "profile-option selected" :"profile-option"}>Manage Pets</p>
         <p  
      onClick ={ () => selecting(4)}
      className={ selection === 4 ? "profile-option selected" :"profile-option"}>My Adoption posts</p>
      <p  
      onClick ={ () => selecting(5)}
      className={ selection === 5? "profile-option selected" :"profile-option"}>My Adoption Requests</p>
    </div>
  )
  
}

export default ProfileMenu