import React, { Component } from "react";
import PropTypes from "prop-types";
import {Tab, Tabs, Table, Switch} from 'react-materialize';
import TableBody from "../TableBody/tablebody";
import TableBodyPSS from "../TableBodyPSS/tablebody-pss";
import API from "../../utils/API";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

var walkingGraphData=[];
var pushupGraphData=[];
var situpGraphData=[];
var squatGraphData=[];

class Progress extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            progressMessage: "Let's Get Started!",
            walkingData: [],
            pushupData: [],
            situpData: [],
            squatData: [],
            tableUpWalking: true,
            tableUpPushup: true,
            tableUpSitup: true,
            tableUpSquat: true
        }
    }


    componentDidMount() {
        this.checkDbCollections();
    };

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
                    console.log(`Now walking items are ${JSON.stringify(res.data.walking)}`);
                    console.log(`Removed item is ${firstElement}`);
                }
                // ===================================================

                res.data.walking.length > 0 ? 
                    this.setState({progressMessage: "You've Made Progress, Well Done!"}) 
                    : this.setState({progressMessage: "Let's Get Started!"})
                // console.log(`Data are: ${JSON.stringify(res.data.pushups)}`)

                
                const walkDisplay = Object.values(res.data.walking);
                this.setState({walkingData: walkDisplay});
                var walkingTotal = 0;
                var walkingWeek = 0;

                walkDisplay.forEach(function(element) {
                    switch (element.Day) {
                        case 1: 
                            if (element.Completed === true) {
                                walkingTotal += element.Duration;
                            } else {
                                walkingTotal += 0;
                            }
                            break;
                        case 2: 
                        if (element.Completed === true) {
                            walkingTotal += element.Duration;
                        } else {
                            walkingTotal += 0;
                        }                            break;

                        case 3: 
                        if (element.Completed === true) {
                            walkingTotal += element.Duration;
                        } else {
                            walkingTotal += 0;
                        }                        walkingWeek++
                        walkingGraphData.push({Week: walkingWeek, Time: walkingTotal})
                        walkingTotal = 0;
                        break;

                        default: 
                            console.log("Nothing else to add");
                    }
                    console.log(`Walking total counter ${walkingTotal}`);
                })// -------------------------------------------------------------------------------------------
                const pushupDisplay =  Object.values(res.data.pushups);
                this.setState({pushupData: pushupDisplay});

                var pushupTotal = 0;
                var pushupWeek = 0;

                pushupDisplay.forEach(function(element) {
                    switch (element.Day) {
                        case 1: 
                            if (element.Completed === true) {
                                pushupTotal += element.Day1Set1 + element.Day1Set2 + element.Day1Set3;
                            } else {
                                pushupTotal += 0;
                            }
                            break;
                        case 2: 
                            if (element.Completed === true) {
                                pushupTotal += element.Day2Set1 + element.Day2Set2 + element.Day2Set3;
                            } else {
                                pushupTotal += 0;
                            }
                            break;

                        case 3: 
                        if (element.Completed === true) {
                            pushupTotal += element.Day3Set1 + element.Day3Set2 + element.Day3Set3;
                        } else {
                            pushupTotal += 0;
                        }                        
                        pushupWeek++
                        pushupGraphData.push({Week: pushupWeek, Reps: pushupTotal})
                        pushupTotal = 0;
                        break;

                        default: 
                            console.log("Nothing else to add");
                    }
                    console.log(`Pushup total counter ${pushupTotal}`);
                })
// -------------------------------------------------------------------------------------------
                const situpDisplay = Object.values(res.data.situps);
                this.setState({situpData: situpDisplay});

                var situpTotal = 0;
                var situpWeek = 0;

                situpDisplay.forEach(function(element) {
                    switch (element.Day) {
                        case 1: 
                            if (element.Completed === true) {
                                situpTotal += element.Day1Set1 + element.Day1Set2 + element.Day1Set3;
                            } else {
                                situpTotal += 0;
                            }
                                break;
                        case 2:
                            if (element.Completed === true) { 
                                situpTotal += element.Day2Set1 + element.Day2Set2 + element.Day2Set3;
                            } else {
                                situpTotal += 0;
                            }                            
                            break;

                        case 3: 
                            if (element.Completed === true) {

                                situpTotal += element.Day3Set1 + element.Day3Set2 + element.Day3Set3;
                            } else {
                                situpTotal += 0;
                            }                            
                            situpWeek++
                            console.log(`Situp Week = ${situpWeek}`);
                            situpGraphData.push({Week: situpWeek, Reps: situpTotal})
                            situpTotal = 0;
                            break;

                        default: 
                            console.log("Nothing else to add");
                    }
                    console.log(`Situp total counter ${situpTotal}`);
                })
// -------------------------------------------------------------------------------------------
                const squatDisplay = Object.values(res.data.squats);
                this.setState({squatData: squatDisplay});

                var squatTotal = 0;
                var squatWeek = 0;

                squatDisplay.forEach(function(element) {

                    switch (element.Day) {
                        case 1: 
                            if (element.Completed === true) {
                                squatTotal += element.Day1Set1 + element.Day1Set2 + element.Day1Set3;
                            } else {
                                squatTotal += 0;
                            }
                                break;
                        case 2: 
                        if (element.Completed === true) {
                            squatTotal += element.Day2Set1 + element.Day2Set2 + element.Day2Set3;
                        } else {
                            squatTotal += 0;
                        }                            
                            break;

                        case 3: 
                        if (element.Completed === true) {
                            squatTotal += element.Day3Set1 + element.Day3Set2 + element.Day3Set3;
                        } else {
                            squatTotal += 0;
                        }                        
                        squatWeek++
                        squatGraphData.push({Week: squatWeek, Reps: squatTotal})
                        squatTotal = 0;
                        break;

                        default: 
                            console.log("Nothing else to add");
                    }
                    console.log(`Squat total counter ${squatTotal}`);
                })

                console.log(`Walking graph data is ${JSON.stringify(walkingGraphData)}`);
                console.log(`Pushup graph data is ${JSON.stringify(pushupGraphData)}`);
                console.log(`Situp graph data is ${JSON.stringify(situpGraphData)}`);
                console.log(`Squat graph data is ${JSON.stringify(squatGraphData)}`);
            })
            .catch( err => console.log(err))      
    };

    changeTableGraphWalking = e => {

        this.state.tableUpWalking ? 
            this.setState({tableUpWalking: false})
        :
            this.setState({tableUpWalking: true});
        

        console.log(`Graph up is ${this.state.tableUpWalking}`);
    };

    changeTableGraphPushups = e => {

        this.state.tableUpPushup ? 
            this.setState({tableUpPushup: false})
        :
            this.setState({tableUpPushup: true});
        

        console.log(`Graph up is ${this.state.tableUpPushup}`);
    };

    changeTableGraphSitups = e => {

        this.state.tableUpSitup ? 
            this.setState({tableUpSitup: false})
        :
            this.setState({tableUpSitup: true});
        

        console.log(`Graph up is ${this.state.tableUpSitup}`);
    };

    changeTableGraphSquat = e => {

        this.state.tableUpSquat ? 
            this.setState({tableUpSquat: false})
        :
            this.setState({tableUpSquat: true});
        

        console.log(`Graph up is ${this.state.tableUp}`);
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render () {
        const { user } = this.props.auth;

        // console.log(`Squat data here is ${JSON.stringify(this.state.squatData)}`);

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

                <Tabs className="tab-progress z-depth-1" options={{swipeable: false}}>
                    <Tab title="Walking" className="tab-exercise">
                        <div id="display-walking">
                        <Switch 
                                className="tableGraph" 
                                offLabel="Table" 
                                onLabel="Graph"
                                onChange={this.changeTableGraphWalking}
                        />

                            {this.state.tableUpWalking ?                             
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

                                    
                            :
                                
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                data={ walkingGraphData }
                                margin={{
                                top: 50, left: -40, right: 0
                                }}
                                // barGap={1}
                                // barCategoryGap={1}
                                >
                                    <CartesianGrid strokeDasharray="5 3" />
                                    <XAxis dataKey="Week" type="category" tick={{ fill: "#13A76C"}} height={60} stroke="#13A76C"> 
                                        <Label value="Week" position="insideBottom" fill="#13A76C"/>
                                    </XAxis>
                                    <YAxis tick={{ fill: "#13A76C"}} width={130} stroke="#13A76C">
                                        <Label value="Duration Completed" angle={-90} position="center" offset={0} fill="#13A76C" />
                                    </YAxis> 
                                    <Tooltip  />

                                    <Bar dataKey="Time" fill="#FF652F" label={{ position: 'top', fill: "#FFE400" }}/>
                                </BarChart>
                            </ResponsiveContainer>

                            }
                            </div>
                    </Tab>
                    <Tab title="Pushups" className="tab-exercise">
                        <div id="display-pushups">
                        <Switch 
                                className="tableGraph" 
                                offLabel="Table" 
                                onLabel="Graph"
                                onChange={this.changeTableGraphPushups}
                        />

                            {this.state.tableUpPushup ?                             
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

        
                            :
                                
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                data={ pushupGraphData }
                                margin={{
                                top: 50, left: -40, right: 0
                                }}
                                // barGap={1}
                                // barCategoryGap={1}
                                >
                                    <CartesianGrid strokeDasharray="5 3" />
                                    <XAxis dataKey="Week" type="category" tick={{ fill: "#13A76C"}} height={60} stroke="#13A76C"> 
                                        <Label value="Week" position="insideBottom" fill="#13A76C"/>
                                    </XAxis>
                                    <YAxis tick={{ fill: "#13A76C"}} width={130} stroke="#13A76C">
                                        <Label value="Total Completed" angle={-90} position="center" offset={0} fill="#13A76C" />
                                    </YAxis> 
                                    <Tooltip  />

                                    <Bar dataKey="Reps" fill="#FF652F" label={{ position: 'top', fill: "#FFE400" }}/>
                                </BarChart>
                            </ResponsiveContainer>

                            }                            
                        </div>                       
                    </Tab>
                    <Tab title="Situps" className="tab-exercise">
                        <div id="display-situps">
                            <Switch 
                                    className="tableGraph" 
                                    offLabel="Table" 
                                    onLabel="Graph"
                                    onChange={this.changeTableGraphSitups}
                            />

                            {this.state.tableUpSitup ?                                                     
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
                                    
                            :
                                
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                data={ situpGraphData }
                                margin={{
                                top: 50, left: -40, right: 0
                                }}
                                // barGap={1}
                                // barCategoryGap={1}
                                >
                                    <CartesianGrid strokeDasharray="5 3" />
                                    <XAxis dataKey="Week" type="category" tick={{ fill: "#13A76C"}} height={60} stroke="#13A76C"> 
                                        <Label value="Week" position="insideBottom" fill="#13A76C"/>
                                    </XAxis>
                                    <YAxis tick={{ fill: "#13A76C"}} width={130} stroke="#13A76C">
                                        <Label value="Total Completed" angle={-90} position="center" offset={0} fill="#13A76C" />
                                    </YAxis> 
                                    <Tooltip  />

                                    <Bar dataKey="Reps" fill="#FF652F" label={{ position: 'top', fill: "#FFE400" }}/>
                                </BarChart>
                            </ResponsiveContainer>

                            }
                        </div>
                        
                    </Tab>
                    <Tab title="Squats" className="tab-exercise">
                        <div id="display-squats">
                            <Switch 
                                    className="tableGraph" 
                                    offLabel="Table" 
                                    onLabel="Graph"
                                    onChange={this.changeTableGraphSquat}
                            />

                            {this.state.tableUpSquat ? 
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
                                    
                                :
                                
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                    data={ squatGraphData }
                                    margin={{
                                    top: 50, left: -40, right: 0
                                    }}
                                    // barGap={1}
                                    // barCategoryGap={1}
                                    >
                                        <CartesianGrid strokeDasharray="5 3" />
                                        <XAxis dataKey="Week" type="category" tick={{ fill: "#13A76C"}} height={60} stroke="#13A76C"> 
                                            <Label value="Week" position="insideBottom" fill="#13A76C"/>
                                        </XAxis>
                                        <YAxis tick={{ fill: "#13A76C"}} width={130} stroke="#13A76C">
                                            <Label value="Total Completed" angle={-90} position="center" offset={0} fill="#13A76C" />
                                        </YAxis> 
                                        <Tooltip  />

                                        <Bar dataKey="Reps" fill="#FF652F" label={{ position: 'top', fill: "#FFE400" }}/>
                                    </BarChart>
                                </ResponsiveContainer>

                            }
                        </div>
                    </Tab>
                </Tabs>
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