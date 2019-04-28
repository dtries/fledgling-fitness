import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

var Day1, Day2, Day3, week = 0;

class Walking extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    calculateWalking = walkBase => {
        week=week+1;
        walkBase = 12;
        Day1 = walkBase;
        if (walkBase < 10) {
            Day2 = Math.ceil(walkBase*1.1);
            Day3 = Math.ceil(Day2*1.1);
        } else {
        Day2 = Math.trunc(walkBase*1.1);
        Day3 = Math.trunc(Day2*1.1);
        };


        console.log(`Week = ${week}, Day 1 = ${Day1}, Day 2 = ${Day2}, Day 3 = ${Day3}`);
    };

    componentWillMount(){
        this.calculateWalking();
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
                    <div className="walking-list col s12 center-align">
                        <ul className=" work-out-list">
                            <li className="workout-header"><h4>WEEKLY WALKING WORKOUTS</h4>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 1</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Warm Up:</span> &nbsp;  Easy pace for 5 minutes</li>
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {Day1} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn btn btn-small waves-effect waves-light hoverable">Attempted</button>
                                        <button className="completed-btn btn btn-small waves-effect waves-light hoverable">Completed</button>
                                    </div>
                                </div>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 2</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Warm Up:</span> &nbsp;  Easy pace for 5 minutes</li>
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {Day2} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn btn btn-small waves-effect waves-light hoverable">Attempted</button>
                                        <button className="completed-btn btn btn-small waves-effect waves-light hoverable">Completed</button>
                                    </div>
                                </div>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 3</p>
                                        <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Warm Up:</span> &nbsp;  Easy pace for 5 minutes</li>
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {Day3} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>                                    
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn btn btn-small waves-effect waves-light hoverable">Attempted</button>
                                        <button className="completed-btn btn btn-small waves-effect waves-light hoverable">Completed</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />
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

Walking.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect (
    mapStateToProps,
    { logoutUser }
)(Walking);


