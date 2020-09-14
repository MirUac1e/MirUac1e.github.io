<template>
  <!--  地址管理页面 -->
  <div class="address">
    <!-- 导航 -->
    <van-nav-bar
      title="地址管理"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
    />
    <!-- 背景 -->
    <div class="address-bg"></div>
    <!-- 地址 -->
    <div class="address-box">
      <div class="address-item">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @edit="editAddress"
          @add="toAdd"
        />
      </div>
      <!-- 空 -->
      <van-empty description="地址栏是空的desu" v-show="list < 1">
        <van-button type="default" color="#0c43ba" to="Addaddress"
          >去添加一个地址把</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
      currentAddress: [],
    };
  },
  created() {
    this.findAddress();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 点击编辑地址
    editAddress(item, index) {
      this.$router.push({ name: "Addaddress", query: { aid: item.id } });
    },
    // 查询所有地址
    findAddress() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 20000) {
            // 成功
            result.data.result.map((v) => {
              this.list.push({
                id: v.aid,
                name: v.name,
                tel: v.tel,
                address: v.province + v.city + v.county + v.addressDetail,
                isDefault: v.isDefault == 1 ? true : false,
                // isDefault : Boolean(v.isDefault)
              });
            });
          }
          // console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 跳转到添加地址页面
    toAdd() {
      this.$router.push({ name: "Addaddress" });
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  padding-top: 46px;
  /deep/ .van-button--danger {
    color: #fff;
    background-color: #0c43ba;
    border: 1px solid #0c43ba;
  }
  /deep/ .van-switch--on {
    background-color: #0c43ba;
  }
  /deep/ .van-tag--danger {
    background-color: #0c43ba;
  }
  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #0c43ba;
    border-color: #0c43ba;
  }
  /deep/ .van-radio__icon .van-icon {
    display: none;
  }
  padding-top: 46px;
  .address-bg {
    height: 100px;
    background-color: #0c34ba;
  }
  .address-box {
    margin: -30px 10px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    .van-address-item:not(:last-child) {
      margin-bottom: 12px;
      border-bottom: 1px dashed #0c34ba;
    }
    .van-address-item {
      border-radius: 0;
    }
    .van-address-item:not(:last-child) {
      margin-bottom: 0;
    }
    .van-address-list {
      padding: 12px 12px 30px;
    }
  }
}
</style>
