<template lang="pug">
  #app
    router-view
</template>

<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let htmlFontSize = 1440 / 10
  html.style.fontSize = htmlFontSize + 'px'
})
</script>

<style lang="scss">
</style>
