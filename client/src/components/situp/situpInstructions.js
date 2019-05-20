import React from "react";
import {Modal, Button} from 'react-materialize';
import $ from "jquery";


function SitupModal() {

    $(".modal-close").click(function (e) {
        $("#situp-modal iframe").attr("src", "https://www.youtube.com/embed/1fbU_MkV7NE");
    }); 

return (
<Modal className="exercise-modal" id="situp-modal" header="Situps"  
    options={{
        inDuration: 700, 
        onCloseEnd: function () {$("#situp-modal iframe").attr("src", "https://www.youtube.com/embed/2u8DXWRzkUE")}
    }}
    trigger={<Button id="situp-modal-btn" 
    tooltip="Click for Information on Situps"
    tooltipoptions={{position: 'top'}}
    >
        situps
    </Button>}>
    <p>Situps are a wonderful exercise for strengthing you core muscles.
    </p> 
    
    <p>If situps are challenging at first, you can use your hands 
        against your thighs to give a slight assist.
    </p>

    <p>Remember to concentrate on good form, keep your lower back pressed
        to the floor at the beginning of each repetition. Do not arch
        your back.
    </p>
    <div className="container video-container">
    <iframe className="video" title="Situp Tips"  src="https://www.youtube.com/embed/1fbU_MkV7NE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>    </div>
</Modal>
)
}

export default SitupModal;
