import React from 'react'

export const ShowCondition = (props) => {
  return (
      props.condition
          ? props.children
          : null
  )
}