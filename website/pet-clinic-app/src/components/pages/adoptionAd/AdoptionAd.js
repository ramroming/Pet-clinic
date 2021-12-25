

const AdoptionAd = () => {
    return (
        <div className=" adoption-ad-wrapper home-container flex-col falign-center gap-24p ">

            {/* first main flex item styled as a grid 
            ++ pet intro, info and photo ++ */}
            <div className="pet-basic-info-wrapper">

                {/* first mini flex */}

                <div className="intro flex-col falign-center fjust-center gap-16p">
                    <p className="intro-hi">hi i'm</p>
                    <p className="pet-name">Mimo</p>
                    <p className="pet-breed">Domestic Shorthair</p>
                </div>

                {/* second mini flex */}
                <div className="pet-image-container">
                <img src="media/imgs/petphoto.jpg" alt='pet'></img>
                </div>

                {/* third mini flex */}
                <div className="pet-info flex-col gap-16p">

                    <div className="flex-row gap-8p">
                        <label>Age: </label>
                        <p>2 Months</p>
                    </div>

                    <div className="flex-row gap-8p">
                        <label>Gender: </label>
                        <p>Female</p>
                    </div>

                    <div className="flex-row gap-8p">
                        <label>Color: </label>
                        <p>mixed</p>
                    </div>

                    <div className="flex-row gap-8p">
                        <label>Located with: </label>
                        <p>Shelter</p>
                    </div>

                </div>

            </div>

            {/* second main flex item ++ pet story & trainings ++ */}
            <div className="pet-story flex-col gap-16p">

                <div className="adopt-story flex-col">
                    <h2>My story</h2>
                    <p>Looking for a cute, energetic little kitten? Come meet me and see if I'm the one for you! I know I'm super adorable and playful but I also require a lot of time, energy, and attention. Maybe I could go home with another kitten friend? We do great in pairs and then you get double the love!</p>
                </div>

                <div className="training-story flex-col gap-8p">

                    <h2>My trainings</h2>

                    <div className="flex-row gap-8p">
                        <label>Training: </label>
                        <p>Catch</p>
                    </div>

                    <div className="flex-row gap-8p">
                        <label>Trained by: </label>
                        <p>Mia Smith</p>
                    </div>



                </div>

            </div>

            {/* third main flex item ++ check comments and leave a comment ++ */}

            <div className="comments-area-wrapper flex-col falign-center gap-8p">


                {/* wrapper of the comment text area and button to send comment */}
                <div className="leave-comment-wrapper flex-col falign-center gap-16p">
                    <textarea name="comment" id="comment" cols="30" rows="5" placeholder="feel free to share a comment!"></textarea>
                    <input className="btn-rec-purple" type="submit" />
                </div>


                {/*wrapper of all the comments, I'm guessing we'll use pagination again :') */}
                <div className="all-comments-wrapper flex-col gap-8p">


                    {/* each single comment wrapper */}
                    <div className="single-comment-wrapper flex-col gap-8p">

                        {/* the username */}
                        <div><i className="fas fa-user"></i>Maria</div>
                        {/* user's comment */}
                        <p>so cute! does mimo require any pet supplies or are they offered by you? </p>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default AdoptionAd
