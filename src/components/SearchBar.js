import React, {Component} from "react";
import "../css/SearchBar.css";

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <div className="">
                    <input className="bar" 
                    type="text" 
                    placeholder="Search.." />
                </div>
            </div>
        );
    }
};