import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { Navbar, NavItem } from 'react-materialize';


class NavBar extends Component {
    render(){
        return (
            <Navbar brand={                
                <Link 
                    to="/"
                    className="brand-logo"
                >
                    <i className="fas fa-kiwi-bird nav-bird"></i> 
                    <span className="brand">Fledgling Fitness</span>  
                </Link>} alignLinks="right">

                <NavItem href="">
                            <Link
                                to="/workouts" 
                                style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="workouts-nav waves-effect waves-light hoverable right"
                            >
                                Workouts
                        </Link>
                </NavItem>
       
                <NavItem href="">
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
                </NavItem>
            </Navbar>
        );
    }
}

export default NavBar;