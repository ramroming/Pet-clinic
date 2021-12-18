

const AppointmentCard = (props) => {

    console.log(props.status)
    return (
        <>
            {props.status === 'active' &&

                <div className="appointment-card appointment-active flex-col falign-start gap-16p">

                    {/* appointment type */}
                    <div className="flex-row">
                        <p>Examination / </p>
                        <p className="app-status"> Active</p>
                    </div>

                    {/* appointment date */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>17/05/2021 16:00</p>
                    </div>

                    {/* Staff mem */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-user-nurse"></i>
                        <p>Ahmet</p>
                    </div>

                    {/* pet name */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-paw"></i>
                        <p>Popo</p>
                    </div>

                    <a href="/#" className="btn-rec-purple">Cancel</a>

                </div>
            }
            {props.status === 'past' &&

                <div className="appointment-card appointment-past flex-col falign-start gap-16p">

                    {/* appointment type */}
                    <div className="flex-row">
                        <p>Examination / </p>
                        <p className="app-status"> Past</p>
                    </div>

                    {/* appointment date */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>17/05/2021 16:00</p>
                    </div>

                    {/* Staff mem */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-user-nurse"></i>
                        <p>Ahmet</p>
                    </div>

                    {/* pet name */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-paw"></i>
                        <p>Popo</p>
                    </div>

                </div>


            }


        </>


    )
}

export default AppointmentCard

