import React, { Component } from 'react'
import "../css/SignIn.css"

export default class SignIn extends Component {

  render() {
    return (
      <div>
        <br />
        <div className="form-body">

          <form className="form-signin">
            <div className="form-inner">
              <h2>Login to your account</h2>


              <div className="form-group">
                <label htmlFor="email">Email<big className="required">*</big></label>
                <input className="inp-signin" type="text" name="email" id="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password<big className="required">*</big></label>
                <input className="inp-signin" type="password" name="password" id="password" required />

              </div>

              <div className="form-additional remember">
                <label className="remember-me" htmlFor="remember">Remember me</label>
                <input className="inp-signin" type="checkbox" name="remember" id="remember" />

                <span><a href="/resetpassword" className="forgotpass">
                  Forgot password?</a></span>
              </div>

              <br />

              <div className="form-group">
                <button className="btn-signin login" type="submit"
                  onClick={() => { window.location.href = "/products" }}>
                  Login now
                </button>
              </div>

              <div className="form-group">
                <button className="login-google">
                  &nbsp; &nbsp; Or sign in with Google
                </button>
              </div>

              <div className="form-group joinnow">
                Don't have an account? &nbsp;
                <a href="/signup" className="joinfree">
                  Join free today</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}