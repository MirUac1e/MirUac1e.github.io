<template>
  <div class="main">
    <router-view />
    <div>
      <van-tabbar :fixed="true" :v-model="active" active-color="#e4393c" route>
        <van-tabbar-item
          v-for="(item, index) in iconData"
          :key="index"
          :to="item.pageUrl"
          :icon="item.imgUrl"
          
          >{{ item.title }}</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      iconData: [
        {
          title: "推荐",
          imgUrl: "fire-o",
          pageUrl: "/recommended",
        },
        {
          title: "视频",
          imgUrl: "video-o",
          pageUrl: "/video",
        },
        {
          title: "我的音乐",
          imgUrl : 'music-o',
          pageUrl : '/mymusic'
        }
        ,
        {
          title: "个人中心",
          imgUrl: "user-o",
          pageUrl: "/my",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 50px;
  height: calc(100%  - 50px);
}
</style>
