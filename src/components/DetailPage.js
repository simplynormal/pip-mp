import React from 'react'
import '../css/DetailPage.css'
import { Item as ProductItem } from './ProductList'
import { numberWithCommas, baseURL, apiURL } from './Common';

function convertColor(color) {
  if (color === 'red') return '#CB2032'
  if (color === 'blue') return '#1F4D78'
  if (color === 'red') return '#CB2032'
  if (color === 'yellow') return '#D6AC19'
  return color
}


function DetailPage() {
  const [item, setItem] = React.useState(null)
  const [related, setRelated] = React.useState([])
  const choicesRef = React.useRef([]);
  const colorsRef = React.useRef([]);


  React.useEffect(() => {
    fetch(baseURL + apiURL + '/product/detail' + window.location.search)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItem(data)
        choicesRef.current = choicesRef.current.slice(0, data.storage.length);
        choicesRef.current[0].className = "active"
        colorsRef.current = colorsRef.current.slice(0, data.color.length);
        colorsRef.current[0].className = "active"
      })


    fetch(baseURL + apiURL + '/product/related')
      .then(response => response.json())
      .then(data => setRelated(data));
  }, []);

  return item ? (
    <div className="detail-container">
      <div className="frame-container">
        <div className="main-frame no-select">
          <div className="detail-img-wrapper">
            <svg className="nav-arrow left">
              <path d="M17 2L3 16L17 30" stroke="#727272" strokeOpacity="0.8" strokeWidth="3" />
            </svg>
            <img src={baseURL + item.image} alt={item.name} />
            <svg className="nav-arrow right">
              <path d="M2 2L16 16L2 30" stroke="#727272" strokeOpacity="0.8" strokeWidth="3" />
            </svg>
          </div>
          <div className="description">
            <h1 className="name-desc">{item.name}</h1>
            <h2 className="price-desc">{numberWithCommas(item.price)} <u>đ</u></h2>
            <p className="short-desc">{item.desc}</p>
            <div className="choices">
              {item.storage.map((name, i) => {
                return <button
                  key={i}
                  ref={el => choicesRef.current[i] = el}
                  onClick={() => {
                    choicesRef.current.forEach((item, index) => { item.className = index === i ? "active" : "" }, choicesRef.current)
                  }}
                >{name}</button>
              })}
            </div>
            <div className="colors">
              {item.color.map((color, i) => {
                return <button
                  key={i}
                  ref={el => colorsRef.current[i] = el}
                  style={{ background: convertColor(color) }}
                  onClick={() => {
                    colorsRef.current.forEach((item, index) => { item.className = index === i ? "active" : "" }, colorsRef.current)
                  }}
                />
              })}
            </div>
            <div className="btn-container">
              <button style={{ "--color": "#FF0000" }}
                onClick={() => window.location.href = '/checkout'}>
                <svg>
                  <path d="M37.2934 23.8C36.8046 23.1625 36.2309 22.61 35.6784 22.0575C34.2971 20.7825 32.7034 19.8688 31.3646 18.53C28.2621 15.4275 27.6246 10.3063 29.5584 6.375C27.6246 6.86375 25.8396 7.96875 24.3521 9.18C18.9546 13.6 16.8296 21.3988 19.3796 28.0925C19.4646 28.305 19.5496 28.5175 19.5496 28.7938C19.5496 29.2612 19.2309 29.6863 18.8059 29.8563C18.3384 30.0688 17.8284 29.9412 17.4459 29.6012C17.3184 29.495 17.2334 29.3888 17.1271 29.24C14.7896 26.2013 14.4071 21.845 16.0009 18.36C12.5159 21.25 10.6246 26.1375 10.9221 30.7488C11.0071 31.8113 11.1346 32.8738 11.4959 33.9363C11.7934 35.2113 12.3459 36.4863 13.0259 37.6125C15.2359 41.2888 19.1246 43.9238 23.3109 44.455C27.7734 45.0288 32.5546 44.2 35.9759 41.055C39.8009 37.5275 41.1821 31.875 39.1634 27.03L38.8871 26.4775C38.4621 25.5 37.8884 24.6287 37.1871 23.8213L37.2934 23.8ZM30.7059 37.1875C30.1109 37.6975 29.1546 38.25 28.4109 38.4625C26.0734 39.3125 23.7359 38.1225 22.3121 36.72C24.8409 36.125 26.3284 34.255 26.7534 32.3637C27.1146 30.6637 26.4559 29.2612 26.1796 27.625C25.9246 26.0525 25.9671 24.7137 26.5621 23.2475C26.9234 24.055 27.3484 24.8625 27.8371 25.5C29.4521 27.625 31.9809 28.56 32.5121 31.45C32.5971 31.7475 32.6396 32.045 32.6396 32.3637C32.7034 34.1062 31.9596 36.0187 30.6846 37.1875H30.7059Z" fill="white" />
                </svg>
                Buy now
              </button>
              <button style={{ "--color": "#131212" }}
                onClick={() => window.location.href = '/checkout'}>
                <svg>
                  <path d="M17 17L17 14.875C17 10.1806 20.8056 6.375 25.5 6.375V6.375C30.1944 6.375 34 10.1806 34 14.875L34 17" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.96079 15.4608C6.375 16.0466 6.375 16.9894 6.375 18.875V38.75C6.375 42.5212 6.375 44.4069 7.54657 45.5784C8.71815 46.75 10.6038 46.75 14.375 46.75H36.625C40.3962 46.75 42.2819 46.75 43.4534 45.5784C44.625 44.4069 44.625 42.5212 44.625 38.75V18.875C44.625 16.9894 44.625 16.0466 44.0392 15.4608C43.4534 14.875 42.5106 14.875 40.625 14.875H10.375C8.48938 14.875 7.54657 14.875 6.96079 15.4608ZM20.125 25.5C20.125 24.9477 19.6773 24.5 19.125 24.5C18.5727 24.5 18.125 24.9477 18.125 25.5V29.75C18.125 30.3023 18.5727 30.75 19.125 30.75C19.6773 30.75 20.125 30.3023 20.125 29.75V25.5ZM32.875 25.5C32.875 24.9477 32.4273 24.5 31.875 24.5C31.3227 24.5 30.875 24.9477 30.875 25.5V29.75C30.875 30.3023 31.3227 30.75 31.875 30.75C32.4273 30.75 32.875 30.3023 32.875 29.75V25.5Z" fill="white" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="second-frame">
          <div>
            <div className="brand-desc">
              <h1>About {item.brand.name}</h1>
              <p>{item.brand.desc}</p>
            </div>
          </div>
          <div>
            <table id="customers">
              <tbody>
                <tr>
                  <th>Screen</th>
                  <td>{item.screen}</td>
                </tr>
                <tr>
                  <th>Camera</th>
                  <td>{item.camera}</td>
                </tr>
                <tr>
                  <th>Battery</th>
                  <td>{item.battery}</td>
                </tr>
                <tr>
                  <th>RAM</th>
                  <td>{item.ram}</td>
                </tr>
                <tr>
                  <th>Material</th>
                  <td>{item.material}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h1 className="related-label">RELATED PRODUCTS</h1>
      <div className="related-container">
        {related.map((item, i) => {
          return <ProductItem key={i} item={item} />;
        })}
      </div>
    </div >
  ) : ""
}

export default DetailPage
