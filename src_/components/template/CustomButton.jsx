import React from 'react'
import { ShowCondition } from '../Utils'

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