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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quasi voluptas ex id fugiat! Saepe quaerat earum cum ducimus voluptates ea reiciendis autem harum doloribus ullam dolorum, magnam ipsum enim temporibus fugiat deserunt maiores. Quae commodi neque dolorum? Facere, repellendus.
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
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quasi voluptas ex id fugiat! Saepe quaerat earum cum ducimus voluptates ea reiciendis autem harum doloribus ullam dolorum, magnam ipsum enim temporibus fugiat deserunt maiores. Quae commodi neque dolorum? Facere, repellendus.
                        </p>
                    </div>

                </div>



            </motion.div>





        </motion.div>
    )
}

export default About