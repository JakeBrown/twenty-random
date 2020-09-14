import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Icon, iconList } from './icons'

const Page = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-content: space-evenly;
  background-color: var(--yellow);
  .active {
    background-color: var(--pink);
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

function IconPanel({ icons, selectable, selectedItems, setSelectedItems }) {
  function clickedIcon(icon) {
    if (!selectable) {
      return
    }
    let newSelected = [...selectedItems]
    // Find the index in the selection list, if it exists
    let i = newSelected.indexOf(icon)
    // If the icon has not been selected, then add it
    if (i == -1) {
      newSelected.push(icon)
    } else {
      newSelected.splice(i, 1)
    }
    setSelectedItems(newSelected)
  }

  return (
    <Page>
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`el ${
            selectable && selectedItems.includes(icon) && 'active'
          }`}
          onClick={() => clickedIcon(icon)}
        >
          <Icon name={icon.name} size="50px" color={icon.color} />
        </div>
      ))}
    </Page>
  )
}

export default IconPanel
