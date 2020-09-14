<template>
  <div class="like">
    <!-- 导航 -->
    <van-nav-bar
      title="我的收藏"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
      :style="{ 'z-index': 2 }"
    />
    <!-- 背景 -->
    <div class="like-bg"></div>
    <!-- 内容 -->
    <div class="like-box">
      <div class="product-box clearfix">
        <div
          class="product-item fl"
          :class="[index % 2 == 0 ? 'p-left' : 'p-right']"
          v-for="(item, index) in likeProducts"
          :key="index"
        >
          <div class="p-img">
            <img
              @click="getProductId(item.pid)"
              class="auto-img"
              :src="item.smallImg"
              alt=""
            />
          </div>
          <div class="pro-name one-text">{{ item.name }}</div>
          <div class="clearfix">
            <!-- <div class="en-pro-name one-text fl">{{ item.enname }}</div> -->
            <div class="pro-price fl">￥{{ item.price }}</div>
            <div class="pro-del fr" @click="notLike(item.pid, index)">
              <van-icon name="delete" />
            </div>
          </div>
        </div>
      </div>

      <!-- 空 -->
      <van-empty
        description="收藏栏是空的desu"
        v-show="likeProducts.length < 1"
      >
        <van-button type="default" color="#0c43ba" to="Menu"
          >去逛逛把</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      likeProducts: [],
    };
  },
  created() {
    this.getLikeProducts();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取所有收藏商品数据
    getLikeProducts() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        methods: "get",
        url: "/findAllLike",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 2000) {
            let likeProducts = result.data.result;
            this.likeProducts = likeProducts;
          }
          console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 转到详情页面
    getProductId(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
    // 取消收藏
    notLike(pid, index) {
      // index 下标
      // pid 商品id
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        pid,
        tokenString,
      });

      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/notlike",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == 700) {
            return this.$router.push({ name: "Login" });
          }
          if (result.data.code == 900) {
            this.likeProducts.splice(index, 1);
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.like {
  padding-top: 46px;
  // 改导航的颜色
  /deep/ .van-nav-bar__text {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #0c34ba;
  }
  .like-bg {
    height: 100px;
    background-color: #0c34ba;
  }
  .like-box {
    margin: -30px 10px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    // height: 500px;
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
      .pro-del {
        font-size: 16px;
      }
    }
  }
}
</style>
