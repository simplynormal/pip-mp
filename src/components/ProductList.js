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
    perk: ["Hot deal!", "50% OFF"]
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
const filters = [
  "Any brand",
  "above $1050",
  "2015-2021",
  "Sample",
]

function Options() {
  return (
    <div className="options-container">
      <div className="outer-wrapper">
        <select>
          <option value="1">Price Ascending</option>
          <option value="2">Price Descending</option>
          <option value="3">Latest</option>
          <option value="4">Oldest</option>
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
          <option value="1">Price Ascending</option>
          <option value="2">BMW</option>
          <option value="3">Citroen</option>
        </select>
      </div>
    </div>
  )
}

function perkTranslate(name) {
  if (name === "Hot deal!") return {
    "--perk-background": "#FDEDF2",
    "--perk-color": "#C23564"
  }
  if (name.toLowerCase().includes("% off")) return {
    "--perk-background": "#ECF7ED",
    "--perk-color": "#37833B"
  }
}

function Item({ item }) {
  return (
    <div className="item no-select">
      <img src={item.image} alt="p1" />
      <p>{item.name}</p>
      <div className="perk-container">
        {item.perk.map((name, i) => {
          return (
            <div key={i} style={perkTranslate(name)}>{name}</div>)
        })}
      </div>
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

  const fetchFilters = () => {
    return filters
  }

  return (
    <div className="products">
      <div className="products-container">
        <Options />
        <div className="filter-label">
          <p>Filter</p>
          {fetchFilters().map((name, i) => {
            return <div key={i} >{name}</div>
          })}
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
