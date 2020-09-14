<template>
<!-- 提交订单页面 -->
  <div class="pay">
    <!-- 导航 -->
    <van-nav-bar
      title="提交订单"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
    />
    <!-- 地址 -->
    <div class="address-box">
      <div class="address">
        <div class="clearfix" @click="openAddressBox">
          <div class="fl address-title">选择收货地址</div>
          <div class="fl address-title-icon"><van-icon name="arrow" /></div>
        </div>
        <div class="detail-info">
          <div class="clearfix">
            <div class="fl name">{{ currentAddress.name }}</div>
            <div class="fl phone">{{ currentAddress.tel }}</div>
          </div>

          <div class="address-info">
            {{ currentAddress.address }}
          </div>
        </div>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-box">
      <div class="order-info">
        <div class="order-title">订单信息</div>
        <!-- 商品内容的框 -->
        <div>
          <!-- 每一个商品 -->
          <div
            class="clearfix pro-box"
            v-for="(item, index) in productsData"
            :key="index"
          >
            <!-- 商品图片 -->
            <div class="fl pro-img">
              <img class="auto-img" :src="item.small_img" alt="" />
            </div>
            <!-- 商品信息 -->
            <div class="fl pro-info">
              <div class="clearfix">
                <div class="name-cn fl">{{ item.name }}</div>
                <div class="pro-rule fl">{{ item.rule }}</div>
              </div>
              <div class="name-us">
                {{ item.enname }}
              </div>
              <div class="clearfix btm">
                <!-- 价格 -->
                <div class="fl pro-price">￥{{ item.price }}</div>
                <div class="fr pro-number">x{{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 总共的商品数量、价格 -->
        <div class="clearfix pro-allinfo">
          <div class="fl pro-count">共计{{ AllCount }}件商品</div>
          <div class="fr pro-total">合计￥{{ total }}</div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="button-pay">
      <van-button type="default" round block color="#0c43ba" @click="pay"
        >立即结算</van-button
      >
    </div>
    <!-- 弹出 -->
    <van-popup v-model="isOpen" position="bottom">
      <div class="select-address-title">选择收货地址</div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @select="selectAddress"
        @add="toAdd"
      />
    </van-popup>
  </div>
</template>
<script>
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      isOpen: false,
      // 选中默认地址的id
      chosenAddressId: "",
      // 拿到的全部地址
      list: [],
      // 当前选中的地址
      currentAddress: {
        name: "",
        tel: "",
        address: "",
      },
      // 需要购买的商品数据
      productsData: [],
      AllCount: 0,
      total: 0,
      sids:[],
    };
  },
  created() {
    
    this.findAddress();
    this.getShopBagDataBysids();
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 立即结算
    pay() {
      // 判断是否选择了地址
      if (this.chosenAddressId == "") {
        this.$toast("请选择收货地址");
        return;
      }
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }
      let sids = this.$route.query.sids.split("-");
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        sids : JSON.stringify(sids),
        phone : this.currentAddress.tel,
        address : this.currentAddress.address,
        receiver : this.currentAddress.name,
      });
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "post",
        url: "/pay",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if(result.data.code == 60000){
            this.$toast(result.data.msg)
            this.$router.push({name:'Order'})
          }
          console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 根据所有商品数据计算所有件数和总价
    sum() {
      this.AllCount = 0;
      this.total = 0;
      this.productsData.map((v) => {
        this.AllCount += v.count;
        this.total += v.count * v.price;
      });
    },
    // 根据sids查询需要结算的商品数据
    getShopBagDataBysids() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }
      let sids = this.$route.query.sids.split("-");
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify(sids),
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 50000) {
            // 如果订单为空就直接回到菜单
            if(result.data.result.length === 0){
              return this.$router.push({name:'Menu'})
            }
            result.data.result.map((v) => {
              this.productsData.push(v);
            });
          }
          // console.log(this.productsData);
          this.sum();
        })
        .catch((err) => {
          console.log("error => ", err);
        });
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
              // 默认地址
              if (Boolean(v.isDefault)) {
                this.currentAddress.name = v.name;
                this.currentAddress.tel = v.tel;
                this.currentAddress.address =
                  v.province + v.city + v.county + v.addressDetail;
                this.chosenAddressId = v.aid;
              }
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
    // 打开地址栏
    openAddressBox() {
      this.isOpen = true;
    },
    // 选择地址
    selectAddress(item, index) {
      this.isOpen = false;
      // console.log(item, index);
      this.currentAddress.name = item.name;
      this.currentAddress.tel = item.tel;
      this.currentAddress.address = item.address;
    },
  },
};
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 50px;
  // 地址
  .address-box {
    padding: 10px 0;
    .address {
      // height: 200px;
      // background-color: aqua;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;
      .address-title {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        color: #444;
      }
      .address-title-icon {
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        .van-icon-arrow::before {
          font-size: 14px;
          line-height: 32px;
          color: #444;
        }
      }
      .detail-info {
        margin-top: 10px;
        min-width: 59px;
        .name {
          font-size: 16px;
          color: #0c34ba;
          font-weight: bold;
          line-height: 30px;
        }
        .phone {
          font-size: 16px;
          color: #999;
          line-height: 30px;
          margin-left: 20px;
        }
        .address-info {
          font-size: 14px;
          color: #999;
          margin-top: 10px;
        }
      }
    }
  }
  // 订单信息
  .order-box {
    // height: 200px;
    // background-color: aqua;
    background-color: #fff;
    border-radius: 10px;
    .order-info {
      padding: 10px;
      .order-title {
        font-weight: bold;
        font-size: 14px;
        line-height: 30px;
        color: #444;
      }
      // 商品详细信息
      .pro-box {
        border-radius: 10px;
        &:first-of-type {
          margin-top: 5px;
        }
        // background-color: red;
        margin-top: 10px;
        .pro-img {
          width: 60px;
          height: 60px;
          margin: 0 10px;
          overflow: hidden;
        }

        .pro-info {
          position: relative;
          width: calc(~"100% - 90px");
          height: 60px;

          // background-color: aqua;
          .name-cn {
            font-size: 15px;
            color: #444;
            line-height: 15px;
          }

          .pro-rule {
            margin-left: 5px;
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }

          .name-us {
            font-size: 14px;
            line-height: 14px;
            color: #999;
          }

          .btm {
            position: absolute;
            left: 0;
            bottom: 2px;
            width: 100%;

            .pro-price {
              font-size: 14px;
              color: #0c34ba;
            }
            .pro-number {
              font-size: 14px;
              color: #999;
            }
          }
        }
      }
      // 总共的商品数量、价格
      .pro-allinfo {
        margin-top: 30px;
        // border-radius: 10px;
        border-top: 1px dashed black;
        // border-top: 1px solid #cecece;
        padding: 10px;
        // background-color: yellow;
        .pro-count,
        .pro-total {
          font-size: 14px;
          font-weight: bold;
          color: #444;
          line-height: 30px;
        }
        .pro-total {
          color: #0c34ba;
        }
      }
    }
  }
  // 按钮
  .button-pay {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    width: calc(~"100% - 20px");
  }
  // 弹出的地址栏
  .select-address-title {
    text-align: center;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
  }
  // 隐藏修改标签
  /deep/ .van-icon-edit::before {
    content: "";
  }
  // 默认颜色
  /deep/ .van-tag--danger {
    background-color: #0c34ba;
  }
  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #0c34ba;
    border-color: #0c34ba;
  }
  /deep/.van-button--danger {
    border: 1px solid #0c34ba;
    background-color: #0c34ba;
  }
  /deep/ .van-address-item__value {
    padding-right: 0;
  }
}
</style>
