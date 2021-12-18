

const AppointmentCard = (props) => {

    return (
        <>
            {props.card.status === 'active' &&

                <div className="appointment-card appointment-active flex-col falign-start gap-16p">

                    {/* appointment type */}
                    <div className="flex-row">
                        <p>{props.card.type} / </p>
                        <p className="app-status"> Active</p>
                    </div>

                    {/* appointment id */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>{props.card.id}</p>
                    </div>
                    {/* appointment date */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>{props.card.date}</p>
                    </div>

                    {/* Staff mem */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-user-nurse"></i>
                        <p>{props.card.staffMem}</p>
                    </div>

                    {/* pet name */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-paw"></i>
                        <p>{props.card.petName}</p>
                    </div>

                    <a href="/#" className="btn-rec-purple">Cancel</a>

                </div>
            }
            {props.card.status === 'past' &&

                <div className="appointment-card appointment-past flex-col falign-start gap-16p">

                    {/* appointment type */}
                    <div className="flex-row">
                        <p>{props.card.type} / </p>
                        <p className="app-status"> Past</p>
                    </div>
                    {/* appointment id */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>{props.card.id}</p>
                    </div>

                    {/* appointment date */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-clock"></i>
                        <p>{props.card.date}</p>
                    </div>

                    {/* Staff mem */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-user-nurse"></i>
                        <p>{props.card.staffMem}</p>
                    </div>

                    {/* pet name */}
                    <div className="flex-row gap-16p">
                        <i className="fas fa-paw"></i>
                        <p>{props.card.petName}</p>
                    </div>

                </div>


            }


        </>


    )
}

export default AppointmentCard

