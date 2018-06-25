import React from 'react';

const EntryLayout = (props) => {
    return(
        <li>
            <p>Sleep Quality: {props.starRating} / 5</p>
            <p>Date: {props.date}</p>
            <p>User: {props.user}</p>
            <p>Notes: {props.notes}</p>
        </li>
    )
}




export default EntryLayout;