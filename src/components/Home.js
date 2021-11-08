import React, { Component } from 'react'
import "./Home.css"

import event1 from "../database/events/event1.png";
import event2 from "../database/events/event2.png";
import event3 from "../database/events/event3.png";

import apple from "../database/pop-brands/apple.png";
import samsung from "../database/pop-brands/samsung.png";
import google from "../database/pop-brands/google.png";
import other from "../database/pop-brands/other.png";

import ip13 from "../database/products/ip13.png";


export default class Home extends Component {
  fetchEventsLinks = () => {
    return [
      event1,
      event2,
      event3
    ]
  }

  fetchPopBrands = () => {
    return [
      {
        name: "APPLE",
        image: apple
      },
      {
        name: "SAMSUNG",
        image: samsung
      },
      {
        name: "GOOGLE",
        image: google
      },
      {
        name: "OTHERS",
        image: other
      }
    ]
  }

  fetchPopProducts = () => {
    return [
      {
        name: "Iphone 13",
        image: ip13
      },
      {
        name: "Iphone 13",
        image: ip13
      },
      {
        name: "Iphone 13",
        image: ip13
      },
      {
        name: "Iphone 13",
        image: ip13
      },
      {
        name: "Iphone 13",
        image: ip13
      },
      {
        name: "Iphone 13",
        image: ip13
      },
    ]
  }

  render() {
    const events = this.fetchEventsLinks()
    const brands = this.fetchPopBrands()
    const products = this.fetchPopProducts()

    return (
      <div className="home-container">
        <section className="com-grid">
          {events.map((e, index) => {
            return <div
              className={`event-${index + 1}`}
              style={{
                backgroundImage: `url(${e})`,
              }} />
          })}
        </section>
        <div className="label">POPULAR BRANDS</div>
        <section className="com-grid" style={{
          gridAutoRows: "200px"
        }}>
          {brands.map((b, index) => {
            return <div
              className={`brand brand-${index + 1} no-select`}
              style={{
                backgroundImage: `url(${b.image})`,
                backgroundPosition: "10% 40%"
              }}
            >{b.name}</div>
          })}
        </section>
        <div className="label">POPULAR PRODUCTS</div>
        <section className="products-grid" >
          {products.map(p => {
            return <div>
              <img src={p.image} alt={p.name} ></img>
            </div>
          })}
        </section>
      </div>
    )
  }
}
