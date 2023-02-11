<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <!-- tab的切换 -->
      <!-- key为属性名 -->
      <van-tabs v-model:active="tabActive" color="#1296db">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value,key,index) in allCities">
        <city-group v-show="tabActive===key" :group-data="value"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import cityGroup from "./components/city-group.vue"

const router = useRouter();

// 搜索框功能
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};
const clearClick = () => {
  searchValue = ref("");
};
// tab栏切换
const tabActive = ref();

// 网络请求：请求城市的数据

// 这个位置发送网络请求有两个缺点：
//   1.如果网络请求太多,那么页面组件也就包含了大量的对于网络请求和数据的处理逻辑
//   2.如果页面封装了很多的子组件,子组件需要这些数值,我们必须一步步将数据传递过去(props)

// const allCity = ref({ });
// getCityAll().then((res) => {
//   allCity.value=res.data;
// })

// 从store中获取数值
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

// 目的：获取选中标签中的城市数据
// 1.获取正确的key:将tabs中绑定的tabActive正确绑定
// 2.根据key从allCities获取数据,默认直接获取的数据不是响应式的,所以必须包裹computed

const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
  // top固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 98px;
  // }
  // 防止索引栏上拉的时候顶部盒子跳动
  .top {
    position: relative;
    z-index: 9;
  }
  // 局部滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>