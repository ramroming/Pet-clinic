import { useState } from "react"
import StaffPanelMenu from "./staffPanelMenu/StaffPanelMenu"
import StaffPanelData from "./staffPanelData/StaffPanelData"


const StaffPanel = () => {
  const [selection, setSelection] = useState(1)
  return (
    <div className="home-container staff-panel-wrapper">
      <div className="myprofile-container flex-row">
        <div className="bio-container flex-row gap-8p falign-center">
          <img className="avatar-photo" alt='avatar' src='/media/imgs/avatar.jpg' />
          <div className="bio-info flex-col gap-4p">
            <p className="user-name">
               Name/Surname
            </p>
            <p>Your professional panel</p>
          </div>
        </div>
        <StaffPanelMenu stateData={{selection, setSelection}}/>
        <StaffPanelData stateData={selection}/>
      </div>

    </div>
  )
}

export default StaffPanel