<template>
  <!-- 因为登录了 获取回来的记录 会有 有没有点赞的记录 -->
  <!-- 根据这个可以做点赞 我淦 -->
  <!-- 视频 页面 -->
  <div class="video">
    <div>
      <!-- 菜单/导航 -->
      <van-tabs
        v-model="active"
        color="#e4393c"
        @click="toggleVideoType(active)"
      >
        <van-tab
          :title="item.name"
          v-for="(item, index) in categoryList"
          :key="index"
        >
          <!-- 视频item -->
          <div
            class="video-item"
            v-for="(item, index) in videoData"
            :key="index"
          >
            <div class="video-top">
              <!-- 视频的图 -->
              <div class="video-coverImg" style="font-size:0">
                <img :src="item.data.coverUrl" class="auto-img" alt="" />
                <!-- 播放量 -->
                <div class="play-count clearfix">
                    <van-icon name="play-circle-o" class="fl" />
                    <div class="fl">{{ item.data.playTime }}万</div>
                </div>
                <!-- 时间 -->
                <div class="video-time">{{item.data.durationms}}</div>
              </div>
              <!-- 视频标题/描述 -->
              <div class="video-item-title-box clearfix">
                <!-- 标题描述 -->
                <div class="video-item-title fl">{{item.data.title}}</div>
                <!-- 上传者 头像？ -->
                <div class="video-creator fr">
                  <img :src="item.data.creator.avatarUrl" class="auto-img" alt="" />
                </div>
              </div>
            </div>
            <!-- 点赞 评论 ： -->
            <div class="function-list clearfix">
              <div class="like fl">
                <van-icon name="good-job-o" />
                <div>{{item.data.praisedCount}}</div>
              </div>
              <div class="comments fl">
                <van-icon name="comment-o" />
                <div>{{item.data.commentCount}}</div>
              </div>
              <div class="fr">
                <van-icon name="bars" style="font-size:20px" />
              </div>
            </div>
          </div>
          <!-- 视频item结束 -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
export default {
  data() {
    return {
      active: 0,
      activeIndex: 1,
      // 视频分类列表
      categoryList: [],
      videoData: [],
    };
  },
  methods: {
    // 头部菜单 点击事件
    toggleVideoType(index) {
      if (index == this.activeIndex) {
        // 重复点击
        return;
      }
      this.activeIndex = index;
      let url = "";
      let params = {};
      params.cookie = utils.getCookie("wyyc");
      if (index == 0) {
        url = "/video/timeline/recommend";
      } else {
        url = "/video/group";
        params.id = this.categoryList[index].id;
      }
      // 提示
      this.$toast.loading({
        type: "loading",
        message: "请稍等..",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 请求
      this.axios({
        methods: "get",
        url,
        params,
      })
        .then((result) => {
          this.$toast.clear();
          this.videoData = [];
          result.data.datas.map((item, index) => {
            if (item.data.playTime) {
              // 处理数据
              item.data.playTime = Math.floor(item.data.playTime / 10000);
              item.data.durationms = utils.calcMilliseconds(item.data.durationms)
              this.videoData.push(result.data.datas[index]);
            }
          });
          // result还有一个 hasmore 可以做懒加载 用offset 偏移量
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 获取视频 分类列表
    getCategoryList() {
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
        url: "/video/category/list",
        params: {
          cookie: cookieData,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.categoryList = result.data.data;
          this.categoryList.unshift({
            name: "推荐",
          });
          this.toggleVideoType(0);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    this.getCategoryList();
  },
};
</script>

<style lang="less" scoped>
.video {
  padding: 0 20px 50px 20px;
  .video-item {
    margin: 20px 0;
    &:last-of-type{
      margin-bottom: 0;
    }
    .video-top {
      border-radius: 15px;
      background-color: #f8f8f8;
      overflow: hidden;
    }
    .video-coverImg {
      position: relative;
      /deep/ .van-icon {
        font-size: 16px;
        margin-right: 2px;
      }
      .play-count,
      .video-time {
        position: absolute;
        bottom: 10px;
        color: #fff;
        font-size: 14px;
      }
      .play-count {
        display: flex;
        align-items: center;
        left: 10px;
      }
      .video-time {
        right: 10px;
      }
    }
    .video-item-title-box {
      height: 30px;
      padding: 5px 15px;
      color: black;
      .video-item-title {
        font-size: 16px;
        line-height: 30px;
        text-align: left;
        width: calc(100% - 30px);
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .video-creator {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        background-color: yellow;
      }
    }
    .function-list {
      color: #bfbfbf;
      // color: red;
      font-size: 14px;
      .like,
      .comments {
        display: flex;
        align-items: baseline;
        margin-right: 20px;
        /deep/ .van-icon {
          font-size: 20px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
