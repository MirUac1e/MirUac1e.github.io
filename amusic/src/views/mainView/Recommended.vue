<template>
  <!-- 推荐页面 -->
  <div class="recommended">
    <!-- 头部 -->
    <div>
      <!-- 搜索栏 -->
      <div class="search-box goFlex">
        <div class="search-item">
          <van-search placeholder="请输入搜索关键词" />
        </div>
        <div class="little-play-box" @click="clickLittlePlay">
          <div
            class="little-play goFlex"
            :class="iconState.play ? 'active' : ''"
          >
            <div
              class="little-play-img"
              :style="
                songListData[songIndex]
                  ? 'background-image:url(' +
                    songListData[songIndex].imgUrl +
                    ')'
                  : ''
              "
              v-if="songListData[songIndex]"
            ></div>
            <van-icon name="music-o" v-else />
          </div>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="swipe-box">
        <van-swipe class="my-swipe" :autoplay="0">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <img :src="item.imageUrl" class="auto-img" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 推荐类型 -->
      <div class="rec-box clearfix">
        <div class="rec-item fl" v-for="(item, index) in recList" :key="index">
          <div class="rec-item-icon">
            <div class="rec-item-icon-content">
              <van-icon :name="item.imgUrl" color="#fff" />
            </div>
          </div>
          <div class="rec-item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <!-- 大推荐 -->
    <div class="personalized">
      <!-- 头部 -->
      <div class="personalized-title-box clearfix">
        <div class="personalized-title fl">
          推荐歌单
        </div>
      </div>
      <!-- 内容 -->
      <div class="personalized-content clearfix">
        <div
          class="personalized-content-item"
          v-for="(item, index) in personalizedData"
          :key="index"
          :class="[
            index % 2 == 0 ? 'tol' : 'tor',
            index % 2 == 0 ? 'fl' : 'fr',
          ]"
          @click="clickPlayList(item.id)"
        >
          <!-- 图 -->
          <div class="img-box">
            <!-- 播放量 -->
            <img :src="item.picUrl" alt="" class="auto-img" />
            <div class="img-box-count">
              <van-icon name="service-o" />
              <div>{{ item.playCount }}</div>
            </div>
          </div>
          <!-- 文字 -->
          <div class="desc-box">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 播放控件 -->
    <div></div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // banner的数据
      bannerData: [],
      // 登录凭证
      cookieData: "",
      // 根据类型的推荐列表
      recList: [
        {
          title: "每日推荐",
          imgUrl: "shop-o",
          methods: "",
        },
        {
          title: "歌单",
          imgUrl: "coupon-o",
          methods: "",
        },
        {
          title: "排行榜",
          imgUrl: "chart-trending-o",
          methods: "",
        },
        {
          title: "直播",
          imgUrl: "tv-o",
          methods: "",
        },
      ],
      // 默认的推荐列表
      personalizedData: [],
    };
  },
  methods: {
    clickLittlePlay() {
      if (this.songListData[this.songIndex]) {
        this.$store.commit("onlyOpenPlayPage");
      } else {
        return;
      }
    },
    // 点击 歌单事件 带着id 跳转到歌单详情页面
    clickPlayList(v) {
      this.$router.push({ path: "/songlistdetail", query: { id: v } });
    },
    test() {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "发送中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      this.axios({
        methods: "get",
        url: "/personalized",
        params: {
          // cookie: this.cookieData,
          limit: 10,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log(result);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 获取banner数据
    getBanner() {
      // 发起请求
      this.axios({
        methods: "get",
        url: "/banner",
      })
        .then((result) => {
          this.$toast.clear();
          this.bannerData = result.data.banners;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 获取登录的cookie
    getCookie() {
      this.cookieData = utils.getCookie("wyyc");
      this.test();
    },
    // 获取 默认 推荐歌单
    getPersonalizedData() {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "发送中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      this.axios({
        methods: "get",
        url: "/personalized",
        params: {
          limit: 6,
        },
      })
        .then((result) => {
          this.$toast.clear();
          result.data.result.map((item) => {
            item.playCount = Math.floor(item.playCount / 10000) + "万";
          });
          this.personalizedData = result.data.result;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    // 获取banner
    this.getBanner();
    // 获取登录后的登录凭证 cookie
    this.getCookie();
    // 获取 默认 推荐歌单
    this.getPersonalizedData();
  },
  computed: {
    ...mapState(["songIndex", "iconState", "songListData"]),
  },
};
</script>

<style lang="less" scoped>
.recommended {
  padding-bottom: 50px;
  // background: #e4393c;
  // 搜索栏
  .search-box {
    .search-item {
      width: calc(100% - 50px);
    }

    .little-play-box {
      width: 50px;
      .little-play {
        width: 30px;
        height: 30px;
        font-size: 30px;
        border-radius: 50%;
        overflow: hidden;
        animation: zhuanquanquan linear 3s infinite;
        animation-play-state: paused;
        /deep/ .van-icon {
          color: #e4393c;
        }
        &.active {
          animation-play-state: running;
        }
        @keyframes zhuanquanquan {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .little-play-img {
          width: 100%;
          height: 100%;
          background-color: #e4393c;
          background-size: cover;
        }
      }
    }
  }
  // 轮播图
  .swipe-box {
    padding: 20px;
    font-size: 0;
    .my-swipe .van-swipe-item {
      text-align: center;
      border-radius: 15px;
      overflow: hidden;
    }
  }
  // 推荐
  .rec-box {
    padding: 0 20px;
    border-bottom: 1px solid black;
    .rec-item {
      font-size: 15px;
      padding: 10px;
      width: calc(25% - 20px);
      .rec-item-icon {
        width: 100%;
        height: 40px;
        position: relative;
        font-size: 25px;
        .rec-item-icon-content {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: #e4393c;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .rec-item-title {
        padding-top: 5px;
        color: #d2d2d2;
      }
    }
  }
  // 大推荐
  .personalized {
    // background: aqua;
    padding: 20px 20px 0 20px;
    .personalized-title-box {
      padding-bottom: 10px;
      .personalized-title {
        font-size: 18px;
        font-weight: bold;
        color: black;
      }
    }
    .personalized-content {
      .tol {
        margin-right: 10px;
      }
      .tor {
        margin-left: 10px;
      }
      .personalized-content-item {
        width: calc(50% - 10px);
        height: 210px;
        // padding: 2px 0;
        .img-box {
          position: relative;
          font-size: 0;
          .img-box-count {
            color: white;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px 0px 2px 20px;
            background-image: linear-gradient(
              to right,
              rgba(151, 151, 151, 0),
              rgba(151, 151, 151, 0.233)
            );
            font-size: 16px;
            right: 0;
            top: 0;
          }
        }
        .desc-box {
          height: 40px;
          color: black;
          font-size: 14px;
          text-align: left;
          // 两行溢出隐藏
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
