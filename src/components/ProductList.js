import React from 'react'
import '../css/ProductList.css'

import { numberWithCommas, perkTranslate, baseURL, apiURL } from './Common';
import { ReactComponent as Cart } from "../assets/ProductPage/cart.svg"

function Options({ setSort, setCond, setPerk }) {
  return (
    <div className="options-container">
      <div className="outer-wrapper">
        <select onChange={(e) => {
          setSort(e.target.value === '1')
        }}>
          <option value="1">Price Ascending</option>
          <option value="2">Price Descending</option>
        </select>
        <div className="field-wrapper">sort by</div>
      </div>
      <div className="outer-wrapper">
        <select onChange={(e) => {
          setCond(e.target.value)
        }}>
          <option value="0">Condition</option>
          <option value="1">Available</option>
          <option value="2">Out of Stock</option>
          <option value="3">Contact</option>
        </select>
      </div>
      <div className="outer-wrapper" onChange={(e) => {
        setPerk(e.target.value)
      }}>
        <select>
          <option value="0">Special Offers</option>
          <option value="1">Hot deal!</option>
          <option value="2">Sales</option>
          <option value="3">Coupon</option>
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
  const [filter, setFilter] = React.useState({ sort: true, cond: 0, perk: 0 })
  var url = baseURL + apiURL
  var params = new URLSearchParams(window.location.search)

  const filterItem = (item) => {
    var temp = item.slice(0, item.length)

    // Special offers
    if (filter.cond === '1') {
      temp = temp.filter(item => item.price > 0)
    }
    else if (filter.cond === '2') {
      temp = temp.filter(item => item.price === -1)
    }
    else if (filter.cond === '3') {
      temp = temp.filter(item => item.price === -2)
    }

    // Special offers
    if (filter.perk === '1') {
      temp = temp.filter(item => item.perk.includes('Hot deal!'))
    }
    else if (filter.perk === '2') {
      temp = temp.filter(item => item.perk.toString().includes('% OFF'))
    }
    else if (filter.perk === '3') {
      temp = temp.filter(item => item.perk.includes('Coupon'))
    }

    // Sort by price
    if (filter.sort) temp.sort((a, b) => a.price - b.price)
    else temp.sort((a, b) => b.price - a.price)

    return temp
  }

  var filterLabels
  if (params.has('search')) {
    var newArr = params.get('search').split(' ')
    filterLabels = newArr
    url += "/product/search?key=" + params.get('search').replace(' ', '+')
  } else if (window.location.search !== '') {
    filterLabels = []
    params.forEach((value, key) => {
      filterLabels.push(`${key}: ${value}`)
    })
    url += '/product/filter' + window.location.search
  } else {
    filterLabels = []
    url += '/product/all'
  }

  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => a.price - b.price)
        setItems(data)
      });
  }, [url]);

  return (
    <div className="products">
      <div className="products-container">
        <Options
          setSort={val => {
            var temp = { ...filter }
            temp.sort = val
            setFilter(temp)
          }}
          setCond={val => {
            var temp = { ...filter }
            temp.cond = val
            setFilter(temp)
          }}
          setPerk={val => {
            var temp = { ...filter }
            temp.perk = val
            setFilter(temp)
          }}
        />
        <div className="filter-label">
          <p>Filter</p>
          {filterLabels.map((name, i) => {
            return <div key={i} >{name}</div>
          })}
        </div>
        <div className="list-container no-select">
          {filterItem(items).map((item, i) => {
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
