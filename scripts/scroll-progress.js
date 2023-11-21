import { ColorUtil } from "/scripts/common.util.js";

window.addEventListener("scroll", () => {
  const progressContents = document.getElementsByClassName(
    "progress-item-content"
  );

  function changeProgressContentColor() {
    const isLightBackground = ColorUtil.isLightHexColor("#000"); // should replace by current background color
    for (let index = 0; index < progressContents.length; index++) {
      progressContents[index].style.color = isLightBackground
        ? ColorUtil.getComputedColor("--dark")
        : ColorUtil.getComputedColor("--white");
    }
  }

  function calculateProgressPercentage() {}

  changeProgressContentColor();
  calculateProgressPercentage();
});
