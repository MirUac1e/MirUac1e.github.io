<template>

  <!-- 新增地址页面 -->
  <div class="addaddress">
    <!-- 导航 -->
    <van-nav-bar
      :title="aid ? '编辑地址' : '新增地址'"
      @click-left="back"
      left-text="返回"
      left-arrow
      :fixed="true"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!aid"
      show-set-default
      area-placeholder
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="addressInfo"
      @save="saveAddress"
      @delete="deleteAddress"
    />
  </div>
</template>

<script>
import areaList from "../assets/js/area";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      areaList,
      // 地址数据初始值
      addressInfo: {
        id: "",
        name: "",
        tel: "",
        provice: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false,
      },
      // 判断是否是编辑
      aid: "",
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    if (this.aid) {
      this.getAddressByAid();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 删除方法
    deleteAddress() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }

      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        aid: this.aid,
      });

      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "post",
        url: "/deleteAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == 10000) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 根据aid查询地址
    getAddressByAid() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/findAddressByAid",
        params: {
          appkey: this.appkey,
          tokenString,
          aid: this.aid,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // console.log(result);
          if (result.data.code == 40000) {
            this.addressInfo.id = result.data.result[0].aid;
            this.addressInfo.name = result.data.result[0].name;
            this.addressInfo.tel = result.data.result[0].tel;
            this.addressInfo.provice = result.data.result[0].provice;
            this.addressInfo.city = result.data.result[0].city;
            this.addressInfo.county = result.data.result[0].county;
            this.addressInfo.addressDetail =
              result.data.result[0].addressDetail;
            this.addressInfo.areaCode = result.data.result[0].areaCode;
            this.addressInfo.postalCode = result.data.result[0].postalCode;
            this.addressInfo.isDefault = Boolean(
              result.data.result[0].isDefault
            );
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 编辑地址方法
    editAddress(addressinfo) {
      // addressinfo指 save方法传入的参数 输入的地址内容
      // 判断地址是否被修改
      let isModify = false;
      for (let key in this.addressInfo) {
        if (this.addressInfo[key] != addressinfo[key]) {
          // 已经被修改
          isModify = true;
          break;
        }
      }
      if (!isModify) {
        this.$toast("地址信息没有被修改");
        return;
      }
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      // 整理数据
      let content = Object.assign({}, addressinfo);

      content.aid = content.id;
      delete content.country;
      delete content.provice;
      delete content.id;

      // content.isDefault ? content.isDefault = 1 : content.isDefault = 0
      content.isDefault = Number(content.isDefault);
      content.appkey = this.appkey;
      content.tokenString = tokenString;

      let data = utils.queryString(content);
      // ajax
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "post",
        url: "/editAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg)
          if(result.data.code == 30000){
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
          console.log(result);
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 新增地址方法
    addNewAddress(addressinfo) {
      console.log("新增方法");
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return this.$router.push({ name: "Login" });
      }
      // 整理数据
      let content = Object.assign({}, addressinfo);

      delete content.country;
      delete content.id;
      // content.isDefault ? content.isDefault = 1 : content.isDefault = 0
      content.isDefault = Number(content.isDefault);

      content.appkey = this.appkey;
      content.tokenString = tokenString;
      let data = utils.queryString(content);
      // ajax
      this.$toast({
        message: "加载中",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "post",
        url: "/addAddress",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          this.$toast(result.data.msg);
          if (result.data.code == 9000) {
            // 成功
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("error => ", err);
        });
    },
    // 判断使用哪个方法
    saveAddress(addressinfo) {
      if (this.aid) {
        this.editAddress(addressinfo);
      } else {
        this.addNewAddress(addressinfo);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.addaddress {
  padding-top: 46px;
  /deep/ .van-button--danger {
    color: #fff;
    background-color: #0c43ba;
    border: 1px solid #0c43ba;
  }
  /deep/ .van-switch--on {
    background-color: #0c43ba;
  }
}
</style>
