import React, { Component } from "react";
import {Collapsible, CollapsibleItem} from 'react-materialize';
import { Link } from "react-router-dom";

class About extends Component {
    render () {
        return (
            <div className="container">
                <Collapsible popout>
                    <CollapsibleItem className="collapsible-about" header="Welcome & Overview" icon="landscape">
                        <h6>Welcome to Fledgling Fitness!</h6>
                        <p> Fledgling Fitness is a web-based exercise 
                            program planning and tracking application 
                            for those beginning or restarting a fitness 
                            journey. Thank you for your interest in the 
                            program. Click on the sections below to learn 
                            even more about the Fledgling Fitness program.
                        </p> 
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-about" header="Workout Structure & Flow" icon="table_chart">
                        <h6>Fledgling Fitness - Structured Exercise Progression</h6>
                        <p> The fitness program includes brisk walking as a cardiovascular 
                            component and pushups, situps, and squats for 
                            increasing strength and muscle tone. The programs begins
                            with walking and successively adds additional
                            exercises after each two week acclimation period.
                        </p>
                        <p> Your initial workout targets
                            are customized for you using baseline information
                            regarding your initial capacity for each exercise. 
                            Thereafter, your weekly targets for each exercise are 
                            adjusted inpendently based on your performance for the
                            previous week. The workouts for each exercise are scheduled
                            on an every other day basis with walking paired with situps
                            and pushups paired with squats. The seventh day of the week
                            is scheduled as a rest day to allow for muscle recovery
                            and physiologic consolidation of your efforts over the previous
                            week.  
                        </p> 
                        <p> The application allows you to record and track your efforts in a simple
                            and straight forward manner. Each workout display provides you the option 
                            to selected completed, attempted, or missed. No judgement here, if you miss a day
                            or have difficulty finishing an entire workout, simply select the missed or 
                            attempted selector to record the result and then move on. This information
                            is used solely to further tailor your workout program for you. You can check
                            your progress and accomplishments for each exercise via tables and graphs in 
                            in the progress section.
                        </p> 
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-about" header="Beginning Your Fitness Journey" icon="fitness_center">
                        <h6>Fledgling Fitness - Getting Started!</h6>
                        <p> Your fitness journey begins with registration and login. This allows Fledgling
                            Fitness to keep track of your workout information and customize the
                            program for you based on your current capacity for each exercise.</p> 

                        <p> Next, you complete you baseline fitness measures for each exercise. Don't know
                            proper form for an exercise or need an exercise modifation, videos and tips are
                            provided to help guide you. Once baseline measures and a program starting date
                            have been entered, you are ready to start the Fledgling Fitness program!</p>
                    </CollapsibleItem>
                </Collapsible>
                <br /><br />

                <div className="about-get-started">
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
        );
    }

}


export default About;