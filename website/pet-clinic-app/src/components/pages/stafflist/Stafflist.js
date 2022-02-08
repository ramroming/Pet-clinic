import Staffcard from "./Staffcard";
import { useState, useEffect } from "react";




const serverFetch = () => {

    return new Promise((resolve, reject) => {
  
      const members = []
  
      for (let i = 0; i < 6; i++) {
        members.push({
          id: i,
          name: 'Reem Alhalbouni',
          rating: 4
        })
      }
      //retreiving data from the database 
  
      //for now simulation to that
  
      setTimeout(() => {
        resolve(members)
      }, 3000)
    })
  }



const Stafflist = () => {

   const [membersArr, setMembersArr] = useState({
       members: []
   })

   // what happens onload
   useEffect(() => {
    serverFetch().then((result) => {
      setMembersArr({ members: result })
    }).catch((error) => {
      console.log(error)
    })
  }, [])
   

    return (

        // main flex container
        <div className="staff-container home-container flex-col falign-center gap-16p">
            {/* first flex */}
            <div className="staff-list-header flex-col falign-center gap-16p">
                <p>don't hesitate to rate our team,<br/>
                    We would love to hear from you!</p>
            </div>

            <div className="staff-members flex-col falign-center gap-16p">
                {membersArr.members.map((member) => {
                    return <Staffcard name={member.name} rating={member.rating}/>
                })}
            
            </div>


        </div>

    )


}

export default Stafflist;