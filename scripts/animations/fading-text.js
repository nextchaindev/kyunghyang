import { fullscreenScrollDuration } from "../../configs/durations.js";

// should be placed after gsap scripts
// need to find the better way later

const fadingTexts = gsap.utils.toArray(".fading-text");

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: "top 90%",
  end: "bottom 10%",
  markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    setTimeout(() => {
      fadingTexts[0].classList.add("active");
      gsap.timeline().to("#splitText1", {
        duration: 1.5,
        text: "균형 감각이 떨어져 걷기 어렵고",
      });
      document.getElementById("splitText1").classList.add("active");
      setTimeout(() => {
        gsap.timeline().to("#splitText2", {
          duration: 1.8,
          text: "내가 지금 어디에 있는지 헷갈리 때가 많아져요.",
        });
        document.getElementById("splitText2").classList.add("active");
      }, 1500);
      setTimeout(() => {
        gsap.timeline().to("#splitText3", {
          duration: 1.5,
          text: "청각·후각 등의 감각이 무뎌지죠.",
        });
        document.getElementById("splitText3").classList.add("active");
      }, 3300);
    }, fullscreenScrollDuration);
  },
});

ScrollTrigger.create({
  trigger: fadingTexts[1],
  start: "top 90%",
  end: "bottom 10%",
  markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    setTimeout(() => {
      gsap.timeline().to("#splitText4", {
        duration: 1.5,
        text: "사회 활동이 줄어 자존감이 떨어지고",
      });
      document.getElementById("splitText4").classList.add("active");
      setTimeout(() => {
        gsap.timeline().to("#splitText5", {
          duration: 1,
          text: "홀로 회상에 잠기거나",
        });
        document.getElementById("splitText5").classList.add("active");
      }, 1500);
      setTimeout(() => {
        gsap.timeline().to("#splitText6", {
          duration: 1.5,
          text: "우울감에 허우적거리기도 합니다.",
        });
        document.getElementById("splitText6").classList.add("active");
      }, 2500);
    }, fullscreenScrollDuration);
  },
});
