<style>

</style>

<script>
  export let name
  export let size
  export let color = null;
  import { icon } from '@fortawesome/fontawesome-svg-core'
  const i = icon(
    { prefix: 'fas', iconName: name },
    {
      classes: [],
      styles: { color: color, width: size, height: size },
    },
  )
</script>

{@html i.html}
