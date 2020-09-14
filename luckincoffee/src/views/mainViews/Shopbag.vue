<template>
  <div class="shopbag">
    <!-- 导航 -->
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow:fixed="true"
      @click-right="toggleEdit"
      @click-left="back"
    >
      <template #right v-if="shopBagData.length > 0">
        <div>
          {{ isEdit ? "完成" : "编辑" }}
        </div>
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div>
      <van-swipe-cell
        :disabled="!isEdit"
        v-for="(item, index) in shopBagData"
        :key="index"
      >
        <van-cell :border="false">
          <div class="clearfix pro-box">
            <!-- 选中栏 -->
            <div class="fl check">
              <van-checkbox
                v-model="item.isCheck"
                icon-size="24px"
                checked-color="#0c34ba"
                @click="toggleCheck(item)"
              />
            </div>
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
                <div class="fl pro-price">￥{{ item.price * item.count }}</div>
                <div class="fr ">
                  <!-- 步进器 -->
                  <van-stepper
                    v-model="item.count"
                    theme="round"
                    button-size="24"
                    disable-input
                    @change="modifyCount(item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </van-cell>
        <template #right>
          <van-button
            square
            type="danger"
            text="删除"
            color="#0c34ba"
            @click="removeOneShopBag(item.sid)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 空 -->
    <van-empty description="购物袋是空的desu" v-show="shopBagData.length < 1">
      <van-button type="default" color="#0c43ba" to="Menu">去逛逛把</van-button>
    </van-empty>
    <!-- 底部菜单 -->
    <div v-if="shopBagData.length > 0">
      <!-- 提交订单栏 -->
      <van-submit-bar
        v-show="!isEdit"
        :price="total"
        button-text="提交订单"
        button-color="#0c34ba"
        @submit="commit"
      >
        <van-checkbox
          v-model="allChecked"
          checked-color="#0c34ba"
          icon-size="24px"
          @click="isAllCheck"
          >全选
        </van-checkbox>
      </van-submit-bar>
      <!-- 删除栏 -->
      <van-submit-bar
        v-show="isEdit"
        button-text="删除所选"
        button-color="#0c43ba"
        @submit="removeSelectShopBag"
      >
        <van-checkbox
          v-model="allChecked"
          checked-color="#0c34ba"
          icon-size="24px"
          @click="isAllCheck"
          >全选
        </van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { utils } from "../../assets/js/utils";
export default {
  data() {
    return {
      allChecked: false,
      // 是否是编辑状态
      isEdit: false,
      pids: [],
      shopBagData: [],
      total: 0,
    };
  },
  created() {
    this.findShopBagData();
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 提交订单
    commit() {
      let sids = [];
      this.shopBagData.map((v) => {
        if (v.isCheck) {
          sids.push(v.sid);
        }
      });
      if(sids.length ===0){
        this.$toast("请选择至少一件商品")
        return
      }
      sids = sids.join("-");

      this.$router.push({ name: "Pay", query: { sids } });
    },
    // 切换编辑状态
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    // 切换是否全选
    isAllCheck() {
      this.shopBagData.map((v) => {
        v.isCheck = this.allChecked;
      });
      this.sum();
    },
    // 单选切换check状态
    // 判断是否全部选上
    toggleCheck(item) {
      this.sum();
      for (let i = 0; i < this.shopBagData.length; i++) {
        if (this.shopBagData[i].isCheck == false) {
          this.allChecked = false;
          return;
        }
        this.allChecked = true;
      }
    },
    // 查询购物车商品内容
    findShopBagData() {
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
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 5000) {
            result.data.result.map((v) => {
              v.isCheck = false;
            });
            this.shopBagData = result.data.result;
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 编辑购物车商品的数量
    modifyCount(item) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        sid: item.sid,
        count: item.count,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 6000) {
            // 成功修改
            this.sum();
            // console.log(result.data.msg);
          }
          console.log("编辑购物车数量 ", result.data.msg);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 删除购物车内容
    removeShopBagData(sids) {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({
          name: "Login",
        });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        sids: JSON.stringify(sids),
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "POST",
        url: "/deleteShopcart",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.sum();
          // console.log(result);
          this.$toast(result.data.msg);
          this.findShopBagData();
          // ？商品数量不唯一的时候 且不是最后一个 重新渲染会触发编辑数量？
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 单个删除
    removeOneShopBag(sid) {
      this.removeShopBagData([sid]);
      // 可以把remosheopbagdata 的axios返回
      // 参数多增加一个index 然后在 then 中删除shopbagdata第index个元素
      // splice(index,1)
    },
    // 删除选中
    removeSelectShopBag() {
      // 遍历所有 ischeck为真 选中 就删除
      for (let i = 0; i < this.shopBagData.length; i++) {
        if (this.shopBagData[i].isCheck) {
          this.removeShopBagData([this.shopBagData[i].sid]);
          this.shopBagData.splice(i, 1);
          i--;
        }
      }
      // 先拿到所有的sid 然后调用方法
      // let sids = [];
      // this.shopBagData.map((v) => {
      //   if (v.isCheck) {
      //     sids.push(v.sid);
      //   }
      // });
      // console.log(sids);
      // this.removeShopBagData(sids)
      //   .then((result) => {
      //     this.$toast.clear();
      //     if (result.data.code == 7000) {
      //       for (let i = this.shopBagData.length - 1; i >= 0; i--) {
      //         if (this.shopBagData[i].isCheck) {
      //           this.shopBagData.splice(i, 1);
      //         }
      //       }
      //     }
      //     this.$toast(result.data.msg);
      //   })
      //   .catch((err) => {
      //     console.log("error => ", err);
      //   });
    },
    // 统计总金额
    sum() {
      // console.log("在算了 在算了")
      this.total = 0;
      this.shopBagData.map((v) => {
        if (v.isCheck) {
          this.total += Number(v.price) * v.count;
        }
      });
      this.total = this.total * 100;
    },
  },
};
</script>

<style lang="less" scoped>
.shopbag {
  padding-bottom: 50px;

  .pro-box {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
  }

  .check {
    width: 24px;
    height: 24px;
    margin-top: 23px;
  }

  .pro-img {
    width: 70px;
    height: 70px;
    margin: 0 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .pro-info {
    position: relative;
    width: calc(~"100% - 114px");
    height: 70px;

    // background-color: aqua;
    .name-cn {
      font-size: 18px;
      color: #444;
    }

    .pro-rule {
      margin-left: 5px;
      font-size: 14px;
      color: #999;
    }

    .name-us {
      font-size: 15px;
      line-height: 15px;
      color: #999;
    }

    .btm {
      position: absolute;
      left: 0;
      bottom: 2px;
      width: 100%;

      .pro-price {
        font-size: 18px;
        color: #0c34ba;
      }
    }
  }
}

//删除按钮
/deep/ .van-swipe-cell__right .van-button {
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
}

/deep/ .van-swipe-cell__right {
  padding: 5px 0;
}

// 底部提交
/deep/ .van-submit-bar {
  bottom: 50px;
}

/deep/ .van-submit-bar__price {
  color: #0c34ba;
}

/deep/ .van-button {
  margin-left: auto;
}

// qita
/deep/ .van-stepper__plus {
  background-color: #0c43ba;
}

/deep/ .van-stepper__minus {
  color: #0c43ba;
  border-color: #0c43ba;
}

/deep/ .van-cell {
  padding: 0 10px;
  background-color: rgb(244, 244, 244);
}
</style>
