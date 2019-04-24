import React, {Component} from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Welcome to Fledgling Fitness</b>
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                            Stepwise Cardio and Strength Progressions for Normal People
                        </p>
                        <br />
                        {/* <div className="col s6">
                        <Link 
                            to="/register"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            Register                
                        </Link>
                        </div> */}
                        <div className="col s12">
                        <Link
                            to="/login" 
                            style={{
                            marginLeft: "2rem",
                            width: "200px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="btn btn-large waves-effect green hoverable black-text"
                        >
                            Get Started
                        </Link>
                        </div>

                    </div>
                </div>
                <div className="row">
                        <div className="col s12">
                            <h5>
                               Frugal Fitness Planning and Tracking for Everyone
                            </h5>
                        </div>
                </div>
                <div className="row">
                        <div className="col s12">
                            <h5 className="center">
                                Improve Your Individual Health and Wellbeing
                            </h5>
                        </div>
                </div>
                <div className="row">
                        <div className="col s12">
                            <h5 className="right">The Focus is on Fitness not Weight</h5>
                        </div>
                </div>
            </div>
        );
    }
}

export default Landing;