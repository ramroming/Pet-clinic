
const AdoptionAds = () => {
    return (
        <div className="adoption-container home-container flex-col falign-center fjust-start gap-24p">

            {/* first flex item */}
            <div className=" adoption-ads-header flex-col falign-center fjust-center fgap-16p">

                {/* first mini flex item */}
                <p>
                    Find your perfect pet!
                </p>

                {/* second  mini flex item */}
                <div className="filter-container flex-col falign-center fjust-center gap-16p">

                    <div className="flex-col falign-start fjust-center filter-item gap-8p">
                        <label htmlFor="pet-type">
                            Pet:
                        </label>
                        <select name="pet-type" id="pet-type">
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="bird">Bird</option>
                        </select>

                    </div>

                    <div className="flex-col falign-start fjust-center filter-item gap-8p">
                        <label htmlFor="pet-breed">
                            Breed:
                        </label>
                        <select name="pet-breed" id="pet-breed">
                            <option value="british">British</option>
                            <option value="retriever">Retriever</option>
                            <option value="momo">Momo</option>
                        </select>

                    </div>
                </div>



            </div>



            {/* second flex item */}

            {/* here we put the ads */}

        </div>
    )
}

export default AdoptionAds
