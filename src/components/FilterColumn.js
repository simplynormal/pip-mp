import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Collapse } from "react-bootstrap";
import "../css/FilterColumn.css";
import "jquery";

function FilterBox(props) {
    const [open, setOpen] = useState(false);
  
    return (
        <div>
            <br/>
            <div className="filter-box">

            <button className="dropbtn"
            onClick={() => setOpen(!open)}
            aria-controls="brand-collapse"
            aria-expanded={open}
            >
            {props.field} 
            </button>
            <Collapse in={open}>
            <div id="brand-collapse" className="collapse-content">
                <a href="/products">{props.val1}</a><br/>
                <a href="/products">{props.val2}</a><br/>
                <a href="/products">{props.val3}</a>
            </div>
            </Collapse>
        </div>
        </div>
      
    );
}

const FilterColumn = () => {
    
    return (
        <div>
            
            <FilterBox field="Brand" 
            val1="Apple" val2="Samsung" val3="Blackberry"/>

            <FilterBox field="RAM" 
            val1="4GB" val2="8GB" val3="16GB"/>

            <FilterBox field="Screen" 
            val1="4 - 5 inch" 
            val2="5 - 6 inch" 
            val3="6 - 7 inch"/>


        </div>
    )
};

export default FilterColumn;

