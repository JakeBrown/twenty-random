<style>
  .active {
    background-color: yellow;
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-content: center;
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
  export let numItems
  export let selectable
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  import Icon from './Icon.svelte'
  let icons = [
    'cat',
    'dog',
    'ambulance',
    'address-book',
    'air-freshener',
    'ad',
    'allergies',
    'american-sign-language-interpreting',
    'anchor',
    'angry',
    'apple-alt',
    'archive',
    'archway',
    'asterisk',
    'at',
    'atom',
    'award',
    'baby',
    'baby-carriage',
    'backward',
    'bacon',
    'bacteria',
    'balance-scale',
    'ban',
    'band-aid',
    'barcode',
    'battery-quarter',
    'bed',
    'bell',
    'beer',
    'bible',
    'biking',
    'binoculars',
    'biohazard',
    'birthday-cake',
    'blender',
    'blind',
    'bolt',
    'bomb',
    'bone',
    'bong',
    'book',
    'bowling-ball',
    'box',
    'brain',
    'bread-slice',
    'briefcase',
    'book',
    'bus',
    'calculator',
    'burn',
    'campground',
    'camera-retro',
    'car',
    'candy-cane',
    'capsules',
    'car-crash',
    'caravan',
    'carrot',
    'cart-plus',
    'chart-line',
    'chess',
    'chess-knight',
    'chess-rook',
    'church',
    'cloud-rain',
    'clock',
    'cocktail',
    'cog',
    'coffee',
    'comment',
    'compass',
    'cookie-bite',
    'couch',
    'credit-card',
    'crosshairs',
    'cut',
    'desktop',
    'dice',
    'divide',
    'dna',
    'donate',
    'dove',
    'drum',
    'dragon',
    'drumstick-bite',
    'egg',
    'eject',
    'fighter-jet',
    'fish',
    'flag',
    'fire-alt',
    'fingerprint',
    'fire-extinguisher',
    'football-ball',
    'frog',
    'flask',
    'gamepad',
    'gas-pump',
    'gavel',
    'gamepad',
    'gift',
    'glass-cheers',
    'glasses',
    'globe-asia',
    'golf-ball',
    'graduation-cap',
    'guitar',
    'hamburger',
    'hammer',
    'hand-peace',
    'hand-rock',
    'hands-helping',
    'hand-scissors',
    'hat-cowboy',
    'head-side-cough',
    'headphones',
    'heart',
    'heart-broken',
    'hiking',
    'hippo',
    'home',
    'horse',
    'hotdog',
    'hourglass-half',
    'ice-cream',
    'icicles',
    'igloo',
    'joint',
    'key',
    'keyboard',
    'landmark',
    'lemon',
    'leaf',
    'lightbulb',
    'magnet',
    'magic',
    'map-marked-alt',
    'map-signs',
    'meteor',
    'menorah',
    'microphone',
    'mitten',
    'monument',
    'mortar-pestle',
    'mosque',
    'mountain',
    'mouse',
    'music',
    'oil-can',
    'paint-roller',
    'palette',
    'paper-plane',
    'paperclip',
    'parachute-box',
    'parking',
    'paw',
    'peace',
    'pepper-hot',
    'phone',
    'pizza-slice',
    'plane-departure',
    'plug',
    'poo',
    'print',
    'puzzle-piece',
    'question',
    'quidditch',
    'radiation',
    'rainbow',
    'recycle',
    'restroom',
    'road',
    'robot',
    'rocket',
    'satellite-dish',
    'screwdriver',
    'sad-tear',
    'search',
    'ship',
    'shield-alt',
    'shoe-prints',
    'shopping-cart',
    'shower',
    'signal',
    'skiing',
    'skull',
    'smoking',
    'sms',
    'snowflake',
    'snowman',
    'socks',
    'spider',
    'star',
    'spell-check',
    'sun',
    'swimmer',
    'suitcase-rolling',
    'syringe',
    'table-tennis',
    'taxi',
    'thermometer-three-quarters',
    'thumbs-up',
    'toilet',
    'tooth',
    'tools',
    'tractor',
    'tram',
    'trash',
    'trophy',
    'truck',
    'truck-monster',
    'tshirt',
    'umbrella',
    'university',
    'unlock',
    'user-graduate',
    'user-secret',
    'utensils',
    'video',
    'warehouse',
    'wheelchair',
    'wifi',
    'wind',
    'wine-glass-alt',
    'wrench',
    'yin-yang',
  ]
  let colors = ['blue', 'green', 'black', 'red', 'pink', 'salmon']
  let chosenIcons = []
  for (let i = 0; i < numItems; i++) {
    let num = getRndInteger(0, icons.length)
    let iconName = icons[num]
    let iconColor = colors[getRndInteger(0, colors.length)]
    chosenIcons.push({ name: iconName, color: iconColor })
  }
  let selectedItems = []
  function clickIndex(idx) {
    if (!selectable) {
      return
    }
    console.log('Clicking: ' + idx)
    let i = selectedItems.findIndex((element) => element == idx)
    console.log('At element: ' + i)
    if (i == -1) {
      selectedItems.push(idx)
    } else {
      selectedItems.splice(i, 1)
    }
    // Trigger update
    selectedItems = selectedItems
    console.log(selectedItems)
  }
</script>

<div class="container">
  {#each chosenIcons as icon, i}
    <div
      class:active={selectedItems.includes(i)}
      class="el"
      on:click={() => clickIndex(i)}>
      <Icon name={icon.name} size="50px" color={icon.color} />
    </div>
  {/each}
</div>
