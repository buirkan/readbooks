import React from 'react'

export const ShowCondition = (props) => {
  return (
    props.condition
      ? props.children
      : null
  )
}

export const dateFormatter = (date) => {
  let year = date.split('-')[0]
  let month = date.split('-')[1]
  let day = date.split('-')[2]

  return (`0${day}`).slice(-2) + '/' + (`0${month}`).slice(-2) + `/${year}`
}

export const containsObjectById = (book, favorites) => {
  var bookFounded, bookIndex

  for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id == book.id) {
          bookFounded = favorites[i]
          bookIndex = i
      }
  }

  return bookFounded ? bookIndex : -1
}