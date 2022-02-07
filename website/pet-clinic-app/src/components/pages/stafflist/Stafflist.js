import Staffcard from "./Staffcard";



const Stafflist = () => {

   

    return (

        // main flex container
        <div className="staff-container home-container flex-col falign-center gap-16p">
            {/* first flex */}
            <div className="staff-list-header flex-col falign-center gap-16p">
                <p>don't hesitate to rate our team,<br/>
                    we would love to hear you!</p>
            </div>

            <div className="staff-members flex-col falign-center gap-16p">
                <Staffcard/>
                <Staffcard/>

            </div>


        </div>

    )


}

export default Stafflist;