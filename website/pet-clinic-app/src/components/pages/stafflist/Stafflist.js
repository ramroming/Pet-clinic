import { FaStar } from "react-icons/fa"
import { useState } from 'react'

const colors = {
    yellow:"#ffff00",
    gray:"#c5c5c5"
}


const Stafflist = () => {

  
    const stars = Array(5).fill(0)
    const [currentValue, setCurrentValue] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    return (

        // main flex container
        <div className="staff-container home-container flex-col falign-center gap-24p">
            {/* first flex */}
            <div className="staff-list-header flex-col falign-center gap-16p">
                <span>Our staff members:</span>
                <p>don't hesitate to rate our staff<br />
                    we would love to hear you!</p>
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
                    {/* <div className="rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div> */}
                    {/* third mini-flex item */}
                    <div className="flex-col falign-center">
                        <h4>Your Rating:</h4>
                        <div className="stars">
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        className="each-star"
                                        color ={(hoverValue || currentValue) > index ? colors.yellow : colors.gray}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={()=> handleMouseOver(index +1)}
                                        onMouseLeave={handleMouseLeave}
                                    />

                                )
                            })}
                        </div>
                    </div>
                </div>


            </div>

        </div>

    )


}

export default Stafflist;