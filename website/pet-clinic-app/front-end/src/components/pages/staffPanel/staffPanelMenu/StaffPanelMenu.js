

const StaffPanelMenu = (props) => {

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
        className={ selection === 3 ? "profile-option selected" :"profile-option"}>Manage Appointments</p>
         <p  
        onClick ={ () => selecting(4)}
        className={ selection === 4 ? "profile-option selected" :"profile-option"}>Manage Adoption requests</p>
        {/* <p  
        onClick ={ () => selecting(6)}
        className={ selection === 6 ? "profile-option selected" :"profile-option"}>Check-in Client</p> */}
        <p  
        onClick ={ () => selecting(5)}
        className={ selection === 5 ? "profile-option selected" :"profile-option"}>Pet treatment history</p>
        <p  
        onClick ={ () => selecting(6)}
        className={ selection === 6 ? "profile-option selected" :"profile-option"}>Pet training history</p>
        
      </div>
    )
    
  }
  
  export default StaffPanelMenu