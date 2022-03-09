// import AnimationFade from '../adoption/AnimationFade'
//Import Animation objects
import { container, item } from "../adoption/AnimationFade"

//Import motion for defining entering motion, and AnimatePresence to define exit animation
import { motion } from "framer-motion"

const About = () => {

    // Assign the imported object to local object sliderMotion
    const containerMotion = container
    const itemMotion = item

    return (
        <motion.div
            variants={containerMotion}
            initial="hidden"
            animate="show"
            className="about-container home-container flex-col falign-center fjust-center
    ">

            <motion.p 
             variants={itemMotion}
             className="show-case-title">
                What is <span>PetVerse?</span>
            </motion.p>


            <motion.div
                variants={itemMotion}
                className="about-us-intro flex-col falign-center
        fjust-center gap-16p">





                <div className="about-containers flex-col falign-center fjust-center gap-16p">

                    {/* title */}


                    {/* photo */}
                    <div className="about-image-container flex-col fjust-center falign-center">
                        <img src="/media/imgs/favicon.png" alt="image1" />
                    </div>

                    {/* description */}
                    <div className="show-case">
                        <p>
                            in our clinic, we look after your pets with love and care, your pet's favorite place is going to be our clinic!
                            forget about worrying that your pet is going to be stressed to visit the clinic, it will be a relaxing and fun experience!
                        </p>
                    </div>

                </div>



                <div className="about-containers flex-col falign-center fjust-center gap-16p">

                    {/* photo */}

                    <div className="about-image-container
                    flex-col fjust-center falign-center">
                        <img src="/media/imgs/hearts-paws.png" alt="image2" />
                    </div>

                    {/* description */}
                    <div className="show-case">
                        <p>
                            If you want to find your new best friend, visit our shelter!
                            you can also check the adoption ads posted by many of our users
                            what are you waiting for? hop on on the journey of finding your new BFF
                        </p>
                    </div>

                </div>



            </motion.div>





        </motion.div>
    )
}

export default About