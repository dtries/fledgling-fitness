import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

class Navbar extends Component {
    render(){
        return (
            <div className="navbar-fixed">
                <nav>
                    <Link 
                        to="/"
                        className="col s4 brand-logo left"
                    >
                        <i className="fas fa-kiwi-bird"></i> 
                        <span className="brand">Fledgling Fitness</span>  
                    </Link>
                    <Link 
                            to="/progress"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="progress-nav waves-effect waves-light hoverable right"
                            >
                            Progress                
                        </Link>
                        <Link
                            to="/dashboard" 
                            style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="workouts-nav waves-effect waves-light hoverable right"
                        >
                            Workouts
                        </Link>
                </nav>
            </div>
        );
    }
}

export default Navbar;