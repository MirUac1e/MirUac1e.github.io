<template>
  <!-- 按ABC排列歌手 曲目 没做 -->
  <!--  -->
  <div class="song-detail">
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + playListData.coverImgUrl + ')' }"
    ></div>
    <!-- 标题的bg -->
    <div class="nav-bg" style="overflow:hidden">
      <div
        class="bg-2"
        :style="{ backgroundImage: 'url(' + playListData.coverImgUrl + ')' }"
      ></div>
    </div>
    <!-- 导航栏 -->
    <div>
      <!-- 标题 -->
      <van-nav-bar
        :title="playListData.name"
        :fixed="true"
        left-arrow
        @click-left="back"
        @click-right="clickLittlePlay"
      >
        <template #right>
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
        </template>
      </van-nav-bar>
    </div>
    <!-- 搜索栏 -->
    <div>
      <van-search
        placeholder="请输入搜索关键词"
        background="rgba(120, 120, 120, 0.5)"
        color="#fff"
        shape="round"
      />
    </div>
    <!-- 介绍 -->
    <div class="clearfix introduce-box">
      <!-- 左边 -->
      <div class="fl introduce-img">
        <img :src="playListData.coverImgUrl" class="auto-img" alt="" />
        <div class="play-count">
          <div><van-icon name="play" color="white" /></div>
          <div>{{ playListData.playCount }}</div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="fl detail-box">
        <div class="introduce-name">{{ playListData.name }}</div>
        <div class=" user-info">
          <div class=" user-img">
            <img :src="playListData.creator.avatarUrl" class="auto-img" />
          </div>
          <div class="user-nickname">{{ playListData.creator.nickname }} ></div>
        </div>
        <div class="introduce-edit">编辑简介 ></div>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="function-box clearfix">
      <div
        class="function-item fl"
        v-for="(item, index) in functionList"
        :key="index"
      >
        <van-icon :name="item.icon" />
        <div class="function-name">{{ item.title }}</div>
      </div>
    </div>
    <!-- 内容 歌曲 -->
    <div class="content">
      <!-- <van-index-bar :index-list="indexList">
        <div v-for="(item, index) in indexList" :key="index">
          <van-index-anchor :index="item" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </div>
      </van-index-bar> -->
      <!-- 播放全部 -->
      <div class="play-all">
        <van-icon name="play-circle-o" />
        <div>播放全部</div>
        <div class="play-all-count">共({{ songListDataSm.length }})首</div>
      </div>
      <!-- 歌曲列表 -->
      <div
        class="clearfix songlist-item"
        v-for="(item, index) in songListDataSm"
        :key="index"
      >
        <div
          class="fl songlist-count"
          :style="index >= 99 ? 'font-size:16px' : ''"
        >
          <van-icon
            name="play-circle-o"
            color="#e4393c"
            v-if="index == songIndex && item.id == songId"
          />
          {{ index != songIndex || item.id != songId ? index + 1 : "" }}
        </div>
        <!-- 歌曲信息 -->
        <div
          class="fl songlist-item-detail"
          style="height:40px"
          @click="
            togglePlayPage({
              v: true,
              songListData: songListDataSm,
              id: item.id,
              songUrlData,
              index,
            })
          "
        >
          <div class="song-name">
            {{ item.name }}{{ item.isAlia ? "(" + item.alia[0] + ")" : "" }}
          </div>
          <div class="song-singer">{{ item.art }} - {{ item.al.name }}</div>
        </div>
        <!-- 图标 -->
        <div class="fr icon-box">
          <div class="tv-icon">
            <van-icon name="video-o" v-if="item.mv != 0" />
          </div>
          <div class="function-icon">
            <van-icon name="bars" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pinyin from "../../node_modules/js-pinyin/index";
import { utils } from "../assets/js/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      lyricData: {
        v: 0,
      },
      songUrlData: [],
      songListDataSm: [],
      playListData: {
        creator: {},
      },
      functionList: [
        {
          title: "评论",
          icon: "chat-o",
          pageUrl: "",
        },
        {
          title: "分享",
          icon: "smile-o",
          pageUrl: "",
        },
        {
          title: "下载",
          icon: "down",
          pageUrl: "",
        },
        {
          title: "多选",
          icon: "certificate",
          pageUrl: "",
        },
      ],
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "*",
      ],
    };
  },
  computed: {
    ...mapState(["songIndex", "songId", "iconState", "songListData"]),
  },
  methods: {
    clickLittlePlay() {
      if (this.songListData[this.songIndex]) {
        this.$store.commit("onlyOpenPlayPage");
      }else{
        return;
      }
    },
    back() {
      this.$router.go(-1);
    },
    // 开启playpage
    togglePlayPage(v) {
      this.$store.commit("togglePlayPage", v);
    },
    // 拿全部 trackIds 请求一次 /song/url 接口获取所有歌曲的url
    getAllSongUrl(item) {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "请稍等",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      this.axios({
        methods: "get",
        url: "/song/url",
        params: {
          id: item,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log("所有歌曲的url => ", result);
          // 整理数据 把顺序做成和listdata 一样
          let trueData = [];
          this.songListDataSm.map((item) => {
            result.data.data.map((v) => {
              if (v.id == item.id) {
                trueData.push(v);
                return;
              }
            });
          });
          this.songUrlData = trueData;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
    getAllSongData(item) {
      item = item.join(",");
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "请稍等",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      this.axios({
        methods: "get",
        url: "/song/detail",
        params: {
          ids: item,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log('获取当前歌单所有歌曲的详情 => ',result);
          // 整理数据
          // name 歌的名字  + alila
          // aliia 0 可以加（）放在歌名字后面
          // ar  表示 歌手数量 - al 。name
          result.data.songs.map((item) => {
            // 判断要不要在歌名后面加括号
            if (item.alia.length == 0) {
              item.isAlia = false;
            } else {
              item.isAlia = true;
            }
            // 整理 多位歌手
            item.art = "";
            item.artsss = [];
            if (item.ar.length > 1) {
              item.ar.map((i) => {
                item.art += i.name + "/";
                item.artsss.push(i);
              });
            } else {
              item.artsss.push(item.ar[0]);
              item.art = item.ar[0].name;
            }
            item.art = item.art.slice(0, -1);
            //
            item.imgUrl = item.al.picUrl;
          });
          this.songListDataSm = result.data.songs;
          // 获取所有数据的url
          this.getAllSongUrl(item);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌单id 获取歌单详情数据
    getListDataById(v) {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "请稍等",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      this.axios({
        methods: "get",
        url: "/playlist/detail",
        params: {
          id: v,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.playListData = result.data.playlist;
          // 保存所有的歌曲id
          let arr = [];
          result.data.playlist.trackIds.map((item) => {
            arr.push(item.id);
          });
          // 根据歌曲id获取歌曲信息
          this.getAllSongData(arr);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    // 这个id 是歌单id
    this.getListDataById(this.$route.query.id);
    // console.log(pinyin.getFullChars("管理员"));
  },
};
</script>

<style lang="less" scoped>
.song-detail {
  overflow-y: scroll;
  height: calc(100% - 20px);
  padding-top: 46px;
  // background-color: aqua;
  color: white;
  z-index: 1;
  // 大背景图 模糊
  .bg {
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 0;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(5px);
    }
  }
  // 搜索 透明背景 1boder
  .van-search__content {
    background-color: rgba(120, 120, 120, 0);
    border: 1px solid #fff;
  }
  // 搜索的图标 字体颜色
  /deep/ .van-icon-search::before,
  .van-field__control {
    color: #fff;
  }
  // 标题
  /deep/ .van-nav-bar {
    background-color: rgba(120, 120, 120, 0.5);
    z-index: 5;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  // 在标题栏 上 小播放器
  /deep/ .van-nav-bar__right {
    // 给这一个宽度 不然出不来
    width: 30px;
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
  // 标题的背景图 模糊
  .nav-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 45.9px;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bg-2 {
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    height: 55px;
    overflow: hidden;
    // position: fixed;
    // left: 0;
    // top: 0;
    z-index: 4;
    filter: blur(5px);
  }
  /deep/ .van-hairline--bottom::after {
    border: none;
  }
  // 搜索
  /deep/ .van-search {
    background-color: rgba(120, 120, 120, 0.5);
  }
  // 介绍样式
  .introduce-box {
    background-color: rgba(120, 120, 120, 0.5);
    padding: 20px;
    .introduce-img {
      width: 120px;
      height: 120px;
      background-color: aqua;
      position: relative;
      margin-right: 20px;
      .play-count {
        position: absolute;
        right: 5px;
        top: 5px;
        display: flex;
        font-size: 14px;
        align-items: center;
      }
    }
    .detail-box {
      width: calc(100% - 140px);
      text-align: left;
    }
    .introduce-name {
      font-size: 18px;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .user-info {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 20px;
      .user-img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        background-color: aqua;
        margin-right: 10px;
      }
      .user-nickname {
        font-size: 16px;
      }
    }

    .introduce-edit {
      font-size: 14px;
      text-align: left;
      color: #d2d2d2;
    }
  }
  // 工具栏样式
  .function-box {
    background-color: rgba(120, 120, 120, 0.5);
    padding: 0 20px 40px 20px;
    /deep/ .van-icon {
      font-size: 25px;
    }
    .function-item {
      width: 25%;
      .function-name {
        font-size: 12px;
      }
    }
  }
  // 歌曲详情样式
  .content {
    color: white;
    background-color: #151515;
    position: relative;
    top: -20px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    left: 0;
    // 播放全部
    .play-all {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 16px;
      border-bottom: 1px solid red;
      /deep/ .van-icon {
        font-size: 25px;
        margin-right: 10px;
      }
      .play-all-count {
        font-size: 14px;
        color: #d2d2d2;
      }
    }
    // 歌曲列表
    .songlist-item {
      padding: 10px;
      height: 40px;
      // background-color: aqua;
      text-align: left;
      .songlist-count {
        width: 25px;
        height: 40px;
        margin-right: 10px;
        font-size: 24px;
        line-height: 40px;
        text-align: center;
        color: #b4b4b4;
      }
      .songlist-item-detail {
        width: calc(100% - 115px);
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .song-name {
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .song-singer {
        color: #b4b4b4;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .icon-box {
        color: #b4b4b4;
        display: flex;
        align-items: center;
        justify-items: center;
      }
      .tv-icon,
      .function-icon {
        height: 40px;
        width: 30px;
        font-size: 25px;
        line-height: 40px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-items: center;
      }
      .tv-icon {
        margin-right: 20px;
      }
    }
  }
}
</style>
