import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../../utils/API";
import { logoutUser } from "../../actions/authActions";
import WalkingModal from "../walking/walkInstructions";
import PushupModal from "../pushup/pushupInstructions";
import SitupModal from "../situp/situpInstructions";
import SquatModal from "../squat/squatInstructions";
import { DatePicker, TextInput } from 'react-materialize';
var moment = require('moment');
moment().format();

class Dashboard extends Component {
    constructor () {
        super();
        this.state = {
            startDate: "",
            walking: "",
            pushups: "",
            situps: "",
            squats: ""
        };
    }

    componentWillMount() {
        this.baselineCompleted();
    };

    baselineCompleted = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        console.log(`This userID is ${JSON.stringify(baselineID)}`);

        API.getProgress(baselineID)
            .then(res => {
                console.log(`PROGRESS DATA: ${res}`)

                if (res.data == null) {
                API.updateWalking(baselineID)
                .then(res => {
                console.log(`walking established: ${res}`)
                })
                .catch(err => console.log(err));
                }
            }
            ).catch(err => console.log(err));

        API.getBaseline(baselineID)
            .then( res => {
                console.log(`Baseline data are ${JSON.stringify(res.data)}`)
                if (res.data.baselineComplete === true) {
                    this.props.history.push("/workouts");
                }
            }) 
            .catch(err => console.log(err)); 
    };



    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    dateValue = e => {
        console.log(e);
        const formattedDate = moment(e).format("MMM Do YYYY");
        this.setState({ startDate: formattedDate });
    }

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const baselineData = {
            userID: user.id,
            week: 0,
            startDate: this.state.startDate,
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
        const walkModalLink = "walk";
        const pushupModalLink = "pushups";
        const situpModalLink = "situps";
        const squatModalLink = "squats";


        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="title">
                        <b className="dashboard-name">{user.name.split(" ")[0]}, Let's Get Started</b>
                        </h4>
                        <p className="sub-title">
                            Enter Your Values For the Assessment Activities, Click Create My Plan When Done.
                        </p>
                    </div>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className = "row form-begin">
                       &nbsp; <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet">
                            </i> &nbsp; Enter the date you will start the fledgling fitness plan &nbsp;&nbsp;
                                <div className="input-field inline">
                                    <DatePicker 
                                    onChange={this.dateValue}
                                    value={this.state.startDate}
                                    id="startDate"
                                    label="Click to Pick Date"
                                    type=""
                                    className="validate baseline-input-line"
                                    />
                                </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Minutes you can <WalkingModal trigger = {walkModalLink}>{walkModalLink}</WalkingModal> comfortably at a brisk pace &nbsp;&nbsp;
                            <div className="input-field inline">
                                <TextInput
                                    onChange={this.onChange}
                                    label="Enter Number"
                                    value={this.state.walking}
                                    id="walking"
                                    type="number"
                                    min="0"
                                    max="1000000"
                                    className="validate baseline-input-line"
                                />
                                {/* <label htmlFor="name">Enter Number</label> */}
                                <span   className="helper-text" data-error="Enter a Valid Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Number of good-form <PushupModal trigger = {pushupModalLink}>{pushupModalLink}</PushupModal> you can complete &nbsp;
                            <div className="input-field inline">
                                <TextInput
                                    onChange={this.onChange}
                                    label="Enter Number"
                                    value={this.state.pushups}
                                    id="pushups"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                        <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                        Number of good form <SitupModal trigger = {situpModalLink}>{situpModalLink}</SitupModal> you can complete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="input-field inline">
                                <TextInput
                                    onChange={this.onChange}
                                    label="Enter Number"
                                    value={this.state.situps}
                                    id="situps"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 base-assessment-question center">
                            <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;
                            Number of good form <SquatModal trigger = {squatModalLink}>{squatModalLink}</SquatModal> you can complete &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="input-field inline">
                                <TextInput
                                    onChange={this.onChange}
                                    label="Enter Number"
                                    value={this.state.squats}
                                    id="squats"
                                    type="number"
                                    min="0"
                                    max="1000000"                                        
                                    className="validate baseline-input-line"
                                />
                                <span   className="helper-text" data-error="Please Enter a Number" 
                                        data-success="Great!">
                                </span>
                            </div>
                        </div>
                    </div>
                </form>

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

