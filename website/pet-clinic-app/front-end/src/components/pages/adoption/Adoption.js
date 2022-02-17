

//Import Animation objects
import { container, item } from "./AnimationFade"

//Import motion for defining entering motion, and AnimatePresence to define exit animation
import { motion } from "framer-motion"

import { Link } from "react-router-dom"

// Assign the imported object to local object sliderMotion
const containerMotion = container
const itemMotion = item

const Adoption = () => {
    return (
        <motion.div
            variants={containerMotion}
            initial="hidden"
            animate="show"
            className="adoption-container home-container flex-col falign-center fjust-center
        ">

            {/* post an ad or adopt */}
            <div className="cards-main-container flex-col gap-16p falign-center">

                <motion.div
                    variants={itemMotion}
                    className="card-container  flex-col falign-center gap-16p">
                    <h2>Want a home for a pet?</h2>
                    <img src="/media/imgs/pets.png" alt="hearts" />
                    <p>Do you have a pet that needs a home? post an ad in our website and reach out to people who are looking for pets to adopt and love!</p>
                    <motion.a
                        variants={itemMotion}
                        className="btn-rec-purple">Post An Ad
                    </motion.a>
                    {/* <motion.div
                    className="btn-rec-purple"
                    variants={itemMotion}>
                      <Link to='postad' >Post An Ad</Link>
                    </motion.div> */}
                </motion.div>

                <motion.div
                    variants={itemMotion}
                    className="card-container flex-col falign-center gap-16p">
                    <h2>Searching for a pet?</h2>
                    <img src="/media/imgs/home-for-pet.png" alt="hearts" />
                    <p>Adopting a pet is a win-win, for you and the pet. So, what are you waiting for? check the ads posted by our shelter and other people for pets looking to be adopted!</p>
                    <motion.a
                        variants={itemMotion} className="btn-rec-purple">View Ads</motion.a>
                </motion.div>


            </div>


        </motion.div>
    )
}

export default Adoption
