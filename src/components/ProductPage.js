import React from 'react'
import '../css/ProductPage.css'

import ProductFilter from './ProductFilter'
import ProductList from './ProductList'


function ProductPage() {

  return (
    <div style={{ margin: "auto" }}>
      <div className="main-container">
        <ProductFilter />
        <ProductList />
      </div>
    </div>
  )
}

export default ProductPage
