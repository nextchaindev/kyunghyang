// should be placed after gsap scripts
// need to find the better way later

const fadingTexts = gsap.utils.toArray(".fading-text");

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: "top 90%",
  end: "bottom 10%",
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    fadingTexts[0].classList.add("active");
    gsap.timeline().to("#splitText1", {
      duration: 1.5,
      text: "균형 감각이 떨어져 걷기 어렵고",
    });
    document.getElementById("splitText1").classList.add("active");
    setTimeout(() => {
      gsap.timeline().to("#splitText2", {
        duration: 1.8,
        text: "내가 지금 어디에 있는지 헷갈리 때가 많아져요",
      });
      document.getElementById("splitText2").classList.add("active");
    }, 1500);
    setTimeout(() => {
      gsap.timeline().to("#splitText3", {
        duration: 1.5,
        text: "청각·후각 등의 감각이 무뎌지죠",
      });
      document.getElementById("splitText3").classList.add("active");
    }, 3300);
  },
});

ScrollTrigger.create({
  trigger: fadingTexts[1],
  start: "top 90%",
  end: "bottom 10%",
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
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
        text: "우울감에 허우적거리기도 합니다",
      });
      document.getElementById("splitText6").classList.add("active");
    }, 2500);
  },
});

ScrollTrigger.create({
  trigger: fadingTexts[2],
  start: "top 90%",
  end: "bottom 10%",
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    gsap.timeline().to("#splitText7", {
      duration: 1.6,
      text: "이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요",
    });
    document.getElementById("splitText7").classList.add("active");
    setTimeout(() => {
      gsap.timeline().to("#splitText8", {
        duration: 0.2,
        text: "2026년",
      });
    }, 1600);
    document.getElementById("splitText8").classList.add("active");
    setTimeout(() => {
      gsap.timeline().to("#splitText9", {
        duration: 0.2,
        text: "이면",
      });
      document.getElementById("splitText9").classList.add("active");
    }, 1800);
    setTimeout(() => {
      gsap.timeline().to("#splitText10", {
        duration: 0.3,
        text: "65세 이상",
      });
      document.getElementById("splitText10").classList.add("active");
    }, 2000);
    setTimeout(() => {
      gsap.timeline().to("#splitText11", {
        duration: 0.08,
        text: "이",
      });
      document.getElementById("splitText11").classList.add("active");
    }, 2300);
    setTimeout(() => {
      gsap.timeline().to("#splitText12", {
        duration: 0.3,
        text: "우리나라 ",
      });
    }, 2380);
    document.getElementById("splitText12").classList.add("active");
    setTimeout(() => {
      gsap.timeline().to("#splitText13", {
        duration: 0.5,
        text: "인구 5명 중 1명",
      });
      document.getElementById("splitText13").classList.add("active");
    }, 2680);
    setTimeout(() => {
      gsap.timeline().to("#splitText14", {
        duration: 0.08,
        text: "이",
      });
      document.getElementById("splitText14").classList.add("active");
    }, 3180);
    setTimeout(() => {
      gsap.timeline().to("#splitText15", {
        duration: 0.2,
        text: "됩니다",
      });
      document.getElementById("splitText15").classList.add("active");
    }, 3260);
    setTimeout(() => {
      gsap.timeline().to("#splitText16", {
        duration: 1.5,
        text: "어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다",
      });
      document.getElementById("splitText16").classList.add("active");
    }, 3460);
    setTimeout(() => {
      gsap.timeline().to("#splitText17", {
        duration: 1.2,
        text: "사회가 감당해야 할 비용도 늘어납니다",
      });
      document.getElementById("splitText17").classList.add("active");
    }, 4950);
  },
});

ScrollTrigger.create({
  trigger: fadingTexts[5],
  start: "top 90%",
  end: "bottom 10%",
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    gsap.timeline().to("#splitText18", {
      duration: 1.2,
      text: "집을 떠나 실·내외 공간에서 활동한다면,",
    });
    document.getElementById("splitText18").classList.add("active");
    setTimeout(() => {
      gsap.timeline().to("#splitText19", {
        duration: 1,
        text: "그 공간에서 쉬는 것뿐 아니라",
      });
      document.getElementById("splitText19").classList.add("active");
    }, 1200);
    setTimeout(() => {
      gsap.timeline().to("#splitText20", {
        duration: 1.3,
        text: "놀고, 치료받고, 일자리까지 얻을 수 있다면,",
      });
      document.getElementById("splitText20").classList.add("active");
    }, 2200);
    setTimeout(() => {
      gsap.timeline().to("#splitText21", {
        duration: 1.1,
        text: "어르신들에게 어떤 변화가 생길까요",
      });
      document.getElementById("splitText21").classList.add("active");
    }, 3500);
  },
});

// ScrollTrigger.create({
//   trigger: fadingTexts[6],
//   start: "top 90%",
//   end: "bottom 10%",
//   // markers: window.location.hostname === "127.0.0.1",
//   onEnter: () => {
//     gsap.timeline().to("#splitText22", {
//       duration: 1.2,
//       text: "인생정원을 더욱 특별하게 하는 것은",
//     });
//     document.getElementById("splitText22").classList.add("active");
//     setTimeout(() => {
//       gsap.timeline().to("#splitText23", {
//         duration: 1.2,
//         text: " 어르신들의 인지건강을 위한 활동뿐 아니라",
//       });
//       document.getElementById("splitText23").classList.add("active");
//     }, 1200);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText24", {
//         duration: 1,
//         text: "어르신 일자리까지 제공한다는 점",
//       });
//       document.getElementById("splitText24").classList.add("active");
//     }, 2400);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText25", {
//         duration: 0.15,
//         text: "입니다",
//       });
//       document.getElementById("splitText25").classList.add("active");
//     }, 3400);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText26", {
//         duration: 1,
//         text: "광명시 일자리 프로그램과 연계한",
//       });
//       document.getElementById("splitText26").classList.add("active");
//     }, 4550);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText27", {
//         duration: 0.45,
//         text: " ‘인생정원 해설사’",
//       });
//       document.getElementById("splitText27").classList.add("active");
//     }, 5550);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText28", {
//         duration: 0.45,
//         text: "라는 직업이죠",
//       });
//       document.getElementById("splitText28").classList.add("active");
//     }, 6000);
//     setTimeout(() => {
//       gsap.timeline().to("#splitText29", {
//         duration: 2,
//         text: "한 달간 원예교육을 받은 어르신들은 인생정원 해설사가 될 수 있습니다",
//       });
//       document.getElementById("splitText29").classList.add("active");
//     }, 6450);
//   },
// });

// ScrollTrigger.create({
//   trigger: fadingTexts[11],
//   start: "top 90%",
//   end: "bottom 10%",
//   // markers: window.location.hostname === "127.0.0.1",
//   onEnter: () => {
//     gsap.timeline().to("#splitText30", {
//       duration: 2.4,
//       text: "해설사들은 주 3시간씩 인생정원을 가꾸고, 이곳을 찾는 이들에게 정원을 소개하는 일을 합니다",
//     });
//     document.getElementById("splitText30").classList.add("active");
//     setTimeout(() => {
//       gsap.timeline().to("#splitText31", {
//         duration: 0.8,
//         text: "인생정원 해설사는 20명에 달합니다",
//       });
//       document.getElementById("splitText31").classList.add("active");
//     }, 2400);
//   },
// });
