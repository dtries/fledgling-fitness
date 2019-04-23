import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render(){
        return (
            <div className="navbar-fixed">
                <nav>
                    <Link 
                        to="/"
                        className="col s4 brand-logo left yellow-text"
                    >
                        <i className="fas fa-kiwi-bird"></i> 
                        Fledgling Fitness   
                    </Link>
                    <Link 
                            to="/register"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                            >
                            Register                
                        </Link>
                        <Link
                            to="/login" 
                            style={{
                            marginLeft: "2rem",
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="btn btn-large waves-effect white hoverable black-text right"
                        >
                            Log In
                        </Link>
                </nav>
            </div>
        );
    }
}

export default Navbar;