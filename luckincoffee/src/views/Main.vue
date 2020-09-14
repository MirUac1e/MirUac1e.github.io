<template>
  <div class="main">
    <div>
      <keep-alive include="Home,Menu">
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" active-color="#0C34BA" route>
      <van-tabbar-item
        icon="home-o"
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.url"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 首页 菜单 购物袋 我的
      active: 0,
      tabbarData: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/tabbar_18.png"),
            inactive: require("../assets/images/tabbar_03.png"),
          },
          url: {
            name: "Home",
          },
        },
        {
          title: "菜单",
          icon: {
            active: require("../assets/images/tabbar_19.png"),
            inactive: require("../assets/images/tabbar_05.png"),
          },
          url: {
            name: "Menu",
          },
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/images/tabbar_21.png"),
            inactive: require("../assets/images/tabbar_09.png"),
          },
          url: {
            name: "Shopbag",
          },
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/tabbar_22.png"),
            inactive: require("../assets/images/tabbar_11.png"),
          },
          url: {
            name: "My",
          },
        },
      ],
    };
  },
  created() {
    // activeTabbar()
  },
  methods: {
    // 根据路径激活tabbar
    // tabber组件有route属性 激活路由模式 不用自己写
    activeTabbar(){
      // let route.name = this.$route.name
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 50px;
}
</style>
