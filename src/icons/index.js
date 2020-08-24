/**
 *
 * https://fontawesome.com/how-to-use/javascript-api/methods/library-add
 * https://fontawesome.com/how-to-use/javascript-api/methods/icon
 * https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react
 **/
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core'
import iconsJson from './icons.json'

// Initialise library
let iconList = iconsJson['icons']
iconList.forEach((iconName) => {
  const i = findIconDefinition({ prefix: 'fas', iconName: iconName })
  library.add(i)
})

// Export Icon svelte object
import Icon from './Icon.svelte'

export { iconList, Icon }
