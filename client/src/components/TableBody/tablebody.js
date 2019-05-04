import React from "react";

function TableBody(props) {

    //This is a function (not a class) so it does not require a render
    return (
        <tbody>
            <tr>
                <td>
                    HEY DUDE
                </td>
                <td>
                    Eclair
                </td>
                <td>
                    $0.87
                </td>
            </tr>
            <tr>
                <td>
                    Alan
                </td>
                <td>
                    Jellybean
                </td>
                <td>
                    $3.76
                </td>
            </tr>
            <tr>
                <td>
                    Jonathan
                </td>
                <td>
                    Lollipop
                </td>
                <td>
                    $7.00
                </td>
            </tr>
        </tbody>
    );
}

export default TableBody;

