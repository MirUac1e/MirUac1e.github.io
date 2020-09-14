<template>
  <div class="forget">
    <!-- 导航 -->
    <van-nav-bar
      title="密码找回"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
      :style="{ 'z-index': 2 }"
    />

    <div class="forget-box">
      <div class="title">忘记密码？</div>
      <div class="en-titile">Retrieve the password here</div>
      <van-form class="clearfix">
        <!-- 手机号 -->
        <van-field
          label="手机号"
          placeholder="手机号"
          v-model="userInfo.phone"
        />
        <!-- 新的密码 -->
        <van-field
          :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
          @click-right-icon="passwordClick"
          :type="isPassword ? 'password' : 'text'"
          placeholder="新的密码"
          label="新的密码"
          autocomplete="off"
          v-model="userInfo.newPassword"
        />
        <!-- 邮箱 -->
        <van-field
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入邮箱验证码"
          v-model="userInfo.email"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              color="#0c34ba"
              @click="sendCheckCode"
              :disabled="isSend"
            >
              {{ text }}
            </van-button>
          </template>
        </van-field>
        <!-- 验证码 -->
        <van-field
          label="验证码"
          placeholder="请输入验证码"
          v-model="userInfo.checkCode"
        />

        <div class="clearfix">
          <div class="fr goLogin" @click="goLogin">
            已有帐号?立即登录
          </div>
        </div>

        <div style="margin: 45px 16px;" class="form-button">
          <!-- 找回密码按钮 -->
          <van-button
            block
            round
            size="large"
            type="info"
            color="#0c34ba"
            @click="sumbit"
          >
            找回密码
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
import { validForm } from "../assets/js/validForm";
export default {
  data() {
    return {
      isPassword: true,
      userInfo: {
        email: "",
        checkCode: "",
        newPassword: "",
        phone: "",
      },
      text: "发送验证码",
      isSend: false,
    };
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    // 密码显示转换
    passwordClick() {
      this.isPassword = !this.isPassword;
    },
    // 点击发送验证码按钮
    sendCheckCode() {
      // 验证邮箱格式
      let o = {
        email: {
          value: this.userInfo.email,
          reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          errorMsg: "邮箱格式不正确",
        },
      };
      validForm.valid(o);
      if (!validForm.valid(o)) {
        return;
      }
      // 禁止多次点击
      this.isSend = true;
      let time = 5;
      let timer = setInterval(() => {
        this.text = `${time}秒重新发送`;
        if (time < 0) {
          this.text = "发送验证码";
          this.isSend = false;
          clearInterval(timer);
        }
        time--;
      }, 1000);
      // 发送请求
      this.$toast.loading({
        message: "加载中",
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
      });
      let data = utils.queryString({
        appkey: this.appkey,
        email: this.userInfo.email,
      });

      this.axios({
        method: "POST",
        //请求参数
        url: "/emailValidCode",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          console.log(result);
          // J001
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("错误 => ", err);
        });
    },
    // 点击找回按钮
    sumbit() {
      // 验证有没有写所有数据
      let o = {
        email: {
          value: this.userInfo.email,
          reg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          errorMsg: "邮箱格式不正确",
        },
        phone: {
          value: this.userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        newPassword: {
          value: this.userInfo.newPassword,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确,请确保以字母开头且有数字组合",
        },
        checkCode: {
          value: this.userInfo.checkCode,
          reg: /^\d{6}$/,
          errorMsg: "验证为6位数字",
        },
      };
      validForm.valid(o);
      if (!validForm.valid(o)) {
        return;
      }
      // 验证验证码是否正确
      // 发送请求
      this.$toast.loading({
        message: "加载中",
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
      });
      let data = utils.queryString({
        appkey: this.appkey,
        validCode: this.userInfo.checkCode,
      });

      this.axios({
        method: "POST",
        //请求参数
        url: "/checkValidCode",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == "K001") {
            this.sendChangePassword();
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("错误 => ", err);
        });
    },
    // 发送更改请求
    sendChangePassword() {
      this.$toast.loading({
        message: "加载中",
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
      });
      let data = utils.queryString({
        appkey: this.appkey,
        phone: this.userInfo.phone,
        password: this.userInfo.newPassword,
      });

      this.axios({
        method: "POST",
        //请求参数
        url: "/retrievePassword",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == "L001") {
            setTimeout(() => {
              this.$router.push({name:'Login'})
            },1000);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("错误 => ", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.forget {
  padding-top: 46px;
  .forget-box {
    background-color: #fff;
    padding: 70px 10px 10px 10px;
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
      width: 300px;
      color: #c0c0c0;
      line-height: 25px;
      font-size: 23px;
    }
    .goLogin {
      margin-top: 20px;
      font-size: 14px;
    }
  }
}
</style>
