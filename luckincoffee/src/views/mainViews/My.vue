<template>
  <div class="my">
    <!-- 背景 -->
    <div class="my-bg" :style="{ backgroundImage: `url(${userInfo.userBg})` }">
      <van-uploader v-if="isLogin" class="uploader-box" :after-read="upload" />
    </div>
    <!-- 内容 -->
    <div class="my-content">
      <div class="my-box">
        <!-- 基本信息 没有登录的时候隐藏 -->
        <div v-if="isLogin">
          <div class="my-img clearfix">
            <div class="fl img-box">
              <img :src="userInfo.userImg" class="auto-img" alt="" />
            </div>
            <div class="fl img-text">
              <div class="nickname">{{ userInfo.nickName }}</div>
              <div class="desc">
                {{
                  userInfo.desc == ""
                    ? "这家伙很懒，什么都没留下"
                    : userInfo.desc
                }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <van-button type="default" round block color="#0c34ba" to="Login"
            >请 先 登 录</van-button
          >
        </div>
        <!-- 个人资料 -->
        <div class="lists" v-for="(item, index) in lists" :key="index">
          <van-cell :title="item.title" :to="item.to" is-link size="large" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
export default {
  data() {
    return {
      lists: [
        {
          title: "个人资料",
          to: {
            name: "Account",
          },
        },
        {
          title: "我的订单",
          to: {
            name: "Order",
          },
        },
        {
          title: "我的收藏",
          to: {
            name: "Like",
          },
        },
        {
          title: "收货地址",
          to: {
            name: "Address",
          },
        },
        {
          title: "安全中心",
          to: {
            name: "Secure",
          },
        },
      ],
      isLogin: false,
      userInfo: {},
      maxSize: 1 * 1024 * 1024,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 判断有没有登录,获取用户信息
    getUserInfo() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        this.isLogin = false;
        return this.$router.push({ name: "Login" });
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
    // 上传背景 修改用户背景
    upload(file) {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      // 获取文件类型
      let type = file.file.type.split("/")[1];
      let imgTypes = ["png", "gif", "jpg", "jpeg"];
      if (imgTypes.indexOf(type) === -1) {
        this.$notify({
          message: "图片类型只支持" + imgTypes.join(","),
          color: "#fff",
          background: "#0C34BA",
        });

        return;
      }

      //大小
      if (this.maxSize < file.file.size) {
        this.$notify({
          message: "上传文件大小不能超过" + this.maxSize / 1024 + "KB",
          color: "#fff",
          background: "#0C34BA",
        });
        return;
      }
      //获取base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");
      // 参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        imgType: type,
        serverBase64Img: base64,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          console.log("result ==> ", result);
          if (result.data.code == "I001") {
            this.userInfo.userBg = result.data.userBg;
          }
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
  // 背景图片
  .my-bg {
    background-color: aqua;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 200px;
    overflow: hidden;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    .uploader-box {
      opacity: 0;
    }
    .uploader-box,
    /deep/ .van-uploader__wrapper {
      width: 100%;
      height: 100%;
    }

    /deep/ .van-uploader__upload {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    /deep/ .van-uploader__input {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .my-content {
    padding: 0 30px;
    position: relative;
    top: -50px;
    //   background-color: red;
    .my-box {
      // height: 300px;
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
      // 基本资料
      .my-img {
        .img-box {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;
          background-color: aqua;
        }
        .img-text {
          width: calc(~"100% - 100px");
          .nickname {
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            color: #0c34ba;
            font-weight: bold;
          }
          .desc {
            font-size: 14px;
            color: #999;
            // 两行溢出隐藏
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
      // list
      .lists {
        margin-top: 10px;
      }
    }
  }
}
</style>
