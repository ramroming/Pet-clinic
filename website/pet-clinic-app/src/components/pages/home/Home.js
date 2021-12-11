import react from "react";
import Slider from "./slider/Slider";
import Cards from "./cards/Cards";

const Home = () => {
    return (
        <>
            <div className="home-container flex-col">
              <Slider />
              <Cards />
              
            </div>
        </>
    )
}

export default Home;
