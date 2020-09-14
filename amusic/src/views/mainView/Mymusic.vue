<template>
  <div class="mymusic">
    <!-- 搜索栏 -->
    <div class="search-box goFlex">
      <div class="search-item">
        <van-search placeholder="请输入搜索关键词" />
      </div>
      <div class="little-play-box" @click="clickLittlePlay">
        <div class="little-play goFlex" :class="iconState.play ? 'active' : ''">
          <div
            class="little-play-img"
            :style="
              songListData[songIndex]
                ? 'background-image:url(' + songListData[songIndex].imgUrl + ')'
                : ''
            "
            v-if="songListData[songIndex]"
          ></div>
          <van-icon name="music-o" v-else />
        </div>
      </div>
    </div>
    <!-- 我的音乐 -->
    <div class="my-music-box clearfix">
      <div class="my-title">我的音乐</div>
      <div class="my-music-content">
        <!-- 1ge -->
        <div
          class="clearfix my-music-item"
          v-for="(item, index) in myMusicData"
          :key="index"
        >
          <div class="fl my-music-icon">
            <van-icon :name="item.imgUrl" />
          </div>
          <div class="fl my-music-title">{{ item.title }}</div>
          <div class="clearfix fr">
            <div class="fl my-music-count">{{ item.count }}</div>
            <div class="fl my-music-right">></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 我的歌单 -->
    <div class="my-playlist-box">
      <!-- 标题 -->
      <div class="my-playlist-title-box clearfix">
        <div
          class="tol fl"
          :class="isPlayList ? 'my-title' : 'my-title-2'"
          @click="togglePlayList(0)"
        >
          我的歌单 数字
        </div>
        <div
          class="fl tor"
          :class="!isPlayList ? 'my-title' : 'my-title-2'"
          @click="togglePlayList(1)"
        >
          收藏歌单 数字
        </div>
        <div class="fr">
          icon
        </div>
      </div>
      <!-- 内容 => 我的歌单 -->
      <div class="my-playlist-item-box" v-if="isPlayList">
        <div
          class="clearfix my-playlist-item"
          v-for="(item, index) in myListsData"
          :key="index"
          @click="clickPlayList(item.id)"
        >
          <!-- 图 -->
          <div class="fl my-playlist-item-img" style="font-size:0">
            <img :src="item.coverImgUrl" class="auto-img" alt="" />
          </div>
          <!-- 内容 -->
          <div class="fl my-playlist-item-desc">
            <div class="my-playlist-item-desc-title">{{ item.name }}</div>
            <div class="my-playlist-item-desc-count">
              {{ item.trackCount }} 首
            </div>
          </div>
        </div>
      </div>
      <!-- 内容 => 收藏的歌单 -->
      <div class="my-playlist-item-box" v-else>
        <div
          class="clearfix my-playlist-item"
          v-for="(item, index) in orderListsData"
          :key="index"
          @click="clickPlayList(item.id)"
        >
          <!-- 图 -->
          <div class="fl my-playlist-item-img" style="font-size:0">
            <img :src="item.coverImgUrl" class="auto-img" alt="" />
          </div>
          <!-- 内容 -->
          <div class="fl my-playlist-item-desc">
            <div class="my-playlist-item-desc-title">{{ item.name }}</div>
            <div class="my-playlist-item-desc-count">
              {{ item.trackCount }} 首
            </div>
          </div>
        </div>
      </div>
      <!-- 内容结束 -->
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      myMusicData: [
        {
          title: "本地音乐",
          imgUrl: "sign",
          pageUrl: "",
          count: 0,
        },
        {
          title: "最近播放",
          imgUrl: "underway-o",
          pageUrl: "",
          count: 0,
        },
        {
          title: "我的电台",
          imgUrl: "play-circle-o",
          pageUrl: "",
          count: 0,
        },
        {
          title: "我的收藏",
          imgUrl: "goods-collect-o",
          pageUrl: "",
          count: 0,
        },
      ],
      // 如果为真 => 我的歌单
      // 如果为假 => 我的收藏
      isPlayList: true,

      // 歌单信息
      // 我的歌单
      myListsData: [],
      // 收藏的歌单
      orderListsData: [],
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
    // 切换 我的歌单/收藏歌单
    togglePlayList(v) {
      if (v == 0) {
        this.isPlayList = true;
      } else {
        this.isPlayList = false;
      }
    },
    // 根据 我的歌单/收藏歌单 获取歌单
    getPlayList() {
      this.$toast.loading({
        type: "loading",
        message: "请稍等..",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      let uid = utils.getCookie("uid");
      this.axios({
        methods: "get",
        url: "/user/playlist",
        params: {
          uid,
        },
      })
        .then((result) => {
          this.$toast.clear();
          result.data.playlist[0].ordered = false;
          result.data.playlist.map((item, index) => {
            if (item.ordered) {
              this.orderListsData.push(item);
            } else {
              this.myListsData.push(item);
            }
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 获取 我的歌单/收藏 的数量
    getPlayListCount() {
      this.$toast.loading({
        type: "loading",
        message: "请稍等..",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      let cookieData = utils.getCookie("wyyc");
      this.axios({
        methods: "get",
        url: "/user/subcount",
        params: {
          cookie: cookieData,
        },
      })
        .then((result) => {
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    this.getPlayList();
  },
  computed: {
    ...mapState(["songIndex", "iconState", "songListData"]),
  },
};
</script>

<style lang="less" scoped>
.mymusic {
  padding-bottom: 50px;
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
          background-size: cover;
        }
      }
    }
  }
  .my-music-box {
    padding: 20px 20px 0 20px;
    // background-color: aqua;
    .my-title {
      font-size: 18px;
      font-weight: bold;
      color: black;
      text-align: left;
      padding: 5px 0;
      border-bottom: 1px solid #e8e8e8;
    }
    .my-music-content {
      padding: 20px 0px 0 0;
      .my-music-item {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: black;
        // background-color: yellow;
        .my-music-icon {
          margin-right: 15px;
          height: 100%;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        // .my-music-title {
        // }
        .my-music-count {
          color: #bfbfbf;
          padding: 0 5px;
        }
        .my-music-right {
          color: #bfbfbf;
          font-size: 18px;
        }
      }
    }
  }
  // 我的歌单/收藏
  .my-playlist-box {
    padding: 20px 20px 0 20px;
    // 标题
    .my-playlist-title-box {
      height: 35px;
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 10px;
      line-height: 35px;
      .tol {
        padding-right: 10px;
      }
      .tor {
        padding-left: 10px;
        border-left: 1px solid #bfbfbf;
      }
      .my-title {
        font-size: 18px;
        font-weight: bold;
        color: black;
        text-align: left;
        transition: all linear 0.3s;
      }
      .my-title-2 {
        font-size: 16px;
        color: #bfbfbf;
        text-align: left;
        transition: all linear 0.5s;
      }
    }
    // 下面歌单的样式
    .my-playlist-item-box {
      padding: 5px 0;
      .my-playlist-item {
        margin: 10px 0;
      }
      .my-playlist-item-img {
        width: 50px;
        height: 50px;
        background-color: aqua;
        margin-right: 10px;
        border-radius: 15px;
        overflow: hidden;
      }
      .my-playlist-item-desc {
        text-align: left;
        width: calc(100% - 60px);
        .my-playlist-item-desc-title {
          color: black;
          font-size: 16px;
          line-height: 20px;
          // 隐藏
          // 两行溢出隐藏
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .my-playlist-item-desc-count {
          color: #bfbfbf;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
