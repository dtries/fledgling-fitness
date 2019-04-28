import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

var week = 1;
var baselinePushup = 7;
var day1Sets, day2Sets, day3Sets = {};

class Pushup extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    calculatePushups = pushupBase => {
        if (week === 0) {
            pushupBase = Math.trunc((baselinePushup-2)/3);
        } else {
        pushupBase = 2;
        }
        week=week+1;

        day1Sets = {
            set1: pushupBase,
            set2: pushupBase+1,
            set3: pushupBase
        }

        day2Sets = {
            set1: pushupBase,
            set2: pushupBase+1,
            set3: pushupBase+1
        }

        day3Sets = {
            set1: pushupBase+1,
            set2: pushupBase+1,
            set3: pushupBase+1
        }

        let newBaseLine = day3Sets.set3;
        console.log(newBaseLine);





        console.log(
            `Week = ${week}, 
            Day 1 = ${JSON.stringify(day1Sets)}, 
            Day 2 = ${JSON.stringify(day2Sets)}, 
            Day 3 = ${JSON.stringify(day3Sets)}`);
    };

    componentWillMount() {
        this.calculatePushups();
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
                            <li className="workout-header"><h4>WEEKLY PUSHUP WORKOUTS</h4>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 1</p>
                                        <p>Complete 3 Sets of Pushups:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;{day1Sets.set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;{day1Sets.set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;{day1Sets.set3} pushups</li>
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
                                        <p>Complete 3 Sets of Pushups:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp; {day2Sets.set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp; {day2Sets.set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp; {day2Sets.set3} pushups</li>
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
                                        <p className="card-title" id="workout-card-title">Day 3</p>
                                        <p>Complete 3 Sets of Pushups:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp; {day3Sets.set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp; {day3Sets.set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp; {day3Sets.set3} pushups</li>
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

Pushup.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Pushup);