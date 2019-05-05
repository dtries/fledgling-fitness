import React from "react";

function TableBody(props) {

    console.log(JSON.stringify(props.day));

    //This is a function (not a class) so it does not require a render
    return (
        <tbody>
            <tr>
                <td>
                   {props.day}
                </td>
                <td>
                    Eclair
                </td>
                <td>
                    $0.87
                </td>
                <td>
                    Full Belly
                </td>
            </tr>
        </tbody>
    );
}

export default TableBody;

