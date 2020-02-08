import React from 'react'
import { ShowCondition } from '../Utils'

// Create logic to mark a book as favorite, change the book object on state maybe
export default props => {
    return (
        <ShowCondition condition={props.show}>
            <button id={props.idButton} className={'btn btn-' + props.category} onClick={props.callback}>
                <i id='cuustomIcon' className={'fa fa-' + props.icon}></i>
                <ShowCondition condition={props.showText}>
                    <span id='customText'>{props.text}</span>
                </ShowCondition>
            </button>
        </ShowCondition>
    )
}