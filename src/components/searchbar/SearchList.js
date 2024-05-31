import React from 'react'

export const SearchList = ({item}) => {
    console.log(item)
  return (
    <div style={{zIndex: 1500}}>
      <p> {item.label}</p>
    </div>
  )
}
