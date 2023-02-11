<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div
      class="section date-range bottom-gray-line"
      @click="showCalendar = true"
    >
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayDays }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#1296db"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section prince-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索文本 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import useHomeStore from "@/stores/modules/home";
import useCityStore from "@/stores/modules/city";
import { formatMonthDay, getDiffDays } from "@/utils/format_date.js";
import { computed, ref } from "vue";
import useMainStore from "@/stores/modules/main.js";
const router = useRouter();

// 定义props
// defineProps({
//   hotSuggests: {
//     type: Array,
//     default: () => [],
//   },
// });
const cityClick = () => {
  router.push("/city");
};
// 位置获取城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log("获取位置成功", res);
    },
    (err) => {
      console.log("获取位置失败", err);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

// 当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
// 格式化取得的日期
const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));
const stayDays = ref(getDiffDays(endDate.value, startDate.value));
// 显示日历
const showCalendar = ref(false);
// 1.设置日期
const onConfirm = (value) => {
  // 将点击得到的日期拿到数据
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  // 展示到页面的初始日期和结束日期
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndDate;
  stayDays.value = getDiffDays(selectEndDate, selectStartDate);

  // 2.隐藏日历
  showCalendar.value = false;
};

// 热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

// 开始搜索
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    font-size: 15px;
    color: #333;
  }
  .position {
    width: 78px;
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
      width: 17px;
      height: 17px;
    }
  }
}

.section {
  height: 44px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggest {
  margin: 10px 0;
  height: auto;
  .item {
    font-size: 13px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    // line-height: 1px;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>