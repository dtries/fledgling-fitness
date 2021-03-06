import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { Navbar, NavItem } from 'react-materialize';
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NavBar extends Component {
    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    render(){
        return (
        //    <div className="container nav-container">
            <Navbar
                fixed="true"
                alignLinks="right"
                brand={                
                <Link 
                    to="/"
                    className="brand-logo"
                >
                    <i className="fas fa-kiwi-bird nav-bird"></i> 
                    <span className="brand">Fledgling Fitness</span>  
                </Link>} 
            >

                <NavItem 
                    href="/workouts" 
                    className="workouts-nav
                    waves-effect waves-light hoverable"
                    id="workouts-nav-item"
                >
                    Workouts
                </NavItem>
       
                <NavItem 
                    href="/progress"
                    className="progress-nav 
                    waves-effect waves-light hoverable"
                    id="progress-nav-item"
                >

                    Progress                
                </NavItem>

                <NavItem 
                    href="/about"
                    className="progress-nav 
                    waves-effect waves-light hoverable"
                    id="progress-nav-item"
                >

                    About                
                </NavItem>

                <NavItem href=""
                            className="logout-btn sidenav-close waves-effect waves-light hoverable"
                            id="logout-nav-item"
                            onClick={this.onLogoutClick}
                        >
                            Logout
                </NavItem>
            </Navbar>
            // </div> 
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect (
    mapStateToProps,
    { logoutUser }
)(NavBar);