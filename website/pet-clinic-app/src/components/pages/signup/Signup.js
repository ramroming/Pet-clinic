const Signup = () => {
    return (
        <div className="background-blue">
            <div className="main-container flex-row">
                <form className="form-container flex-col gap-16p falign-center" action="/" method="POST">
                    <a className="logo-link" href="/#">
                        <img src="/media/imgs/favicon.png" alt="" className="logo"/>
                    </a>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="first_name">First Name:
                        </label>
                        <input type="text" name="first_name" id="first_name"/>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="last_name">Last Name:
                        </label>
                        <input type="text" name="last_name" id="last_name"/>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="username">Username:
                        </label>
                        <input type="text" name="username" id="username"/>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="phone_number">Phone Number:
                        </label>
                        <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80"/>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="address">Address:
                        </label>
                        <textarea name="address" id="address" cols="30" rows="4"></textarea>
                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="email">Email:
                        </label>
                        <input type="email" name="email" id="email" placeholder="example@gmail.com"/>

                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="password">Password:
                        </label>
                        <input type="password" name="password" id="password"/>

                    </div>

                    <div className="input-wrapper flex-row fjust-between">
                        <label className="half-label" htmlFor="rePassword">Re-password:
                        </label>
                        <input type="password" name="rePassword" id="rePassword"/>
                    </div>

                    <div className="button-wrapper flex-row gap-8p fjust-center">


                        <button type="submit" className="btn-r btn-r-dark">
                            Sign up
                        </button>

                        <a href="/#" className="btn-r btn-r-purple">Already a member?</a>

                    </div>
                </form>

                <div className="split-screen-signup">
                    <img src="/media/imgs/sleeping-cat.jpg" alt=""/>
                </div>


            </div>
        </div>

    )

}
export default Signup;
