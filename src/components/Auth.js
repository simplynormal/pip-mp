import React from 'react'
import '../css/Auth.css'

import { ReactComponent as GoogleLogo } from '../assets/Google_Logo.svg'
import { apiURL, baseURL } from './Common'
import Cookies from 'js-cookie';

const axios = require('axios').default;

const SignUpForm = ({ setSignIn }) => {
  const [error, setError] = React.useState({ email: false, phone: false, password: false })
  const [password, setPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')
  var agree = true

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (!agree) {
        alert('You must agree to our Terms of Service to continue')
        return
      }

      if (password !== confirm_password) {
        alert('Passwords do not match')
        setError({ email: false, phone: false, password: true })
        return
      }

      var params = {}
      for (let i = 0; i < e.target.length; i++) {
        if (e.target[i].name !== '' && e.target[i].name !== 'confirm_password')
          params[e.target[i].name] = e.target[i].value
      }

      fetch(baseURL + apiURL + '/account/signup', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            let err = new Error('HTTP Status Code ' + response.status)
            err.data = response.json()
            err.status = response.status
            throw err
          }
          return response.json()
        })
        .catch(err => err.data.then(
          data => {
            var errorTemp = { password: false }

            var message = ""
            for (let [key, value] of Object.entries(data)) {
              message += value += "\n"
              errorTemp[key] = true
            }
            alert(message)
            setError(errorTemp)
          }
        ))
        .then(() => {
          alert('Account created successfully')
          setSignIn(true)
        })
    }}
    >
      <div className="inline" style={{ margin: 0 }}>
        <label className="text" style={{ marginRight: '5px' }}>First Name
          <input type="text" name="first_name" autocomplete="off" required />
        </label>
        <label className="text" style={{ marginLeft: '5px' }}>Last Name
          <input type="text" name="last_name" autocomplete="off" required />
        </label>
      </div>
      <label className="text">Email {error.email ? <span>&nbsp; * Email already registered</span> : ""}
        <input type="text" name="email" autocomplete="off" required />
      </label>

      <label className="text">Phone {error.phone ? <span>&nbsp; * Phone already registered</span> : ""}
        <input type="text" name="phone" autocomplete="off" required />
      </label>

      <label className="text">Password
        <input type="password" name="password" onChange={e => setPassword(e.target.value)} required />
      </label>

      <label className="text">Confirm Password {error.password ? <span>&nbsp; * Passwords do not match</span> : ""}
        <input type="password" onChange={e => setConfirmPassword(e.target.value)} required />
      </label>

      <div className="inline">
        <label className="check">
          <input type="checkbox"
            defaultChecked={true}
            onChange={(e) => agree = e.target.checked}
          />
          <span className="checkmark"></span>
          I agree to the M&P Terms of Service and Privacy Policy.
        </label>
      </div>

      <input className="btn" type="submit" value="Sign me up" />
    </form>
  )
}

const SignInForm = ({ onClose, setSigned }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      var params = {}
      for (let i = 0; i < e.target.length; i++) {
        if (e.target[i].name !== '' && e.target[i].name !== 'confirm_password')
          params[e.target[i].name] = e.target[i].value
      }
      axios.post(baseURL + apiURL + '/account/signin', params, { withCredentials: true })
        .then(function (response) {
          Cookies.set('accesstoken', response.data['access_token']);
          setSigned(true)
          onClose()
        })
        .catch(err => {
          if (err.response) {
            var errorTemp = { password: false }

            var message = ""
            for (let [key, value] of Object.entries(err.response.data)) {
              message += value += "\n"
              errorTemp[key] = true
            }
            alert(message)
          }
        })
    }}>
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

export const Auth = ({ onClose, signingIn, setSigned }) => {
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
          {signIn ? <SignInForm onClose={onClose} setSigned={setSigned} /> : <SignUpForm setSignIn={setSignIn} />}
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
