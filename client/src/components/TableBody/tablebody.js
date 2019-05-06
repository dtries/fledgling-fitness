import React from "react";

function TableBody(props) {
    // var date = 
    var attempted = props.attempted ? "Yes" : "No"
    var completed = props.completed ? "Yes" : "No"

    //This is a function (not a class) so it does not require a render
    return (
        <tbody>
            <tr>
                <td>
                   {props.day}
                </td>
                <td>
                    {props.duration}
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

export default TableBody;

