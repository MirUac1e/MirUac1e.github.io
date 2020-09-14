<template>
  <div class="singerdetail">
    <!-- 导航 右上角可以打开popup=>再说吧 -->
    <div>
      <van-nav-bar left-arrow @click-left="back" fixed> </van-nav-bar>
    </div>
    <!-- 背景 -->
    <!-- img1v1Url -->
    <div
      class="bg"
      :style="'background-image:url(' + artist.img1v1Url + ')'"
    ></div>
    <!-- 内容 -->
    <div class="content-box">
      <!-- 名称 粉丝数 关注 -->
      <div class="clearfix singer-info-box">
        <div class="fl singer-info">
          <div class="singer-name">{{ artist.name }}</div>
          <div class="singer-fans">单曲数 {{ artist.musicSize }}</div>
        </div>
        <div class="fr btn-sub">
          <van-button
            round
            style="padding:0 20px"
            color="#e4393c"
            :disabled="artist.followed ? true : false"
            >{{ !artist.followed ? "+ 关注" : "已关注" }}</van-button
          >
        </div>
      </div>
      <!-- 主要内容 -->
      <div class="content-item">
        <van-tabs
          v-model="active"
          background="rgba(21,21,21,1)"
          color="#e4393c"
          title-inactive-color="#fff"
          title-active-color="#e4393c"
        >
          <van-tab title="主页">
            <!-- 近期热门 -->
            <div class="hot-box">
              <div class="hot-box-title ">近期热门(10首)</div>
              <div
                class="clearfix songlist-item"
                v-for="(item, index) in hotSongs"
                :key="index"
              >
                <div
                  class="fl songlist-count"
                  :style="index >= 99 ? 'font-size:16px' : ''"
                >
                  {{ index + 1 }}
                </div>
                <!-- 歌曲信息 -->
                <div
                  class="fl songlist-item-detail"
                  style="height:40px"
                  @click="
                    togglePlayPage({
                      v: true,
                      songListData: hotSongs,
                      id: item.id,
                      songUrlData,
                      index,
                    })
                  "
                >
                  <div class="song-name">
                    {{ item.name
                    }}{{ item.isAlia ? "(" + item.alia[0] + ")" : "" }}
                  </div>
                  <div class="song-singer">
                    {{ item.art }} - {{ item.al.name }}
                  </div>
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
            <!-- 歌手简介 -->
            <div class="singer-introduction">
              <div class="singer-introduction-title">
                歌手简介
              </div>
              <div class="singer-introduction-content">
                {{ artist.briefDesc }}
              </div>
            </div>
            <!-- 相似艺人 -->
            <div class="similar-artists">
              <div class="similar-artists-title">
                相似艺人
              </div>
              <div class="similar-artists-box clearfix">
                <div
                  class="similar-artists-item fl"
                  v-for="(item, index) in similarArtistsData"
                  :key="index"
                >
                  <div class="s-a-img">
                    <div
                      :style="'background-image:url(' + item.img1v1Url + ')'"
                    ></div>
                  </div>
                  <div class="s-a-name">{{ item.name }}</div>
                  <div class="s-a-fans">单曲数{{ item.musicSize }}</div>
                  <div class="s-a-sub">
                    <van-button
                      round
                      style="padding:0 20px"
                      size="small"
                      color="#e4393c"
                      :disabled="item.followed ? true : false"
                      >{{ !item.followed ? "+ 关注" : "已关注" }}</van-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="歌曲">
            <!-- 所有歌曲 懒加载？懒加载？懒加载 -->
            <div>暂时拿50首</div>
            <div class="all-song-box">
              <div
                class="clearfix songlist-item"
                v-for="(item, index) in allSongs"
                :key="index"
              >
                <div
                  class="fl songlist-count"
                  :style="index >= 99 ? 'font-size:16px' : ''"
                >
                  {{ index + 1 }}
                </div>
                <!-- 歌曲信息 -->
                <div
                  class="fl songlist-item-detail"
                  style="height:40px"
                  @click="
                    togglePlayPage({
                      v: true,
                      songListData: hotSongs,
                      id: item.id,
                      songUrlData,
                      index,
                    })
                  "
                >
                  <div class="song-name">
                    {{ item.name
                    }}{{ item.isAlia ? "(" + item.alia[0] + ")" : "" }}
                  </div>
                  <div class="song-singer">
                    {{ item.art }} - {{ item.al.name }}
                  </div>
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
          </van-tab>
          <van-tab :title="'专辑(' + allPlayList.length + ')'">
            <div>留着排序</div>
            <div
              class="album-box"
              v-for="(item, index) in allPlayList"
              :key="index"
            >
              <div class="album-item goFlex">
                <div
                  class="album-img"
                  :style="'background-image:url(' + item.picUrl + ')'"
                ></div>
                <div class="album-info">
                  <div class="album-name">{{ item.name }}</div>
                  <div class="goFlex">
                    <div class="album-date">{{ item.pt }}</div>
                    <div class="album-count">{{ item.size }}首</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="视频">
            <div>有拿mv和视频两种</div>
            <div class="video-box">
              <div class="video-item goFlex" v-for="(item,index) in allVideoData" :key="index">
                <div class="video-img" :style="'background-image:url(' + item.imgurl + ')'">
                  <div class="video-play-count goFlex" >
                    <van-icon name="play-circle-o" />{{item.playcount}}
                  </div>
                </div>
                <div class="video-info">
                  <!-- <div>MV标志的icon</div> -->
                  <div class="video-name">{{item.name}}</div>
                  <div class="video-date">{{item.publishTime}}</div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
// 传入歌手 id, 可获得歌手部分信息和热门歌曲 /artists?id=6452
export default {
  data() {
    return {
      active: 3,
      // 歌手信息
      artist: {},
      // 所有MV的数据
      allVideoData:[],
      // 所有专辑数据
      allPlayList: [],
      // 所有歌曲的数据
      allSongs: [],
      // 热门歌曲 只拿10首
      hotSongs: [],
      // 相似歌手数据 就拿2个
      similarArtistsData: [],
      // 热门歌曲的url
      songUrlData: [],
      // 所有歌曲的url
      allSongUrlData: [],
    };
  },
  created() {
    // 这个id是歌手id
    // 获取歌手信息和热门歌曲
    this.getInfoById(this.$route.query.id);
    // 获取歌手所有歌曲  => 测试完成后修改成 点了才激活
    this.getAllSongById(this.$route.query.id);
    // 获取歌手所有传记  => 测试完成后修改成 点了才激活
    this.getPlayListById(this.$route.query.id);
    // 获取相似歌手
    this.getSimilarArtists(this.$route.query.id);
    // 获取全部mv
    this.getAllVideoById(this.$route.query.id)
  },
  methods: {
    back() {
      this.togglePlayPage({ v: true });
      setTimeout(() => {
        clearTimeout()
        this.$router.go(-1);
      }, 1000);
    },
    // 跳转到专辑页面
    clickPlayList(v) {
      // console.log("还没做呢 跳个屁");
      // this.$router.push({path:'/songlistdetail',query: {id:v}});
    },
    // 获取所有歌曲的url
    getAllSongUrl(item, save) {
      // save => 保存的位置
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
          this.hotSongs.map((item) => {
            result.data.data.map((v) => {
              if (v.id == item.id) {
                trueData.push(v);
                return;
              }
            });
          });
          this[save] = trueData;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌手id 获取相似歌手
    getSimilarArtists(id) {
      // 需要登录
      // 需要登录
      // 需要登录
      let cookie = utils.getCookie("wyyc");
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
        url: "/simi/artist",
        params: {
          id,
          cookie,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.similarArtistsData = [];
          // 就放2个
          for (let i = 0; i < 2; i++) {
            this.similarArtistsData.push(result.data.artists[i]);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌手id 获取所有mv
    getAllVideoById(id) {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "发送中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      // 这个也可以做懒加载 下次一定
      // 这个也可以做排序 没写 但是有 order 淦
      // 默认10个
      this.axios({
        methods: "get",
        url: "/artist/mv",
        params: {
          id,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.allVideoData = result.data.mvs;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌手id 获取歌手全部的专辑
    getPlayListById(id) {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "发送中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      // 这个也可以做懒加载 下次一定
      // 这个也可以做排序 没写 但是有 order 淦
      // 默认30个
      this.axios({
        methods: "get",
        url: "/artist/album",
        params: {
          id,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log(result);
          result.data.hotAlbums.map((item) => {
            item.pt = utils.getLocalTime(item.publishTime);
          });
          this.allPlayList = result.data.hotAlbums;
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌手id 获取歌手全部歌曲(50首 做懒加载)
    getAllSongById(id) {
      // tishi
      this.$toast.loading({
        type: "loading",
        message: "发送中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起请求
      // 可以做排序 下次一定
      // order : hot ,time 按照热门或者时间排序
      // limit: 取出歌单数量 , 默认为 50
      // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
      this.axios({
        methods: "get",
        url: "/artist/songs",
        params: {
          id,
          order: "hot",
          limit: 50,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // return
          // 整理数据
          let songId = [];
          // 保存歌曲id
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
            //
            songId.push(item.id);
          });
          this.allSongs = result.data.songs;
          this.getAllSongUrl(songId, "allSongUrlData");
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 根据歌手id 获得歌手部分信息和热门歌曲
    getInfoById(id) {
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
        url: "/artists",
        params: {
          id,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.artist = result.data.artist;
          // 只拿10首 热门歌曲
          // 保存热门歌曲
          let arr = [];
          if (result.data.hotSongs.length < 10) {
            // console.log("还有十首歌都没有的歌手？");
          }
          for (let i = 0; i < 10; i++) {
            arr.push(result.data.hotSongs[i]);
          }
          // 整理数据
          let songId = [];
          // 保存歌曲id
          arr.map((item) => {
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
            //
            songId.push(item.id);
          });
          this.hotSongs = arr;
          this.getAllSongUrl(songId, "songUrlData");
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 开启playpage
    togglePlayPage(v) {
      this.$store.commit("togglePlayPage", v);
    },
  },
};
</script>

<style lang="less" scoped>
.singerdetail {
  width: 100%;
  height: calc(100%);
  background-color: red;
  // 标题
  /deep/ .van-nav-bar .van-icon {
    color: #d2d2d2;
  }
  /deep/ .van-nav-bar {
    background-color: rgba(120, 120, 120, 0);
  }
  /deep/ .van-hairline--bottom::after {
    border: none;
  }
  // 背景
  .bg {
    height: 300px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: aqua;
  }
  // 内容
  .content-box {
    color: #fff;
    position: relative;
    left: 0;
    top: -100px;
    width: 100%;
    .singer-info-box {
      // background-color: rgba(255,255,255, 0.5);
      padding: 20px;
      height: 40px;
      .singer-info {
        width: calc(100% - 140px);
        text-align: left;
        .singer-name {
          line-height: 25px;
          font-size: 18px;
          font-weight: bold;
        }
        .singer-fans {
          line-height: 15x;
          font-size: 12px;
        }
      }
      .btn-sub {
        width: 100px;
        height: 40px;
        line-height: 40px;
        // background-color: yellow;
      }
    }
    .content-item {
      background-color: #000;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      overflow: hidden;
      // 主页
      .hot-box-title,
      .singer-introduction-title,
      .similar-artists-title {
        text-align: center;
        padding: 10px;
        font-size: 18px;
      }
      // 近期热门
      .hot-box {
        background-color: rgb(21, 21, 21);
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
      // 歌手简介
      .singer-introduction {
        margin-top: 10px;
        background-color: rgb(21, 21, 21);
        .singer-introduction-content {
          padding: 0 20px 20px 20px;
          text-align: left;
          color: #b4b4b4;
        }
      }
      // 相似艺人
      .similar-artists {
        margin-top: 10px;
        background-color: rgb(21, 21, 21);
        .similar-artists-box {
          .similar-artists-item {
            // background-color: red;
            padding: 20px;
            width: calc(50% - 40px);
            color: white;
            display: flex;
            flex-wrap: wrap;
            // justify-items: center;
            align-items: center;
            .s-a-img {
              width: 100%;
              height: 60px;
              // border-radius: 50%;
              background-color: #000;
              position: relative;
              padding: 10px;
              div {
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                width: 60px;
                height: 60px;
                background-size: cover;
                border-radius: 50%;
                overflow: hidden;
              }
            }
            .s-a-name {
              background-color: #000;
              width: 100%;
              font-size: 16px;

              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .s-a-fans {
              background-color: #000;
              width: 100%;
              font-size: 14px;
              color: #b4b4b4;
            }
            .s-a-sub {
              background-color: #000;
              width: 100%;
              padding: 20px;
            }
          }
        }
      }
      // 全部歌曲
      .all-song-box {
        background-color: rgb(21, 21, 21);
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
      // 专辑
      .album-box {
        .album-item {
          padding: 10px 20px;
          background-color: rgb(21, 21, 21);
          .album-img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
            overflow: hidden;
            background-size: cover;
          }
          .album-info {
            width: calc(100% - 120px);
            text-align: left;
            height: 60px;
            .album-name {
              line-height: 30px;
              font-size: 16px;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .album-date,
            .album-count {
              font-size: 12px;
              line-height: 20px;
              color: #b4b4b4;
            }
            .album-date {
              margin-right: 4px;
            }
          }
        }
      }
      // 视频
      .video-box {
        .video-item {
          padding: 10px 20px;
          .video-img {
            width: 120px;
            height: 80px;
            background-color: aqua;
            margin-right: 20px;
            background-size: cover;
            overflow: hidden;
            border-radius: 15px;
            position: relative;
            .video-play-count {
              position: absolute;
              right: 5px;
              top: 0;
            }
          }
          .video-info {
            width: calc(100% - 140px );
            color: white;
            text-align: left;
            .video-name {
              line-height: 30px;
              font-size: 16px;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .video-date {
              font-size: 12px;
              color: #b4b4b4;
            }
          }
        }
      }
    }
  }
}
</style>
