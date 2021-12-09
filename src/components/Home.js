import React from 'react'
import "../css/Home.css"

import { apiURL, baseURL, numberWithCommas } from './Common';

import event1 from "../database/events/event1.png";
import event2 from "../database/events/event2.png";
import event3 from "../database/events/event3.png";

import apple from "../database/pop-brands/apple.png";
import samsung from "../database/pop-brands/samsung.png";
import google from "../database/pop-brands/google.png";
import other from "../database/pop-brands/other.png";

function Home() {
  const events = [
    event1,
    event2,
    event3
  ]
  const brands = [
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
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    fetch(baseURL + apiURL + '/product/popular')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="home-container">
      <section className="com-grid">
        {events.map((e, index) => {
          return <div
            key={index}
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
            key={index}
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
        {products.map((p, index) => {
          return (
            <a href={"/detail?uuid=" + p.uuid} key={index}>
              <div className="grid-item" >
                <img src={baseURL + p.image} alt={p.name} ></img>
                <div className="desc">
                  {p.name}
                  <p>{numberWithCommas(p.price)} <u>đ</u></p>
                </div>
              </div>
            </a>
          )
        })}
      </section>
    </div>
  )
}

export default Home
