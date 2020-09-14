import React from 'react'
import styled from 'styled-components'
import { Icon, iconList } from './icons'

const Page = styled.div`
  .active {
    background-color: var(--pink);
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content: space-evenly;
    background-color: var(--yellow);
  }

  .el {
    width: 100px;
    height: 100px;
    margin: 5px;
    flex-direction: column;
    text-align: center;
    text-transform: uppercase;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`



function IconPanel({ icons, selectable, selectedItems }) {

  function clickedIcon(icon) {
    if (!selectable) {
      return
    }
    // Find the index in the selection list, if it exists
    let i = selectedItems.indexOf(icon)
    // If the icon has not been selected, then add it
    if (i == -1) {
      selectedItems.push(icon)
    } else {
      selectedItems.splice(i, 1)
    }
    // Trigger update
    selectedItems = selectedItems
  }

  return (
    <div className="container">
      {icons.map(function (icon, index) {
        <div
          className={selectedItems.includes(icon) && 'active'}
          className="el"
          onClick={() => clickedIcon(icon)}>
          <Icon name={icon.name} size="50px" color={icon.color} />
        </div>
      })}
    </div>
  )
}

export default IconPanel