<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar :fixed="true">
      <template #left>
        <div class="home-title one-text">
          {{ timeText }}<span v-if="isLogin">,{{ userInfo.nickName }}</span>
        </div>
      </template>
      <!-- 查找栏 -->
      <template #right>
        <div>
          <van-search @focus="search" placeholder="请输入查找的商品名称" shape="round" />
        </div>
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <div class="banner-box">
      <van-swipe :autoplay="3000" indicator-color="#0C34BA">
        <van-swipe-item
          v-for="(item, index) in bannerData"
          :key="index"
          @click="getProductId(item.pid)"
        >
          <img class="auto-img" :src="item.bannerImg" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 热门推荐 -->
    <div class="hot-product">
      <div class="hot-product-title">热门推荐</div>
      <div class="product-box clearfix">
        <div
          class="product-item fl"
          :class="[index % 2 == 0 ? 'p-left' : 'p-right']"
          v-for="(item, index) in hotProducts"
          :key="index"
          @click="getProductId(item.pid)"
        >
          <div class="p-img">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <div class="pro-name one-text">{{ item.name }}</div>
          <div class="clearfix">
            <!-- <div class="en-pro-name one-text fl">{{ item.enname }}</div> -->
            <div class="pro-price fl">￥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeText: "",
      bannerData: [],
      hotProducts: [],
      userInfo: {},
      isLogin: false,
    };
  },
  methods: {
    // 点击搜索框 显示搜索信息
    search() {
      this.$router.push({name:"Search"})
    },
    // 查询用户信息
    // 判断有没有登录,获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        this.isLogin = false;
        return;
        // return this.$router.push({ name: "Login" });
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log(result);
          if ((result.data.code = "A001")) {
            if (result.data.result.length == 1) {
              this.userInfo = result.data.result[0];
              this.isLogin = true;
            } else {
              this.isLogin = false;
            }
          }
          // console.log(this.userInfo);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 根据时间修改信息
    getTime() {
      let hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "凌晨好";
      }
    },
    // 获取banner
    getBanner() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/banner",
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 300) {
            this.bannerData = result.data.result;
            // console.log(result)
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 获取商品数据
    getHotProducts() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          // 标记热门商品
          value: 1,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 500) {
            // console.log(result);
            this.hotProducts = result.data.result;
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 点击获取商品id => pid
    getProductId(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
  },
  created() {
    this.getTime();
    this.getBanner();
    this.getHotProducts();
    this.getUserInfo();
    // console.log("create eeeeeeeee");
  },
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 46px;
  .home-title {
    max-width: 140px;
    font-size: 14px;
    font-weight: bold;
  }
  .banner-box {
    margin: 20px 20px 0 20px;
    overflow: hidden;
    border-radius: 20px;
  }

  /deep/ .van-search {
    padding: 0;
  }
  .hot-product {
    margin-top: 20px;
    padding: 0 20px;
    .hot-product-title {
      font-weight: bold;
      font-size: 18px;
    }
    .product-box {
      margin-top: 10px;
      .product-item {
        width: calc(~"50% - 30px");
        // background: #ddd;
        padding: 10px;
      }
      .p-left {
        margin-right: 10px;
      }
      .p-right {
        margin-left: 10px;
      }
      .p-img {
        border-radius: 10px;
        overflow: hidden;
      }
      .pro-name {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
      }
      .en-pro-name {
        // color: #666;
        font-size: 14px;
        width: calc(~"100% - 50px");
      }
      .pro-price {
        font-size: 16px;
        width: 50px;
      }
    }
  }
}
</style>
