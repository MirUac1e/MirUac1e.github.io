<template>
  <!-- 注册页面 -->
  <div class="login-box">
    <!-- 导航栏 -->
    <div class="nav-box">
      <van-nav-bar @click-right="goHome">
        <!-- 导航栏的左边 -->
        <template #left>
          <div class="nav-left">
            <div class="nav-logo">
              <img
                src="../assets/images/tabbar_18.png"
                class="auto-img"
                alt=""
              />
            </div>
            <div class="nav-title">Luckin Coffee</div>
          </div>
        </template>
        <!-- 导航栏的右边 -->
        <template #right>
          <div class="close">关闭</div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 登录页-->
    <div class="sign-form">
      <div class="title">欢迎回来!</div>
      <div class="en-titile">Please login to your accounts</div>
      <div class="login-form">
        <van-form>
          <!-- 用户名 -->
          <van-field placeholder="用户名" v-model="loginUserData.phone" />
          <!-- 密码 -->
          <van-field
            :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
            @click-right-icon="passwordClick"
            v-model="loginUserData.password"
            :type="isPassword ? 'password' : 'text'"
            placeholder="密码"
            autocomplete="off"
          />
          <div class="fr clearfix forget-password" @click="forgetPassword">忘记密码?</div>
          <div style="margin: 45px 16px;" class="form-button">
            <!-- 登录按钮 -->
            <van-button block type="info" native-type="submit" @click="login">
              登录
            </van-button>
            <!-- 注册按钮 -->
            <van-button block type="default" @click="popupLogin"
              >注册</van-button
            >
          </div>
          <!-- 弹出的注册页面 -->
          <van-popup
            v-model="isPopup"
            position="bottom"
            :style="{ width: '100%', height: '50%' }"
            closeable
            close-icon="close"
            round
            overlay
            overlay-class="overlayClass"
          >
            <div class="title">注册</div>
            <van-form>
              <van-field
                placeholder="手机号"
                v-model="registerUserData.phone"
              />
              <van-field
                placeholder="用户昵称"
                v-model="registerUserData.nickName"
              />
              <van-field
                :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
                @click-right-icon="passwordClick"
                v-model="registerUserData.password"
                :type="isPassword ? 'password' : 'text'"
                placeholder="密码"
                autocomplete="off"
              />
              <div class="register-btn">
                <van-button
                  block
                  type="info"
                  native-type="submit"
                  @click="register"
                >
                  注册
                </van-button>
              </div>
            </van-form>
          </van-popup>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm";
import { utils } from "../assets/js/utils";

export default {
  data() {
    return {
      registerUserData: {
        phone: "",
        nickName: "",
        password: "",
      },
      loginUserData: {
        phone: "",
        password: "",
      },
      // 密码是否显示
      isPassword: true,
      // 注册页面是否显示
      isPopup: false,
    };
  },
  methods: {
    // 右上角关闭按钮
    goHome() {
      this.$router.push({ name: "Home" });
    },
    // 忘记密码
    forgetPassword() {
      this.$router.push({ name: "Forget" });
    },
    // 密码显示转换
    passwordClick() {
      this.isPassword = !this.isPassword;
    },
    // 显示注册页面
    popupLogin() {
      this.isPopup = true;
      // console.log(this.isPopup);
    },
    // 注册事件
    register() {
      let userInfo = this.registerUserData;
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        nickName: {
          value: userInfo.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      validForm.valid(o);
      // 判断验证状态 成功后保存数据
      if (!validForm.valid(o)) {
        return;
      }
      // 显示loading、
      this.$toast.loading({
        message: "加载中",
        duration: 0,

        forbidClick: true,

        loadingType: "spinner",
      });
      // 整理数据
      // 把数据写成对象
      let info = Object.assign({}, userInfo);
      info.appkey = this.appkey;
      let data = utils.queryString(info);
      console.log(data);

      this.axios({
        method: "POST",
        //请求参数
        url: "/register",
        data,
      })
        .then((result) => {
          // 注册成功
          // 关闭loading
          this.$toast.clear();
          if (result.data.code == 100) {
            // 弹窗关闭
            this.isPopup = false;
            for (let key in userInfo) {
              userInfo[key] = "";
            }
          } else {
            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("错误 => ", err);
        });
    },
    // 登录事件
    login() {
      let userInfo = this.loginUserData;
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号码格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };
      validForm.valid(o);
      if (!validForm.valid(o)) {
        return;
      }
      let info = Object.assign({}, userInfo);
      info.appkey = this.appkey;
      let data = utils.queryString(info);

      //验证通过
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "post",
        url: "/login",
        data,
      })
        .then((result) => {
          console.log(result);
          this.$toast.clear();
          if (result.data.code == 200) {
            // 保存token
            localStorage.setItem("CSTK", result.data.token);
            // 跳转页面
            this.$router.push({ name: "Home" });
          } else {
            this.$toast({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.fr {
  float: right;
}
.login-box {
  background: #fff;
  height: 100%;
  padding: 10px;
  .nav-box {
    .nav-left {
      display: flex;
      .nav-logo {
        margin-top: 6px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .nav-title {
        margin-left: 5px;
        font-weight: bold;
        line-height: 46px;
      }
    }
  }
  .forget-password {
    padding: 0 16px;
  }
  .sign-form {
    margin-top: 60px;
    // 标题
    .title {
      font-size: 23px;
      padding: 0 16px;
      margin: 15px 0;
      letter-spacing: 2px;
      font-weight: 500;
    }
    // 英文标题
    .en-titile {
      padding: 0 16px;
      margin: 15px 0;
      width: 250px;
      color: #c0c0c0;
      line-height: 25px;
      font-size: 23px;
    }
    // 登录框
    .login-form {
      margin-top: 20px;
      // 输入框
      .van-form {
        .van-cell {
          margin: 15px 0;
        }
        .van-cell::after {
          border: 1px solid #999;
        }
      }
      // 按钮
      .form-button {
        button {
          margin: 20px 0;
        }
      }
      .van-form {
        /deep/ .overlayClass {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
      .register-btn {
        padding: 0 16px;
      }
      .forget-password {
        font-size: 14px;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
