import React from 'react'

export default props => (
    <div className='mb-3 input'>
        <div className='input-group-prepend'>
            <span className='input-group-text' id='basic-addon1'></span>
        </div>
        <input type='text' className='form-control searchInput' aria-label='Book' aria-describedby='basic-addon1' placeholder='Procure o seu livro' value={props.input} onKeyUp={props.handleUp} onChange={props.handleInputValue} />
    </div>
)