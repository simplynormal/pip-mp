import React, { Component } from 'react'
import "../css/SignUp.css"

export default class SignUp extends Component {

  render() {
    return (
      <div>

        <br />
        <div className="form-body">

          <form className="form-signup">
            <div className="form-inner">
              <div className="h2-signup">
                <h2>Sign Up Now</h2>
              </div>

              <div className="form-group">
                <label className="" htmlFor="name1">Name<big className="required">*</big></label>
                <input className="inp-signup" type="text" name="name1" id="name1" required />
              </div>

              <div className="form-group">
                <label htmlFor="email1">Email<big className="required">*</big></label>
                <input className="inp-signup" type="text" name="email1" id="email1" required />
              </div>

              <div className="form-group">
                <label htmlFor="password1">Password<big className="required">*</big></label>
                <input className="inp-signup" type="password" name="password1" id="password1" required />

              </div>

              <div className="form-group">
                <label htmlFor="re-password">Confirm Password<big className="required">*</big></label>
                <input className="inp-signup" type="password" name="re-password" id="re-password" required />

              </div>

              <br />
              <br />
              <br />

              <div className="form-group">
                <button type="submit" className="login">
                  Sign Up
                </button>
              </div>

              <div className="form-group">
                <button className="login-google">
                  &nbsp; &nbsp; Sign up with Google
                </button>
              </div>

            </div>

          </form>
        </div>
      </div>
    )
  }
}