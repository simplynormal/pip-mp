import NavBar from "./NavBar";
import Home from "./Home";
import Footer from "./Footer"
import React from "react";
class Homepage extends React.Component{
       
    render() {
        return( 
            <div className="app">
                <NavBar quantity={10} />
                <Home />

                {/* Footer */}
                <Footer />
            </div>
        );
    }

}

export default Homepage;