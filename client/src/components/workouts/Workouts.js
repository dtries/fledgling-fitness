import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../utils/API";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class Workouts extends Component {
    state = {
        doWalking: false,
        doPushups: true,        
        doSitups: true,
        doSquats: true
    }

    componentWillMount() {
        this.checkDisableButtons()
    };

    checkDisableButtons = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        API.getProgress(baselineID)
            .then( res => {
                console.log(`Progress data are: ${JSON.stringify(res.data)}`)
                if (res.data.walking !== null){
                    res.data.walking.length >6 ? 
                    this.setState({doPushups: false}) : 
                    this.setState({doPushups: true})
                } else {
                    this.setState({doPushups: true})
                }

                if (res.data.pushups !== null) {
                res.data.pushups.length !==null && res.data.pushups.length >5 ? 
                    this.setState({doSitups: false}) : 
                    this.setState({doSitups: true})
                }

                if (res.data.situps !== null) {
                res.data.situps.length >5 ? 
                    this.setState({doSquats: false}) : 
                    this.setState({doSquats: true})
                }
            })

    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        const { user } = this.props.auth;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="user-workout">
                            {user.name.split(" ")[0]}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="workout-list col s4 center-align push-s4">
                        <ul className="workout-list">
                            <li className="collection-header"><h4>YOUR WORKOUTS</h4></li>
                            <Link to="/walking" id="walking-workout-page" 
                                className="btn btn-large waves-effect 
                                waves-dark hoverable"
                                disabled={this.state.doWalking}
                                >
                                    <li className="">Walking</li>
                            </Link>
                            <Link to="/pushup" id="pushups-workout-page" 
                                className="btn btn-large waves-effect 
                                waves-dark hoverable"
                                disabled={this.state.doPushups}
                                >
                                    <li className="">Pushups</li>
                            </Link>
                            <Link to="/situp" id="situps-workout-page" 
                                className="btn btn-large waves-effect 
                                waves-dark hoverable"
                                disabled={this.state.doSitups}
                                >
                                    <li className="">Situps</li>
                            </Link>
                            <Link to="/squat" id="squats-workout-page" 
                                className="btn btn-large waves-effect
                                 waves-dark hoverable"
                                 disabled={this.state.doSquats}
                                 >
                                    <li className="">Squats</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col s12 workout-logout">
                        <button 
                            style={{ 
                                width: "200px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="workout-logout-btn btn btn-large waves-effect waves-light hoverable"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}
Workouts.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect (
    mapStateToProps,
    { logoutUser }
)(Workouts);