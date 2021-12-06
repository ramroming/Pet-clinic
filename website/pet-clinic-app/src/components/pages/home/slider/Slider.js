import react from "react"


const Slider = () => {
    return (
        <>
            <div className="slider-container flex-col gap-16p falign-center">
                <img src="/media/imgs/right.png" className=" right"></img>
                <img src="/media/imgs/left.png" className=" left "></img>
                <div className="slide-content flex-col falign-center gap-24p">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, harum.</p>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <a href="" className="btn-rec-purple">
                        I'm a button
                    </a>
                    <img className="slider-img-desktop" src="/media/imgs/appointment.jpg" alt="app-image"/>
                    <img className="slider-img-mobile" src="/media/imgs/vertical-appointment.jpg" alt="app-image"/>
                </div>


            </div>
            <div className="pag flex-row gap-8p fjust-center">
                <i className=" fas fa-dot-circle active "></i>
                <i className="fas fa-dot-circle"></i>
                <i className="fas fa-dot-circle"></i>
                <i className="fas fa-dot-circle"></i>
            </div>
        </>
    )
}

export default Slider
