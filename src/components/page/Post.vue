<template>
  <div class="post-container">
    <el-row>
      <!-- 左侧 -->
      <el-col :span="7" class="post-order" id="order-list">
        <el-tabs type="card">
          <el-tab-pane label="点餐" header-align="center">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goodsName" label="品牌名称" header-align="center"></el-table-column>
              <el-table-column prop="count" label="数量" width="50" header-align="center"></el-table-column>
              <el-table-column prop="price" label="金额" width="70" header-align="center"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right" header-align="center">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="sum">
              <span>
                <small>数量：</small>
                {{ totalCount }}件
              </span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                <small>金额：</small>
                {{ totalMoney }}元
              </span>
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
              <el-button type="success" @click="checkout()">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="item in oftenData" :key="item.goodsId" @click="addOrderList(item)">
                <span>{{ item.goodsName }}</span>
                <span class="o-price">¥{{ item.price }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs type="card">
            <el-tab-pane label="汉堡" header-align="center">
              <div>
                <ul class="cookList">
                  <li v-for="item in type0Goods" :key="item.goodsId" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ item.goodsName }}</span>
                    <span class="foodPrice">¥{{ item.price }}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食" header-align="center">
              <div>
                <ul class="cookList">
                  <li v-for="item in type1Goods" :key="item.goodsId" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ item.goodsName }}</span>
                    <span class="foodPrice">¥{{ item.price }}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料" header-align="center">
              <div>
                <ul class="cookList">
                  <li v-for="item in type2Goods" :key="item.goodsId" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ item.goodsName }}</span>
                    <span class="foodPrice">¥{{ item.price }}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐" header-align="center">
              <div>
                <ul class="cookList">
                  <li v-for="item in type3Goods" :key="item.goodsId">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ item.goodsName }}</span>
                    <span class="foodPrice">¥{{ item.price }}</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "post",
  data() {
    return {
      tableData: [],
      oftenData: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0
    };
  },
  created: function() {
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods"
      )
      .then(response => {
        // console.log(response);
        this.oftenData = response.data;
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods"
      )
      .then(response => {
        // console.log(response.data);
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
  },
  methods: {
    addOrderList(goods) {
      // this.totalMoney = 0;
      // this.totalCount = 0;
      // 判断所添加商品是否已经存在于列表中
      let isIn = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isIn = true;
        }
      }
      // 根据判断进行业务逻辑编写
      if (isIn) {
        // 改变列表中商品的数量
        let arr = this.tableData.filter(item => item.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
      // 计算总件数和总金额
      // this.tableData.forEach((element)=>{
      //   this.totalCount += element.count;
      //   this.totalMoney += element.count * element.price;
      // })
      this.getAllMoney();
    },
    // 删除单个商品
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter(
        item => item.goodsId != goods.goodsId
      );
      this.getAllMoney();
    },
    // 删除所有商品
    delAllGoods() {
      this.tableData = [];
      this.totalMoney = 0;
      this.totalCount = 0;
    },
    // 模拟结账
    checkout() {
      if (this.totalCount != 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
        this.$message({
          message: "结账成功，感谢你又为店里出了一份力!",
          type: "success"
        });
      } else {
        this.$message.error("不能空结。老板了解你急切的心情！");
      }
    },
    //汇总数量和金额
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.tableData) {
        this.tableData.forEach(element => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + element.price * element.count;
        });
      }
    }
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.post-container {
  .post-order {
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
    .div-btn {
      margin-top: 10px;
    }
  }
  .often-goods {
    .title {
      height: 20px;
      border-bottom: 1px solid #d3dce6;
      background-color: #f9fafc;
      padding: 10px;
      text-align: left;
    }
    .often-goods-list {
      ul li {
        list-style: none;
        float: left;
        border: 1px solid #e5e9f2;
        padding: 10px;
        margin: 10px;
        background-color: #fff;
        cursor: pointer;
      }
      .o-price {
        color: #58b7ff;
      }
    }
  }
  .goods-type {
    clear: both;
    .cookList li {
      list-style: none;
      width: 23%;
      border: 1px solid #e5e9f2;
      height: auot;
      overflow: hidden;
      background-color: #fff;
      padding: 2px;
      float: left;
      margin: 2px;
      cursor: pointer;
    }
    .cookList li span {
      display: block;
      float: left;
    }
    .foodImg {
      width: 40%;
    }
    .foodName {
      font-size: 18px;
      padding-left: 10px;
      color: brown;
    }
    .foodPrice {
      font-size: 16px;
      padding-left: 10px;
      padding-top: 10px;
    }
  }
}
</style>
