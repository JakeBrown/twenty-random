<style>
  h1 {
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  .timer {
    text-transform: uppercase;
    font-size: 1.5em;
    padding-bottom: 50px;
  }

  .step2Button {
    text-transform: uppercase;
    font-size: 1.5em;
    padding: 20px;
    background-color: #4caf50;
    margin-bottom: 50px;
    height: 100px;
  }

  .checkButton {
    text-transform: uppercase;
    font-size: 1.5em;
    padding: 20px;
    background-color: #4caf50;
    margin-bottom: 50px;
    height: 100px;
  }

  .iconPanel {
  }

  .active {
    background-color: yellow;
  }

  main {
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 1.2em;
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content: center;
    margin: 100px;
    width: 600px;
  }

  .el {
    margin: 5px;
    margin-bottom: 5px;
    width: 100px;
    height: 100px;
    flex-direction: column;
    text-align: center;
    text-transform: uppercase;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
  import IconPanel from './IconPanel.svelte'
  import iconsJson from './icons.json'
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

  let iconList = iconsJson['icons']
  let step1Complete = false

  let colors = ['blue', 'green', 'black', 'red', 'pink', 'salmon']
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
  while (allIcons.length < 60) {
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

  function step2() {
    stopwatch = 0
    step1Complete = true
  }

  function reset() {
    step1Complete = false
    selectedItems = []
  }

  function checkResults() {
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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  let stopwatch = 0
  async function run() {
    while (true) {
      stopwatch = stopwatch + 1
      await sleep(1000)
    }
  }
  run()
  let selectedItems = []
</script>

<main>
  <h1>Twenty Random</h1>
  {#if !step1Complete}
    <div class="timer">Timer: {stopwatch}</div>
    <p>Your mission is to remember these twenty random images.</p>
    <button class="step2Button" on:click={step2}>Done</button>
    <div class="iconPanel">
      <IconPanel icons={chosenIcons} selectable={false} />
    </div>
  {:else}
    <p>Now see if you can pick the twenty images you saw on the last screen.</p>
    <button class="checkButton" on:click={checkResults}>
      Check my results!
    </button>
    <button class="reset" on:click={reset}>Reset</button>
    <div class="iconPanel">
      <IconPanel icons={allIcons} bind:selectedItems selectable={true} />
    </div>
  {/if}
</main>
