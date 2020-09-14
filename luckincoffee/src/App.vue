<template>
  <div id="app">
    <router-view />
  </div>
  <!-- 13145678901 qwe123 -->
</template>

<style lang="less">

html,body,#app{
  height: 100%;
  
}
body {
  background-color: #f4f4f4;
}
.auto-img {
  width: 100%;
  display: block;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.one-text {
  white-space: nowrap;
  // 不能换行
  overflow: hidden;
  // 省略的显示为...
  text-overflow: ellipsis;
}
</style>
