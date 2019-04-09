<template lang="pug">
  #app
    router-view
</template>

<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let htmlFontSize = window.innerWidth / 14.4
  html.style.fontSize = htmlFontSize + 'px'
})
</script>

<style lang="scss">
</style>
