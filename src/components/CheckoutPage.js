import React from 'react'
import "../css/CheckoutPage.css"

import { ReactComponent as Logo } from "../assets/CheckoutPage/checkout.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"
import { ReactComponent as User } from "../assets/CheckoutPage/user.svg"
import { ReactComponent as Phone } from "../assets/CheckoutPage/phone.svg"
import { ReactComponent as House } from "../assets/CheckoutPage/house.svg"
import { ReactComponent as Email } from "../assets/CheckoutPage/email.svg"
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
import { ReactComponent as Delete } from "../assets/CheckoutPage/delete.svg"
import { apiURL, baseURL, checkAccess, numberWithCommas } from './Common';
import Cookies from 'js-cookie';

const axios = require('axios').default;

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

function CheckoutRow({ item, quantity, setQuantity }) {
  const [editingQuantity, setEditingQuantity] = React.useState(false)
  const setFilterQuantity = (q) => {
    var val = q
    if (val instanceof String) val = Number(q.replace(/[^0-9]/g, ''))
    val = val > 999 ? 999 : val
    setQuantity(val)
  }

  return [
    <div className="img-wrapper" key={0}>
      <img src={baseURL + item.image} alt="p1" />
    </div>,
    <p className="checkout-name" key={1}>{item.name}</p>,
    <p className="checkout-price" key={2}> {numberWithCommas(item.price)} <u>??</u> </p>,
    <p className="checkout-price" key={3}> {numberWithCommas(item.price * quantity)} <u>??</u> </p>,
    <div className="checkout-quantity no-select" key={4}>
      <Minus style={{
        "--primary": "#C8372D",
      }}
        onClick={() => { setFilterQuantity(quantity - 1) }}
      />

      {editingQuantity ?
        <textarea
          autoFocus
          value={quantity}
          className="text-area"
          rows="1"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              e.target.blur();
          }}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            setFilterQuantity(e.target.value)
          }}
          onBlur={() => {
            setEditingQuantity(false)
          }}
        /> :
        <p
          onClick={(e) => {
            e.stopPropagation()
            setEditingQuantity(true)
          }}
        >{quantity}</p>
      }
      <Plus style={{
        "--primary": "#37833B",
      }}
        onClick={() => { setFilterQuantity(quantity + 1) }}
      />
      <div className="remove" onClick={() => { setFilterQuantity(0) }}>
        <Delete className="btn-remove" />
        Remove
      </div>
    </div>
  ]
}


function Method({ item, chosen, onClick }) {
  const [hover, setHover] = React.useState(false)

  return (
    <div className="method no-select"
      onClick={onClick}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      style={chosen ? { background: "#D8E6FF" } : (hover ? { background: "#f0f5ff" } : {})}
    >
      {chosen || hover ?
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 5C7.2 5 5 7.2 5 10C5 12.8 7.2 15 10 15C12.8 15 15 12.8 15 10C15 7.2 12.8 5 10 5ZM10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18Z" fill={chosen ? "#2264D1" : "#5c9bff"} />
        </svg> :
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18Z" fill="#2264D1" />
        </svg>}
      <h1>{item.desc}</h1>
      <div>
        {item.img.map((Img, i) => {
          return <Img key={i} />
        })}
      </div>
    </div>
  )
}
const CheckoutPage = ({ setSign }) => {
  const titles = ["Image", "Product name", "Price / Product", "Total price", "Quantity"]
  const [methodID, setMethodID] = React.useState(0)
  const [items, setItems] = React.useState(null)
  const [account, setAccount] = React.useState(null)

  const access_token = checkAccess()

  var [address, setAddress] = React.useState('')

  React.useEffect(() => {
    axios.post(baseURL + apiURL + '/cart/cart', {
      access_token: Cookies.get('accesstoken')
    })
      .then(response => setItems(response.data))
      .catch(err => {
        if (err.response.status === 401)
          setItems([])
      })

    axios.post(baseURL + apiURL + '/account/me', {
      access_token: Cookies.get('accesstoken')
    })
      .then(response => setAccount(response.data))
      .catch(err => console.log(err.response.data))

  }, [access_token]);

  var totalPrice = 0

  if (!access_token) setSign(1)

  return access_token && items ? (
    <div className="checkout-container">
      <div className="header-container no-select">
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
          {items.map((item, i) => {
            totalPrice += item.item.price * item.quantity

            return (<CheckoutRow key={i} item={item.item} quantity={item.quantity} setQuantity={(quantity) => {
              var rv = items.slice(0, items.length)
              if (quantity === 0)
                rv.splice(i, 1)
              else
                rv[i].quantity = quantity
              setItems(rv)
            }} />)
          })}
        </div>
        <svg className="divider">
          <line y1="1" x2="1140" y2="1" stroke="#ABABAB" strokeWidth="2" />
        </svg>
        <div className="last-part">
          <h3 className="total-cost" >Total cost:
            <span>
              {numberWithCommas(totalPrice)} <u>??</u>
            </span></h3>
        </div>
      </div>
      <div className="checkout-label">
        Personal information
      </div>
      <div className="common-checkout" style={{
        marginTop: "0",
        padding: "35px 0 100px 0"
      }}>
        {account ?
          [
            <div className="single-row" key={1}>
              <User />
              <h2>User: </h2>
              <div className="text-place">{account.first_name + ' ' + account.last_name}</div>
            </div>,
            <div className="single-row" key={2}>
              <Phone />
              <h2>Phone: </h2>
              <div className="text-place">{account.phone}</div>
            </div>,
            <div className="single-row" key={3}>
              <Email />
              <h2>Email: </h2>
              <div className="text-place">{account.email}</div>
            </div>,
            <div className="single-row" key={4}>
              <House />
              <h2>Address: </h2>
              <input type="text" className="text-place" placeholder="Enter your address..." onChange={(e) => {
                setAddress(e.target.value)
              }} />
            </div>,
          ] : ""}
        <svg className="divider">
          <line y1="1" x2="1140" y2="1" stroke="#ABABAB" strokeWidth="2" />
        </svg>
        <div className="method-container">
          {methods.map((item, i) => {
            return <Method
              key={i}
              item={item}
              chosen={i === methodID}
              onClick={() => { setMethodID(i) }}
            />
          })}
        </div>
        <h3 className="total-cost" style={{
          position: 'absolute',
          right: "70px",
          bottom: "120px",
        }}>Total cost:
          <span>
            {numberWithCommas(totalPrice)} <u>??</u>
          </span></h3>
        <button className="proceed-btn" style={{
          position: 'absolute',
          right: "70px",
          bottom: "40px"
        }}
          onClick={() => {
            if (address === '') {
              alert('Please enter address')
              return
            }

            axios.delete(baseURL + apiURL + '/cart/checkout', {
              data: {
                access_token: Cookies.get('accesstoken')
              }
            })
              .then(response => {
                if (response.status === 200) {
                  alert('Success simulation!')
                  window.location.href = '/products'
                }
              })
          }}
        >Proceed</button>
      </div>
    </div>
  ) : ""
}

export default CheckoutPage