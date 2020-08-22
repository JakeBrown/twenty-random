<style>
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
</style>

<script>
  export let icons
  export let selectable
  export let selectedItems = []
  import Icon from './Icon.svelte'
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
</script>

<div class="container">
  {#each icons as icon, i}
    <div
      class:active={selectedItems.includes(icon)}
      class="el"
      on:click={() => clickedIcon(icon)}>
      <Icon name={icon.name} size="50px" color={icon.color} />
    </div>
  {/each}
</div>
