import React from 'react'
import '../css/ProductPage.css'

import ProductFilter from './ProductFilter'
import ProductList from './ProductList'


function ProductPage({ setSign, setReset }) {

  return (
    <div style={{ margin: "auto" }}>
      <div className="main-container">
        <ProductFilter />
        <ProductList setSign={setSign} setReset={setReset} />
      </div>
    </div>
  )
}

export default ProductPage
