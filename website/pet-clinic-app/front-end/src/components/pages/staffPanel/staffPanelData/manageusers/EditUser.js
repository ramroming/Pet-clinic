import React from 'react'
import { Link } from 'react-router-dom'

const EditUser = ({setOpenEditModal}) => {
    return (


        <>
            <form className="form-container flex-col gap-16p falign-center" action="/" method="POST">


                <Link
                    to='/'
                    className='logo-link'>
                    <img src="/media/imgs/favicon.png" alt="" className="logo" />
                </Link>


                <div className="input-wrapper flex-row fjust-between">
                    <label className="half-label" htmlFor="username">
                        Username
                    </label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="input-wrapper flex-row fjust-between">
                    <label className="half-label" htmlFor="firstname">
                        first name
                    </label>
                    <input type="text" name="firstname" id="firstname" />
                </div>
                <div className="input-wrapper flex-row fjust-between">
                    <label className="half-label" htmlFor="lastname">
                        last name
                    </label>
                    <input type="text" name="lastname" id="lastname" />
                </div>
                <div className="input-wrapper flex-row fjust-between">
                    <label className="half-label" htmlFor="email">
                        email
                    </label>
                    <input type="email" name="email" id="email" />
                </div>

                
                    <div className="input-wrapper flex-col gap-8p">
                        <label className="half-label" htmlFor="gender">Role:
                        </label>
                        <div className="input-wrapper flex-row fjust-around">
                            <div className="flex-row radio-wrapper fjust-center gap-8p">
                                <input type="radio" name="role" id="client" value="client"/>
                                <label htmlFor="client">Client</label>
                            </div>
                            <div className="flex-row radio-wrapper fjust-center gap-8p">
                                <input type="radio" name="role" id="stmem" value="stmem"/>
                                <label htmlFor="stmem">stmem</label>
                            </div>
                            <div className="flex-row radio-wrapper fjust-center gap-8p">
                                <input type="radio" name="role" id="receptionist" value="receptionist"/>
                                <label htmlFor="receptionist">Receptionist</label>
                            </div>
                        </div>


                    </div>

                <div className="input-wrapper flex-row fjust-between">
                    <label className="half-label">Photo:
                    </label>
                    <label htmlFor="photo" className="btn-r btn-r-outlined-blue flex-row fjust-between">
                        Press to upload
                        <i className="fas fa-upload"></i>
                    </label>
                    <input type="file" name="photo" id="photo" accept="image/*" />

                </div>


                <div className="button-wrapper flex-row gap-8p fjust-center">

                    <button type="submit" className="btn-r btn-r-dark">
                        Update User
                    </button>
                    <button className="btn-r btn-r-dark"
                   onClick={() => {
                       setOpenEditModal(false)
                   }}>
                       Cancel
                    </button>

                </div>
            </form>


        </>

    )
}

export default EditUser