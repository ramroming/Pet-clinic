import React from 'react'

// rafce react arrow function
const Cards = () => {
    return (
        <>
            <div className="cards-main-container flex-col gap-16p falign-center">

                {/* first main flex item */}

                <p className="main-header">Your Pet Happiness Journey</p>

                {/* 1-card second main flex item */}
                <div className="card-container flex-col falign-center gap-16p">

                    {/* first mini-flex */}
                    <img src="/media/imgs/pet-search.png" alt="find-pet"/>
                    {/* second mini-flex */}
                    <p className="card-title">Adopt a pet</p>
                    {/* third mini-flex */}
                    <p className="card-desc">
                    It's easy to find a pet who's right for you at our shelter or through adoption ads posted by others.
                    </p>

                </div>
                {/* 2-card third main flex item */}
                <div className="card-container flex-col falign-center gap-16p">

                    {/* first mini-flex */}
                    <img src="/media/imgs/pet-care.png" alt="pet-care"/>
                    {/* second mini-flex */}
                    <p className="card-title">Pet care</p>
                    {/* third mini-flex */}
                    <p className="card-desc">
                       We take care of your pet by the hands of various groomers, doctors and trainers.
                    </p>

                </div>
                {/* 3-card fourth main flex item */}
                <div className="card-container flex-col falign-center gap-16p">

                    {/* first mini-flex */}
                    <img src="/media/imgs/pet-shelter.png" alt="pet-shelter"/>
                    {/* second mini-flex */}
                    <p className="card-title">Find a home</p>
                    {/* third mini-flex */}
                    <p className="card-desc">
                     Submit a pet to our shelter or post an adoption ad to find a loving home for the pet.
                    </p>

                </div>
              


            </div>
        </>
    )
}

export default Cards
