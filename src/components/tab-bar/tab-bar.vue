<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#1296db" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>

    <!-- <template v-for="(item,index) in tabbarData">
    <div 
      class="tab-bar-item" 
      :class="{ active: currentIndex === index }"
      @click="itemClick(index, item)"
    >
      <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
      <img v-else :src="getAssetURL(item.imageActive)" alt="">
      <span class="text">{{ item.text }}</span>
    </div>
  </template> -->
  </div>
</template>

<script setup>
import HomeItem9 from "@/components/home-item-9/home-item-9.vue";
import HomeItem3 from "@/components/home-item-3/home-item-3.vue";
import tabbarData from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// import { useRouter } from "vue-router";

// 监听路由改变时，对应的图标
const route = useRoute();
const currentIndex = ref(0);
watch(route, (newRoute) => {
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  currentIndex.value = index;
});
// const router = useRouter();
// const itemClick = (index, item) => {
//   currentIndex.value = index;
//   router.push(item.path);
// };
</script>

<style lang="less" scoped>
.tab-bar {
  // 局部定义一个变量：只针对tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类,对类中的css属性重写
  // :deep(.class)找到子组件的类,让子组件的类也可以生效
  :deep(.van-tabbar-item_icon) {
    font-size: 50px;
  }
  img {
    height: 28px;
  }
}
</style>
