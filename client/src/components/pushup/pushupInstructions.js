import React from "react";
import {Modal, Button} from 'react-materialize';
import $ from "jquery";


function PushupModal() {

$(".modal-close").click(function (e) {
    $("#pushup-modal iframe").attr("src", "https://www.youtube.com/embed/tGRND-McdCg");
}); 

return (
<Modal className="exercise-modal" id="pushup-modal" header="Pushups"  
    options={{
        inDuration: 700, 
        onCloseEnd: function () {$("#pushup-modal iframe").attr("src", "https://www.youtube.com/embed/2u8DXWRzkUE")}
    }}
    trigger={<Button id="pushup-modal-btn" 
    tooltip="Click for Information on Pushups"
    tooltipoptions={{position: 'top'}}
    >
        pushups
    </Button>}>
    <p>Pushups are a great way to improve upper-body strength.</p> 
    
    <p>If full-plank pushups are challenging at first, start
    with knee pushups until you can perform 2-3 good-form, plank pushups.</p>

    <p>Remember to concentrate on good form and do not go too deep
        as it places excess stress on the front shoulder area.</p>

    <div className="container video-container">
    <iframe className="video" title="Pushup Tips" src="https://www.youtube.com/embed/tGRND-McdCg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>    </div>
</Modal>
)
}

export default PushupModal;