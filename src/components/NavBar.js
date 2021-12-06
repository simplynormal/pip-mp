import React from 'react'
import "../css/NavBar.css"
import "../css/CheckoutPage.css"
import p1 from "../database/products/p1.png";
import { numberWithCommas, perkTranslate } from './Common';
import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as Account } from "../assets/NavBar/account.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"
import Auth from './Auth';

const items = [
  {
    name: "Iphone 13",
    image: p1,
    price: 12000000,
    perk: ["Hot deal!", "50% OFF"],
    quantity: 69,
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 12000000,
    perk: ["Hot deal!", "50% OFF"],
    quantity: 69,
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 12000000,
    perk: ["Hot deal!", "50% OFF"],
    quantity: 69,
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 12000000,
    perk: ["Hot deal!", "50% OFF"],
    quantity: 69,
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 12000000,
    perk: ["Hot deal!", "50% OFF"],
    quantity: 69,
  },
]

function CartRow({ item, setQuantity }) {
  var quantity = item.quantity
  const [editingQuantity, setEditingQuantity] = React.useState(false)
  const setFilterQuantity = (q) => {
    var val = q
    if (val instanceof String) val = Number(q.replace(/[^0-9]/g, ''))
    val = val > 999 ? 999 : val
    setQuantity(val)
  }

  return (
    <div className="row">
      <div className="img-wrapper">
        <img src={p1} alt="asd" />
      </div>
      <div className="desc">
        <p className="name">{item.name}</p>
        <div className="perk-container" style={{
          margin: "0"
        }} >
          {item.perk.map((name, i) => {
            return (
              <div className="perk-row" key={i} style={perkTranslate(name)}>{name}</div>)
          })}
        </div>
        <p className="price">{numberWithCommas(item.price)} <u>đ</u></p>
      </div>
      <div className="checkout-quantity no-select">
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
      </div>
    </div>
  )
}

export function NavBar() {
  const [sign, setSign] = React.useState(0)
  const [navItems, setNavItems] = React.useState(items)
  const quantityText = navItems.length > 99 ? "99+" : navItems.length
  var totalPrice = 0

  return (
    <header>
      <a href="/"><Logo className="logo"></Logo></a>
      <nav>
        <ul className="nav-link">
          <li><a href="/products">PRODUCTS</a></li>
          <li><a href="/">NEWS</a></li>
          <li><a href="/">COUPONS</a></li>
          <li><a href="/">CONTACT</a></li>
        </ul>
      </nav>
      <input className="searchbar" type="text" placeholder="Search.." />

      <div className="account">
        <Account className="suffix" onClick={() => { setSign(1) }} />
        <div className="account-hover">
          <div className="row" onClick={() => { setSign(1) }}>Sign In</div>
          <div className="row" onClick={() => { setSign(2) }}>Sign Up</div>
        </div>
      </div>

      <div className="cart">
        <svg className="suffix" viewBox="2 -5 35 41" style={{
          position: "relative",
          bottom: "6px"
        }}
          onClick={() => window.location.href = '/checkout'}>
          <g clipPath="url(#clip0_204:802)">
            <path d="M6.65335 17.9777V15.5032C6.65335 13.8625 7.30659 12.2891 8.46936 11.1289C9.63212 9.96878 11.2092 9.31702 12.8536 9.31702C14.498 9.31702 16.075 9.96878 17.2378 11.1289C18.4006 12.2891 19.0538 13.8625 19.0538 15.5032V17.9777H22.7739C23.1028 17.9777 23.4182 18.1081 23.6508 18.3401C23.8833 18.5721 24.014 18.8868 24.014 19.2149V34.0618C24.014 34.39 23.8833 34.7047 23.6508 34.9367C23.4182 35.1687 23.1028 35.2991 22.7739 35.2991H2.93322C2.60434 35.2991 2.28893 35.1687 2.05638 34.9367C1.82382 34.7047 1.69318 34.39 1.69318 34.0618V19.2149C1.69318 18.8868 1.82382 18.5721 2.05638 18.3401C2.28893 18.1081 2.60434 17.9777 2.93322 17.9777H6.65335ZM6.65335 20.4522H4.17326V32.8246H21.5339V20.4522H19.0538V22.9267H16.5737V20.4522H9.13344V22.9267H6.65335V20.4522ZM9.13344 17.9777H16.5737V15.5032C16.5737 14.5188 16.1818 13.5747 15.4841 12.8786C14.7864 12.1826 13.8402 11.7915 12.8536 11.7915C11.8669 11.7915 10.9207 12.1826 10.223 12.8786C9.52538 13.5747 9.13344 14.5188 9.13344 15.5032V17.9777Z" />
          </g>
          {navItems.length > 0 ? <g>
            <circle cx="21.7893" cy="7.24972" r="9" fill="#FF0000" />
            <text x="21" y="11" textAnchor="middle" fontSize="10" fontWeight="bold" >{quantityText}</text>
          </g> : ""}
          <defs>
            <clipPath id="clip0_204:802">
              <rect width="26.1704" height="26.17" fill="white" transform="translate(0 8.91553)" />
            </clipPath>
          </defs>
        </svg>
        <div className="cart-hover">
          <div className="container">
            {navItems.map((item, i) => {
              totalPrice += item.price * item.quantity
              return <CartRow key={i} item={item} setQuantity={(q) => {
                var temp = navItems.slice(0, navItems.length)
                temp[i].quantity = q
                setNavItems(temp)
              }} />
            })}
          </div>
          <svg className="divider" style={{ margin: "10px auto" }}>
            <line y1="1" x2="480" y2="1" stroke="#ABABAB" strokeWidth="2" />
          </svg>
          <div className="last-row">
            <p className="total-label">Total cost: &nbsp; &nbsp; <span>{numberWithCommas(totalPrice)} <u>đ</u></span></p>
            <button onClick={() => { window.location.href = "/checkout" }}>Checkout</button>
          </div>
        </div>
      </div>
      {sign ? <Auth onClose={() => { setSign(0) }} signingIn={sign === 1} /> : ""}
    </header >
  )
}

export default NavBar