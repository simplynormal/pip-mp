import React from 'react'
import "../css/NavBar.css"
import "../css/CheckoutPage.css"
import { apiURL, baseURL, checkAccess, numberWithCommas, perkTranslate } from './Common';
import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as Account } from "../assets/NavBar/account.svg"
import { ReactComponent as Minus } from "../assets/CheckoutPage/minus.svg"
import { ReactComponent as Plus } from "../assets/CheckoutPage/plus.svg"
import { ReactComponent as Delete } from "../assets/CheckoutPage/delete.svg"
import Auth from './Auth';
import Cookies from 'js-cookie';

const axios = require('axios').default;


function CartRow({ item, quantity, setQuantity }) {
  const [editingQuantity, setEditingQuantity] = React.useState(false)
  const setFilterQuantity = (q) => {
    var val = q
    if (val instanceof String) val = Number(q.replace(/[^0-9]/g, ''))
    val = val > 999 ? 999 : val
    setQuantity(val)
  }

  var tempQuantity = quantity

  return (
    <div className="row">
      <div className="img-wrapper">
        <img src={baseURL + item.image} alt="asd" />
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
            defaultValue={quantity}
            className="text-area"
            rows="1"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                e.target.blur();
            }}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              tempQuantity = e.target.value
            }}
            onBlur={() => {
              setEditingQuantity(false)
              if (tempQuantity !== quantity)
                setFilterQuantity(tempQuantity)
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
        <Delete style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "20px",
          height: "20px",
          padding: "3px",
          fill: "white",
          background: "grey",
        }}
          onClick={() => { setFilterQuantity(0) }}
        />
      </div>
    </div>
  )
}

export function NavBar({ sign, setSign, reset }) {
  const [signed, setSigned] = React.useState(false)
  const [changed, setChanged] = React.useState(false)
  const [navItems, setNavItems] = React.useState([])

  React.useEffect(() => {
    axios.post(baseURL + apiURL + '/cart/cart', {
      access_token: Cookies.get('accesstoken')
    })
      .then(response => {
        setNavItems(response.data)
        setSigned(true)
      })
      .catch(err => {
        console.log(err.response.data);
        if (err.response.status === 401)
          setNavItems([])
      })

    setSigned(checkAccess())
  }, [signed, reset, changed]);


  const quantityText = navItems.length > 99 ? "99+" : navItems.length
  var search = ''
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
      <input className="searchbar" type="text" placeholder="Search.."
        onChange={(e) => {
          search = e.target.value
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && search !== '') {
            window.location.href = '/products?search=' + search.replace(" ", "+");
          }
        }} />

      <div className="account">
        <Account className="suffix" onClick={() => { setSign(1) }} />
        <div className="account-hover">
          {signed ?
            <div className="row" onClick={() => {
              axios.delete(baseURL + apiURL + '/account/signout')
                .then(_ => {
                  Cookies.remove('accesstoken')
                  setSigned(false)
                })
            }}>Sign Out</div> :
            [
              <div className="row" key={1} onClick={() => { setSign(1) }}>Sign In</div>,
              <div className="row" key={2} onClick={() => { setSign(2) }}>Sign Up</div>
            ]}
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
              totalPrice += item.item.price * item.quantity
              return <CartRow key={i} item={item.item} quantity={item.quantity} setQuantity={(q) => {
                q = Number(q)
                const url = baseURL + apiURL + '/cart/cart'

                if (q === 0)
                  axios.delete(url, {
                    data: {
                      access_token: Cookies.get('accesstoken'),
                      uuid: item.item.uuid,
                    }
                  })
                    .then(response => {
                      if (response.status === 200)
                        setChanged(!changed)
                    })
                    .catch(err => console.log(err.response.data))
                else
                  axios.put(url, {
                    access_token: Cookies.get('accesstoken'),
                    uuid: item.item.uuid,
                    quantity: q
                  })
                    .then(response => {
                      if (response.status === 200)
                        setChanged(!changed)
                    })
                    .catch(err => console.log(err.response.data))
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
      {sign ? <Auth onClose={() => { setSign(0) }} signingIn={sign === 1} setSigned={setSigned} /> : ""}
    </header >
  )
}

export default NavBar