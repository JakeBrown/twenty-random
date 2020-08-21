<style>
</style>

<script>
  export let name
  export let size
  export let color
  import '@fortawesome/fontawesome-free/js/all.js'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fas } from '@fortawesome/free-solid-svg-icons'
  library.add(fas)
  import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'
  const glasses = findIconDefinition({ prefix: 'fas', iconName: name })
  const i = icon(glasses, {
    classes: [],
    styles: { color: color, width: size, height: size },
  })
</script>

{@html i.html}
