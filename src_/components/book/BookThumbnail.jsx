import React, { Suspense, Fragment } from 'react'
import UnavailableImage from '../../assets/Image_Unavailable.png'
import Spinner from '../template/loader/Spinner'

export default (props) => {
  const volumeInfo = props.volumeInfo
  const thumbnail = checkTumbnailSource(volumeInfo)

  function checkTumbnailSource(volumeInfo) {
    const hasThumbnail = volumeInfo.hasOwnProperty('imageLinks')
      ? volumeInfo.imageLinks.thumbnail
      : false
    return hasThumbnail
  }

  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <img className='poster' src={thumbnail ? thumbnail : UnavailableImage} alt={props.alt} />
      </Suspense>
    </Fragment>
  )
}