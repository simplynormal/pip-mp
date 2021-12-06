import React from 'react'
import '../css/Auth.css'

import { ReactComponent as GoogleLogo } from '../assets/Google_Logo.svg'

const SignUpForm = () => {
  return (
    <form method="post">
      <label className="text">Full Name
        <input type="text" name="name" required />
      </label>

      <label className="text">Email
        <input type="text" name="email" required />
      </label>

      <label className="text">Phone
        <input type="text" name="phone" required />
      </label>

      <label className="text">Password
        <input type="password" name="password" required />
      </label>

      <label className="text">Confirm Password
        <input type="password" name="password" required />
      </label>

      <div className="inline">
        <label className="check">
          <input type="checkbox" />
          <span class="checkmark"></span>
          I agree to the M&P Terms of Service and Privacy Policy.
        </label>
      </div>

      <input className="btn" type="submit" value="Sign me up" />
    </form>
  )
}

const SignInForm = () => {
  return (
    <form method="post">
      <label className="text">Email
        <input type="text" name="email" required />
      </label>

      <label className="text">Password
        <input type="password" name="password" required />
      </label>

      <div className="inline">
        <label className="check">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Remember me
        </label>
        <a className="forgot" href="/forgot">Forgot your password?</a>
      </div>

      <input className="btn" type="submit" value="Login now" />
    </form>
  )
}

export const Auth = ({ onClose, signingIn }) => {
  const [signIn, setSignIn] = React.useState(signingIn)

  return (
    <div className="sign-container" onClick={onClose}>
      <div className="form-body" onClick={(e) => { e.stopPropagation() }}>
        <svg className="btn-close" onClick={onClose}>
          <path d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z" fill="#505050" fillOpacity="0.8" />
        </svg>
        <div className="main">
          <h2>welcome</h2>
          <h1>{signIn ? "Login to your account" : "Create a new account"}</h1>
          {signIn ? <SignInForm /> : <SignUpForm />}
          {signIn ? <button className="btn btn-google">
            <GoogleLogo />
            Or sign-in with google
          </button> : ""}
        </div>
        <div className="last-option">
          {signIn ? "Don’t have an account?" : "Already have an account?"} &nbsp;
          <span
            onClick={() => { setSignIn(!signIn) }}>{signIn ? "Join free today" : "Login to account"}</span>
        </div>
      </div>
    </div>
  )
}

export default Auth