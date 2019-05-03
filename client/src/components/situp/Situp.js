import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

var week = 0;

class Situp extends Component {

    state = {
        week: null,
        situpBase: null,
        day1Set1: null,
        day1Set2: null,
        day1Set3: null,
        day2Set1: null,
        day2Set2: null,
        day2Set3: null,      
        day3Set1: null,
        day3Set2: null,
        day3Set3: null,
        today: "",
        attempted: false,
        completed: false
    }

     componentWillMount() {
        this.loadBaseline();
        this.getDate();
    };

    getDate = () => {
        const now = new Date();
        console.log(`${now}`);
        this.setState({today: now});
        
    };

    loadBaseline = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        API.getBaseline(baselineID)
            .then( res => {
                console.log(`SITUP BASE is ${JSON.stringify(res.data)}`)
                this.setState({situpBase: res.data.situps})
                this.calculateSitups(this.state.situpBase)
            }) 
            .catch(err => console.log(err)); 
    };

    calculateSitups = situpBase => {
        // if (week === 0) {
            situpBase = Math.trunc((this.state.situpBase-2)/3);
        // } else {
        //     situpBase = 99;
        // }
        console.log(`Situp Base is ${situpBase}`);

        week=week+1;

        // Day 1 Sets
        this.setState({day1Set1: situpBase});
        this.setState({day1Set2: situpBase+1});
        this.setState({day1Set3: situpBase});

        // Day 2 Sets
        this.setState({day2Set1: situpBase});
        this.setState({day2Set2: situpBase+1});
        this.setState({day2Set3: situpBase+1});
      
        // Day 3 Sets
        this.setState({day3Set1: situpBase+1});
        this.setState({day3Set2: situpBase+1});
        this.setState({day3Set3: situpBase+1});

        let newBaseLine = this.state.day3Set3;
        console.log(newBaseLine);

        console.log(
            `Week = ${week}, 
            Day 1 Set 1 = ${JSON.stringify(this.state.day1Set1)}, 
            Day 2 Set 2 = ${JSON.stringify(this.state.day1Set2)}, 
            Day 3 Set 3 = ${JSON.stringify(this.state.day1Set3)}`);
    };

    attemptedDay1Click = (e, completed) => {
        e.preventDefault();
        console.log(`The date is ${this.state.today}`);

        console.log(`Completed value is  ${completed}`);
        console.log(`Attempted button clicked`);
        console.log(`Week is now ${this.state.week}`);
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            situps: {Day1: {
                        Day: this.state.today,
                        Day1Set1: this.state.day1Set1,
                        Day1Set2: this.state.day1Set2,
                        Day1Set3: this.state.day1Set3,
                        Attempted: attempted,
                        Completed: completed
                        }
                     }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSitups(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));
    };

    completedDay1Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay1Click(e, completed);
        console.log(`Completed button clicked`);
    };

    attemptedDay2Click = (e, completed) => {
        e.preventDefault();
        console.log(`The date is ${this.state.today}`);

        console.log(`Completed value is  ${completed}`);
        console.log(`Attempted button clicked`);
        console.log(`Week is now ${this.state.week}`);
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            situps: {Day2: {
                        Day: this.state.today,
                        Day2Set1: this.state.day2Set1,
                        Day2Set2: this.state.day2Set2,
                        Day2Set3: this.state.day2Set3,
                        Attempted: attempted,
                        Completed: completed
                        }
                     }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSitups(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));
    };

    completedDay2Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay2Click(e, completed);
        console.log(`Completed button clicked`);
    };

    attemptedDay3Click = (e, completed) => {
        e.preventDefault();
        console.log(`The date is ${this.state.today}`);

        console.log(`Completed value is  ${completed}`);
        console.log(`Attempted button clicked`);
        console.log(`Week is now ${this.state.week}`);
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            situps: {Day3: {
                        Day: this.state.today,
                        Day3Set1: this.state.day3Set1,
                        Day3Set2: this.state.day3Set2,
                        Day3Set3: this.state.day3Set3,
                        Attempted: attempted,
                        Completed: completed
                        }
                     }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSitups(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));
    };

    completedDay3Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay3Click(e, completed);
        console.log(`Completed button clicked`);
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
                    <div className="walking-list col s12 center-align">
                        <ul className=" work-out-list">
                            <li className="workout-header"><h4>WEEKLY SITUP WORKOUTS</h4>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 1</p>
                                        <p>Complete 3 Sets of Situps:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day1Set1} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day1Set2} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day1Set3} situps</li>
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
                                        <p>Complete 3 Sets of Pushups:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day2Set1} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day2Set2} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day2Set3} situps</li>
                                            </ul>                                    
                                    </div>

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
                                        <p>Complete 3 Sets of Pushups:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day3Set1} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day3Set2} situps</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day3Set3} situps</li>
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

Situp.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Situp);