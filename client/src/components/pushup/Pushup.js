import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

var week = 0;

class Pushup extends Component {

    state = {
        pushupBase: "",
        day1Set1: "",
        day1Set2: "",
        day1Set3: "",
        day2Set1: "",
        day2Set2: "",
        day2Set3: "",      
        day3Set1: "",
        day3Set2: "",
        day3Set3: ""
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    loadBaseline = () => {
        API.getBaseline()
            .then( res => {
                console.log(`PUSH BASE is ${JSON.stringify(res.data[0])}`)
                this.setState({pushupBase: res.data[0].pushups})
                this.calculatePushups(this.state.pushupBase)
            }) 
            .catch(err => console.log(err)); 
    };

    calculatePushups = pushupBase => {
        // if (week === 0) {
            pushupBase = Math.trunc((this.state.pushupBase-2)/3);
        // } else {
        // pushupBase = 2;
        // }

        console.log(`Pushup Base is ${pushupBase}`);
        week=week+1;

        // Day 1 Sets
        this.setState({day1Set1: pushupBase});
        this.setState({day1Set2: pushupBase+1});
        this.setState({day1Set3: pushupBase});

        // Day 2 Sets
        this.setState({day2Set1: pushupBase});
        this.setState({day2Set2: pushupBase+1});
        this.setState({day2Set3: pushupBase+1});
      
        // Day 3 Sets
        this.setState({day3Set1: pushupBase+1});
        this.setState({day3Set2: pushupBase+1});
        this.setState({day3Set3: pushupBase+1});

        let newBaseLine = this.state.day3Set3;
        console.log(newBaseLine);

        console.log(
            `Week = ${week}, 
            Day 1 Set 1 = ${JSON.stringify(this.state.day1Set1)}, 
            Day 2 Set 2 = ${JSON.stringify(this.state.day1Set2)}, 
            Day 3 Set 3 = ${JSON.stringify(this.state.day1Set3)}`);
    };

    componentWillMount() {
        this.loadBaseline();
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
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;{this.state.day1Set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;{this.state.day1Set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;{this.state.day1Set3} pushups</li>
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
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp; {this.state.day2Set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp; {this.state.day2Set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp; {this.state.day2Set3} pushups</li>
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
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp; {this.state.day3Set1} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp; {this.state.day3Set2} pushups</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp; {this.state.day3Set3} pushups</li>
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