import { useState } from "react"

const PersonalInfo = () => {
  const [editButton, setEditButton] = useState(false)

  return (
    <form className="profile-data flex-col gap-24p">
      <div className="change-pic flex-col gap-8p">
        <img src="/media/imgs/avatar.jpg" alt="avatar" />
        <div className="change-pic-wrapper">
          <button 
          onClick={() => setEditButton((oldState) => !oldState)}
          type="button" className="btn-rec"><i className="fas fa-pencil-alt"></i> Edit</button>
          {editButton &&
            <div className="change-pic-list flex-col gap-12p">
              <label htmlFor="profile_photo">
                Press to upload
                <i className="fas fa-upload"></i>
              </label>
              <input type="file" name="profile_photo" id="profile_photo" accept="image/*" />
              <a href="/#">Remove Photo</a>
            </div>
          }
        </div>
      </div>
      <div className="inputs-wrapper flex-col gap-16p">
        <div className="input-wrapper">
          <label htmlFor="first_name">First Name: </label>
          <input type="text" name="firstName" id="first_name" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="last_name">Last Name: </label>
          <input type="text" name="lastName" id="last_name" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="address">Address: </label>
          <input type="text" name="address" id="address" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone_number">Phone Number: </label>
          <input type="text" name="phoneNumber" id="phone_number" />
        </div>
        <button type="submit" className="btn-r btn-r-blue">Update Personal Info</button>
      </div>

    </form>
  )
}
export default PersonalInfo