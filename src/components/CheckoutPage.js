import React from 'react'
import "../css/CheckoutPage.css"

import p1 from "../database/products/p1.png";

import { ReactComponent as Logo } from "../assets/CheckoutPage/checkout.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"
import { ReactComponent as User } from "../assets/CheckoutPage/user.svg"
import { ReactComponent as Phone } from "../assets/CheckoutPage/phone.svg"
import { ReactComponent as House } from "../assets/CheckoutPage/house.svg"

function CheckoutRow() {
  return [
    <div className="img-wrapper">
      <img src={p1} alt="p1" />
    </div>,
    <p className="checkout-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eius veritatis</p>,
    <p className="checkout-price"> 12.000.000 <u>đ</u> </p>,
    <p className="checkout-price"> 12.000.000 <u>đ</u> </p>,
    <div className="checkout-quantity no-select">
      <Minus style={{
        "--primary": "#C8372D",
      }} />
      <p>122</p>
      <Plus style={{
        "--primary": "#37833B",
      }} />
    </div>
  ]
}

function CheckoutPage() {
  const titles = ["Image", "Product name", "Price / Product", "Total price", "Quantity"]

  return (
    <div className="checkout-container">
      <div className="header-container">
        <div>
          <Logo />
          checkout
        </div>
      </div>
      <div className="common-checkout">
        <div className="result-container">
          {titles.map((name, i) => {
            return <div className="title-desc" key={i}>
              {name}
            </div>
          })}
          {[1, 2, 3, 4, 5].map(() => { return CheckoutRow() })}
        </div>
        <svg className="divider">
          <line y1="1" x2="1140" y2="1" stroke="#ABABAB" stroke-width="2" />
        </svg>
        <div className="last-part">
          <h3 className="total-cost" >Total cost:
            <span>
              91.000.000 <u>đ</u>
            </span></h3>
        </div>
      </div>
      <div className="checkout-label">
        Personal information
      </div>
      <div className="common-checkout" style={{
        marginTop: "0",
        paddingTop: "35px"
      }}>
        <div className="single-row">
          <User />
          <h2>User: </h2>
          <div>Lastname Midname Firstname</div>
        </div>
        <div className="single-row">
          <Phone />
          <h2>Phone: </h2>
          <div>0969696969</div>
        </div>
        <div className="single-row">
          <House />
          <h2>Address: </h2>
          <div>6-9 Cool Street, Cool Sub-district, Cool District.</div>
        </div>
        <svg className="divider">
          <line y1="1" x2="1140" y2="1" stroke="#ABABAB" stroke-width="2" />
        </svg>
      </div>
    </div>
  )
}

export default CheckoutPage
