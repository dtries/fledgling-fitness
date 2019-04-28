import React, {Component} from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="title">
                            <b>Welcome to Fledgling Fitness</b>
                        </h4>
                        <p className="sub-title">
                            Stepwise Cardio and Strength Progressions for Normal People
                        </p>
                        <br />
                        <br />
                        <br />
                        <div className="col s12">
                        <Link
                            to="/login" 
                            style={{
                            width: "200px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="get-started-btn btn btn-large waves-effect waves-dark hoverable"
                        >
                            Get Started
                        </Link>
                        </div>

                    </div>
                </div>
                <br />
                <div className="row">
                        <div className="col s12">
                            <h5 className="tag-line">
                            <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;&nbsp;Exercise Planning and Tracking
                            </h5>
                        </div>
                </div>
                <br />
                <div className="row">
                        <div className="col s12">
                            <h5 className="center tag-line">
                            <i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;&nbsp;Improve Your Health and Wellbeing
                            </h5>
                        </div>
                </div>
                <br />
                <div className="row">
                        <div className="col s12">
                            <h5 className="right tag-line"><i className="fas fa-kiwi-bird bird-bullet"></i> &nbsp;&nbsp;Focus on Fitness, not Weight</h5>
                        </div>
                </div>
            </div>
        );
    }
}

export default Landing;