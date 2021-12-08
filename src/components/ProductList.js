import React from 'react'
import '../css/ProductList.css'

import { numberWithCommas, perkTranslate, baseURL, apiURL } from './Common';
import { ReactComponent as Cart } from "../assets/ProductPage/cart.svg"

function Options() {
  return (
    <div className="options-container">
      <div className="outer-wrapper">
        <select>
          <option value="1">Price Ascending</option>
          <option value="2">Price Descending</option>
        </select>
        <div className="field-wrapper">sort by</div>
      </div>
      <div className="outer-wrapper">
        <select>
          <option value="0">Condition</option>
          <option value="1">Available</option>
          <option value="2">Out of Stock</option>
          <option value="3">Contact</option>
        </select>
      </div>
      <div className="outer-wrapper">
        <select>
          <option value="0">Delivery options</option>
        </select>
      </div>
    </div>
  )
}

export function Item({ item }) {
  return (
    <a className="item-href" href={"/detail?uuid=" + item.uuid}>
      <div className="product-item">
        <img src={baseURL + item.image} alt="p1" />
        <p className="product-text" >{item.name}</p>
        <div className="perk-container">
          {item.perk.map((name, i) => {
            return (
              <div key={i} style={perkTranslate(name)}>{name}</div>)
          })}
        </div>
        <div className="item-footer">
          <p className="product-text" style={{
            fontWeight: "bold",
          }}>
            {numberWithCommas(item.price)} <u>đ</u>
          </p>
          <button className="add-cart">
            <Cart className="cart-logo" />
            Add to cart
          </button>
        </div>
      </div>
    </a>
  )
}

function ProductList() {
  const [items, setItems] = React.useState([])
  var filters
  var url = baseURL + apiURL
  var params = new URLSearchParams(window.location.search)

  if (params.has('search')) {
    var newArr = params.get('search').split(' ')
    filters = newArr
    url += "/product/search?key=" + params.get('search').replace(' ', '+')
  } else if (window.location.search !== '') {
    filters = []
    params.forEach((value, key) => {
      filters.push(`${key}: ${value}`)
    })
    url += '/product/filter' + window.location.search
  } else {
    filters = []
    url += '/product/all'
  }

  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setItems(data));
  }, [url]);

  return (
    <div className="products">
      <div className="products-container">
        <Options />
        <div className="filter-label">
          <p>Filter</p>
          {filters.map((name, i) => {
            return <div key={i} >{name}</div>
          })}
        </div>
        <div className="list-container no-select">
          {items.map((item, i) => {
            return (
              <Item item={item} key={i} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductList
