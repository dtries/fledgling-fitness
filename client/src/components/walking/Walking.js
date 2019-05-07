import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
// import ReactDom from "react-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Walking extends Component {
    state = {
        week1ArrayComplete: false,
        walkBase: null,
        Day1: null,
        Day2: null,
        Day3: null,
        today: "",
        attempted: false,
        attemptDay1: false,
        completeDay1: false,
        attemptDay2: true,
        completeDay2: true,
        attemptDay3: true,
        completeDay3: true
    }

    componentWillMount(){
        this.checkDbCollections()
        this.getDate();
    };

    checkDbCollections = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        API.getProgress(baselineID)
            .then( res => {
                console.log(`Walking progress data are: ${JSON.stringify(res.data)}`);

                console.log(`Data walking are ${JSON.stringify(res.data.walking)}`);
                
                const firstWalkingItem = res.data.walking[0];


                if(firstWalkingItem === null) {
                    var firstElement = res.data.walking.shift();
                    console.log(`Now first walk item is ${JSON.stringify(res.data.walking[0])}`);
                    console.log(`Removed item is ${firstElement}`);
                };

                const lastDayComplete = res.data.walking[res.data.walking.length-1];
                console.log(`Last day complete: ${JSON.stringify(lastDayComplete)}`);
                console.log(`Last day complete Day: ${JSON.stringify(lastDayComplete.Day)}`);
                
                if (lastDayComplete.Day === 1 && lastDayComplete.Attempted === true) {
                console.log("conditions day 1 met");
                this.setState({attemptDay1: true});
                this.setState({completeDay1: true});
                this.setState({attemptDay2: false});
                this.setState({completeDay2: false});
                    } else if (lastDayComplete.Day === 2 && lastDayComplete.Attempted === true) {
                    console.log("conditions day 1 met");
                    this.setState({attemptDay1: true});
                    this.setState({completeDay1: true});
                    this.setState({attemptDay2: true});
                    this.setState({completeDay2: true});
                    this.setState({attemptDay3: false});
                    this.setState({completeDay3: false});
                };

                if (res.data === null || res.data.walking.length <2) {
                    this.loadInitialBaseline()
                }
                else { 
                    this.loadOngoingBaseline(res);
                }; 
            })
            .catch( err => console.log(err));
    };
    
    getDate = () => {
        const now = new Date();
        const nowStr = now.toLocaleString();
        console.log(`${now}`);
        console.log(`${nowStr}`);
        this.setState({today: nowStr}); 
    };

    loadInitialBaseline = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        
        console.log(`Week 1 walking array complete: ${this.state.week1ArrayComplete}`);
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

    loadOngoingBaseline = res => {
        let arrayStart = res.data.walking.length-1;
        for (let i=arrayStart; i > arrayStart-3; i--) { 
        const lastDay3Item = res.data.walking[i];
        const lastDayValue = lastDay3Item.Day;
        console.log(`Last day 3 item: ${JSON.stringify(lastDay3Item)}`);
        console.log(`Last day 3 key value is ${JSON.stringify(lastDayValue)}`)

            if (lastDayValue === 3) {
                console.log("Found last Day 3!!!!!!!");
                
                const lastDayCompleted = lastDay3Item.Completed;


                if (lastDayCompleted) {
                    console.log("get the value of day3 in last item");
                    console.log(`Value for new baseline is ${lastDay3Item.Duration}`)
                    let newBaseline = lastDay3Item.Duration;
                    this.setState({walkBase: newBaseline })
                    this.calculateWalking(this.state.walkBase, this.state.week);

                } else {
                    console.log("repeat last weeks progression");
                    let calcBaseline1 = Math.ceil(
                    parseFloat(([lastDay3Item.Duration]/1.1), 10));

                    let calcBaseline2 = Math.ceil(calcBaseline1/1.1);

                    let newBaseline = Math.ceil(calcBaseline2);

                    console.log(`Value for new baseline is 
                    ${newBaseline}`);

                    this.setState({walkBase: newBaseline })
                    this.calculateWalking(this.state.walkBase, this.state.week);
                }
            }
        }
    };

    calculateWalking = (walkBase => {
        console.log(`walkBase is ${walkBase}`);
        this.setState({Day1: walkBase});
        if (walkBase < 10) {
            this.setState({Day2: Math.ceil(walkBase*1.1)});
            this.setState({Day3: Math.ceil(this.state.Day2*1.1)});
        } else {
            this.setState({Day2: Math.trunc(walkBase*1.1)});        
            this.setState({Day3: Math.trunc(this.state.Day2*1.1)});

        };


        console.log(`Day 1 = ${this.state.Day1}, Day 2 = ${this.state.Day2}, Day 3 = ${this.state.Day3}`);
    });

    workoutUpdater = (id, dayNum, duration, attempted, completed) => {

        const workoutData = {
            userID: id,
            walking: { 
                        Date: this.state.today,
                        Day: dayNum,
                        Duration: duration,
                        Attempted: attempted,
                        Completed: completed
             }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateWalking(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));

        if (dayNum === 3) {
            this.props.history.push("/workouts");
        };
    };

    

    attemptedDay1Click = (e, completed) => {
        e.preventDefault();
        this.getDate();
        this.setState({attemptDay1: true});
        this.setState({completeDay1: true});
        this.setState({attemptDay2: false});
        this.setState({completeDay2: false});
  
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;
        const dayNum = 1;
        const duration = this.state.Day1;

        if (completed === undefined) {
            completed = false;
        };

        this.workoutUpdater(id, dayNum, duration, attempted, completed);
    };

    completedDay1Click = e => {
        e.preventDefault();
        this.setState({attemptDay2: true});
        this.setState({completeDay1: true});
        this.setState({attemptDay2: false});
        this.setState({completeDay2: false});
        const completed = true;
        this.attemptedDay1Click(e, completed);
    };

    attemptedDay2Click = (e, completed) => {
        e.preventDefault();
        this.getDate()
        this.setState({attemptDay2: true});
        this.setState({completeDay2: true});
        this.setState({attemptDay3: false});
        this.setState({completeDay3: false});
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;
        const dayNum = 2;
        const duration = this.state.Day2;


        if (completed === undefined) {
            completed = false;
        };

        this.workoutUpdater(id, dayNum, duration, attempted, completed);
    };

    completedDay2Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay2Click(e, completed);
    }

    attemptedDay3Click = (e, completed) => {
        e.preventDefault();
        this.getDate()
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;
        const dayNum = 3;
        const duration = this.state.Day3;


        if (completed === undefined) {
            completed = false;
        };

        this.workoutUpdater(id, dayNum, duration, attempted, completed);
    };

    completedDay3Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay3Click(e, completed);
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
                                            disabled={this.state.attemptDay1}
                                            onClick={this.attemptedDay1Click}
                                            id="attempted-btn1"
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.completeDay1}
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
                                            disabled={this.state.attemptDay2}
                                            onClick={this.attemptedDay2Click}
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.completeDay2}
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
                                            disabled={this.state.attemptDay3}
                                            onClick={this.attemptedDay3Click}
                                            >
                                            Attempted
                                        </button>
                                        <button className="completed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.completeDay3}
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


