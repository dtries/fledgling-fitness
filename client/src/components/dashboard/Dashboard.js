import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
// import classnames from "classnames";


class Dashboard extends Component {
    constructor () {
        super();
        this.state = {
            walking: "",
            pushups: "",
            situps: "",
            squats: "",
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        const { user } = this.props.auth;
        // const { errors } = this.state;


        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="title">
                        <b>{user.name.split(" ")[0]}, Let's Get Started</b>
                        </h4>
                        <p className="sub-title">
                            Enter Your Values For the Assessment Activities, Click Create My Plan When Done.
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col s12 center-align">
                        <Link
                            to="/workouts" 
                            style={{
                            width: "250px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="create-plan-btn btn btn-large waves-effect waves-dark hoverable"
                        >
                            Create My Plan
                        </Link>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="row form-begin">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Minutes you can walk comfortably at a brisk pace &nbsp;&nbsp;
                            <div className="input-field inline">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.walking}
                                    id="walking"
                                    type="number"
                                    min="0"
                                    max="1000000"
                                    className="validate baseline-input-line"
                                />
                                <label htmlFor="name">Enter Number</label>
                                <span   className="helper-text" data-error="Enter a Valid Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Number of good-form pushups you can complete &nbsp;
                            <div className="input-field inline">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.pushups}
                                    id="pushups"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <label htmlFor="name">Enter Number</label>
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Number of good form situps you can complete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="input-field inline">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.situps}
                                    id="situps"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <label htmlFor="name">Enter Number</label>
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                            <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                            Number of good form squats you can complete &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="input-field inline">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.squats}
                                    id="squats"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <label htmlFor="name">Enter Number</label>
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="col s12">
                        <button 
                            style={{ 
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "10%"
                            }}
                            onClick={this.onLogoutClick}
                            className="logout-btn btn btn-large waves-effect waves-dark hoverable"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>              
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Dashboard);