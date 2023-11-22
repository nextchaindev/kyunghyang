import { ColorUtil } from "/scripts/common.util.js";

window.addEventListener("DOMContentLoaded", () => {
  const ctx = document
    .getElementById("statistics-chart-canvas")
    .getContext("2d");

  const firstColor = ColorUtil.getComputedColor("--primary");
  const secondColor = ColorUtil.getComputedColor("--primary-light");

  window.homeStatisticsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [2017, 2018, 2019, 2020, 2021],
      datasets: [
        {
          label: "60세 이상 추정치매환자수",
          backgroundColor: firstColor,
          data: [4, 5, 6, 7, 8],
          barThickness: 15,
        },
        {
          label: "치매환자 1인당 치매관리비",
          backgroundColor: secondColor,
          data: [5, 6, 7, 8, 9],
          barThickness: 15,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {},
        },
      },
    },
  });
});
