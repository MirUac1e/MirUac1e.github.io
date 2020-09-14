<template>
  <!-- 我的 页面 -->
  <div class="my">
    <!-- 头部 -->
    <div class="my-top" v-if="isLogin">
      <!-- 头部标题 -->
      <div class="clearfix my-title-box">
        <div class="fl my-title">个人中心</div>
        <div class="fr my-icon">
          <div
            @click="clickLittlePlay"
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
      <!-- 头像 昵称 vip等级 | 粉丝 动态 关注的人 => 数据 -->
      <div class="clearfix">
        <!-- 左边的 -->
        <div class="my-info-box fl clearfix">
          <div class="my-info-img fl">
            <img :src="userInfo.avatarUrl" class="auto-img" alt="" />
          </div>
          <div class="my-info-detail-box fl">
            <div class="my-info-nickname">{{ userInfo.nickname }}</div>
            <div class="my-info-vip">lv.{{ userInfo.vipType }}</div>
          </div>
        </div>
        <!-- 右边的 -->
        <div class="my-focus-box fr clearfix">
          <div class="my-focus fl">
            <div class="my-focus-num">{{ userInfo.gender }}</div>
            <div class="my-focus-title">动态</div>
          </div>
          <div class="my-focus fl">
            <div class="my-focus-num">{{ userInfo.follows }}</div>
            <div class="my-focus-title">关注</div>
          </div>
          <div class="my-focus fl">
            <div class="my-focus-num">{{ userInfo.followeds }}</div>
            <div class="my-focus-title">粉丝</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部2 -->
    <div class="my-top" v-else style="height:100%">
      <van-button type="primary" to="Login">请去登录</van-button>
    </div>
    <!-- 内容部分 -->
    <div class="my-content-box">
      <!-- 推荐 -->
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
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLogin: false,
      //
      recList: [
        {
          title: "我的消息",
          imgUrl: "chat-o",
          methods: "",
        },
        {
          title: "最近播放",
          imgUrl: "underway-o",
          methods: "",
        },
        {
          title: "全部收藏",
          imgUrl: "goods-collect-o",
          methods: "",
        },
        {
          title: "我的设置",
          imgUrl: "ellipsis",
          methods: "",
        },
      ],
    };
  },
  computed: mapState(["userInfo", "songListData", "songIndex", "iconState"]),
  created() {
    this.checkIsLogin();
  },
  methods: {
    clickLittlePlay() {
      if (this.songListData[this.songIndex]) {
        this.$store.commit("onlyOpenPlayPage");
      } else {
        return;
      }
    },
    // 查看是否登录
    checkIsLogin() {
      if (!utils.getCookie("wyyc")) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        this.getUserInfoByUid();
      }
    },
    // 根据UID 获取用户信息
    getUserInfoByUid() {
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
        url: "/user/detail",
        params: {
          uid: 80747428,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.$store.commit("setUserInfo", result.data.profile);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.my {
  height: 100%;
  background-color: #e4393c;
  color: #fff;
  padding-bottom: 50px;
  .my-top {
    padding: 20px;
  }
  .my-title-box {
    padding-bottom: 20px;
    .my-title {
      font-size: 24px;
    }
    .my-icon {
      width: 25px;
      height: 25px;
      /deep/ .van-icon-music-o::before {
        font-size: 25px;
      }
      .little-play {
        width: 30px;
        height: 30px;
        font-size: 30px;
        border-radius: 50%;
        overflow: hidden;
        animation: zhuanquanquan linear 3s infinite;
        animation-play-state: paused;
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
          background-color: #fff;
          background-size: cover;
        }
      }
    }
  }
  .my-info-box {
    height: 50px;
    .my-info-img {
      width: 50px;
      height: 50px;
      background: aqua;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .my-info-detail-box {
      height: 50px;
      letter-spacing: 2px;
      .my-info-nickname {
        height: 30px;
        font-size: 16px;
        line-height: 30px;
      }
      .my-info-vip {
        height: 15px;
        font-size: 10px;
        width: 30px;
        background-color: black;
        padding: 0 10px;
        margin-bottom: 5px;
        border-radius: 15px;
        text-align: center;
        line-height: 15px;
        color: #e4393c;
      }
    }
  }
  .my-focus-box {
    .my-focus {
      padding: 0 10px;
      .my-focus-num {
        font-size: 16px;
      }
      .my-focus-title {
        font-size: 12px;
      }
    }
  }
  // 头部结束
  .my-content-box {
    background-color: #fff;
    // height: 500px;
    border-top-left-radius: 40px;
    // 推荐
    .rec-box {
      padding: 10px 20px;
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
  }
}
</style>
