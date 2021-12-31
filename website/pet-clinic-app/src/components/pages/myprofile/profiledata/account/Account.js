import { useState } from "react"

const Account = () => {
  const [changePass, setChangePass] = useState(false)
  const togglePass = () => {
    setChangePass((oldState) => {
      return !oldState
    })
  }
  return (
    <form className="profile-data account-data flex-col gap-24p">

      <div className="inputs-wrapper flex-col gap-16p">
        <div className="input-wrapper">
          <label htmlFor="first_name">User Name: </label>
          <input type="text" name="firstName" id="first_name" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="last_name">Email: </label>
          <input type="text" name="lastName" id="last_name" required />
        </div>
        <button
          onClick={togglePass}
          type="button" className="btn-r btn-r-dark change-pass">Change Password</button>
        {
          changePass &&
          <>
            <div className="input-wrapper">
              <label htmlFor="old_pass">Old Password: </label>
              <input type="text" name="old_pass" id="old_pass" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="new_pass">New Password: </label>
              <input type="text" name="new_pass" id="new_pass" required />
            </div>
          </>

        }
        <button type="submit" className="btn-r btn-r-blue">Update Account Info</button>
      </div>

    </form>
  )
}

export default Account