import React from 'react'
import '../css/ProductFilter.css'
import Expand from "react-expand-animated"
import { numberWithCommas, baseURL, apiURL } from './Common'

const EXPAND_TRANSITION = 200

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


function FilterItem({ name, cate, chosen, setChosen }) {
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
        duration={EXPAND_TRANSITION}
      >
        <form
          style={{
            marginTop: "20px",
          }}
        >
          {cate.map((item, index) => {
            return (
              <label
                className="check-container"
                key={index}
              >
                {item}
                <input type="checkbox" checked={index === chosen} onChange={() => {
                  if (index === chosen)
                    setChosen(-1);
                  else
                    setChosen(index)
                }} />
                <span className="checkmark"></span>
              </label>
            )
          })}
        </form>
      </Expand>
    </div>
  )
}

function PriceFilter({ price, setPrice }) {
  const [expand, setExpand] = React.useState(true)
  var fromPar = price.from === "" ? "field-wrapper" : "field-wrapper hasValue"
  var fromRef = React.useRef(null)
  var toPar = price.to === "" ? "field-wrapper" : "field-wrapper hasValue"
  var toRef = React.useRef(null)

  const filterInput = (s) => {
    return numberWithCommas(s.substring(0, 15).replace(/[^0-9]/g, ''))
  }

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
        duration={EXPAND_TRANSITION}
      >
        <div className="form-wrapper-outer">
          <div className={fromPar}>
            <input
              ref={fromRef}
              type="text"
              value={price.from}
              onChange={(e) => {
                e.target.value = filterInput(e.target.value)
                var value = e.target.value
                setPrice({ from: value, to: price.to })
              }}
            />
            <div
              className="field-placeholder"
              onClick={() => { fromRef.current.focus() }}
            ><span>From</span></div>
            <u>đ</u>
            <button
              onClick={() => {
                setPrice({ from: "MIN", to: price.to })
              }}>min</button>
          </div>
          <div className={toPar}>
            <input
              ref={toRef}
              type="text"
              value={price.to}
              onChange={(e) => {
                e.target.value = filterInput(e.target.value)
                var value = e.target.value
                setPrice({ from: price.from, to: value })
              }}
            />
            <div
              className="field-placeholder"
              onClick={() => { toRef.current.focus() }}
            ><span>To</span></div>
            <u>đ</u>
            <button
              onClick={() => {
                setPrice({ from: price.from, to: "MAX" })
              }}
            >max</button>
          </div>
        </div>
      </Expand>
    </div>
  )
}

function ProductFilter() {
  const [filter, setFilter] = React.useState([])
  React.useEffect(() => {
    fetch(baseURL + apiURL + "/product/filter_list")
      .then(response => response.json())
      .then(data => setFilter(data));
  }, []);

  const [chosenList, setChosenList] = React.useState(Array(filter.length).fill(-1))
  const [price, setPrice] = React.useState({ from: "MIN", to: "MAX" })

  return (
    <div className="filter">
      <div className="label">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H15V5H3V7ZM0 0V2H18V0H0ZM7 12H11V10H7V12Z" fill="black" />
        </svg>
        FILTER OPTIONS
      </div>
      {filter.map((item, index) => {
        return <FilterItem
          name={item.name}
          cate={item.data}
          key={index}
          chosen={chosenList[index]}
          setChosen={(i) => {
            var temp = chosenList.slice(0, chosenList.length)
            temp[index] = i
            setChosenList(temp)
          }}
        />
      })}
      <PriceFilter price={price} setPrice={setPrice} />
      <div
        className="field-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <button className="big-btn"
          onClick={() => {
            var params = ''
            chosenList.forEach((chosen, i) => {
              if (chosen !== -1) {
                params += `${filter[i].name.toLowerCase()}=${filter[i].data[chosen]}&`
              }
            })
            if (price.from !== 'MIN') params += `fromPrice=${price.from.replaceAll(',', '')}&`
            if (price.to !== 'MAX') params += `toPrice=${price.to.replaceAll(',', '')}&`
            if (params !== '') {
              params = params.slice(0, params.length - 1)
              window.location.href = '/products?' + params
            }
          }}
        >Apply</button>
        <button className="big-btn"
          onClick={() => {
            setChosenList(Array(filter.length).fill(-1))
            setPrice({ from: "MIN", to: "MAX" })
          }}
        >Clear</button>
      </div>
    </div>
  )
}

export default ProductFilter