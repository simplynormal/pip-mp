import React from 'react'
import '../css/ProductPage.css'
import Expand from "react-expand-animated";

const filter = [
  {
    name: "Brand",
    cate: ["Apple", "Samsung", "Oppo", "Xiaomi"]
  },
  {
    name: "RAM",
    cate: ["4GB", "8GB", "16GB", "32GB"]
  },
  {
    name: "Camera",
    cate: ["1MP", "2MP", "5MP", "10MP", "12MP"]
  },
  {
    name: "Screen",
    cate: ["4 - 5 inch", "5 - 6 inch", "6 - 7 inch"]
  },
  {
    name: "Storage",
    cate: ["64GB", "128GB", "256GB", "512GB"]
  },
  {
    name: "Year Manufacture",
    cate: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"]
  },
]

function FilterItem({ name, cate }) {
  const [expand, setExpand] = React.useState(false)

  return (
    <div
      className="item no-select"
      style={expand ? {
        boxShadow: "unset",
        background: "var(--dark-background-color)",

      } : {}}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => { setExpand(!expand) }}
      >
        {name}
        {expand ?
          <svg className="expand-button" viewBox="0 0 12 8"
            fill="#4A4B57" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" />
          </svg>
          :
          <svg className="expand-button" viewBox="0 0 12 8"
            fill="#2264D1" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 -7.62939e-08L6 4.59L10.59 -7.62939e-08L12 1.42L6 7.42L0 1.42L1.41 -7.62939e-08Z" />
          </svg>}
      </div>
      <Expand
        open={expand}
        duration={300}
        transitions={["height", "opacity", "background"]}
      >
        <form
          style={{
            marginTop: "20px",
          }}
        >
          {cate.map((item, index) => {
            return (
              <label
                class="check-container"
                key={index}
              >
                {item}
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            )
          })}
        </form>
      </Expand>
    </div>
  )
}

function Filter() {
  const fetchFilters = () => {
    return filter
  }

  return (
    <div className="filter">
      <div className="label">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H15V5H3V7ZM0 0V2H18V0H0ZM7 12H11V10H7V12Z" fill="black" />
        </svg>
        FILTER OPTIONS
      </div>
      {fetchFilters().map((item, index) => {
        return <FilterItem name={item.name} cate={item.cate} key={index} />
      })}
    </div>
  )
}


function ProductPage() {
  return (
    <div className="product-container">
      <div className="search">
        <input type="text" placeholder="Search.." />
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 2.41714L21.5829 0L12 9.58286L2.41714 0L0 2.41714L9.58286 12L0 21.5829L2.41714 24L12 14.4171L21.5829 24L24 21.5829L14.4171 12L24 2.41714Z" fill="#505050" />
        </svg>
      </div>
      <div className="main-container">
        <Filter />
        <div className="products"></div>
      </div>
    </div>
  )
}

export default ProductPage
