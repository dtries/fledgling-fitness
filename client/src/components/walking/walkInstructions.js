import React from "react";
import {Modal, Button } from 'react-materialize';
import $ from "jquery";

function WalkingModal(props) {

    var walkVal= props.walkVal;
    var walkTerm = "";
    
    if (walkVal === 0) {
        walkTerm="walking";
    } else {
        walkTerm="walk";
    }

    $(".modal-close").click(function (e) {
            $("#walking-modal iframe").attr("src", "https://www.youtube.com/embed/2u8DXWRzkUE");
    });       
 
    return (
    <Modal className="exercise-modal" id="walking-modal" header="Walking"
        footer="Walking-Footer"
        trigger={<Button flat id="walking-modal-btn" 
        tooltip="Click for Information on Walking"
        tooltipoptions={{position: 'top'}}
        >
            {walkTerm}
        </Button>}>
        <p>Walking is a great, low-impact way to improve cardiovascular fitness.</p> 
        
        <p>Begin and end each session with 5 minutes of easy walking. That is, a 
        pace at which you could easily sing while walking.</p>

        <p>Your workout should be conducted at a brisk pace. This should cause you
        to breath hard, but you could still carry on a conversation.</p>

        <div className="container video-container">
            <iframe className="video" title="Walking Tips" width="auto" src="https://www.youtube.com/embed/2u8DXWRzkUE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    </Modal>
    )
}

export default WalkingModal;