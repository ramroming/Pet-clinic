const Stafflist = () => {

    return (

        // main flex container
        <div className="staff-container home-container flex-col falign-center gap-24p">
            {/* first flex */}
            <div className="staff-list-header flex-col falign-center gap-16p">
                <span>Our staff members:</span>
                <p>don't hesitate to rate our staff<br />
                    we would love to hear from you</p>
            </div>

            {/* second flex */}
            <div className="staff-members flex-col falign-center gap-24p">
                <div className="staff-memebr-card flex-col falign-center gap-16">
                    {/* first mini-flex item */}
                    <p>Mehmet Kamil</p>
                    <div className="member-photo-container">
                        <img src="media/imgs/staff.png" alt="staff-member-photo" />
                    </div>
                    {/* second mini-flex item */}
                    <div className="rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                     {/* third mini-flex item */}
                     

                </div>


            </div>

        </div>

    )


}

export default Stafflist;