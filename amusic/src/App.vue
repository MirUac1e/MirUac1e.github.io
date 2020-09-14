<template>
  <!-- 头部样式 -->
  <!-- 歌词另外一个属性 有中文 => 可能  可以加-->
  <!-- 切歌 切到没有版权的 就不能autoplay 应该切不到这些歌 -->
  <!-- 这样的话 随机播放的算法也要改 -->
  <!-- 自动滚 就所有角度都一样 -->
  <!-- 拖动音量和进度条 哈没做 -->

  <!-- autoplay 一开始的 paused = true -->
  <div id="app">
    <router-view />
    <!-- 小列表 -->
    <div class="little-play-list" v-if="isLittlePlayList">
      <div class="not-content" @click="toggleLittlePlayList"></div>
      <div class="content">
        <div class="title">当前播放</div>
        <div class="order goFlex" @click="toggleOrder">
          <div style="margin-right:10px">
            <!-- 循环 -->
            <i class="iconfont" v-if="iconState.order[0].v">&#xe61e;</i>
            <!-- 随机 -->
            <i class="iconfont" v-else-if="iconState.order[1].v">&#xe637;</i>
            <!-- 单曲 -->
            <i class="iconfont" v-else-if="iconState.order[2].v">&#xe607;</i>
          </div>
          <div>
            {{ iconState.order[iconState.index].name }}
          </div>
        </div>
        <div class="song-item-box">
          <div
            class="song-item goFlex"
            v-for="(item, index) in songListData"
            :key="index"
            @click="littlePlayListChangeSong(index)"
            :style="index == songIndex ? 'color:#e4393c' : ''"
          >
            <div class="song-item-name">
              {{ item.name }}{{ item.isAlia ? "(" + item.alia[0] + ")" : "" }}
            </div>
            <div class="song-item-singer goFlex">
              <div
                :style="index == songIndex ? 'color:#e4393c' : ''"
                v-for="(v, i) in songUrlData ? songListData[index].artsss : ''"
                :key="i"
              >
                {{ v.name
                }}{{ i != songListData[index].artsss.length - 1 ? "/" : "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 大播放 -->
    <div class="play-page">
      <van-popup
        v-model="showPlayPage.a"
        :overlay="false"
        :close-on-click-overlay="false"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 背景 -->
        <div
          class="bg"
          :style="
            songListData.length != 0
              ? 'background-image:url(' + songListData[songIndex].imgUrl + ')'
              : ''
          "
        ></div>
        <!-- 导航 -->
        <van-nav-bar left-arrow @click-left="togglePlayPage({ v: false })">
          <template #title>
            <div>
              <div>
                {{ songUrlData ? songListData[songIndex].name : "" }}
              </div>
              <div class="goFlex" style="font-size:12px">
                <!-- songurlData存在 => 歌手名称 可能多位 => 不是最后一个就加个 / -->
                <div
                  v-for="(item, index) in songUrlData
                    ? songListData[songIndex].artsss
                    : ''"
                  :key="index"
                  @click="goSingerDetail(item.id)"
                >
                  {{ item.name
                  }}{{
                    index != songListData[songIndex].artsss.length - 1
                      ? "/"
                      : ""
                  }}
                </div>
                <van-icon name="arrow" />
              </div>
            </div>
          </template>
        </van-nav-bar>

        <!-- 内容 -->
        <div class="content">
          <!-- 封面 二选一 -->
          <div class="the-cover" @click="toggleCover" v-if="isCover">
            <!-- 封面的盒子 -->
            <div class="cover-box">
              <!-- 封面的图 -->
              <!-- songListData[songIndex].al.picUrl -->
              <div
                class="cover-item"
                :style="
                  songListData.length != 0
                    ? 'background-image:url(' +
                      songListData[songIndex].imgUrl +
                      ')'
                    : ''
                "
                :class="iconState.play ? 'active' : ''"
              ></div>
            </div>
            <!-- 功能栏 -->
            <div class="function-box">
              <!-- 具体的功能 -->
              <div
                class="function-item"
                v-for="(item, index) in functionItem"
                :key="index"
              >
                <van-icon :name="item.icon" />
              </div>
            </div>
          </div>
          <!-- 歌词 二选一 -->
          <div class="the-lyrics" v-else>
            <!-- 音量 -->
            <div class="volume-box">
              <div class="volume-icon">
                <van-icon name="volume-o" />
              </div>
              <div class="volume-item">
                <!-- 已经激活 -->
                <div
                  @click="clickVolumen"
                  class="volume-item-active"
                  :style="'width:' + volume + '%'"
                ></div>
                <!-- 没有激活 -->
                <div @click="clickVolumen" class="volume-item-no-active"></div>
                <!-- 点 -->
                <div class="volume-point" :style="'left:' + volume + '%'"></div>
              </div>
            </div>
            <!-- 歌词 -->
            <div @click="toggleCover" class="lyrics-box">
              <div style="font-size:24px">
                {{ lyric.length == 1 ? lyric[0] : "" }}
              </div>
              <div
                class="lyrics-item-box"
                v-if="lyric.length > 1"
                :style="'top:calc(50% + ' + goTop + ')'"
              >
                <div
                  class="lyrics-item"
                  v-for="(item, index) in lyric"
                  :key="index"
                  :class="index == lyricIndex ? 'active' : ''"
                >
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制栏 -->
        <div>
          <!-- 进度条 -->
          <div class="progress-bar-box">
            <!-- 已播放时间 -->
            <div class="time-box">{{ playTime.min }}</div>
            <!-- 进度条 -->
            <div class="progress-bar">
              <!-- 已播放 -->
              <div
                class="progress-bar-after"
                :style="'width:' + percent + '%'"
                @click="clickProgressBar"
              ></div>
              <!-- 未播放 -->
              <div class="progress-bar-pre" @click="clickProgressBar"></div>
              <!-- 点 -->
              <div
                class="progress-bar-point"
                :style="'left:' + percent + '%'"
                @touchstart="moveProgressBar"
                @touchmove="test"
                @touchend="test2"
              ></div>
            </div>
            <!-- 总时间 -->
            <div class="time-box">{{ allTime.min }}</div>
          </div>
          <!-- 开关 -->
          <div class="switchs">
            <!-- 顺序 -->
            <div class="switch-item" @click="toggleOrder">
              <!-- 循环 -->
              <i class="iconfont" v-if="iconState.order[0].v">&#xe61e;</i>
              <!-- 随机 -->
              <i class="iconfont" v-else-if="iconState.order[1].v">&#xe637;</i>
              <!-- 单曲 -->
              <i class="iconfont" v-else-if="iconState.order[2].v">&#xe607;</i>
            </div>
            <!-- 上一首 -->
            <div class="switch-item" @click="preSong">
              <i class="iconfont">&#xe78a;</i>
            </div>
            <!-- 暂停/播放 -->
            <div class="switch-item" @click="togglePlay">
              <!-- 暂停 -->
              <i class="iconfont" v-if="iconState.play">&#xe608;</i>
              <!-- 播放 -->
              <i class="iconfont" v-else>&#xe62a;</i>
            </div>
            <!-- 下一首 -->
            <div class="switch-item" @click="nextSong">
              <i class="iconfont">&#xe7a5;</i>
            </div>
            <!-- 播放列表 -->
            <div class="switch-item" @click="toggleLittlePlayList">
              <i class="iconfont">&#xe609;</i>
              <audio
                style="display:none"
                ref="ado"
                id="ado"
                :autoplay="
                  songUrlData.length != 0
                    ? songUrlData[songIndex].url != null
                      ? true
                      : false
                    : ''
                "
                controls
                :src="
                  songUrlData.length != 0
                    ? songUrlData[songIndex].url != null
                      ? songUrlData[songIndex].url
                      : '0'
                    : '0'
                "
                @ended="audioEnd"
                @canplay="startPlaying"
                @timeupdate="magicPoint && timeupdate()"
              ></audio>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
// http://localhost:3000/song/url?id=29009655 获取音轨
// /check/music?id=33894312 是否可用
// http://localhost:3000/song/detail?ids=29009655 获取音乐信息
import { mapState } from "vuex";
import { utils } from "./assets/js/utils";
export default {
  data() {
    return {
      // 小playlist
      isLittlePlayList: false,
      // 记录歌词是第几个
      lyricIndex: 0,
      // 每次歌词上升多少
      goTop: 0,
      // 音量 进度 相差的位置
      betweenPos: 0,
      // 音量 进度 刚开始的位置
      beginPos: 0,
      // 播放了的长度
      percent: 0,
      // 显示封面/歌词
      isCover: true,
      // 根据url是不是一样 启动播放按钮
      // 如果不设置这个 在暂停一首歌后 play 为 false 点到别的歌 要更新状态
      // 不能用preState 因为从点击下一首能播放的歌曲 和 切换播放/暂停 的状态是一样的
      preUrl: "not a music",
      // 因为autoplay他paused还是true 所以经过不能听的歌的时候
      // 用一个变量保存这个状态 如果前面是这个 就把this.iconstate.play改变
      preState: false,
      // 当前播放歌曲的数据
      songData: {},
      // 播放页面 => 封面 => 工具
      functionItem: [
        {
          icon: "like-o",
        },
        {
          icon: "down",
        },
        {
          icon: "music-o",
        },
        {
          icon: "more-o",
        },
        {
          icon: "bars",
        },
      ],
      // prePos 点击 进度条/音量 的时候的位置
      prePos: 0,
      // afterPos 移动后的距离
      afterPos: 0,
      // 点击的时候的offsetleft
      preOffsetLeft : 0,
      // 一共移动的juli
      totalMove: 0,
      // 进度条的长度
      targetWidth: 0,
      // 点击时候的百分比
      _percent: 0,
      // 定义一个属性 让鼠标移动目标的时候 audio不进行 播放时间的调整
      magicPoint: true,
    };
  },
  computed: {
    ...mapState([
      "isPlaying",
      "showPlayPage",
      "songId",
      "songIndex",
      "songUrlData",
      "songListData",
      "iconState",
      "allTime",
      "playTime",
      "volume",
      "lyric",
    ]),
  },
  methods: {
    // 点击切换某一首
    littlePlayListChangeSong(v) {
      this.$store.commit("littlePlayListChangeSong", v);
    },
    toggleLittlePlayList() {
      this.isLittlePlayList = !this.isLittlePlayList;
    },
    // 点击音量 拖动和 进度条一个道理 没写
    clickVolumen(e) {
      let per = Number(e.offsetX) / Number(e.target.parentNode.clientWidth);
      // 音量的进度和歌曲进度不一样 但是歌曲可以直接算
      // 用playtime和alltime算 不需要保存
      this.$store.commit("set", { name: "volume", v: per * 100 });
      this.$refs.ado.volume = per;
    },
    // 点击进度条
    clickProgressBar(e) {
      let per = Number(e.offsetX) / Number(e.target.parentNode.clientWidth);
      this.$refs.ado.currentTime = this.$refs.ado.duration * per;
    },
    // 拖动进度条 test => 移动点的事件 test2=>移动到地方 放手的事件
    moveProgressBar(e) {
      // 点之前的位置
      this.prePos = e.touches[0].clientX;
      // 点击圆点 的父元素 的长度 也就是进度条的长度
      this.targetWidth = e.target.parentNode.offsetWidth;
      // _percent 点之前的百分比
      this._percent = this.percent;

      this.preOffsetLeft = e.target.offsetLeft
      console.log("点了",e);
    },
    test(e) {
      // 移动后的距离
      this.afterPos = e.touches[0].clientX;
      // 移动的距离
      this.totalMove = this.afterPos - this.prePos;
      // 新的百分比
      let x = 0;
      //
      if (this.totalMove < 0) {
        // 往左移动
        if (Math.abs(this.totalMove) > this.preOffsetLeft + 1) {
          this.totalMove = -this.preOffsetLeft + 1;
          // console.log("往左到尽头了", this.totalMove);
        }
        x = (this.totalMove / this.targetWidth) * 100;
      } else {
        // 往右移动
        if (this.totalMove >= this.targetWidth - this.preOffsetLeft + 0) {
          this.totalMove = this.targetWidth - this.preOffsetLeft + 0;
          // console.log("往右到尽头了");
        }
        x = (this.totalMove / this.targetWidth) * 100;
      }
      // console.log("在动");
      // 停止播放 进度条和时间 更新的 事件
      this.magicPoint = false;
      // 更新百分比
      this.percent = x + this._percent;

      // 设置移动到播放的时间
      let min = utils.calcMilliseconds(this.$refs.ado.duration * 1000 * this.percent / 100);
      let millisec = this.$refs.ado.duration * 1000 * this.percent / 100;
      let v = { min, millisec };
      this.$store.commit("set", { name: "playTime", v });
    },
    test2(e) {
      // console.log("抬起来了");
      this.magicPoint = true
      this.$refs.ado.currentTime =  this.$refs.ado.duration * this.percent / 100
    },
    // 正在播放 时间在改变的时候
    timeupdate() {
      // 设置时间
      let min = utils.calcMilliseconds(this.$refs.ado.currentTime * 1000);
      let millisec = this.$refs.ado.currentTime;
      let v = { min, millisec };
      this.$store.commit("set", { name: "playTime", v });
      // 更新条播放的位置
      this.percent = (this.playTime.millisec / this.allTime.millisec) * 100;

      // 更新歌词
      let x = Math.ceil(this.$refs.ado.currentTime);
      // let x = Math.floor(this.$refs.ado.currentTime)
      this.lyric.map((item, index) => {
        if (x == item.time) {
          this.goTop = -index * (18 + 10) + "px";
          this.lyricIndex = index;
        }
      });
    },
    // 一开始播放
    startPlaying() {
      // 设置总长度
      let min = utils.calcMilliseconds(this.$refs.ado.duration * 1000);
      let millisec = this.$refs.ado.duration;
      let v = { min, millisec };
      this.$store.commit("set", { name: "allTime", v });
      // 设置音量
      this.$refs.ado.volume = 0.5;
      v = this.$refs.ado.volume * 100;
      this.$store.commit("set", { name: "volume", v });
    },
    // 播放结束
    audioEnd() {
      // console.log("放完了");
      this.$store.commit("togglePlay", false);
      // 单曲循环
      if (this.iconState.order[2].v == true) {
        // console.log("单曲循环");
        this.$store.commit("togglePlay", true);
        this.$refs.ado.play();
      }
      // 顺序循环
      if (this.iconState.order[0].v == true) {
        // console.log("顺序循环");
        this.nextSong();
        this.$store.commit("togglePlay", true);
      }
      // 随机播放
      if (this.iconState.order[1].v == true) {
        // console.log("随机播放");
        let v = Math.floor(Math.random() * (this.songListData.length - 1));
        this.$store.commit("nextSong", v);
        this.$store.commit("togglePlay", true);
      }
    },
    // 去歌手详情页面
    goSingerDetail(item) {
      this.togglePlayPage({ v: false });
      this.$router.push({ path: "/singerdetail", query: { id: item } });
    },
    // 切换封面/歌词
    toggleCover() {
      this.isCover = !this.isCover;
    },
    // 切换播放方法
    toggleOrder() {
      this.$store.commit("toggleOrder");
    },
    // 播放/暂停
    togglePlay() {
      // ado.paused 为真 歌曲暂停 => this.iconState.play 为假
      if (!this.$refs.ado.duration) {
        this.$toast.fail({
          message: "这首歌无法播放！",
          forbidClick: true,
          duration: 1000,
          loadingType: "spinner",
        });
        setTimeout(() => {
          clearTimeout();
          this.nextSong();
        }, 1500);
        return;
      }
      if (this.iconState.play == true) {
        this.$refs.ado.pause();
      } else {
        this.$refs.ado.play();
      }
      this.$store.commit("togglePlay", !this.iconState.play);
    },
    // 获取歌曲播放信息 url
    getSongUrl() {
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
          id: this.songId,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log(result);
          if (this.songData.url == result.data.data[0].url) {
            // console.log('同一首歌')
            return;
          }
          this.songData = result.data.data[0];
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 关掉playpage
    togglePlayPage(v) {
      this.$store.commit("togglePlayPage", v);
    },
    nextSong() {
      if (this.iconState.order[1].v == true) {
        let v = Math.floor(Math.random() * (this.songListData.length - 1));
        this.$store.commit("nextSong", v);
        return;
      }
      this.$store.commit("nextSong");
    },
    preSong() {
      if (this.iconState.order[1].v == true) {
        let v = Math.floor(Math.random() * (this.songListData.length - 1));
        this.$store.commit("preSong", v);
        return;
      }
      this.$store.commit("preSong");
    },
  },
  updated() {
    if (this.showPlayPage.a == false) {
      // console.log("没有选中歌曲播放/关闭popup");
      return;
    }
    // 解决没有url 还自动播放问题
    // prestate 如果是真 就说明上一首是不能放的
    // autoplay了以后 paused还是真 要把iconState变成真 然后现在把preState变成假
    if (this.songUrlData) {
      // console.log("歌曲list => ", this.songListData[this.songIndex]);
      // console.log(this.$refs.ado.currentTime);
      // console.log(this.$refs.ado.duration);
      if (this.songUrlData[this.songIndex].url != this.preUrl) {
        // 切歌
        this.preUrl = this.songUrlData[this.songIndex].url;
        this.$store.commit("togglePlay", true);
      }
      // 有歌曲url数据才判断
      // 如果选得这首歌 没有url 就说明这首歌不能放 prestate为真
      if (!this.songUrlData[this.songIndex].url) {
        this.preState = true;
        this.$store.commit("togglePlay", false);
      } else if (this.songUrlData[this.songIndex].url && this.preState) {
        // 如果这首歌有url 上一首不能放 现在play就为真 pre为假
        this.$store.commit("togglePlay", true);
        this.preState = false;
      }
    }
  },
};
</script>

<style lang="less">
// 小菜单
.little-play-list {
  z-index: 999;
  height: calc(100%);
  width: calc(100% - 40px);
  background-color: rgba(21, 21, 21, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  .not-content {
    height: calc(100% - 400px);
    background-color: rgba(0, 0, 0, 0);
  }
  .content {
    height: calc(400px - 60px);
    background-color: rgb(21, 21, 21);
    border-radius: 30px;
    overflow: hidden;
    padding: 20px;
    .title {
      // padding: 10px 0;
      font-size: 16px;
      text-align: left;
      height: 30px;
      line-height: 30px;
    }
    .order {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      padding: 10px 0;
    }
    .song-item-box {
      height: calc(100% - 30px - 20px - 20px);
      // background-color: #fff;
      overflow-x: hidden;
      .song-item {
        padding: 10px 0;
        border-bottom: 1px solid #b2b2b2;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        .song-item-name {
          max-width: 100%;
          margin-right: 10px;
          font-size: 14px;
          text-align: left;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .song-item-singer {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #b2b2b2;
          // max-width: calc(30% - 10px );
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
  }
}
// 播放页面(大)
.play-page {
  z-index: 888;
  position: relative;
  // 标题
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  /deep/ .van-nav-bar {
    background-color: rgba(120, 120, 120, 0.5);
  }
  /deep/ .van-hairline--bottom::after {
    border: none;
  }
  // 背景
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: 180%;
    background-position-x: 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    z-index: -1;
    filter: blur(15px);
  }
  .content {
    background-color: rgba(120, 120, 120, 0.5);
    height: calc(100% - 100px - 46px - 20px);
    width: 100%;
    position: relative;
    // 封面
    .the-cover {
      width: 100%;
      height: 100%;
      .cover-box {
        height: calc(100% - 80px);
        position: relative;
        .cover-item {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background-color: rgba(120, 120, 120, 0);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 5px solid rgba(136, 136, 136, 0.4);
          background-size: cover;
          overflow: hidden;
          background-repeat: no-repeat;
          background-position: center;
          animation: zhuanquanquan linear 3s infinite;
          animation-play-state: paused;
          &.active {
            animation-play-state: running;
          }
          @keyframes zhuanquanquan {
            0% {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            100% {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
        }
      }
      .function-box {
        color: #fff;
        height: 40px;
        // background : yellow;
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 25px;
        padding: 20px;
        .function-item {
          width: 20%;
        }
      }
    }
    // 歌词
    .the-lyrics {
      width: 100%;
      height: 100%;
      // background-color: aqua;
      .volume-box {
        height: 40px;
        width: calc(100% - 20px);
        // background-color: red;
        display: flex;
        align-items: center;
        justify-items: center;
        padding-left:20px;
        .volume-icon {
          width: 20px;
          height: 20px;
          font-size: 18px;
          margin-right: 10px;
        }
        .volume-item {
          width: calc(100% - 80px);
          height: 5px;
          border-radius: 15px;
          background: white;
          position: relative;
          .volume-point {
            position: absolute;
            width: 10px;
            height: 10px;
            left: 0%;
            top: 50%;
            background: #e4393c;
            transform: translateY(-50%) translateX(-50%);
            border-radius: 50%;
          }
          .volume-item-no-active {
            width: 100%;
            height: 100%;
          }
          .volume-item-active {
            position: absolute;
            width: 0%;
            height: 100%;
            left: 0%;
            top: 50%;
            background-color: #e4393c;
            transform: translateY(-50%);
            border-radius: 15px;
          }
        }
      }
      .lyrics-box {
        height: calc(100% - 40px);
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
        position: relative;
        overflow: hidden;
        .lyrics-item-box {
          width: calc(100% - 20px);
          padding: 0 20px;
          font-size: 16px;
          position: absolute;
          top: 5rem;
          left: 50%;
          transform: translate(-50%);
          .lyrics-item {
            margin: 10px 0;
            height: 18px;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            &.active {
              color: #e4393c;
            }
          }
        }
      }
    }
  }
  // 进度条
  .progress-bar-box {
    height: 20px;
    background-color: rgba(120, 120, 120, 0.5);
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 0 10px;
    // color: #fff;
    font-size: 12px;
    color: #fff;
    .time-box {
      width: 40px;
      margin: 0 10px;
    }
    .progress-bar {
      width: calc(100% - 120px);
      width: 100%;
      height: 100%;
      display: flex;
      justify-items: center;
      align-items: center;
      position: relative;
      // 为播放的进度条
      .progress-bar-pre {
        height: 2px;
        width: 100%;
        background-color: #fff;
      }
      .progress-bar-point {
        height: 10px;
        width: 10px;
        background-color: #e4393c;
        position: absolute;
        // left: 0%;
        border-radius: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .progress-bar-after {
        height: 2px;
        width: 0%;
        position: absolute;
        left: 0;
        background-color: #e4393c;
      }
    }
  }
  // 开关 总高度100px
  .switchs {
    height: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    background-color: rgba(120, 120, 120, 0.5);
    // background-color: aqua;
    color: #fff;
    padding: 20px;
    .switch-item {
      width: 50%;
      .iconfont {
        font-size: 24px;
      }
      &:nth-of-type(3) {
        .iconfont {
          font-size: 50px;
        }
      }
    }
  }
}
.goFlex {
  display: flex;
  align-items: center;
  justify-items: center;
}
body,
html,
#app {
  height: 100%;
  overflow-y: scroll;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.auto-img {
  width: 100%;
}
// 引入图标库
@font-face {
  font-family: "iconfont"; /* project id 2057321 */
  src: url("//at.alicdn.com/t/font_2057321_zflk9bdje3.eot");
  src: url("//at.alicdn.com/t/font_2057321_zflk9bdje3.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2057321_zflk9bdje3.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2057321_zflk9bdje3.woff") format("woff"),
    url("//at.alicdn.com/t/font_2057321_zflk9bdje3.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2057321_zflk9bdje3.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
