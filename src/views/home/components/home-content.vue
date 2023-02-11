<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houselist" :key="item.data.houseId">
        <home-item-9 
          v-if="item.discoveryContentType === 9" 
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
        <home-item-3 
          v-else-if="item.discoveryContentType === 3" 
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import HouseItem9 from "@/components/home-item-9/home-item-9.vue"
import HouseItem3 from "@/components/home-item-3/home-item-3.vue"
import useHomeStore from "@/stores/modules/home.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";


const homeStore = useHomeStore();
const { houselist } = storeToRefs(homeStore);

const router=useRouter()
const itemClick =(item) => {
  //跳转detail页面
  router.push("/detail/" + item.houseId)
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>