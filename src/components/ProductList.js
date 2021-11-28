import React from 'react'
import '../css/ProductList.css'

import { numberWithCommas } from './Common';

import p1 from "../database/products/p1.png";
import { ReactComponent as Cart } from "../assets/ProductPage/cart.svg"

const items = [
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
  {
    name: "Iphone 13",
    image: p1,
    price: 15000000,
    perk: ["Hot deal!"]
  },
]

function Options() {
  return (
    <div className="options-container">
      <div className="outer-wrapper">
        <select>
          <option value="1">Price Ascending</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
        </select>
        <div className="field-wrapper">sort by</div>
      </div>
      <div className="outer-wrapper">
        <select>
          <option value="0">Condition</option>
          <option value="1">Price Ascending</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
        </select>
      </div>
      <div className="outer-wrapper">
        <select>
          <option value="0">Delivery options</option>
          <option value="1">Price Ascending</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
        </select>
      </div>
    </div>
  )
}

function Item({ item }) {
  return (
    <div className="item no-select">
      <img src={item.image} alt="p1" />
      <p>{item.name}</p>
      {item.perk.map((name, i) => {
        return (
          <div className="perk-container" key={i} >
            <div>{name}</div>
          </div>)
      })}
      <p className="price">
        {numberWithCommas(item.price)} <u>đ</u>
      </p>
      <button className="add-cart">
        <Cart className="cart-logo" />
        Add to cart</button>
    </div>
  )
}

function ProductList() {
  const fetchItems = () => {
    return items
  }

  return (
    <div className="products">
      <div className="products-container">
        <Options />
        <div className="filter-label">
          <p>Filter</p>
          <div>Any brand</div>
          <div>above $1050</div>
          <div>2015-2021</div>
        </div>
        <div className="list-container">
          {fetchItems().map((item, i) => {
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
