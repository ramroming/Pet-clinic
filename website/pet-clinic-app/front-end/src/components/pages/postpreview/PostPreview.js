const PostReview = () => {
  return (
    <div className=" adoption-ad-wrapper home-container flex-col falign-center gap-24p ">

        <p className="post-review-header">This is a preview of how your adoption post would be viewed by others</p>

        <p className="post-review-header-small">
            The info here is retrieved from your pet's profile,
           you can edit the info from<a className="link" href="#/"> here </a>:).<br/>
           feel free to provide more details in the pet's story box!
        </p>

        {/* first main flex item ++ pet intro, info and photo ++ */}
        <div className="pet-basic-info-wrapper flex-col falign-center fjust-center gap-24p">

            {/* first mini flex */}

            <div className=" wrapper flex-col falign-center fjust-center gap-16p">

                <div className="intro flex-col falign-center fjust-center gap-16p">
                    <p className="intro-hi">hi i'm</p>
                    <p className="pet-name">Mimo</p>
                    <p className="pet-breed">Domestic Shorthair</p>
                </div>

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

            {/* second mini flex */}
            <div className="flex-col fjust-center falign-center pet-image-container">
                <img src="media/imgs/petphoto.jpg" alt='pet'>
                </img>
            </div>

        </div>

        {/* second main flex item ++ pet story & trainings ++ */}
        <div className="pet-story flex-col gap-16p">

            <div className="adopt-story flex-col">
                <h2>My story</h2>
                <textarea className="story-textarea">sample:
                Looking for a cute, energetic little kitten? Come meet me and see if I'm the one for you!...</textarea>
                <input className="btn-rec-purple" type="submit" />
            </div>

            <div className="training-story flex-col gap-8p">

                <h2>My trainings <i className="fas fa-medal"></i></h2>

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




        


    </div>
)
}
export default PostReview