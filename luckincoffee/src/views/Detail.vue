<template>
  <!-- 商品详情页面 -->
  <div class="detail">
    <!-- 导航 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      :fixed="true"
      @click-left="back"
    />
    <!-- 上面的图片 -->
    <div class="detail-img">
      <img :src="product.large_img" class="auto-img" />
      <div class="detail-img-text">
        <div class="detail-img-cntext">{{ product.name }}</div>
        <div class="detail-img-ustext">{{ product.enname }}</div>
      </div>
    </div>
    <!-- 中间的详细信息 -->
    <div class="detail-info">
      <div class="rule-box">
        <div
          class="rule-item clearfix"
          v-for="(item, index) in product.rules"
          :key="index"
        >
          <!-- 规格标题 -->
          <div class="rule-item-title ">{{ item.title }}</div>
          <div class="fl clearfix">
            <!-- 规格内容 -->
            <div
              class="rule-item-tag fl"
              v-for="(v, i) in item.rules"
              :key="i"
              :class="{ active: v.isActive }"
              @click="toggleRule(v, index)"
            >
              {{ v.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- 描述信息 -->
      <div class="desc-box">
        <div class="desc-title">商品描述</div>
        <div class="desc-content">
          <div
            class="desc-text"
            v-for="(item, index) in product.desc"
            :key="index"
          >
            {{ index + 1 }}、{{ item }}
          </div>
        </div>
      </div>
      <!-- 价格信息 -->
      <div class="clearfix desc-price-count">
        <div class="fl price">￥{{ product.price * count }}</div>
        <div class="fr">
          <van-stepper
            v-model="count"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
    </div>
    <!-- 底部菜单 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="cart"
        text="购物车"
        :badge="badgeCount == 0 ? '' : badgeCount"
        color="#999"
        @click="toShopBag"
      />
      <van-goods-action-icon
        icon="like"
        text="收藏"
        @click="like"
        :class="{ active: isLike }"
        color="#999"
      />
      <van-goods-action-button
        type="danger"
        color="#6a91ec"
        text="加入购物车"
        @click="addShopBag"
      />
      <van-goods-action-button
        type="danger"
        color="#0c34ba"
        text="立即购买"
        @click="buyNow"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      count: 1,
      pid: "",
      product: [],
      isLike: false,
      badgeCount: 0,
    };
  },
  created() {
    // 保存商品pid
    this.pid = this.$route.query.pid;
    // 根据pid获取商品数据和规格
    this.getProductByPid();
    // 根据用户 查看是否收藏了该商品
    this.findIsLike();
    // 查询购物车商品数量;
    this.findShopBagData();
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 立即购买
    buyNow(isBuying) {
      this.addShopBag(true);
    },
    // 去到购物车
    toShopBag() {
      this.$router.push({ name: "Shopbag" });
    },
    // 根据商品的pid选择规格、详情等信息
    getProductByPid() {
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        methods: "GET",
        params: {
          appkey: this.appkey,
          pid: this.pid,
        },
        url: "/productDetail",
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 600) {
            // 把描述信息 按回车 分解成一段段
            result.data.result[0].desc = result.data.result[0].desc.split(/\n/);
            // 处理商品规格信息
            // [{
            //     title : '温度'
            //     rules : [{
            //         title : "热",
            //         isActive : true
            //     }]
            // }]
            let rulesItems = ["tem", "sugar", "cream", "milk"];
            let ruleData = [];
            rulesItems.map((v) => {
              // 判断饮品是否有上面需求的属性 没有就返回
              if (result.data.result[0][v] == "") {
                // console.log(`v的${v}是空的`)
                return;
              }
              // 查找属性的名称
              let rule = {
                title: result.data.result[0][`${v}_desc`],
                rules: [],
              };
              // 根据名称 查找名称里面有的选择
              let r = result.data.result[0][v].split("/");
              // r = [热，冷]
              r.map((value, index) => {
                let o = {
                  title: value,
                  isActive: index == 0 ? true : false,
                };
                rule.rules.push(o);
              });

              ruleData.push(rule);
              // console.log(ruleData)
            });

            result.data.result[0].rules = ruleData;

            this.product = result.data.result[0];
          }
          // console.log("ppp=>", this.product);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 切换规格
    toggleRule(item, index) {
      if (item.isActive) {
        return;
      }
      // 上面v-for有两层
      // 在上面的数据中 index是第一层大的 第二层的数字是i
      // console.log("aaa => ", this.product.rules[index].rules);
      let x = this.product.rules[index].rules;
      for (let i = 0; i < x.length; i++) {
        if (x[i].isActive) {
          x[i].isActive = false;
          break;
        }
      }
      item.isActive = true;
    },
    // 收藏商品
    like() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        this.$toast('请先登录')
        return
        // return this.$router.push({ name: "Login" });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        pid: this.pid,
      });

      let url = this.isLike ? "notlike" : "like";

      this.$toast({
        message: "加载中",
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
          if (result.data.code == 700) {
            return this.$router.push({ name: "Login" });
          } else if (result.data.code == 800) {
            // 收藏成功
            this.$toast(result.data.msg);
            this.isLike = true;
          } else if (result.data.code == 900) {
            // 取消收藏成功
            this.$toast(result.data.msg);
            this.isLike = false;
          } else {
            console.log(result.data.msg);
          }
          console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 查询是否被收藏
    findIsLike() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        
        return
        // return this.$router.push({ name: "Login" });
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/findAllLike",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 2000) {
            for (let i = 0; i < result.data.result.length; i++) {
              if (result.data.result[i].pid == this.pid) {
                this.isLike = true;
                break;
              }
            }
          } else {
            console.log("查询所有收藏结果不成功，=> ", result);
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 添加购物车商品
    addShopBag(isBuying) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      // 获取商品规格数据
      let rulesData = this.product.rules;
      // 保存商品激活了的数据
      let rule = "";
      // 整理数据
      rulesData.map((v) => {
        for (let i = 0; i < v.rules.length; i++) {
          if (v.rules[i].isActive) {
            rule += v.rules[i].title + "/";
          }
        }
      });
      rule = rule.slice(0, -1);

      let data = utils.queryString({
        tokenString,
        appkey: this.appkey,
        pid: this.pid,
        rule,
        count: this.count,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/addShopcart",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 3000) {
            // 成功加入
            // 更改购物车内容数量数据(有多少条购物车数据，不是购物车商品总数量)
            if (result.data.status == 1) {
              this.badgeCount++;
            }
            if (isBuying === true) {
              setTimeout(() => {
                // 事件前半部分加入购物车返回sid
                // 把sid传到pay页面就是立即购买
                this.$router.push({
                  name: "Pay",
                  query: { sids: result.data.sid },
                });
              }, 600);
            } else {
              this.$toast(result.data.msg);
            }
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 查询购物车商品数量
    findShopBagData() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return
        // return this.$router.push({ name: "Login" });
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          console.log(result);
          if (result.data.code == 5000) {
            this.badgeCount = result.data.result.length;
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
.detail {
  padding-bottom: 20px;
  .detail-img {
    margin-top: 46px;
    position: relative;
    .detail-img-text {
      position: absolute;
      bottom: 85px;
      left: 30px;
      //   border: 1px solid aqua;
      font-size: 18px;
      color: white;
      .detail-img-cntext {
        padding: 5px;
      }
      .detail-img-ustext {
        padding: 0 5px;
      }
    }
  }
  .detail-info {
    background-color: #fff;
    // height: 300px;
    position: relative;
    top: -30px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
    .rule-box {
      border-bottom: 1px solid #e8e8e8;
      padding: 10px 0 20px 0;
      .rule-item {
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
        .rule-item-title,
        .rule-item-tag {
          height: 30px;
          width: 80px;
          font-size: 14px;
          line-height: 30px;
          color: #444;
        }
        .rule-item-tag {
          color: black;
          background-color: #ebebeb;
          margin-right: 20px;
          border-radius: 15px;
          text-align: center;
          color: #6a6a6a;
          &:last-child {
            margin: 0;
          }
          &.active {
            background-color: #0c34ba;
            color: white;
          }
        }
      }
    }
    .desc-box {
      border-bottom: 1px solid #e8e8e8;
      .desc-title {
        font-size: 14px;
        color: #444;
        padding: 10px 0;
      }
      .desc-content {
        margin-bottom: 20px;
        .desc-text {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .desc-price-count {
      margin-top: 20px;
      .price {
        color: #0c34ba;
        font-size: 14px;
        font-weight: bold;
        height: 24px;
        line-height: 24px;
      }
      // 按钮颜色
      /deep/ .van-stepper__minus {
        border: 1px solid #0c24ba;
        color: #0c24ba;
      }
      /deep/ .van-stepper__plus {
        background-color: #0c24ba;
      }
    }
  }
  // icon颜色
  /deep/ .van-goods-action-icon.active {
    .van-icon-like::before {
      color: #0c34ba;
    }
  }
}
</style>
