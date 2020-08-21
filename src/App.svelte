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
  let step1Complete = false

  function step2() {
    stopwatch = 0
    step1Complete = true
  }

  function reset() {
    step1Complete = false
  }

  function checkResults() {
    alert('Not implemented')
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
</script>

<main>
  <h1>Twenty Random</h1>
  <p>Your mission is to remember these twenty random images.</p>
  {#if step1Complete}
    <button class="checkButton" on:click={checkResults}>
      Check my results!
    </button>
    <button class="reset" on:click={reset}>Reset</button>
    <div class="iconPanel">
      <IconPanel numItems="60" selectable={true} />
    </div>
  {:else}
    <div class="timer">Timer: {stopwatch}</div>
    <button class="step2Button" on:click={step2}>Done</button>
    <div class="iconPanel">
      <IconPanel numItems="20" selectable={false} />
    </div>
  {/if}
</main>
