<style>
  h1 {
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: bold;
  }

  .intro {
    min-height: 300px;
  }
  .controls {
    display: flex;
    width: 80%;
    margin-bottom: 50px;
    height: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .controls > button {
    font-size: 1em;
    padding: 10px;
    margin: 10px;
    width: 200px;
    background-color: var(--blue);
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
    font-size: 1em;
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .iconPanel {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content: center;
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

  main {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: var(--footer-height);
  }

  p {
    font-size: 1.2em;
  }
</style>

<script>
  import IconPanel from './IconPanel.svelte'
  import Icon from './Icon.svelte'
  import Footer from './Footer.svelte'
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
  let started = false

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
    stopwatch = 0
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

  function go() {
    started = true
    stopwatch = 0
    run()
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
  let selectedItems = []
</script>

<main>
  {#if !started}
    <div class="intro">
      <h1>Twenty Random</h1>
      <p>
        <b>The goal</b>
        is to memorize 20 random images. As quickly as possible.
      </p>
      <p>
        You will need to actively memorize using chunking or another mnemunic.
      </p>
    </div>
    <div class="controls">
      <button on:click={go}>Go!</button>
    </div>
  {:else if !step1Complete}
    <p>
      <b>Your time</b>
      has started! Memorize these images and then click
      <b>Done</b>
    </p>
    <div class="controls">
      <div class="timer">
        <Icon name="clock" size="20px" />
        <span style="margin-left: 10px">{stopwatch}</span>
      </div>
      <button on:click={step2}>Done! Stop the clock!</button>
    </div>
    <div class="iconPanel">
      <IconPanel icons={chosenIcons} selectable={false} />
    </div>
  {:else}
    <p>Now see if you can pick the twenty images you saw on the last screen.</p>
    <div class="iconPanel">
      <IconPanel icons={allIcons} bind:selectedItems selectable={true} />
    </div>
    <div class="controls">
      <button on:click={checkResults}>Check my results!</button>
      <button class="resetButton" on:click={reset}>Reset</button>
    </div>
  {/if}
</main>
<Footer />
