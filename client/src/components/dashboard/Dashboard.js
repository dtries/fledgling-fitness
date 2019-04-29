import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../../utils/API";
import { logoutUser } from "../../actions/authActions";
// import { baseLineSubmit } from "../../actions/dataUpdates";
// import { Link } from "react-router-dom";
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

    componentWillMount() {
        this.baselineCompleted();
    };

    baselineCompleted = () => {
        API.getBaseline()
            .then( res => {
                console.log(`SITUP BASE is ${JSON.stringify(res.data[5])}`)
                if (res.data.baselineComplete === true) {
                    this.props.history.push("/workouts");
                }
            }) 
            .catch(err => console.log(err)); 
    };



    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        // console.log("MADE IT HERE DURING ONSUBMIT")
        const baselineData = {
            userID: user.id,
            week: 0,
            walking: this.state.walking,
            pushups: this.state.pushups,
            situps: this.state.situps,
            squats: this.state.squats,
            baselineComplete: true
        };
        console.log(`This is the baseline data ${JSON.stringify(baselineData)}`);
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/workouts");
        }

        const id = user.id;

        console.log(id);

        API.saveBaseline(baselineData)
            .then(res => {
                console.log(res.status, res.statusText);
            })
            .catch( err => {
                console.log(err);
            });
    };


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        console.log(`State is ${JSON.stringify(this.state)}`);
        const { user } = this.props.auth;
        console.log(`The user is ${JSON.stringify(user.id)}`);
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
                        <button
                            style={{
                            width: "250px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="create-plan-btn btn btn-large waves-effect waves-dark hoverable"
                        type="submit"
                        name="action"
                        onClick={this.onSubmit}
                        >
                            Create My Plan
                        </button>
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

