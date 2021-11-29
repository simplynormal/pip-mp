import React from 'react'
import "../css/CheckoutPage.css"

import p1 from "../database/products/p1.png";

import { ReactComponent as Logo } from "../assets/CheckoutPage/checkout.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"

function CheckoutRow() {
  return [
    <div className="img-wrapper">
      <img src={p1} alt="p1" />
    </div>,
    <p className="checkout-name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, eius veritatis</p>,
    <p className="checkout-price"> 12.000.000 <u>đ</u> </p>,
    <p className="checkout-price"> 12.000.000 <u>đ</u> </p>,
    <div className="checkout-quantity">
      <Minus className="no-select" style={{
        "--primary": "#C8372D",
      }} />
      <p>122</p>
      <Plus className="no-select" style={{
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
      <div className="result-container">
        {titles.map((name, i) => {
          return <div className="title-desc" key={i}>
            {name}
          </div>
        })}
        {[1, 2, 3, 4, 5].map(() => { return CheckoutRow() })}
      </div>
    </div>
  )
}

export default CheckoutPage
