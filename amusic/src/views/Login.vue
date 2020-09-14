<template>
  <div class="login">
    <van-nav-bar left-text="返回" fixed left-arrow @click-left="back" />
    <div class="btn-box">
      <van-button class="btn registered-btn" round @click="goLogin()"
        >注 册</van-button
      >
      <van-button class="btn login-btn" round @click="goLogin('isLoginPage')"
        >登 录</van-button
      >
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="isPopup"
      position="bottom"
      :style="{ height: '70%' }"
      round
      closeable
    >
      <!-- 登录 -->
      <div class="pop-box" v-if="isLoginPage">
        <!-- title -->
        <div class="title">欢迎登录</div>
        <!-- 内容框 -->
        <div class="content">
          <van-form>
            <van-field
              v-model="userInfo.userPhone"
              name="请输入手机号"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="userInfo.userPassword"
              type="password"
              name="请输入密码"
              label="密码"
              placeholder="请输入密码"
            />
            <!-- 登录按钮 -->
            <div class="pop-btn">
              <van-button
                round
                block
                type="info"
                color="#e4393c"
                @click="submit"
                >登 录</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
      <!-- 注册 -->
      <div class="pop-box" v-else>
        <!-- title -->
        <div class="title">欢迎注册</div>
        <!-- 内容框 -->
        <div class="content">
          <van-form>
            <van-field
              v-model="userInfo.userPhone"
              name="请输入手机号"
              label="手机号"
              placeholder="请输入手机号"
            />
            <van-field
              v-model="userInfo.userPassword"
              type="password"
              name="请输入密码"
              label="密码"
              placeholder="请输入密码"
            />
            <van-field
              v-model="userInfo.nickName"
              name="请输入昵称"
              label="昵称"
              placeholder="请输入昵称"
            />
            <van-field
              v-model="userInfo.vCode"
              name="请输入验证码"
              label="验证码"
              placeholder="请输入验证码"
            >
              <template #button>
                <van-button
                  size="small"
                  :disabled="isSend"
                  @click="sendVcode"
                  >{{ text }}</van-button
                >
              </template>
            </van-field>

            <!-- 注册按钮 -->
            <div class="pop-btn">
              <van-button
                round
                block
                type="info"
                color="#e4393c"
                @click="submit_"
                >注 册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      // 是否显示弹出层
      isPopup: false,
      // 弹出层 显示登录 , 如果为假 就注册
      isLoginPage: false,
      // 是否点击了发送验证码按钮
      isSend: false,
      // 验证码按钮文本
      text: "发送验证码",
      // 用户登录/注册 信息
      userInfo: {
        // 手机号
        userPhone: "",
        // 密码
        userPassword: "",
        // 昵称
        nickName: "",
        // 验证码
        vCode: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "Recommended" });
    },
    // 登录/注册 跳转
    goLogin(value) {
      if (value != undefined) {
        this[value] = true;
      } else {
        this.isLoginPage = false;
      }
      this.isPopup = true;
    },
    // 提交登录
    submit() {
      // 验证登录手机格式
      let o = {
        phone: {
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号码格式错误",
          value: this.userInfo.userPhone,
        },
      };
      // 不通过就返回
      if (!validForm.valid(o)) {
        return;
      }
      // 提示
      this.$toast.loading({
        type: "loading",
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起 登录 请求
      this.axios({
        methods: "get",
        url: "/login/cellphone",
        params: {
          phone: this.userInfo.userPhone,
          password: this.userInfo.userPassword,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // 验证登录成功
          if (result.data.code == 200) {
            this.$toast.success({
              duration: 1000,
              message: "登陆成功",
            });
            // 设置cooke
            if (!utils.getCookie("wyyc") || !utils.getCookie("uid")) {
              document.cookie = "wyyc=" + result.data.cookie;
              document.cookie = "uid=" + result.data.profile.userId;
            }
            this.userInfo.userPhone = "";
            this.userInfo.userPassword = "";
            this.isPopup = false;
            this.$store.commit("setUserInfo", result.data.profile);
            this.back();
          } else {
            this.$toast.fail({
              duration: 1000,
              message: result.data.msg,
            });
          }
          // console.log("result ==> ", result);
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("err ==> ", err);
        });
    },
    // 提交注册
    submit_() {
      // 验证登录手机格式
      let o = {
        phone: {
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号码格式错误",
          value: this.userInfo.userPhone,
        },
        password: {
          value: this.userInfo.userPassword,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确，请以字母开头，包含大小写字母，且5-15位",
        },
        vCode: {
          value: this.userInfo.vCode,
          reg: /([0-9]{4})/,
          errorMsg: "四位数字的验证码格式不正确",
        },
      };
      // 不通过就返回
      if (!validForm.valid(o)) {
        return;
      }
      if (this.userInfo.nickName == null) {
        return;
      }
      // 提示
      this.$toast.loading({
        type: "loading",
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      // 发起 注册 请求
      this.axios({
        methods: "get",
        url: "/register/cellphone",
        params: {
          phone: this.userInfo.userPhone,
          password: this.userInfo.userPassword,
          captcha: this.userInfo.vCode,
          nickname: this.userInfo.nickName,
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
    // 发送验证码
    sendVcode() {
      // 禁止重复点击
      this.isSend = true;
      let time = 60;
      let timer = window.setInterval(() => {
        time--;
        this.text = "请在" + time + "秒后重送";
        if (time < 0) {
          window.clearInterval(timer);
          this.isSend = false;
          this.text = "请输入验证码";
        }
      }, 1000);
      // 验证登录手机格式
      let o = {
        phone: {
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号码格式错误或不能为空",
          value: this.userInfo.userPhone,
        },
      };
      // 不通过就返回
      if (!validForm.valid(o)) {
        return;
      }
      // 检查手机号是否注册
      // 提示
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
        url: "/cellphone/existence/check",
        params: {
          phone: this.userInfo.userPhone,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.exist == 1) {
            this.$toast.fail({
              duration: 1000,
              message: "该手机号已经被注册",
            });
            return;
          } else if (result.data.exist == -1) {
            // 没有被注册 开始注册
            // 提示
            this.$toast.loading({
              type: "loading",
              message: "发送中",
              forbidClick: true,
              duration: 0,
              loadingType: "spinner",
            });
            // 发起 发送验证码 请求
            this.axios({
              methods: "get",
              url: "/captcha/sent",
              params: {
                phone: this.userInfo.userPhone,
              },
            })
              .then((result) => {
                this.$toast.clear();
                if (result.data.code == 200) {
                  this.$toast.success({
                    duration: 1000,
                    message: "验证码已成功发送",
                  });
                }
              })
              .catch((err) => {
                this.$toast.clear();
                console.log("err ==> ", err);
              });
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
.login {
  height: 100%;
  // background-color: #e4393c;
  background: url("../assets/img/20181125102506_umnve.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  // 导航
  .van-nav-bar {
    background-color: rgba(0, 255, 255, 0);
  }
  .van-hairline--bottom::after {
    border: none;
  }
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  /deep/ .van-nav-bar .van-icon{
    color: #fff;
  }
  // 导航结束
  .btn-box {
    width: calc(100% - 20px);
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%);
    .btn {
      margin: 0 5px;
      background-color: rgba(0, 255, 255, 0);
      padding: 10px 40px;
      color: #fff;
      font-size: 16px;
    }
    .login-btn {
      background-color: #fff;
      color: #e4393c;
    }
  }
  // popup层
  .pop-box {
    height: 100%;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 28px;
      width: 100%;
      text-align: center;
      color: #e4393c;
    }
    .content {
      padding: 20px 20px 0;
      height: calc(100% - 80px);
      position: relative;
      text-align: center;
      /deep/ .van-cell__title {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .van-form {
        height: 100%;
        width: 100%;
      }
      .pop-btn {
        position: absolute;
        padding: 0 20px 40px;
        bottom: 0;
        left: 0;
        width: calc(100% - 40px);
      }
    }
  }
}
</style>
