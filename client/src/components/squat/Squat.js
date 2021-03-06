import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SquatModal from "../squat/squatInstructions";

var moment = require('moment');

// var week = 0;

class Squat extends Component {

    state = {
        week: null,
        squatBase: null,
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
        completed: false,
        attemptDay1: false,
        completeDay1: false,
        attemptDay2: true,
        completeDay2: true,
        attemptDay3: true,
        completeDay3: true,
        cardDate: "",
        cardDate2: "",
        cardDate3: "",
        missedDay1: false,
        missedDay2: true,
        missedDay3: true
    }

    
    componentWillMount() {
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
                // console.log(`Squat progress data are: ${JSON.stringify(res.data)}`);
                var progressCheckResponse = res;

               
                
                if (res.data === null || res.data.squats.length <3) {
                    this.loadInitialBaseline(progressCheckResponse)
                }
                else { 

                    const lastDayComplete = res.data.squats[res.data.squats.length-1];
                    console.log(`Last day complete: ${JSON.stringify(lastDayComplete)}`);
                    console.log(`Last day complete Day: ${JSON.stringify(lastDayComplete.Day)}`);
                    
                    if (lastDayComplete.Day === 1 && (lastDayComplete.Attempted === true || lastDayComplete.Missed === true)) {
                    console.log("conditions day 1 met");
                    this.setState({attemptDay1: true});
                    this.setState({completeDay1: true});
                    this.setState({missedDay1: true});

                    this.setState({attemptDay2: false});
                    this.setState({completeDay2: false});
                    this.setState({missedDay2: false});

                        } else if (lastDayComplete.Day === 2 && (lastDayComplete.Attempted === true || lastDayComplete.Missed === true)) {
                        console.log("conditions day 1 met");
                        this.setState({attemptDay1: true});
                        this.setState({completeDay1: true});
                        this.setState({missedDay1: true});

                        this.setState({attemptDay2: true});
                        this.setState({completeDay2: true});
                        this.setState({missedDay2: true});

                        this.setState({attemptDay3: false});
                        this.setState({completeDay3: false});
                        this.setState({missedDay3: false});

                    };

                    this.loadOngoingBaseline(res);
                } 
            })
            .catch( err => console.log(err))
    };

    getDate = () => {
        const now = moment().format("ddd, MMM Do YYYY, h:mm:ss a");
        console.log(`${now}`);
        this.setState({today: now}); 
    };

    setCardDates = () => {
        const day2Adder = 2;
        const day3Adder = 4;
        const oldDate = moment(this.state.cardDate, "MMM-Do-YYYY");
        console.log(`Old date is ${oldDate}`);
        const day2Date = moment(oldDate).add(day2Adder, 'days').format("MMM Do YYYY");
        const day3Date = moment(oldDate).add(day3Adder, 'days').format("MMM Do YYYY");
        this.setState({cardDate2: day2Date});
        this.setState({cardDate3: day3Date});
        console.log(`New date is ${this.state.cardDate2}`);
        console.log(`New date is ${this.state.cardDate3}`);

    };

    loadInitialBaseline = (progressCheckResponse) => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };

        console.log(`progress check data are ${JSON.stringify(progressCheckResponse)}`);
        const lastDayComplete = progressCheckResponse.data.squats[progressCheckResponse.data.squats.length-1];
        console.log(`Last day complete: ${JSON.stringify(lastDayComplete)}`);
        // console.log(`Last day complete Day: ${JSON.stringify(lastDayComplete.Day)}`);
        
        if (lastDayComplete === undefined) {
            console.log("Skip this part");
        }
        else if (lastDayComplete.Day === 1 && (lastDayComplete.Attempted === true || lastDayComplete.Missed === true)) {
        console.log("conditions day 1 met");
        this.setState({attemptDay1: true});
        this.setState({completeDay1: true});
        this.setState({missedDay1: true});

        this.setState({attemptDay2: false});
        this.setState({completeDay2: false});
        this.setState({missedDay2: false});

            } else if (lastDayComplete.Day === 2 && (lastDayComplete.Attempted === true || lastDayComplete.Missed === true)) {
            console.log("conditions day 2 met");
            this.setState({attemptDay1: true});
            this.setState({completeDay1: true});
            this.setState({missedDay1: true});

            this.setState({attemptDay2: true});
            this.setState({completeDay2: true});
            this.setState({missedDay2: true});

            this.setState({attemptDay3: false});
            this.setState({completeDay3: false});
            this.setState({missedDay3: false});

        };        

        API.getBaseline(baselineID)
            .then( res => {
                console.log(`SQUAT BASE is ${JSON.stringify(res.data)}`)
                this.setState({squatBase: res.data.squats})
                const baseBeginDate = moment(res.data.startDate, "MMM-Do-YYYY")
                console.log(`base start date is ${baseBeginDate}`);
                const squatFirstDay = moment(baseBeginDate).add(1, 'days').format("MMM Do YYYY")
                console.log(`Squat first date: ${squatFirstDay}`);
                this.setState({cardDate: squatFirstDay})
                this.calculateSquats(this.state.squatBase)
                this.setCardDates()

            }) 
            .catch(err => console.log(err)); 
    };

    loadOngoingBaseline = res => {
        let arrayStart = res.data.squats.length-1;
        for (let i=arrayStart; i > arrayStart-3; i--) { 
        const lastDay3Item = res.data.squats[i];
        const lastDayValue = lastDay3Item.Day;
        console.log(`Last day 3 item: ${JSON.stringify(lastDay3Item)}`);
        console.log(`Last day 3 1st key value is ${lastDayValue}`)
        const baseBeginDate = moment(res.Date);
        console.log(`base start date is ${baseBeginDate}`);
        const firstDay = moment(baseBeginDate).add(3, 'days').format("MMM Do YYYY");
        console.log(`First date: ${firstDay}`);
        this.setState({cardDate: firstDay});
        this.setState({week: lastDay3Item.Week});
        this.setCardDates();

            if (lastDayValue === 3) {
                console.log("Found last Day 3!!!!!!!");
                
                const lastDayCompleted = lastDay3Item.Completed;


                if (lastDayCompleted) {
                    console.log("get the value of day3 in last item");

                    let newBaseline =
                        parseInt([lastDay3Item.Day3Set3], 10) + 
                        parseInt([lastDay3Item.Day3Set2], 10) +
                        parseInt([lastDay3Item.Day3Set1], 10) +
                        2;

                    console.log(`Value for new baseline is ${newBaseline}`);

                    this.setState({squatBase: newBaseline })
                    this.calculateSquats(this.state.squatBase, this.state.week);

                } else {
                    console.log("repeat last weeks progression");
                    let newBaseline =
                    parseInt([lastDay3Item.Day3Set3]-1, 10) + 
                    parseInt([lastDay3Item.Day3Set2]-1, 10) +
                    parseInt([lastDay3Item.Day3Set1]-1, 10) +
                    2;

                    console.log(`Value for new baseline is ${newBaseline}`);

                    this.setState({squatBase: newBaseline })
                    this.calculateSquats(this.state.squatBase, this.state.week);
                }
            }
         }
    };

    calculateSquats = squatBase => {

        squatBase = Math.trunc((this.state.squatBase-2)/3);

        // week=week+1;

        // Day 1 Sets
        this.setState({day1Set1: squatBase});
        this.setState({day1Set2: squatBase+1});
        this.setState({day1Set3: squatBase});

        // Day 2 Sets
        this.setState({day2Set1: squatBase});
        this.setState({day2Set2: squatBase+1});
        this.setState({day2Set3: squatBase+1});
      
        // Day 3 Sets
        this.setState({day3Set1: squatBase+1});
        this.setState({day3Set2: squatBase+1});
        this.setState({day3Set3: squatBase+1});

        let newBaseLine = this.state.day3Set3;
        console.log(newBaseLine);
        
    };

    attemptedDay1Click = (e, completed) => {
        e.preventDefault();
        this.setState({attemptDay1: true});
        this.setState({completeDay1: true});
        this.setState({missedDay1: true});

        this.setState({attemptDay2: false});
        this.setState({completeDay2: false});
        this.setState({missedDay2: false});

        console.log(`The date is ${this.state.today}`);

        console.log(`Completed value is  ${completed}`);
        console.log(`Attempted button clicked`);
        console.log(`Week is now ${this.state.week}`);
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;
        const weekPlus = this.state.week+1;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 1,
                        Day1Set1: this.state.day1Set1,
                        Day1Set2: this.state.day1Set2,
                        Day1Set3: this.state.day1Set3,
                        Attempted: attempted,
                        Completed: completed,
                        Missed: false,
                        Week: weekPlus                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
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
        this.setState({attemptDay2: true});
        this.setState({completeDay2: true});
        this.setState({missedDay2: true});

        this.setState({attemptDay3: false});
        this.setState({completeDay3: false});
        this.setState({missedDay3: false});

        console.log(`The date is ${this.state.today}`);

        console.log(`Completed value is  ${completed}`);
        console.log(`Attempted button clicked`);
        console.log(`Week is now ${this.state.week}`);
        const attempted = true;
        const { user } = this.props.auth;
        const id = user.id;
        const weekPlus = this.state.week+1;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 2,
                        Day2Set1: this.state.day2Set1,
                        Day2Set2: this.state.day2Set2,
                        Day2Set3: this.state.day2Set3,
                        Attempted: attempted,
                        Completed: completed,
                        Missed: false,
                        Week: weekPlus                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
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
        const weekPlus = this.state.week+1;

        if (completed === undefined) {
            completed = false;
        };
        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 3,
                        Day3Set1: this.state.day3Set1,
                        Day3Set2: this.state.day3Set2,
                        Day3Set3: this.state.day3Set3,
                        Attempted: attempted,
                        Completed: completed,
                        Missed: false,
                        Week: weekPlus                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));

            this.props.history.push("/workouts");
    };

    completedDay3Click = e => {
        e.preventDefault();
        const completed = true;
        this.attemptedDay3Click(e, completed);
        console.log(`Completed button clicked`);
    };

    missedDay1Click = e => {
        e.preventDefault();
        this.getDate();
        this.setState({attemptDay1: true});
        this.setState({completeDay1: true});
        this.setState({missedDay1: true});
        this.setState({attemptDay2: false});
        this.setState({completeDay2: false});
        this.setState({missedDay2: false});
  
        const { user } = this.props.auth;
        const id = user.id;

        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 1,
                        Day1Set1: this.state.day1Set1,
                        Day1Set2: this.state.day1Set2,
                        Day1Set3: this.state.day1Set3,
                        Attempted: false,
                        Completed: false,
                        Missed: true                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));
    };

    missedDay2Click = e => {
        e.preventDefault();
        this.getDate();
        this.setState({attemptDay1: true});
        this.setState({completeDay1: true});
        this.setState({missedDay1: true});
        this.setState({attemptDay2: true});
        this.setState({completeDay2: true});
        this.setState({missedDay2: true});
        this.setState({attemptDay3: false});
        this.setState({completeDay3: false});
        this.setState({missedDay3: false});
  
        const { user } = this.props.auth;
        const id = user.id;

        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 2,
                        Day2Set1: this.state.day2Set1,
                        Day2Set2: this.state.day2Set2,
                        Day2Set3: this.state.day2Set3,
                        Attempted: false,
                        Completed: false,
                        Missed: true                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));
    };

    missedDay3Click = e => {
        e.preventDefault();
        this.getDate();

        const { user } = this.props.auth;
        const id = user.id;

        const workoutData = {
            userID: user.id,
            squats: {
                        Date: this.state.today,
                        Day: 3,
                        Day3Set1: this.state.day3Set1,
                        Day3Set2: this.state.day3Set2,
                        Day3Set3: this.state.day3Set3,
                        Attempted: false,
                        Completed: false,
                        Missed: true                                            
                    }
        };

        console.log(`This userID is ${id}`);
        console.log(`This workout data is ${JSON.stringify(workoutData)}`);
        API.updateSquats(workoutData)
            .then( res => {
                console.log(res.status, res.statusText);

            }) 
            .catch(err => console.log(err));

            this.props.history.push("/workouts");
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        const { user } = this.props.auth;
        const squatModalLink = "SQUAT";

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
                            <li className="workout-header"><h4>Weekly <SquatModal trigger = {squatModalLink}>{squatModalLink}</SquatModal> workouts</h4>
                            </li>
                            <li className="workout-item">
                                <div className="card workout-card">
                                    <div className="card-content">
                                        <p className="card-title" id="workout-card-title">Day 1: {this.state.cardDate}</p>
                                        <p>Complete 3 Sets of Squats:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day1Set1} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day1Set2} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day1Set3} squats</li>
                                            </ul>
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn 
                                                btn btn-small waves-effect 
                                                waves-light hoverable"
                                                disabled={this.state.attemptDay1}
                                                onClick={this.attemptedDay1Click}
                                                >
                                                Attempted
                                        </button>
                                        <button className="missed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.missedDay1}
                                            onClick={this.missedDay1Click}
                                            >
                                            Missed
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
                                        <p className="card-title" id="workout-card-title">Day 2: {Object.values(this.state.cardDate2)}</p>
                                        <p>Complete 3 Sets of Squats:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day2Set1} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day2Set2} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day2Set3} squats</li>
                                            </ul>                                    
                                    </div>

                                    <div className="card-action">
                                        <button className="attempted-btn 
                                                btn btn-small waves-effect 
                                                waves-light hoverable"
                                                disabled={this.state.attemptDay2}
                                                onClick={this.attemptedDay2Click}
                                                >
                                                Attempted
                                        </button>
                                        <button className="missed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.missedDay2}
                                            onClick={this.missedDay2Click}
                                            >
                                            Missed
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
                                        <p className="card-title" id="workout-card-title">Day 3: {this.state.cardDate3}</p>
                                        <p>Complete 3 Sets of Squats:</p>
                                        <p>60 seconds rest between sets</p>
                                            <ul className="collection set-card">
                                                <li className="collection-item"><span className="set-marker">Set 1:</span> &nbsp;  {this.state.day3Set1} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 2:</span> &nbsp;  {this.state.day3Set2} squats</li>
                                                <li className="collection-item"><span className="set-marker">Set 3:</span> &nbsp;  {this.state.day3Set3} squats</li>
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
                                        <button className="missed-btn
                                            btn btn-small waves-effect
                                            waves-light hoverable"
                                            disabled={this.state.missedDay3}
                                            onClick={this.missedDay3Click}
                                            >
                                            Missed
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
                {/* <br /> */}
                {/* <div className="row">
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
                </div> */}
            </div>

        );
    }
}

Squat.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Squat);