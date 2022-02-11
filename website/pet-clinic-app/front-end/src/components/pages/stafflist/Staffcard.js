
import { FaStar } from "react-icons/fa"
import { useState } from 'react'


const colors = {
    yellow: "#a364a5",
    gray: "#c5c5c5"
}



const Staffcard = (props) => {


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
                        <img src="media/imgs/staff.png" alt="staff-member" />
                    </div>

                    <p className="member-name">{props.name}</p>

                    <div className="rating">
                        <span className=
                            {`star fa fa-star ${props.rating >= 1 ? 'checked' : ''}`}>
                        </span>
                        <span className=
                            {`star fa fa-star ${props.rating >= 2 ? 'checked' : ''}`}>

                        </span>
                        <span className=
                            {`star fa fa-star ${props.rating >= 3 ? 'checked' : ''}`}>
                        </span>
                        <span className=
                            {`star fa fa-star ${props.rating >= 4 ? 'checked' : ''}`}>
                        </span>
                        <span className=
                            {`star fa fa-star ${props.rating >= 5 ? 'checked' : ''}`}>
                        </span>
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
