import React from 'react'
import spinner from '../../../assets/cyclone.png'

import './Spinner.css'

export default () => (
    <React.Fragment>
        {/* <img src={spinner} className='spinner' alt='A cyclone loader' /> */}
        <div className="spinner">
            {'🌀'}
        </div>
    </React.Fragment>
)