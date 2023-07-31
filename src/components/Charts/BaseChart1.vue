<!-- 单条折线图 -->
<script lang="ts" setup>
  import { ref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import tmChart from '@/tmui/components/tm-chart/tm-chart.vue';

  const props = defineProps({
    chartData: {
      type: Object,
      default: () => {},
    },
    chartKey: {
      type: Number,
      default: Math.random(),
    },
  });

  const chartDom = ref(null);
  onLoad(() => {});
  // let captions = ['2017', '2018', '2019', '2020', '2021'];
  // let values = ['81', '65', '76', '84', '49'];
  const chartInit = (chart: any) => {
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
      },
      grid: {
        top: '10', //上边距
        right: '0', //右边距
        left: '0', //左边距
        bottom: '0', //下边距
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: props.chartData?.x_data || [],
        axisTick: {
          show: false, //隐藏X轴刻度
        },
        axisLine: {
          lineStyle: {
            color: '#E8E8E8',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#BFBFBF',
            fontSize: 12,
            fontFamily: 'Source Han Sans CN-Regular',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: '#BFBFBF',
            textStyle: {
              fontSize: 12,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: '#E8E8E8',
            },
          },
        },
      ],
      series: [
        {
          type: 'line',
          data: props.chartData?.series[0]?.data || [],
          symbolSize: 4, //标记的大小,
          lineStyle: {
            color: '#5B8FF9',
            width: 3,
            shadowColor: 'rgba(26,117,218,0.17)', //设置折线阴影
            shadowBlur: 5,
            shadowOffsetY: 9,
          },
          itemStyle: {
            //折线拐点标志的样式
            color: '#5B8FF9',
            borderColor: '#5B8FF9',
            borderWidth: 3,
          },
          smooth: 0.4,
          emphasis: {
            scale: 1.5,
          },
        },
      ],
    });
  };
</script>

<template>
  <tm-chart ref="chartDom" :height="400" :width="620" @onInit="chartInit" :key="chartKey" />
</template>

<style scoped></style>
