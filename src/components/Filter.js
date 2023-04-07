import React from 'react'

function Filter({ changeFilter }){


  return (
        <select onChange={(e) => changeFilter(e.target.value)}>
            <option>Sort By</option>
            <option> Alphabetically </option>
            <option> Price Low - High </option>
            <option> Price High - Low </option>
        </select>
  )
}


export default Filter