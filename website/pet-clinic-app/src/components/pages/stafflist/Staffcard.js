
import { FaStar } from "react-icons/fa"
import { useState } from 'react'

const colors = {
    yellow: "#a364a5",
    gray: "#c5c5c5"
}



const Staffcard = () => {


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
        <div className="staff-member-card flex-col falign-center">

            {/* first item */}
            <div className="member-info flex-col falign-center">

                <div className="member-photo-container">
                    <img src="media/imgs/staff.png" alt="staff-member-photo" />
                </div>

                <p className="member-name">Mehmet Kamil</p>

                <div className="rating">
                    <span class="star fa fa-star checked"></span>
                    <span class="star fa fa-star checked"></span>
                    <span class="star fa fa-star checked"></span>
                    <span class="star fa fa-star"></span>
                    <span class="star fa fa-star"></span>
                </div>

            </div>


            {/* second item */}
            <div className="flex-col falign-center stars">
                <h4>Your Rating:</h4>
                <div>
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={24}
                                className="each-star"
                                color={(hoverValue || currentValue) > index ? colors.yellow : colors.gray}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                            />

                        )
                    })}
                </div>

            </div>
        </div>

        

    )

}



export default Staffcard;
