import react from "react";

const RegisterPet = () => {

    return (
        <div className="background-dark-blue">
            <div className="main-container flex-row">

                <form className="form-container flex-col gap-16p falign-center" action="/" method="POST">

                    <a className="logo-link" href="#">
                        <img src="/media/imgs/favicon.png" alt="" className="logo"/>
                    </a>

                    <div className="input-wrapper flex-col gap-8p">

                        <label className="full-label" htmlFor="type_name">Select your pet:
                        </label>

                        <div className="flex-row fjust-evenly icons-wrapper">

                            <label>
                                <input className="radio-img" type="radio" name="type_name" id="type_name" value="cat"/>
                                <img className="pet-icon" src="/media/imgs/cat-icon.png" alt=""/>
                            </label>

                            <label>
                                <input className="radio-img" type="radio" name="type_name" id="type_name" value="dog"/>
                                <img className="pet-icon" src="/media/imgs/dog-icon.jpg" alt=""/>
                            </label>

                            <label>
                                <input className="radio-img" type="radio" name="type_name" id="type_name" value="bird"/>
                                <img className="pet-icon low-op" src="/media/imgs/bird-icon.png" alt=""/>
                            </label>

                        </div>

                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="name">Pet Name:
                        </label>
                        <input type="text" name="name" id="name"/>
                    </div>

                    <div className="input-wrapper flex-col gap-8p">
                        <label className="half-label" htmlFor="gender">Pet Gender:
                        </label>
                        <div className="input-wrapper flex-row fjust-around">
                            <div className="flex-row radio-wrapper fjust-center gap-8p">
                                <input type="radio" name="gender" id="male" value="male"/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="flex-row radio-wrapper fjust-center gap-8p">
                                <input type="radio" name="gender" id="female" value="female"/>
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>


                    </div>


                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="birth_date">Birth Date:
                        </label>
                        <input type="date" name="birth_date" id="birth_date"/>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label">Photo:
                        </label>
                        <label htmlFor="photo" className="btn-r btn-r-outlined-blue flex-row fjust-between">
                            Press to upload
                            <i className="fas fa-upload"></i>
                        </label>
                        <input type="file" name="photo" id="photo" accept="image/*"/>

                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="breed_name">Select Breed:
                        </label>
                        <select name="breed_name" id="breed_name">
                            <option value="">breed1</option>
                            <option value="">breed2</option>
                            <option value="">breed3</option>
                            <option value="">breed4</option>
                        </select>

                    </div>


                    <div className="button-wrapper flex-row gap-8p fjust-center">

                        <button type="submit" className="btn-r btn-r-dark">
                            Login
                        </button>

                        <a href="#" className="btn-r btn-r-purple">Go to home page</a>

                    </div>
                </form>

                <div className="split-screen-registerpet">
                    <img src="/media/imgs/lovebirds.jpg" alt=""/>
                </div>


            </div>
        </div>


    );
}

export default RegisterPet;
