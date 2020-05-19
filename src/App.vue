<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  body{
    margin: 0 auto;
  }
  body,html,#app{
    height: 100%;
  }
  ul,ol{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  .auto-img{
    display: block;
    width: 100%;
  }
  h1{
    margin: 0;
    padding: 0;
  }
  
  input{
    outline: 0;
  }
</style>
