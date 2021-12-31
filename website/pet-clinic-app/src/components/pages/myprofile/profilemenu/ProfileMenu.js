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
    </div>
  )
  
}

export default ProfileMenu