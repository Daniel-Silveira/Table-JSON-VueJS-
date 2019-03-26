<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">

#app {
  font-family: 'Roboto', sans-serif;
} 

html, body{
  min-height: 100%;
}

select {
  display: block!important;
  height: 4em;
}

body{
  position: relative;
  &::-webkit-scrollbar-track {
      background-color: white;
    }
  &::-webkit-scrollbar {
      width: 10px;
      background-color: white;
    }
  &::-webkit-scrollbar-thumb {
      background-color: rgb(219, 219, 219);
      border-radius: 100px;
      transition: 5s;
      &:hover {
        background-color: rgb(0, 0, 0);
      }
    }
}

div img{
  width: 100%;
  height: 100%;
}
</style>
