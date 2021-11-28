import React from 'react'
import '../css/ProductFilter.css'
import Expand from "react-expand-animated"

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

function Expansion({ expand }) {
  return expand ?
    <svg className="expand-button" viewBox="0 0 12 8"
      fill="#4A4B57" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" />
    </svg>
    :
    <svg className="expand-button" viewBox="0 0 12 8"
      fill="#2264D1" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.41 -7.62939e-08L6 4.59L10.59 -7.62939e-08L12 1.42L6 7.42L0 1.42L1.41 -7.62939e-08Z" />
    </svg>
}

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
        <Expansion expand={expand} />
      </div>
      <Expand
        open={expand}
        duration={300}
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

function PriceFilter() {
  const [expand, setExpand] = React.useState(false)
  var fromPar = React.useRef(null)
  var fromRef = React.useRef(null)
  var toPar = React.useRef(null)
  var toRef = React.useRef(null)

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
        Price
        <Expansion expand={expand} />
      </div>
      <Expand
        open={expand}
        duration={300}
      >
        <div class="form-wrapper-outer">
          <div class="field-wrapper" ref={fromPar}>
            <input
              ref={fromRef}
              type="text"
              onChange={(e) => {
                if (fromRef.current.value === "MIN")
                  fromRef.current.value = e.target.value.replace("MIN", "")
                var value = e.target.value
                if (value !== "") {
                  fromPar.current.className = "field-wrapper hasValue"
                } else {
                  fromPar.current.className = "field-wrapper"
                }
              }}
            />
            <div
              class="field-placeholder"
              onClick={() => { fromRef.current.focus() }}
            ><span>From</span></div>
            <u>đ</u>
            <button
              onClick={() => {
                fromPar.current.className = "field-wrapper hasValue"
                fromRef.current.value = "MIN"
              }}>min</button>
          </div>
          <div class="field-wrapper" ref={toPar}>
            <input
              ref={toRef}
              type="text"
              onChange={(e) => {
                var value = e.target.value
                if (value !== "") {
                  toPar.current.className = "field-wrapper hasValue"
                } else {
                  toPar.current.className = "field-wrapper"
                }
              }}
            />
            <div
              class="field-placeholder"
              onClick={() => { toRef.current.focus() }}
            ><span>To</span></div>
            <u>đ</u>
            <button
              onClick={() => {
                toPar.current.className = "field-wrapper hasValue"
                toRef.current.value = "MAX"
              }}
            >max</button>
          </div>
        </div>
      </Expand>
    </div>
  )
}

function SubmitOrClear() {
  return (
    <div
      className="field-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button className="big-btn"
      >Apply</button>
      <button className="big-btn"
      >Clear</button>
    </div>
  )
}

function ProductFilter() {
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
      <PriceFilter />
      <SubmitOrClear />
    </div>
  )
}

export default ProductFilter