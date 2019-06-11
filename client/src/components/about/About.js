import React, { Component } from "react";
import {Collapsible, CollapsibleItem} from 'react-materialize';


class About extends Component {
    render () {
        return (
            <div className="container">
                <Collapsible popout>
                <CollapsibleItem className="collapsible-about" header="Welcome & Overview" icon="landscape">
                <h6>Welcome to Fledgling Fitness!</h6>
                <p> Fledgling Fitness is a web-based exercise program planning and tracking application for those beginning or restarting a fitness journey.</p> 
                </CollapsibleItem>
                <CollapsibleItem className="collapsible-about" header="Workout Structure & Flow" icon="table_chart">
                <h6>Fledgling Fitness - Structured Exercise Progression</h6>
                <p> Program info HERE</p> 
                </CollapsibleItem>
                <CollapsibleItem className="collapsible-about" header="Start Your Fitness Journey" icon="fitness_center">
                <h6>Fledgling Fitness - Getting Started!</h6>
                <p> How to BEGIN HERE</p>                </CollapsibleItem>
                </Collapsible>
            </div>
        );
    }

}


export default About;