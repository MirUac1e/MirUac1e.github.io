<template>
  <div class="menu">
    <div class="menu-search">
      <van-search placeholder="请输入搜索关键词" shape="round" />
    </div>
    <!-- 菜单头部 -->
    <div class="menu-box">
      <div class="menu-list clearfix" :style="{ width: width + 'px' }">
        <div
          class="menu-list-item fl"
          v-for="(item, index) in typeData"
          :ref="`menu${index}`"
          :key="index"
          @click="toggleType(item)"
        >
          <div class="menu-content">
            <div class="img-box">
              <img
                class="auto-img"
                :src="item.isActive ? item.activeIcon : item.icon"
                alt=""
              />
            </div>
            <div class="text" :class="{ active: item.isActive }">
              {{ item.typeDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜单内容 -->
    <div class="menu-product">
      <!-- 骨架 -->
      <van-skeleton :row="9" :loading="isLoading">
        <div
          class="product-item"
          v-for="(item, index) in productData"
          :key="index"
          @click="getProductId(item.pid)"
        >
          <!-- 左边的图片 -->
          <div class="pro-img">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <!-- 右边的详细信息 -->
          <div class="pro-info">
            <div class="pro-text fl">
              <div class="pro-text-cn">{{ item.name }}</div>
              <div class="pro-text-us">{{ item.enname }}</div>
            </div>
            <div class="pro-price fr">{{ item.price }}</div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "Menu",
  data() {
    return {
      width: "0",
      typeData: [],
      productData: [],
      isLoading: true,
    };
  },
  created() {
    this.getTypeData();
  },
  methods: {
    // 获取商品类型
    getTypeData() {
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        methods: "get",
        url: "/type",
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 400) {
            // 添加图标
            let iconData = [
              {
                type: "latte",
                icon: require("../../assets/images/icons_05.gif"),
                activeIcon: require("../../assets/images/icons_19.gif"),
              },
              {
                type: "coffee",
                icon: require("../../assets/images/icons_03.gif"),
                activeIcon: require("../../assets/images/icons_18.gif"),
              },
              {
                type: "rena_ice",
                icon: require("../../assets/images/icons_07.gif"),
                activeIcon: require("../../assets/images/icons_20.gif"),
              },
            ];

            result.data.result.map((v) => {
              for (let i = 0; i < iconData.length; i++) {
                if (v.type == iconData[i].type) {
                  v.icon = iconData[i].icon;
                  v.activeIcon = iconData[i].activeIcon;
                  v.isActive = false;
                  break;
                }
              }
            });

            result.data.result.unshift({
              type: "isHot",
              typeDesc: "推荐",
              icon: require("../../assets/images/icons_09.gif"),
              activeIcon: require("../../assets/images/icons_21.gif"),
              isActive: true,
            });

            this.typeData = result.data.result;
            // 载入的时候 第一个激活 加载下面的内容
            this.getProductByType(this.typeData[0]);
          }
          //   console.log(result);
          this.$nextTick(() => {
            // 每一个的宽度
            // let refs = this.$refs.menu0[0].clientWidth;
            this.width = this.typeData.length * this.$refs.menu0[0].clientWidth;
          });
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 切换图标状态
    toggleType(item) {
      if (item.isActive) {
        return;
      }
      this.isLoading = true;
      for (let i = 0; i < this.typeData.length; i++) {
        if (this.typeData[i].isActive) {
          this.typeData[i].isActive = false;
        }
      }
      item.isActive = true;

      this.getProductByType(item);
    },
    // 根据商品类型获取商品数据
    getProductByType(item) {
      this.productData = [];
      // 判断 如果缓存里面有item type的数据 直接赋值后 终止
      if (sessionStorage.getItem(item.type)) {
        this.isLoading = false;
        this.productData = JSON.parse(sessionStorage.getItem(item.type));
        return;
      }
      // console.log(item.type)
      let params = {
        appkey: this.appkey,
        key: "type",
        value: item.type,
      };
      // 记录请求数据的type
      let dataKey = item.type;
      if (item.type == "isHot") {
        params.key = "isHot";
        params.value = 1;
        dataKey = "isHot";
      }
      // 获取数据
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        methods: "get",
        url: "/typeProducts",
        params,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == 500) {
            this.isLoading = false;
            this.productData = result.data.result;
            // 将商品数据缓存
            window.sessionStorage.setItem(
              dataKey,
              JSON.stringify(result.data.result)
            );
          }
          // console.log(this.productData)
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 点击获取商品id => pid
    getProductId(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
  },
};
</script>

<style lang="less" scoped>
.menu {
  /deep/ .van-search {
    padding: 10px;
    background-color: #fff;
  }
  .menu-search {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  /deep/ .van-search__content {
    background-color: #f0f0f0;
  }
  .menu-box {
    overflow-y: auto;
    position: sticky;
    background-color: #fbfbfb;
    top: 54px;
    .menu-list {
      //   width: 240px;
      background-color: #fbfbfb;
      .menu-list-item {
        width: 80px;
        height: 80px;
        position: relative;
        .menu-content {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          .img-box {
            width: 50px;
          }
          .text {
            text-align: center;
            font-size: 14px;
            &.active {
              color: #0c34ba;
            }
          }
        }
      }
    }
  }
  .menu-product {
    margin-top: 20px;
    .product-item {
      display: flex;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      .pro-img {
        width: 80px;
        border-radius: 50%;
        overflow: hidden;
      }
      .pro-info {
        margin-left: 20px;
        width: calc(~"100% - 100px");
        .pro-text {
          height: 50px;
          .pro-text-cn {
            font-weight: bold;
            height: 30px;
            font-size: 17px;
          }
          .pro-text-us {
            height: 20px;
            font-size: 12px;
            color: #999;
          }
        }
        .pro-price {
          color: #0c34ba;
          font-weight: bold;
          font-size: 16px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
