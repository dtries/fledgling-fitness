import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// var week = 0;

class Walking extends Component {
    state = {
        week: null,
        walkBase: null,
        Day1: null,
        Day2: null,
        Day3: null
    }

    componentWillMount(){
        this.loadBaseline()
    };

    loadBaseline = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        console.log(`This userID is ${JSON.stringify(baselineID)}`);
        API.getBaseline(baselineID)
            .then( res => {
                console.log(`The baseline response object is ${JSON.stringify(res.data)}`);
                this.setState({walkBase: res.data.walking})
                this.setState({week: res.data.week})
                this.calculateWalking(this.state.walkBase, this.state.week)
                console.log(`Week here is ${JSON.stringify(res.data.week)}`)

            }) 
            .catch(err => console.log(err)); 
    };

    calculateWalking = (walkBase, week) => {
        console.log(`walkBase is ${walkBase}`);
        console.log(`week at begin of calcWalk is ${week}`);
        this.setState({Day1: walkBase});
        if (walkBase < 10) {
            this.setState({Day2: Math.ceil(walkBase*1.1)});
            this.setState({Day3: Math.ceil(this.state.Day2*1.1)});
        } else {
            this.setState({Day2: Math.trunc(walkBase*1.1)});        
            this.setState({Day3: Math.trunc(this.state.Day2*1.1)});

        };


        console.log(`Week = ${week}, Day 1 = ${this.state.Day1}, Day 2 = ${this.state.Day2}, Day 3 = ${this.state.Day3}`);
    };

    attemptedDay1Click = e => {
        e.preventDefault();
        console.log(`Attempted button clicked`);
        this.setState({week: this.state.week + 1});
        console.log(`Week is now ${this.state.week+1}`);


    }

    completedDay1Click = e => {
        e.preventDefault();
        console.log(`Completed button clicked`);
    }

    attemptedDay2Click = e => {
        e.preventDefault();
        console.log(`Attempted button clicked`);
    }

    completedDay2Click = e => {
        e.preventDefault();
        console.log(`Completed button clicked`);
    }

    attemptedDay3Click = e => {
        e.preventDefault();
        console.log(`Attempted button clicked`);
    }

    completedDay3Click = e => {
        e.preventDefault();
        console.log(`Completed button clicked`);
    }

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
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {this.state.Day1} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn 
                                            btn btn-small waves-effect 
                                            waves-light hoverable"
                                            onClick={this.attemptedDay1Click}
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            onClick={this.completedDay1Click}
                                            >
                                            Completed
                                        </button>                                    
                                    </div>
                                </div>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 2</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Warm Up:</span> &nbsp;  Easy pace for 5 minutes</li>
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {this.state.Day2} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn 
                                            btn btn-small waves-effect 
                                            waves-light hoverable"
                                            onClick={this.attemptedDay2Click}
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            onClick={this.completedDay2Click}
                                            >
                                            Completed
                                        </button>                                    
                                    </div>
                                </div>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 3</p>
                                        <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Warm Up:</span> &nbsp;  Easy pace for 5 minutes</li>
                                                <li className="collection-item"><span className="set-marker">Workout: </span> &nbsp;  Brisk pace for {this.state.Day3} minutes.</li>
                                                <li className="collection-item"><span className="set-marker">Cool Down:</span> &nbsp;  Easy pace for 5 minutes</li>
                                            </ul>                                    
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn 
                                            btn btn-small waves-effect 
                                            waves-light hoverable"
                                            onClick={this.attemptedDay3Click}
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            onClick={this.completedDay3Click}
                                            >
                                            Completed
                                        </button>
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


