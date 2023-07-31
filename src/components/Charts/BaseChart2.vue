<!-- 多条折线图 -->
<script lang="ts" setup>
  import tmChart from '@/tmui/components/tm-chart/tm-chart.vue';

  const chartInit = (chart: any) => {
    chart.setOption({
      legend: {
        textStyle: {
          align: 'right',
        },
        top: '2%',
        right: '2%',
      },

      tooltip: {
        trigger: 'axis',
        position: function (point: any, _params: any, _dom: any, _rect: any, size: any) {
          // 提示框位置
          let x = 0;
          let y = 0;
          if (point[0] + size.contentSize[0] + 10 > size.viewSize[0]) {
            x = point[0] - size.contentSize[0] - 10;
          } else {
            x = point[0] + 10;
          }
          if (point[1] + size.contentSize[1] + 10 > size.viewSize[1]) {
            y = point[1] - size.contentSize[1] - 10;
          } else {
            y = point[1] + 10;
          }
          return [x, y];
        },
      },

      grid: {
        top: '18%',
        left: '8%',
        right: '3%',
        bottom: '10%',
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            margin: 10,
          },
          data: [2017, 2018, 2019, 2020, 2021],
        },
      ],

      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#e3e3e3',
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '增值服务',
          type: 'line',
          smooth: true,
          data: [31.9, 10.9, 3.1, 35, 7],
        },
        {
          name: '金融科技及企业服务',
          type: 'line',
          smooth: true,
          data: [2, 4, 48.5, 31.7, 41.8],
        },
        {
          name: '网络广告',
          type: 'line',
          smooth: true,
          data: [28.3, 40.1, 61.1, 26.1, 3.9],
        },
      ],
    });
  };
</script>

<template>
  <tm-chart ref="chartDom" :height="400" :width="620" @onInit="chartInit" />
</template>

<style scoped></style>
