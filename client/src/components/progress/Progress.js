import React, { Component } from "react";
import PropTypes from "prop-types";
import * as $ from 'jquery';
import API from "../../utils/API";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Progress extends Component {

    state = {
        progressMessage: "Let's Get Started!",
        walkingData: [],
        pushupData: [],
        situpData: [],
        squatData: []
    }

    componentWillMount() {
        this.checkDbCollections();
        // $('.tabs').tabs();
    };

    componentWillUnmount() {
        // $('.tabs').tabs();

    }

    checkDbCollections = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        API.getProgress(baselineID)
            .then( res => {
                // console.log(`Situp progress data are: ${JSON.stringify(res.data)}`)
                res.data.walking.length >0 ? 
                    this.setState({progressMessage: "You've Made Progress, Well Done!"}) 
                    : this.setState({progressMessage: "Let's Get Started!"})
                console.log(`Walking data are: ${JSON.stringify(res.data.pushups)}`)
                const walkDisplay = JSON.stringify(res.data.walking)
                this.setState({walkingData: walkDisplay})

                const pushupDisplay = JSON.stringify(res.data.pushups)
                this.setState({pushupData: pushupDisplay})

                const situpDisplay = JSON.stringify(res.data.situps)
                this.setState({situpData: situpDisplay})

                const squatDisplay = JSON.stringify(res.data.squats)
                this.setState({squatData: squatDisplay})

            })
            .catch( err => console.log(err))
        
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
                        <h4 className="user-progress">
                            {user.name.split(" ")[0]}
                            <p className="progress-text flow-text">
                                {this.state.progressMessage}
                            </p>
                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#walking">Walking</a></li>
                            <li className="tab col s3"><a className="active" href="#pushups">Pushups</a></li>
                            <li className="tab col s3"><a href="#situps">Situps</a></li>
                            <li className="tab col s3"><a href="#squats">Squats</a></li>
                        </ul>
                    </div>
                    <div id="walking" className="col s12">Walking
                        <div id="display-walking">{this.state.walkingData}</div>
                    </div>
                    <div id="pushups" className="col s12">Pushups</div>
                        <div id="display-pushups">{this.state.pushupData}</div>
                    <div id="situps" className="col s12">Situps</div>
                        <div id="display-situps">{this.state.situpData}</div>
                    <div id="squats" className="col s12">Squats</div>
                        <div id="display-squats">{this.state.squatData}</div>
                </div>


                <div className="row">
                    <div className="col s12 workout-card-logout">
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

Progress.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Progress);