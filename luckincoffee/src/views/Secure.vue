<template>
  <div class="secure">
    <!-- 导航 -->
    <van-nav-bar
      title="安全中心"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
      :style="{ 'z-index': 2 }"
    />
    <div class="secure-bg"></div>
    <div class="secure-box">
      <div>
        <van-cell title="修改密码" size="large" is-link @click="popup" />
        <van-cell
          title="注销帐号"
          size="large"
          is-link
          @click="destroyedAccount"
        />
      </div>
      <div class="btn-logout">
        <van-button round color="#0c34ba" block @click="logOut"
          >退出登录</van-button
        >
      </div>
      <!-- 弹出层 -->
      <van-popup
        v-model="isOpen"
        position="bottom"
        :style="{ width: '100%', height: '50%' }"
        closeable
        close-icon="close"
        round
        overlay
        overlay-class="overlayClass"
      >
        <!-- 弹出层的内容 -->
        <div class="pop-content">
          <div class="pop-title">修改密码</div>
          <van-form>
            <van-field
              :right-icon="password.old.isPassword ? 'closed-eye' : 'eye-o'"
              @click-right-icon="passwordClick(password.old)"
              v-model="password.old.password"
              :type="password.old.isPassword ? 'password' : 'text'"
              placeholder="请输入旧的密码"
              autocomplete="off"
            />
            <van-field
              :right-icon="password.new.isPassword ? 'closed-eye' : 'eye-o'"
              @click-right-icon="passwordClick(password.new)"
              v-model="password.new.password"
              :type="password.new.isPassword ? 'password' : 'text'"
              placeholder="请输入新的密码"
              autocomplete="off"
            />
            <div class="register-btn">
              <van-button
                block
                type="info"
                native-type="submit"
                round
                @click="changePassword"
              >
                确定修改
              </van-button>
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      isOpen: false,
      // 密码是否显示
      isPassword: true,
      password: {
        old: {
          password: "",
          isPassword: true,
        },
        new: {
          password: "",
          isPassword: true,
        },
      },
    };
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 弹出密码修改页面
    popup() {
      this.isOpen = true;
    },
    // 修改密码
    changePassword() {
      let o = {
        oldPassword: {
          value: this.password.old.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
        newPassword: {
          value: this.password.new.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };
      validForm.valid(o);
      if (!validForm.valid(o)) {
        return;
      }
      if (this.password.old.password == this.password.new.password) {
        this.$toast("新密码不能和旧密码相同");
        return;
      }
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        password: this.password.new.password,
        oldPassword: this.password.old.password,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/updatePassword",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == "E001") {
            // 修改后自动退出登录 所以要把CSTK移除
            localStorage.removeItem("CSTK");
            this.$router.push({ name: "Login" });
          }
          console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    passwordClick(item) {
      item.isPassword = !item.isPassword;
    },
    // 退出登录
    logOut() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确定退出登录？",
          confirmButtonColor: "#0c34ba",
        })
        .then(() => {
          // on confirm
          console.log("退出登录确定");
          let tokenString = localStorage.getItem("CSTK");
          if (!tokenString) {
            return this.$router.push({
              name: "Login",
            });
          }

          let data = utils.queryString({
            appkey: this.appkey,
            tokenString,
          });

          this.$toast({
            message: "加载中",
            forbidClick: true,
            duration: 0,
            loadingType: "spinner",
          });
          this.axios({
            method: "POST",
            url: "/logout",
            data,
          })
            .then((result) => {
              this.$toast.clear();
              this.$toast(result.data.msg);
              if (result.data.code == "F001") {
                setTimeout(() => {
                  localStorage.removeItem("CSTK");
                  this.$router.push({ name: "Login" });
                }, 1000);
              }
            })
            .catch((err) => {
              console.log("error => ", err);
            });
        })
        .catch(() => {
          // on cancel
          console.log("退出登录取消");
        });
    },
    // 注销帐号
    destroyedAccount() {
      this.$dialog
        .confirm({
          title: "注销帐号",
          message: "是否确定？一旦确定，将无法恢复！",
          confirmButtonColor: "#0c34ba",
        })
        .then(() => {
          // on confirm
          console.log("confirm");
          let tokenString = localStorage.getItem("CSTK");
          if (!tokenString) {
            return this.$router.push({
              name: "Login",
            });
          }

          let data = utils.queryString({
            appkey: this.appkey,
            tokenString,
          });

          this.$toast({
            message: "加载中",
            forbidClick: true,
            duration: 0,
            loadingType: "spinner",
          });
          this.axios({
            method: "POST",
            url: "/destroyAccount",
            data,
          })
            .then((result) => {
              this.$toast.clear();
              console.log(result);
            })
            .catch((err) => {
              console.log("error => ", err);
            });
        })
        .catch(() => {
          // on cancel
          console.log("cancel");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.secure {
  padding-top: 46px;
  .secure-bg {
    height: 100px;
    background-color: #0c34ba;
  }
  .secure-box {
    margin: -30px 10px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  }
  .btn-logout {
    margin-top: 50px;
  }
  .pop-content {
    // margin-top: 50px;
    padding: 0 10px;
    .pop-title {
      margin: 15px 0;
      padding: 0 16px;
      font-size: 18px;
      line-height: 22px;
      font-weight: bold;
    }
    .register-btn {
      margin-top: 30px;
    }
    /deep/ .van-button--info {
      color: #fff;
      background-color: #0c34ba;
      border: #0c34ba;
    }
  }
}
</style>
