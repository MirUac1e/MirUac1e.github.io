<template>
  <div class="order">
    <!-- 导航 -->
    <van-nav-bar
      title="我的订单"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
      :style="{ 'z-index': 2 }"
    />
    <!-- 背景 -->
    <div class="order-bg"></div>
    <!-- 菜单 -->
    <div class="tab-box">
      <van-tabs
        v-model="tabIndex"
        color="#0c34ba"
        title-active-color="#0c34ba"
        @change="toggleStatus"
      >
        <van-tab :title="x.title" v-for="(x, y) in tabItems" :key="y">
          <div
            class="tab-item"
            v-for="(item, index) in orderDatas"
            :key="index"
          >
            <!-- 1 -->
            <div class="clearfix tab-item-box">
              <!-- 第一层 左 -->
              <div class="fl num">{{ item.orderId }}</div>
              <!-- 第一层 右 -->
              <div class="fr">
                <div
                  class="text"
                  v-if="item.status == 1"
                  @click="confirmReceive(item, index)"
                >
                  确认收货
                </div>
                <div class="text-box" v-else>
                  <div class="finished">已完成</div>
                  <div class="remove" @click="deleteOrder(item, index)">
                    <van-icon name="delete"></van-icon>
                  </div>
                </div>
              </div>
            </div>

            <!-- 商品详情 -->
            <div
              class="clearfix pro-box"
              v-for="(v, i) in item.products"
              :key="i"
            >
              <!-- 商品图片 -->
              <div class="fl pro-img">
                <img class="auto-img" :src="v.smallImg" />
              </div>
              <!-- 商品信息 -->
              <div class="fl pro-info">
                <div class="clearfix">
                  <div class="name-cn fl">{{ v.name }}</div>
                  <div class="pro-rule fl">{{ v.rule }}</div>
                </div>
                <div class="name-us">
                  {{ v.enname }}
                </div>
                <div class="clearfix btm">
                  <!-- 价格 -->
                  <div class="fl pro-price">{{ v.price }}</div>
                  <div class="fr pro-number">x {{ v.count }}</div>
                </div>
              </div>
            </div>

            <!-- 总共的商品数量、价格 -->
            <div class="pro-allinfo">
              <div class="pro-time">
                {{ item.date | formatDate("yyyy-MM-dd hh:mm:ss") }}
              </div>
              <div class="clearfix">
                <div class="fl pro-count">共计{{ item.count }}件商品</div>
                <div class="fr pro-total">合计￥{{ item.total }}元</div>
              </div>
            </div>
          </div>

          <!-- 空 -->
          <van-empty
            description="订单栏是空的desu"
            v-show="orderDatas.length < 1"
          >
            <van-button type="default" color="#0c43ba" to="Menu"
              >去逛逛把</van-button
            >
          </van-empty>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      // 激活第几个
      tabIndex: 0,
      orderDatas: [],
      tabItems: [{ title: "全部" }, { title: "进行中" }, { title: "已完成" }],
    };
  },
  created() {
    this.findOrder(0);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 找到所有订单
    // 其中 status 值为 0, 1, 2 ==> 0: 全部，1: 待收货，2: 已收货
    findOrder(status) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }
      // 一开始清空数据
      this.orderDatas = [];
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/findOrder",
        params: {
          appkey: this.appkey,
          tokenString,
          status,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 70000) {
            let orderData = {};
            // {
            //   订单号 : {
            //     日期
            //     件数
            //     价格
            //     商品数据[{},{}]
            //   }
            // }
            result.data.result.map((v) => {
              if (!orderData[v.oid]) {
                orderData[v.oid] = {
                  orderId: v.oid,
                  date: v.createdAt,
                  count: v.count,
                  total: Number(v.count) * Number(v.price),
                  status: v.status,
                  products: [v],
                };
              } else {
                orderData[v.oid].count += v.count;
                orderData[v.oid].total += Number(v.count) * Number(v.price);
                orderData[v.oid].products.push(v);
              }
            });
            // 排序
            for (let key in orderData) {
              this.orderDatas.push(orderData[key]);
            }

            this.orderDatas.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            // console.log(this.orderDatas);
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 切换查询状态
    toggleStatus(name, title) {
      this.findOrder(name);
    },
    // 确定收货
    confirmReceive(item, index) {
      // item 商品详情
      // item.status 商品状态
      // item.orderId 订单号
      // index 第几个
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        oid: item.orderId,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/receive",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == 80000) {
            if (this.tabIndex == 1) {
              this.orderDatas.splice(index, 1);
            } else {
              item.status = 2;
              // 如果在全部页面点击收货 应该刷新页面
            }
          }
          // console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 删除订单
    deleteOrder(item, index) {
      // item 商品详情
      // item.status 商品状态
      // item.orderId 订单号
      // index 第几个
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        oid: item.orderId,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/removeOrder",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == 90000) {
            this.orderDatas.splice(index, 1);
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
.order {
  padding-top: 46px;
  // 改导航的颜色
  /deep/ .van-nav-bar__text {
    color: #0c34ba;
  }
  /deep/ .van-nav-bar .van-icon {
    color: #0c34ba;
  }
  .order-bg {
    height: 100px;
    background-color: #0c34ba;
  }
  .tab-box {
    margin: -30px 10px 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    .tab-item {
      padding: 10px;
      border-bottom: 1px solid #e8e8e8;
      .tab-item-box {
        margin-top: 10px;
        .num,
        .text {
          color: #999;
          font-size: 14px;
          line-height: 40px;
        }
        .text {
          color: #0c34ba;
          font-weight: bold;
        }
        .text-box {
          display: flex;
          .finished {
            line-height: 40px;
            color: #0c34ba;
            font-weight: bold;
            font-size: 14px;
          }
          .remove {
            width: 20px;
            height: 20px;
            margin-top: 10px;
            font-size: 20px;
            margin-left: 10px;
          }
        }
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
        .pro-total,
        .pro-time {
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
}
</style>
