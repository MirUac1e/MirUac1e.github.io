<template>
  <div class="serach">
    <van-search
      v-model="searchData"
      placeholder="请输入搜索关键词"
      input-align="center"
      :fixed="true"
      show-action
      @cancel="back"
      @input="ddd"
    />
    <div class="product-box clearfix">
      <div
        class="product-item fl"
        :class="[index % 2 == 0 ? 'p-left' : 'p-right']"
        v-for="(item, index) in productDatas"
        :key="index"
        @click="getProductId(item.pid)"
      >
        <div class="p-img">
          <img class="auto-img" :src="item.smallImg" alt="" />
        </div>
        <div class="pro-name one-text">{{ item.name }}</div>
        <div class="clearfix">
          <!-- <div class="en-pro-name one-text fl">{{ item.enname }}</div> -->
          <div class="pro-price fl">￥{{ item.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: "",
      productDatas: [],
    };
  },
  methods: {
    back() {
      this.$router.push({ name: "Home" });
    },
    // 跳转到详情页面
    getProductId(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
    // 搜索事件
    ddd() {
      if (this.searchData == "") {
        return;
      }
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "get",
        url: "/search",
        params: {
          appkey: this.appkey,
          name: this.searchData,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == "Q001") {
            this.productDatas = result.data.result;
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
.product-box {
  margin-top: 10px;
  .product-item {
    width: calc(~"50% - 30px");
    // background: #ddd;
    padding: 10px;
  }
  .p-left {
    margin-right: 10px;
  }
  .p-right {
    margin-left: 10px;
  }
  .p-img {
    border-radius: 10px;
    overflow: hidden;
  }
  .pro-name {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
  }
  .en-pro-name {
    // color: #666;
    font-size: 14px;
    width: calc(~"100% - 50px");
  }
  .pro-price {
    font-size: 16px;
    width: 50px;
  }
}
</style>
