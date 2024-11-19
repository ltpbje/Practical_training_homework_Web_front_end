<template>
  <page-view>
    <router-view>

    </router-view>
  </page-view>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

ul,
ol {
  list-style: none;
}

#app {
  width: 100vw;
  height: 100vh;
}

:root {
  font-size: calc(100vw / 375 *100);
}

body {
  font-size: 16px;
}

@media only screen and (min-width:769px) {
  :root {
    font-size: calc(768px / 375 *100);
  }

  #app {
    width: 768px;
    margin: 0 auto;
  }
}
</style>
