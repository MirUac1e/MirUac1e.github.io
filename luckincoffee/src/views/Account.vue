<template>
  <!-- 帐号信息管理页面 个人资料 -->
  <div class="account">
    <!-- 导航 -->
    <van-nav-bar
      title="个人资料"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
    />
    <!-- 内容 -->
    <div class="list-box">
      <!-- 1 -->
      <van-cell title="头像">
        <div class="avatar fr">
          <img :src="userInfo.userImg" class="auto-img" alt="" />
          <van-uploader class="uploader-box" :after-read="uploadUserImg" />
        </div>
      </van-cell>
      <!-- 2 -->
      <van-cell title="用户id">
        <div class="fr">
          {{ userInfo.userId }}
        </div>
      </van-cell>
      <!-- 3 -->
      <van-cell title="手机号">
        <div class="fr">
          {{ userInfo.phone }}
        </div>
      </van-cell>
      <!-- 4 -->
      <van-cell title="昵称">
        <div class="fr">
          <input
            class="nickname"
            type="text"
            v-model="userInfo.nickName"
            @change="modifyUserInfo('nickName','updateNickName')"
          />
        </div>
      </van-cell>
      <!-- 简介 -->
      <div class="desc-box">
        <div class="desc-title">简介</div>
        <div class="desc-content">
          <textarea
            class="desc-text-area"
            placeholder="这家伙很懒，什么都没有留下"
            v-model="userInfo.desc"
            @change="modifyUserInfo('desc','updateDesc')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      userInfo: {},
      maxSize: 1 * 1024 * 1024,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == "B001") {
            this.userInfo = result.data.result[0];
          }
          //   console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 上传头像 修改用户头像
    uploadUserImg(file) {
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
        url: "/updateAvatar",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == "H001") {
            this.userInfo.userImg = result.data.userImg;
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 修改昵称
    modifyNickName() {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      // 参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        nickName: this.userInfo.nickName,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateNickName",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          console.log(result);
          if (result.data.code == "C001") {
            this.$toast(result.data.msg);
            // this.userInfo.nickName = result.data.nickName
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 修改简介
    modifyDesc() {},
    // 修改用户信息
    modifyUserInfo(key, url) {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      // 参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        [key]: this.userInfo[key],
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url,
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
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
.account {
  padding-top: 46px;
  // 改导航的颜色
  /deep/ .van-nav-bar__text {
    color: #0C34BA;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #0C34BA;
  }
  //   内容
  .list-box {
    margin: 20px 10px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    padding: 10px;
    .avatar {
      width: 40px;
      height: 40px;
      background-color: #f5f5f5;
      position: relative;
      overflow: hidden;
      .uploader-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
    /deep/ .van-cell {
      padding: 0;
      line-height: 40px;
      padding-bottom: 10px;
      padding-top: 10px;
      &:first-of-type {
        padding-top: 0;
      }
      &:last-of-type {
        padding-bottom: 0;
      }
    }
    .desc-box {
      .desc-title {
        line-height: 40px;
        font-size: 14px;
        color: #323233;
      }
      .desc-content {
        .desc-text-area {
          display: block;
          width: 100%;
          padding: 0;
          border: none;
          outline: none;
          resize: none;
          color: #969799;
        }
      }
    }
    .nickname {
      display: block;
      width: 100%;
      padding: 0;
      border: none;
      outline: none;
      resize: none;
      color: #969799;
      text-align: right;
    }
  }
}
</style>
