import React, { Component } from "react";
import PropTypes from "prop-types";
import {Tab,Tabs, Table} from 'react-materialize';
import TableBody from "../TableBody/tablebody";
import API from "../../utils/API";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Progress extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            progressMessage: "Let's Get Started!",
            walkingData: [],
            pushupData: [],
            situpData: [],
            squatData: []
        }
    }

    componentDidMount() {
        this.checkDbCollections();
    };

    // componentWillUnmount() {
    //     this.checkDbCollections();

    // }

    checkDbCollections = () => {
        const { user } = this.props.auth;
        const baselineID = {
            userID: user.id
        };
        API.getProgress(baselineID)
            .then( res => {
                // == Elimates null from first position in walking data ==
                const firstWalkingItem = res.data.walking[0];

                if (firstWalkingItem === null) {
                    var firstElement = res.data.walking.shift();
                    // console.log(`Now first walk item is ${JSON.stringify(res.data.walking[0])}`);
                    console.log(`Removed item is ${firstElement}`);
                }
                // ===================================================

                res.data.walking.length > 0 ? 
                    this.setState({progressMessage: "You've Made Progress, Well Done!"}) 
                    : this.setState({progressMessage: "Let's Get Started!"})
                // console.log(`Data are: ${JSON.stringify(res.data.pushups)}`)

                
                const walkDisplay = Object.values(res.data.walking);
                this.setState({walkingData: walkDisplay});
                console.log(`Walk display is ${JSON.stringify(this.state.walkingData)}`);

                const pushupDisplay = JSON.stringify(res.data.pushups)
                this.setState({pushupData: pushupDisplay})

                const situpDisplay = JSON.stringify(res.data.situps)
                this.setState({situpData: situpDisplay})

                const squatDisplay = JSON.stringify(res.data.squats)
                this.setState({squatData: squatDisplay})
            })
            .catch( err => console.log(err))      
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        const { user } = this.props.auth;

        console.log(`Walking data here is ${JSON.stringify(this.state.walkingData)}`);

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4 className="user-progress">
                            {user.name.split(" ")[0]}
                            <p className="progress-text flow-text">
                                {this.state.progressMessage}
                            </p>
                        </h4>
                    </div>
                </div>

                <Tabs className="tab-progress z-depth-1 tabs-fixed-width">
                    <Tab title="Walking" className="tab-exercise">
                        <div id="display-walking">
                        <Table>
                            <thead>
                                <tr>
                                    <th data-field="id">
                                        Date
                                    </th>
                                    <th data-field="name">
                                        Duration
                                    </th>
                                    <th data-field="price">
                                        Attempted
                                    </th>
                                    <th data-field="price">
                                        Completed
                                    </th>
                                </tr>
                            </thead>
                               {/* {this.state.walkingData.length ? (  */}
                                { this.state.walkingData.map(walkInfo =>
                                    <TableBody
                                    day = {walkInfo.Date}
                                    duration = {walkInfo.Duration}
                                    attempted = {walkInfo.Attempted}
                                    completed = {walkInfo.Completed}
    
                                    />
                                )}
                                {/* ) : (
                                    <h3> </h3>
                                )} */}
                            </Table>
                            </div>
                    </Tab>
                    <Tab title="Pushups">
                        <div id="display-pushups">{this.state.pushupData}</div>
                    </Tab>
                    <Tab title="Situps">
                        <div id="display-situps">{this.state.situpData}</div>
                    </Tab>
                    <Tab title="Squats">
                        <div id="display-squats">{this.state.squatData}</div>
                    </Tab>
                </Tabs>

                
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

Progress.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    { logoutUser }
)(Progress);