import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import IconPanel from './IconPanel.js'
import { Icon, iconList } from './icons'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  align-content: center;

  h1 {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .footer {
    background-color: var(--blue);
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1.2rem;
  }
  a {
    color: yellow;
    font-weight: bold;
    text-decoration: none;
  }

  .page-body {
    flex-grow: 1;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .intro {
    min-height: 200px;
    background-color: var(--blue);
    padding: 20px;
    text-align: center;
    margin: 50px;
  }
  .controls {
    display: flex;
    margin-bottom: 50px;
    flex-direction: column;
    align-items: center;
  }

  .controls > button {
    font-size: 1.5rem;
    padding: 10px;
    margin: 10px;
    width: 200px;
    background-color: var(--pink);
    display: flex;
    align-items: center;
    color: var(--yellow);
    border: none;
    justify-content: center;
  }
  button:hover {
    cursor: pointer;
  }

  .timer {
    text-transform: uppercase;
    font-size: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .iconPanel {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 600px;
    min-height: 400px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 600px) {
    .iconPanel {
      width: 100%;
      min-height: 600px;
    }
  }

  p {
    font-size: 1.2rem;
  }
`

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

let colors = ['blue', 'green', 'black']
let chosenIcons = []
while (chosenIcons.length < 20) {
  let num = getRndInteger(0, iconList.length)
  let iconName = iconList[num]
  let iconColor = colors[getRndInteger(0, colors.length)]
  if (
    !chosenIcons.some((element) => {
      return element['name'] == iconName
    })
  ) {
    chosenIcons.push({ name: iconName, color: iconColor })
  }
}

let allIcons = []
allIcons.push(...chosenIcons)
while (allIcons.length < 100) {
  let num = getRndInteger(0, iconList.length)
  let iconName = iconList[num]
  let iconColor = colors[getRndInteger(0, colors.length)]
  if (
    !allIcons.some((element) => {
      return element['name'] == iconName
    })
  ) {
    allIcons.push({ name: iconName, color: iconColor })
  }
}
shuffle(allIcons)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function Start({ chosenIcons, next }) {
  return (
    <>
      <div className="intro">
        <h1>Twenty Random</h1>
        <p>
          <b>The goal</b>
          is to memorize 20 random images. As quickly as possible.
        </p>
        <p>
          Memorizing isn't just looking at the images and trying to remember
          them. For most people, active memorization using chunking or another
          mnemonic device will be more effective.
        </p>
      </div>
      <div className="controls">
        <button
          onClick={() => {
            next()
          }}
        >
          Go!
        </button>
      </div>
    </>
  )
}

function Step2({ chosenIcons, next, stopwatch, selectedIcons }) {
  return (
    <>
      <p>
        <b>Your time</b>
        has started! Memorize these images and then click
        <b>Done</b>
      </p>
      <div className="timer">
        <Icon name="clock" size="20px" color="" />
        <span style={{ marginLeft: '10px' }}>{stopwatch}</span>
      </div>
      <div className="controls">
        <button
          onClick={() => {
            next(chosenIcons)
          }}
        >
          Done!
        </button>
      </div>
      <div className="iconPanel">
        <IconPanel
          icons={chosenIcons}
          selectable={false}
          selectedIcons={selectedIcons}
        />
      </div>
    </>
  )
}

function FinalStep({ icons, next }) {
  const [selectedItems, setSelectedItems] = useState([])
  return (
    <>
      <p>
        Now see if you can pick the twenty images you saw on the last screen.
      </p>
      <div className="iconPanel">
        <IconPanel
          icons={icons}
          selectable={true}
          selectedItems={selectedItems}
          setSelectedItems={(items) => setSelectedItems(items)}
        />
      </div>
      <div className="controls">
        <button className="resetButton" onClick={reset}>
          Reset
        </button>
        <button onClick={() => next(selectedItems)}>Check</button>
      </div>
    </>
  )
}

function App() {
  const [step1Complete, setStep1Complete] = useState(false)
  const [started, setStarted] = useState(false)
  const [stopwatch, setStopwatch] = useState(0)

  function step2() {
    setStopwatch(0)
    setStep1Complete(true)
  }

  function reset() {
    setStopwatch(0)
    setStep1Complete(false)
    setSelectedItems([])
  }

  function showScore(selectedItems) {
    let score = 0
    selectedItems.forEach((el) => {
      let isIn = chosenIcons.some((element) => {
        return element['name'] == el['name']
      })
      console.log(isIn)
      if (isIn) score++
    })
    alert('Selected: ' + selectedItems.length + '. Correct: ' + score)
  }

  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    async function run() {
      while (true) {
        setStopwatch(stopwatch + 1)
        await sleep(1000)
      }
    }
    run()
  }, [])

  useEffect(() => {
    setStopwatch(0)
  }, [started])

  return (
    <Page>
      <div className="page-body">
        {!started && (
          <Start
            next={() => {
              setStarted(true)
            }}
          />
        )}
        {started && !step1Complete && (
          <Step2
            stopwatch={stopwatch}
            chosenIcons={chosenIcons}
            next={() => setStep1Complete(true)}
          />
        )}
        {step1Complete && (
          <FinalStep
            icons={allIcons}
            next={(selectedItems) => showScore(selectedItems)}
          />
        )}
      </div>
      <div className="footer">
        <span>
          &copy; {new Date().getFullYear()}
          <a href="https://www.jakebrown.io">Jake Brown</a>
        </span>
      </div>
    </Page>
  )
}

export default App
