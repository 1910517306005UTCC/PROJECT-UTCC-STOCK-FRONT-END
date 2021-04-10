import React from 'react'

function Login() {
    return (
        form >
            <div className="GroubLogin">
                <h2>Login</h2>
                    <div className="GroupEmial">
                        <label>Email address<a href="#"> *</a></label>
                        <div>
                        <input type="Emial" className="Emailaddress" placeholder="Enter Emial" />
                        </div>
                    </div>

                    <div className="Grouppassword">
                        <label>Password<a href="#"> *</a></label>
                        <div>
                        <input type="password" className="Password" placeholder="Enter password" />
                        </div>
                    </div>

                    <div className="Groupcheckbox">
                        <input type="checkbox" className="inputCheckbox" id="Check01" />
                        <label>Remember me</label>
                    </div>
                    
                    <div>
                        <button type="submit" className="btnSubmit">Submit</button>
                        <p className="forgotpassword">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
            </div>
        </form>
    )
}

export default Login
