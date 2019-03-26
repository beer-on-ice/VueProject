<template lang="pug">
  #app
    router-view
</template>

<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let htmlFontSize = window.innerWidth / 10
  htmlFontSize = htmlFontSize > 50 ? 50 : htmlFontSize
  html.style.fontSize = `${htmlFontSize}px`
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
