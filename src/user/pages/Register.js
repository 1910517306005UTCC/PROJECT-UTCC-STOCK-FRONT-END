import React from 'react'

function Register() {
    return (
        <form>
            <div className="GroubRegister">
                <h2>Register</h2>
                    <div className="GroupUsername-Register">
                        <label>Username<a> *</a></label>
                        <div>
                            <input type="User" className="Username-Register" placeholder="Enter Username" />
                        </div>
                    </div>

                    <div className="GroupEmail-Register">
                        <label>Email address<a> *</a></label>
                        <div>
                            <input type="E-mail" className="E-mailaddress" placeholder="Enter Emailaddress" />
                        </div>
                    </div>

                    <div className="GroubPassword-Register">
                        <label>Password<a> *</a></label>
                        <div>
                            <input type="Password" className="Password-Register" placeholder="Enter Password" />
                        </div>
                    </div>

                    <div className="GroubConfirm-Register">
                        <label>Confirm Password<a> *</a></label>
                        <div>
                            <input type="Confirm-Password" className="ConfirmPassword-Register" placeholder="Enter Confirmpassword" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btnSignup">Sign Up</button>
                            <p className="Signup">Already registered
                                <a> login?</a>
                            </p>
                    </div>
            </div>
        </form>
    )
}

export default Register
