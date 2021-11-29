import React from 'react'
import "../css/CheckoutPage.css"

import p1 from "../database/products/p1.png";

import { ReactComponent as Logo } from "../assets/CheckoutPage/checkout.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"
import { ReactComponent as User } from "../assets/CheckoutPage/user.svg"
import { ReactComponent as Phone } from "../assets/CheckoutPage/phone.svg"
import { ReactComponent as House } from "../assets/CheckoutPage/house.svg"
import { ReactComponent as ApplePay } from "../assets/CheckoutPage/applePay.svg"
import { ReactComponent as GooglePay } from "../assets/CheckoutPage/googlePay.svg"
import { ReactComponent as Paypal } from "../assets/CheckoutPage/paypal.svg"
import { ReactComponent as Mastercard } from "../assets/CheckoutPage/mastercard.svg"
import { ReactComponent as Maestro } from "../assets/CheckoutPage/maestro.svg"
import { ReactComponent as Visa } from "../assets/CheckoutPage/visa.svg"
import { ReactComponent as Discover } from "../assets/CheckoutPage/discover.svg"
import { ReactComponent as Momo } from "../assets/CheckoutPage/momo.svg"
import { ReactComponent as Shopee } from "../assets/CheckoutPage/shopee.svg"
import { ReactComponent as Zalo } from "../assets/CheckoutPage/zalo.svg"

const methods = [
  {
    desc: "Pay by Payment Systems",
    img: [ApplePay, GooglePay, Paypal]
  },
  {
    desc: "Pay by Credit Card",
    img: [Mastercard, Maestro, Visa, Discover]
  },
  {
    desc: "Pay by E-Wallet",
    img: [Momo, Shopee, Zalo]
  },
]

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

function Method({ item }) {
  return (
    <div className="method">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C7.2 5 5 7.2 5 10C5 12.8 7.2 15 10 15C12.8 15 15 12.8 15 10C15 7.2 12.8 5 10 5ZM10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18Z" fill="#2264D1" />
      </svg>
      <h1>{item.desc}</h1>
      <div>
        {item.img.map((Img, i) => {
          return <Img key={i} />
        })}
      </div>
    </div>
  )
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
        <div className="method-container">
          {methods.map(item => {
            return <Method item={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
