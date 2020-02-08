import React, { Fragment } from 'react'
import UnavailableImage from '../../assets/Image_Unavailable.png'

export default (props) => {
  const thumbnailImage = () => props.thumbnail ? props.thumbnail : UnavailableImage

  return (
    <Fragment>
      <img className='poster' src={props.thumbnail ? props.thumbnail : UnavailableImage} alt={props.alt} />
    </Fragment>
  )
}