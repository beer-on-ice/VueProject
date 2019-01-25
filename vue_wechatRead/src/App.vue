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
  html.style.fontSize = htmlFontSize + 'px'
})
</script>

<style lang="scss" scoped></style>
