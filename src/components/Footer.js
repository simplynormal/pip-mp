import React from 'react'
import "./Footer.css"

import { ReactComponent as Logo } from "../assets/logo.svg"

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="general">
          <p>M&P Services, Inc. 2021</p>
          <p>EMAIL: SOMETHING@MP.COM</p>
          <p>FREE HOTLINE SERVICE</p>
          <p className="side-label">
            Ordering hotline: <span>
              1900 6969
            </span>
          </p>
          <p className="side-label">
            Customer service: <span>
              1800 1234
            </span>
          </p>
        </div>
        <Logo className="logo-footer"></Logo>
        <div className="location">
          <p>SHOP LOCATIONS:</p>
          <p className="city">Ho Chi Minh city:</p>
          <ul>
            <li>6-9 Cool Street, Cool Sub-district, Cool District.</li>
            <li>16-19 Awesome Street, Awesome Sub-district, Awesome District.</li>
          </ul>
          <p className="city">Vung Tau city:</p>
          <ul>
            <li>6-9 Cool Street, Cool Sub-district, Cool District.</li>
          </ul>
          <p className="city">Bien Hoa city:</p>
          <ul>
            <li>6-9 Cool Street, Cool Sub-district, Cool District.</li>
            <li>16-19 Awesome Street, Awesome Sub-district, Awesome District.</li>
          </ul>
          <p className="city">Ha Noi city:</p>
          <ul>
            <li>
              4-20 Lorem ipsum, Lorem Sub-district, Ipsum District.</li>
          </ul>
        </div>
      </div>
    </div >
  )
}
