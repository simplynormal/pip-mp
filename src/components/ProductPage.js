import React from 'react'
import '../css/ProductPage.css'

import ProductFilter from './ProductFilter'
import ProductList from './ProductList'


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
        <ProductFilter />
        <ProductList />
      </div>
    </div>
  )
}

export default ProductPage
