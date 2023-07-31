<!-- 多条柱状图 -->
<script lang="ts" setup>
  import { ref } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import tmChart from '@/tmui/components/tm-chart/tm-chart.vue';

  const chartDom = ref(null);
  onLoad(() => {});
  let xData = ['2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年']; // 类型
  let data1Arr = [580, 900, 720, 700, 810, 815, 800]; // 数据1
  let data2Arr = [720, 700, 810, 815, 800, 580, 900]; // 数据2
  let data3Arr = [580, 900, 720, 580, 700, 810, 815]; // 数据3
  let data4Arr = [720, 700, 810, 815, 800, 580, 900]; // 数据4
  let dataName = ['类型1', '类型2', '类型3', '类型4'];
  let dataList = [data1Arr, data2Arr, data3Arr, data4Arr];
  let colorList = ['#35D5ED', '#3576ED', '#FFA633', '#FF5151'];
  let seriousList: any = [];

  dataName.map((_item, index) => {
    seriousList.push({
      name: dataName[index],
      label: {
        show: false,
      },
      color: colorList[index],
      type: 'bar',
      barWidth: '6', //柱型宽度
      data: dataList[index],
    });
  });

  const chartInit = (chart: any) => {
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
        textStyle: {
          fontSize: 10,
        },
      },

      legend: {
        data: dataName,
        bottom: '0',
        itemWidth: 10, // 设置宽度
        itemHeight: 10, // 设置高度
        itemGap: 10,
        textStyle: {
          color: 'rgba(0, 0, 0, 0.85)',
          fontFamily: 'Source Han Sans CN-Regular',
          fontSize: 10,
          padding: [0, 0, 0, 5],
        },
      },
      grid: {
        left: '0',
        right: '0',
        bottom: 30,
        top: 20,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#cccccc',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, 0.85)',
            textStyle: {
              fontSize: 10,
              fontFamily: 'Source Han Sans CN-Regular',
            },
          },
          data: xData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            //y轴网格线
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.1)',
              type: 'dashed',
            },
          },
          axisLabel: {
            //y轴文本
            color: 'rgba(0, 0, 0, 0.85)',
            textStyle: {
              fontSize: 10,
              fontFamily: 'Source Han Sans CN-Regular',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            //y轴线
            show: false,
            lineStyle: {
              color: '#D1D1D1',
            },
          },
        },
      ],
      series: seriousList,
    });
  };
</script>

<template>
  <tm-chart ref="chartDom" :height="400" :width="620" @onInit="chartInit" />
</template>

<style scoped></style>
