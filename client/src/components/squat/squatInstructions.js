import React from "react";
import {Modal, Button} from 'react-materialize';


function SquatModal() {

return (
<Modal className="exercise-modal" id="squat-modal" header="Squats"  
    trigger={<Button id="squat-modal-btn" 
    tooltip="Click for Information on Squats"
    tooltipOptions={{position: 'top'}}
    >
        squats
    </Button>}>
    <p>Squats are a terrific exercise for strengthing your lower body muscles.
    </p> 
    
    <p>If squats are challenging at first, you can do half squats, 
        limiting the down range of motion to about 45 degrees and
        work towards a full 90 degree squat over time.
    </p>

    <p>Remember to concentrate on good form:  knees track over feet and do not go beyond the toes; keep weight back,
        with heels on floor throughout; extend arms forward as you squat down and keep you core muscles
        tight and back up and straight.
    </p>
    <div className="container video-container">
        <iframe className="video" title="Squat Tips" src="https://www.youtube.com/embed/as8uqmh2wKw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    </Modal>
)
}

export default SquatModal;
