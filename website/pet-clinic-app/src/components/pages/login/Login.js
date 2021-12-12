const Login = () => {
    return (
        <>
            <div className="background-blue">
                <div className="main-container flex-row">
                    <form className="form-container flex-col gap-16p falign-center" action="/" method="POST">

                        <a className="logo-link" href="/#">
                            <img src="/media/imgs/favicon.png" alt="" className="logo"/>
                        </a>


                        <div className="input-wrapper flex-row fjust-between">
                            <label className="half-label" htmlFor="username">Username:
                            </label>
                            <input type="text" name="username" id="username"/>
                        </div>


                        <div className="input-wrapper flex-row fjust-between">
                            <label className="half-label" htmlFor="password">Password:
                            </label>
                            <input type="password" name="password" id="password"/>

                        </div>


                        <div className="button-wrapper flex-row gap-8p fjust-center">


                            <button type="submit" className="btn-r btn-r-dark">
                                Login
                            </button>

                            <a href="/#" className="btn-r btn-r-dark">
                                Not a member?
                            </a>
                            <a href="/#" className="btn-r btn-r-purple">
                                Forgot your password?</a>

                        </div>

                    </form>

                    <div className="split-screen-login">
                        <img src="/media/imgs/dog2.jpg" alt=""/>
                    </div>


                </div>
            </div>


        </>
    );
}

export default Login;
