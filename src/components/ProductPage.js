import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer"
import SearchBar from "./SearchBar";
import FilterColumn from "./FilterColumn";

//import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Product.css";

import ip13 from "../database/products/ip13.png";

// const vnd = '&#8363;';


const FilterRow = () => {
    return (
        <div className="row d-flex mr-0">
            <div className="d-flex">
                <div className="me-auto p-2">
                
                <button className="sort-button btn rounded btn-outline-secondary dropdown-toggle">
                    Sort by
                </button>
                <button className="sort-button btn rounded btn-outline-secondary dropdown-toggle">
                    Condition
                </button>
                <button className="sort-button btn rounded btn-outline-secondary dropdown-toggle">
                Delivery Options
                </button>
                </div>
                <div className="p-2">
                    <button className="col-4 my-cart rounded">

                        My Cart 
                        </button>
                </div>
            
            </div>
        </div>
    )
}

const Options = () => {
    return (
        <div className="rowd-flex justify-content-start">
            <button className="option-button shadow-none btn rounded-pill">
                APPLE
            </button>
            <button className="option-button shadow-none btn rounded-pill">
                Above 15.000.000 &#8363;
            </button>
            <button className="option-button shadow-none btn rounded-pill">
                Delivery Options
            </button>
        </div>
    )
}


class ProductPage extends React.Component{
    
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
          }
          
        ]
      }

    render() {
        const products = this.fetchPopProducts();

        return( 
            <div>
                <NavBar />

                <div className="home-container">
                    <section className="com-grid">
                        <SearchBar /> 
                    </section>
                </div>

                <div>

                    <div className="fluid-container align-items-center">

                        <div className="row main">
                            <div className="col-2">


                                <div className="fw-bold headline">
                                    FILTER OPTIONS
                                </div>
                                <div>
                                    <FilterColumn/>
                                </div>
                            </div>

                            <div className="col-9">
                                <div className="container">
                                    <FilterRow/>
                                    <Options/>


                                    <div className="row justify-content-stretch">
                                            {products.map(p => {
                                                return (
                                                    <div className=" col-3 product">
                    
                                                        <img draggable="false" 

                                                        className="img-phone"
                                                        src={p.image} alt={p.name}/>
                                                        <div className="caption-img">
                                                            <span className="phoneName">{p.name} 64GB</span>
                                                            <br/>
                                                            <small>21.000.000 &#8363; 
                                                                
                                                                <button className="add-button rounded">Add</button>

                                                            </small>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    
                            </div>
                        </div>
                    </div>

                    
                </div>

                
                    

                <Footer/>
            </div>
        );
    }

}

export default ProductPage;