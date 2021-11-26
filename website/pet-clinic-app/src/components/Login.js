import react from "react";

const Login = () => {
    return (
        <div className="main-container flex-row">
            <form className="form-container flex-col gap-16p falign-center" action="/" method="POST">
                <a className="logo-link" href="#">
                    <img src="/media/imgs/favicon.png" alt="" className="logo"/>
                </a>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="first_name">First Name:
                    </label>
                    <input type="text" name="first_name" id="first_name"/>
                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="last_name">Last Name:
                    </label>
                    <input type="text" name="last_name" id="last_name"/>
                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="username">Username:
                    </label>
                    <input type="text" name="username" id="username"/>
                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="phone_number">Phone Number:
                    </label>
                    <input type="text" name="phone_number" id="phone_number" placeholder="eg. 506 022 23 80"/>
                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="address">Address:
                    </label>
                    <textarea name="address" id="address" cols="30" rows="4"></textarea>
                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="email">Email:
                    </label>
                    <input type="email" name="email" id="email" placeholder="example@gmail.com"/>

                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="password">Password:
                    </label>
                    <input type="password" name="password" id="password"/>

                </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="w-label"  htmlFor="rePassword">Re-password:
                    </label>
                    <input type="password" name="rePassword" id="rePassword"/>
                </div>

                <div className="button-wrapper flex-col gap-8p">
                    <button type="submit" className="btn-r btn-r-dark">
                        Sign up
                    </button>
                    <a href="#" className="btn-r btn-r-purple">Already a member?</a>
                </div>
            </form>
            <img className="split-screen" src="/media/imgs/sleeping-cat.jpg" alt=""/>


        </div>
    )

}
export default Login;
