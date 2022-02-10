import { useState } from "react"
import ProfileData from "./profiledata/ProfileData"
import ProfileMenu from "./profilemenu/ProfileMenu"

const Myprofile = () => {
  const [selection, setSelection] = useState(1)
  return (
    <div className="home-container myprofile-wrapper">
      <div className="myprofile-container flex-row">
        <div className="bio-container flex-row gap-8p falign-center">
          <img className="avatar-photo" alt='avatar' src='/media/imgs/avatar.jpg' />
          <div className="bio-info flex-col gap-4p">
            <p className="user-name">
              public Name/Surname
            </p>
            <p>Your personal account</p>
          </div>
        </div>
        <ProfileMenu stateData={{selection, setSelection}}/>
        <ProfileData stateData={selection}/>
      </div>

    </div>
  )
}

export default Myprofile