import React, { Component } from "react";
import PropTypes from "prop-types";
import {Tab,Tabs, Table} from 'react-materialize';
import TableBody from "../TableBody/tablebody";
import TableBodyPSS from "../TableBodyPSS/tablebody-pss";
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

                const pushupDisplay =  Object.values(res.data.pushups);
                this.setState({pushupData: pushupDisplay});
                console.log(`Pushup display is ${JSON.stringify(this.state.pushupData)}`);

                const situpDisplay = Object.values(res.data.situps);
                this.setState({situpData: situpDisplay});
                console.log(`Situp display is ${JSON.stringify(this.state.situpData)}`);


                const squatDisplay = Object.values(res.data.squats);
                this.setState({squatData: squatDisplay});
                console.log(`Squat display is ${JSON.stringify(this.state.squatData)}`);

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

                <Tabs className="tab-progress z-depth-1 ">
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
                                { this.state.walkingData.map((walkInfo, index) =>
                                    <TableBody
                                    key = {index}
                                    day = {walkInfo.Date}
                                    duration = {walkInfo.Duration}
                                    attempted = {walkInfo.Attempted}
                                    completed = {walkInfo.Completed}
    
                                    />
                                )}
                            </Table>
                            </div>
                    </Tab>
                    <Tab title="Pushups" className="tab-exercise">
                        <div id="display-pushups">
                        <Table>
                            <thead>
                                <tr>
                                    <th data-field="date">
                                        Date
                                    </th>
                                    <th data-field="day">
                                        Day
                                    </th>
                                    <th data-field="set1">
                                        Set 1
                                    </th>
                                    <th data-field="set2">
                                        Set 2
                                    </th>
                                    <th data-field="set3">
                                        Set 3
                                    </th>
                                    <th data-field="attempted">
                                        Attempted
                                    </th>
                                    <th data-field="completed">
                                        Completed
                                    </th>
                                </tr>
                            </thead>
                                { this.state.pushupData.map((exerciseInfo, index) =>
                                    <TableBodyPSS
                                    key = {index}
                                    day = {exerciseInfo.Date}
                                    dayNum = {exerciseInfo.Day}
                                    day1set1 = {exerciseInfo.Day1Set1}
                                    day1set2 = {exerciseInfo.Day1Set2}
                                    day1set3 = {exerciseInfo.Day1Set3}
                                    day2set1 = {exerciseInfo.Day2Set1}
                                    day2set2 = {exerciseInfo.Day2Set2}
                                    day2set3 = {exerciseInfo.Day2Set3}
                                    day3set1 = {exerciseInfo.Day3Set1}
                                    day3set2 = {exerciseInfo.Day3Set2}
                                    day3set3 = {exerciseInfo.Day3Set3}
                                    attempted = {exerciseInfo.Attempted}
                                    completed = {exerciseInfo.Completed}
    
                                    />
                                )}
                            </Table>
                        </div>                       
                    </Tab>
                    <Tab title="Situps" className="tab-exercise">
                        <div id="display-situps">                        
                            <Table>
                                <thead>
                                    <tr>
                                        <th data-field="date">
                                            Date
                                        </th>
                                        <th data-field="day">
                                            Day
                                        </th>
                                        <th data-field="set1">
                                            Set 1
                                        </th>
                                        <th data-field="set2">
                                            Set 2
                                        </th>
                                        <th data-field="set3">
                                            Set 3
                                        </th>
                                        <th data-field="attempted">
                                            Attempted
                                        </th>
                                        <th data-field="completed">
                                            Completed
                                        </th>
                                    </tr>
                                </thead>
                                { this.state.situpData.map((exerciseInfo, index) =>
                                    <TableBodyPSS
                                    key = {index}
                                    day = {exerciseInfo.Date}
                                    dayNum = {exerciseInfo.Day}
                                    day1set1 = {exerciseInfo.Day1Set1}
                                    day1set2 = {exerciseInfo.Day1Set2}
                                    day1set3 = {exerciseInfo.Day1Set3}
                                    day2set1 = {exerciseInfo.Day2Set1}
                                    day2set2 = {exerciseInfo.Day2Set2}
                                    day2set3 = {exerciseInfo.Day2Set3}
                                    day3set1 = {exerciseInfo.Day3Set1}
                                    day3set2 = {exerciseInfo.Day3Set2}
                                    day3set3 = {exerciseInfo.Day3Set3}
                                    attempted = {exerciseInfo.Attempted}
                                    completed = {exerciseInfo.Completed}
    
                                    />
                                )}
                            </Table>
                        </div>
                        
                    </Tab>
                    <Tab title="Squats" className="tab-exercise">
                        <div id="display-squats">
                        <Table>
                                <thead>
                                    <tr>
                                        <th data-field="date">
                                            Date
                                        </th>
                                        <th data-field="day">
                                            Day
                                        </th>
                                        <th data-field="set1">
                                            Set 1
                                        </th>
                                        <th data-field="set2">
                                            Set 2
                                        </th>
                                        <th data-field="set3">
                                            Set 3
                                        </th>
                                        <th data-field="attempted">
                                            Attempted
                                        </th>
                                        <th data-field="completed">
                                            Completed
                                        </th>
                                    </tr>
                                </thead>
                                { this.state.squatData.map((exerciseInfo, index) =>
                                    <TableBodyPSS
                                    key = {index}
                                    day = {exerciseInfo.Date}
                                    dayNum = {exerciseInfo.Day}
                                    day1set1 = {exerciseInfo.Day1Set1}
                                    day1set2 = {exerciseInfo.Day1Set2}
                                    day1set3 = {exerciseInfo.Day1Set3}
                                    day2set1 = {exerciseInfo.Day2Set1}
                                    day2set2 = {exerciseInfo.Day2Set2}
                                    day2set3 = {exerciseInfo.Day2Set3}
                                    day3set1 = {exerciseInfo.Day3Set1}
                                    day3set2 = {exerciseInfo.Day3Set2}
                                    day3set3 = {exerciseInfo.Day3Set3}
                                    attempted = {exerciseInfo.Attempted}
                                    completed = {exerciseInfo.Completed}
    
                                    />
                                )}
                            </Table>
                        </div>
                    </Tab>
                </Tabs>

                
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