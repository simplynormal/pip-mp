import React from 'react'
import { Item as ProductItem } from './ProductList'
import p1 from "../database/products/p1.png";

function DetailPage() {
  return (
    <div>
      <ProductItem item={
        {
          name: "Iphone 13",
          image: p1,
          price: 15000000,
          perk: ["Hot deal!"]
        }} />
    </div>
  )
}

export default DetailPage
