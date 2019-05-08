import React from "react";

function TableBodyPSS(props) {

    var attempted;   
    var completed;
    var set1;   
    var set2;
    var set3;

    if (props.dayNum === 1) {
        set1 = props.day1set1;
        set2 = props.day1set2
        set3 = props.day1set3;
        attempted = props.attempted ? "Yes" : "No";
        completed = props.completed ? "Yes" : "No";
    }

    if (props.dayNum === 2) {
        set1 = props.day2set1;
        set2 = props.day2set2
        set3 = props.day2set3;
        attempted = props.attempted ? "Yes" : "No";
        completed = props.completed ? "Yes" : "No";
    } 

    if (props.dayNum === 3) {
        set1 = props.day3set1;
        set2 = props.day3set2
        set3 = props.day3set3;
        attempted = props.attempted ? "Yes" : "No";
        completed = props.completed ? "Yes" : "No";
    }

    //This is a function (not a class) so it does not require a render
    return (
        <tbody>
            <tr>
                <td>
                   {props.day}
                </td>
                <td>
                    {props.dayNum}
                </td>
                <td>
                    {set1}
                </td>
                <td>
                    {set2}
                </td>
                <td>
                    {set3}
                </td>
                <td>
                    {attempted}
                </td>
                <td>
                    {completed}
                </td>
            </tr>
        </tbody>
    );
}

export default TableBodyPSS;

