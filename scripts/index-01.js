const ColorUtil = {
  getComputedColor(color) {
    const computedStyle = getComputedStyle(document.documentElement);
    return computedStyle.getPropertyValue(color);
  },
  isLightHexColor(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  },
};

const ScreenUtil = {
  getScreenHeight() {
    const doc = document.documentElement;
    return doc.style.getPropertyValue('--doc-height');
  },
  setScreenHeight() {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', documentHeight);
  },
};

const DeviceUtil = {
  isNotPC() {
    const userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iPhone|Android/i.test(navigator.userAgent);
    const isTablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        userAgent
      );
    return isMobile || isTablet;
  },
  isIOS() {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document) ||
      isSafari
    );
  },
};

const ElementUtil = {
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

const isNotPC = DeviceUtil.isNotPC();

document.documentElement.onscroll = function () {
  document.documentElement.scrollLeft = 0;
};
document.body.addEventListener('scroll', function () {
  document.body.scrollLeft = 0;
});

if (DeviceUtil.isIOS()) {
  console.log('set done');
  document.documentElement.style['overflow-x'] = 'unset';
  document.getElementById('page01').style['overflow-x'] = 'unset';
  // document.documentElement.style['overflow-y'] = 'scroll';
  // document.getElementById('page01').style['overflow-y'] = 'scroll';
  // document.documentElement.style['overflow-x'] = 'hidden';
  // document.getElementById('page01').style['overflow-x'] = 'hidden';
} else {
  const parallax = document.querySelectorAll('.parallax');
  parallax.forEach((element) => {
    element.classList.add('active');
  });
}

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', documentHeight);

if (isNotPC) {
  // let viewer1Enable = false;
  // document.getElementById('notice-viewer1').click = () => {
  //   if (viewer1Enable) {
  //     viewer1Enable = false;
  //     window.addEventListener('DOMContentLoaded', () => {
  //       const container = document.getElementById('viewer1');
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       viewer.dispose();
  //     });
  //     return;
  //   }
  //   viewer1Enable = true;
  //   window.addEventListener('DOMContentLoaded', () => {
  //     function renderViewer(containerId, imgSrc) {
  //       const container = document.getElementById(containerId);
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       const panorama = new PANOLENS.ImagePanorama(imgSrc);
  //       viewer.add(panorama);
  //       viewer.OrbitControls.noZoom = true;
  //       container.onmousedown = () => {
  //         container.style.cursor = 'grabbing';
  //       };
  //       container.onmouseup = () => {
  //         container.style.cursor = 'grab';
  //       };
  //     }
  //     renderViewer('viewer1', '/assets/images/01/2d-map-4th/36.1.JPG');
  //   });
  // };
  // let viewer2Enable = false;
  // document.getElementById('notice-viewer2').click = () => {
  //   if (viewer2Enable) {
  //     viewer2Enable = false;
  //     window.addEventListener('DOMContentLoaded', () => {
  //       const container = document.getElementById('viewer2');
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       viewer.dispose();
  //     });
  //     return;
  //   }
  //   viewer2Enable = true;
  //   window.addEventListener('DOMContentLoaded', () => {
  //     function renderViewer(containerId, imgSrc) {
  //       const container = document.getElementById(containerId);
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       const panorama = new PANOLENS.ImagePanorama(imgSrc);
  //       viewer.add(panorama);
  //       viewer.OrbitControls.noZoom = true;
  //       container.onmousedown = () => {
  //         container.style.cursor = 'grabbing';
  //       };
  //       container.onmouseup = () => {
  //         container.style.cursor = 'grab';
  //       };
  //     }
  //     renderViewer('viewer2', '/assets/images/01/2d-map-4th/36.1.JPG');
  //   });
  // };

  // document.getElementById('viewer1').style.backgroundImage =
  //   '/assets/images/01/2d-map-4th/36.1.JPG';
  // document.getElementById('viewer2').style.backgroundImage =
  //   '/assets/images/01/2d-map-5th/41.1.JPG';
  // document.getElementById('notice-viewer1').style.opacity = 0;
  // document.getElementById('notice-viewer2').style.opacity = 0;
  const bg1a = document.querySelectorAll('.centre-2d-map-info-3d');
  bg1a[0].classList.add('mobile-3d1');
  bg1a[1].classList.add('mobile-3d2');
  const message = document.querySelectorAll('.notice-message');
  message.forEach((element) => {
    element.style.opacity = 0;
  });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    function renderViewer(containerId, imgSrc) {
      const container = document.getElementById(containerId);
      const viewer = new PANOLENS.Viewer({
        container,
      });
      const panorama = new PANOLENS.ImagePanorama(imgSrc);
      viewer.add(panorama);
      viewer.OrbitControls.noZoom = true;
      container.onmousedown = () => {
        container.style.cursor = 'grabbing';
      };
      container.onmouseup = () => {
        container.style.cursor = 'grab';
      };
    }

    renderViewer('viewer1', './../assets/images/01/2d-map-4th/36.1.JPG');

    renderViewer('viewer2', './../assets/images/01/2d-map-5th/41.1.JPG');
  });
}

const playIcons = document.getElementsByClassName('video-playpause');

const video0 = document.getElementById('controlled-video1');
video0.addEventListener('click', () => {
  if (video0.paused) {
    video0.play();
  } else {
    video0.pause();
  }
});
playIcons[0].addEventListener('click', () => {
  if (video0.paused) {
    video0.play();
  } else {
    video0.pause();
  }
});
video0.onplay = () => {
  playIcons[0].style.opacity = 0;
};
video0.onpause = () => {
  playIcons[0].style.opacity = 1;
};

const video1 = document.getElementById('controlled-video2');
video1.addEventListener('click', () => {
  if (video1.paused) {
    video1.play();
  } else {
    video1.pause();
  }
});
playIcons[1].addEventListener('click', () => {
  if (video1.paused) {
    video1.play();
  } else {
    video1.pause();
  }
});
video1.onplay = () => {
  playIcons[1].style.opacity = 0;
};
video1.onpause = () => {
  playIcons[1].style.opacity = 1;
};

// animation
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

gsap.utils.toArray('.centre-2d-map-info-3d').forEach((grabbableItem, i) => {
  ScrollTrigger.create({
    trigger: grabbableItem,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => {
      gsap.set('.circle-cursor', {
        xPercent: -50,
        yPercent: -110,
        visibility: 'visible',
      });

      let xSetter = gsap.quickSetter('.circle-cursor', 'x', 'px');
      let ySetter = gsap.quickSetter('.circle-cursor', 'y', 'px');

      window.addEventListener('mousemove', (e) => {
        xSetter(e.x);
        ySetter(e.y);
      });
    },
    onLeave: () => {
      gsap.set('.circle-cursor', {
        visibility: 'hidden',
      });
    },
    onEnterBack: () => {
      gsap.set('.circle-cursor', {
        xPercent: -50,
        yPercent: -110,
        visibility: 'visible',
      });

      let xSetter = gsap.quickSetter('.circle-cursor', 'x', 'px');
      let ySetter = gsap.quickSetter('.circle-cursor', 'y', 'px');

      window.addEventListener('mousemove', (e) => {
        xSetter(e.x);
        ySetter(e.y);
      });
    },
    onLeaveBack: () => {
      gsap.set('.circle-cursor', {
        visibility: 'hidden',
      });
    },
  });
});

if (isNotPC) {
  // const fadingImages = document.getElementsByClassName('fading-image');

  // const snapIndexToShow = [1, 2];

  // document.body.addEventListener('scroll', () => {
  //   snapIndexToShow.forEach((snapIndex, imageIndex) => {
  //     const top = snapIndex * innerHeight;

  //     if (top === document.body.scrollTop) {
  //       setTimeout(() => {
  //         gsap.fromTo(
  //           fadingImages[imageIndex],
  //           { opacity: 0, autoAlpha: 0 },
  //           {
  //             duration: 5,
  //             opacity: 1,
  //             autoAlpha: 1,
  //             ease: 'back',
  //             overwrite: 'auto',
  //           }
  //         );
  //       }, 800);
  //       return;
  //     }

  //     if (
  //       top === document.body.scrollTop + innerHeight ||
  //       top === document.body.scrollTop - innerHeight
  //     ) {
  //       gsap.fromTo(
  //         fadingImages[imageIndex],
  //         { opacity: 1, autoAlpha: 0 },
  //         {
  //           duration: 5,
  //           opacity: 0,
  //           autoAlpha: 1,
  //           ease: 'back',
  //           overwrite: 'auto',
  //         }
  //       );
  //       return;
  //     }
  //   });
  // });
  gsap.utils.toArray('.fading-image').forEach(function (elem) {
    gsap.fromTo(
      elem,
      { opacity: 0, autoAlpha: 0 },
      {
        duration: 5,
        opacity: 1,
        autoAlpha: 1,
        ease: 'back',
        overwrite: 'auto',
      }
    );
  });
} else {
  gsap.utils.toArray('.fading-image').forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 90%',
      end: 'bottom 10%',
      // markers: window.location.hostname === "127.0.0.1",
      onEnter: function () {
        setTimeout(() => {
          gsap.fromTo(
            elem,
            { opacity: 0, autoAlpha: 0 },
            {
              duration: 5,
              opacity: 1,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        }, 1000);
      },
      // onLeave: function () {
      //   gsap.fromTo(
      //     elem,
      //     { opacity: 1, autoAlpha: 0 },
      //     {
      //       duration: 5,
      //       opacity: 0,
      //       autoAlpha: 1,
      //       ease: 'back',
      //       overwrite: 'auto',
      //     }
      //   );
      // },
      // onEnterBack: function () {
      //   setTimeout(() => {
      //     gsap.fromTo(
      //       elem,
      //       { opacity: 0, autoAlpha: 0 },
      //       {
      //         duration: 5,
      //         opacity: 1,
      //         autoAlpha: 1,
      //         ease: 'back',
      //         overwrite: 'auto',
      //       }
      //     );
      //   }, 1000);
      // },
      // onLeaveBack: function () {
      //   gsap.fromTo(
      //     elem,
      //     { opacity: 1, autoAlpha: 0 },
      //     {
      //       duration: 5,
      //       opacity: 0,
      //       autoAlpha: 1,
      //       ease: 'back',
      //       overwrite: 'auto',
      //     }
      //   );
      // },
    });
  });
}
if (isNotPC) {
  // const fadingTexts = document.getElementsByClassName('fading-text');

  // const snapIndexToShow = [3, 4, 5, 5, 5, 9, 9];

  // document.body.addEventListener('scroll', () => {
  //   if (innerHeight * snapIndexToShow[0] === document.body.scrollTop) {
  //     gsap.timeline().to('#splitText1', {
  //       duration: 1.5,
  //       text: '균형 감각이 떨어져 걷기 어렵고',
  //     });
  //     document.getElementById('splitText1').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText2', {
  //         duration: 1.8,
  //         text: '내가 지금 어디에 있는지 헷갈릴 때가 많아져요',
  //       });
  //       document.getElementById('splitText2').classList.add('active');
  //     }, 1500);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText3', {
  //         duration: 1.5,
  //         text: '청각·후각 등의 감각이 무뎌지죠',
  //       });
  //       document.getElementById('splitText3').classList.add('active');
  //     }, 3300);
  //     return;
  //   }
  //   if (innerHeight * snapIndexToShow[1] === document.body.scrollTop) {
  //     fadingTexts[1].classList.add('active');
  //     gsap.timeline().to('#splitText4', {
  //       duration: 1.5,
  //       text: '사회 활동이 줄어 자존감이 떨어지고',
  //     });
  //     document.getElementById('splitText4').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText5', {
  //         duration: 1,
  //         text: '홀로 회상에 잠기거나',
  //       });
  //       document.getElementById('splitText5').classList.add('active');
  //     }, 1500);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText6', {
  //         duration: 1.5,
  //         text: '우울감에 허우적거리기도 합니다',
  //       });
  //       document.getElementById('splitText6').classList.add('active');
  //     }, 2500);
  //     return;
  //   }
  //   if (innerHeight * snapIndexToShow[2] === document.body.scrollTop) {
  //     gsap.timeline().to('#splitText7', {
  //       duration: 1.6,
  //       text: '이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요',
  //     });
  //     document.getElementById('splitText7').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText8', {
  //         duration: 0.2,
  //         text: '2026년',
  //       });
  //     }, 1600);
  //     document.getElementById('splitText8').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText9', {
  //         duration: 0.2,
  //         text: '이면',
  //       });
  //       document.getElementById('splitText9').classList.add('active');
  //     }, 1800);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText10', {
  //         duration: 0.3,
  //         text: '65세 이상',
  //       });
  //       document.getElementById('splitText10').classList.add('active');
  //     }, 2000);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText11', {
  //         duration: 0.08,
  //         text: '이',
  //       });
  //       document.getElementById('splitText11').classList.add('active');
  //     }, 2300);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText12', {
  //         duration: 0.3,
  //         text: '우리나라 ',
  //       });
  //     }, 2380);
  //     document.getElementById('splitText12').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText13', {
  //         duration: 0.5,
  //         text: '인구 5명 중 1명',
  //       });
  //       document.getElementById('splitText13').classList.add('active');
  //     }, 2680);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText14', {
  //         duration: 0.08,
  //         text: '이',
  //       });
  //       document.getElementById('splitText14').classList.add('active');
  //     }, 3180);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText15', {
  //         duration: 0.2,
  //         text: '됩니다',
  //       });
  //       document.getElementById('splitText15').classList.add('active');
  //     }, 3260);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText16', {
  //         duration: 1.5,
  //         text: '어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다',
  //       });
  //       document.getElementById('splitText16').classList.add('active');
  //     }, 3460);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText17', {
  //         duration: 1.2,
  //         text: '사회가 감당해야 할 비용도 늘어납니다',
  //       });
  //       document.getElementById('splitText17').classList.add('active');
  //     }, 4950);
  //     return;
  //   }
  //   if (innerHeight * snapIndexToShow[5] === document.body.scrollTop) {
  //     gsap.timeline().to('#splitText18', {
  //       duration: 1.2,
  //       text: '집을 떠나 실·내외 공간에서 활동한다면,',
  //     });
  //     document.getElementById('splitText18').classList.add('active');
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText19', {
  //         duration: 1,
  //         text: '그 공간에서 쉬는 것뿐 아니라',
  //       });
  //       document.getElementById('splitText19').classList.add('active');
  //     }, 1200);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText20', {
  //         duration: 1.3,
  //         text: '놀고, 치료받고, 일자리까지 얻을 수 있다면,',
  //       });
  //       document.getElementById('splitText20').classList.add('active');
  //     }, 2200);
  //     setTimeout(() => {
  //       gsap.timeline().to('#splitText21', {
  //         duration: 1.1,
  //         text: '어르신들에게 어떤 변화가 생길까요',
  //       });
  //       document.getElementById('splitText21').classList.add('active');
  //     }, 3500);
  //     return;
  //   }
  // });
  const fadingTexts = gsap.utils.toArray('.fading-text');

  fadingTexts[0].classList.add('active');
  gsap.timeline().to('#splitText1', {
    duration: 1.5,
    text: '균형 감각이 떨어져 걷기 어렵고',
  });
  document.getElementById('splitText1').classList.add('active');
  gsap.timeline().to('#splitText2', {
    duration: 1.8,
    text: '내가 지금 어디에 있는지 헷갈릴 때가 많아져요',
  });
  document.getElementById('splitText2').classList.add('active');
  gsap.timeline().to('#splitText3', {
    duration: 1.5,
    text: '청각·후각 등의 감각이 무뎌지죠',
  });
  document.getElementById('splitText3').classList.add('active');
  gsap.timeline().to('#splitText4', {
    duration: 1.5,
    text: '사회 활동이 줄어 자존감이 떨어지고',
  });
  document.getElementById('splitText4').classList.add('active');
  gsap.timeline().to('#splitText5', {
    duration: 1,
    text: '홀로 회상에 잠기거나',
  });
  document.getElementById('splitText5').classList.add('active');
  gsap.timeline().to('#splitText6', {
    duration: 1.5,
    text: '우울감에 허우적거리기도 합니다',
  });
  document.getElementById('splitText6').classList.add('active');
  gsap.timeline().to('#splitText7', {
    duration: 1.6,
    text: '이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요',
  });
  document.getElementById('splitText7').classList.add('active');
  gsap.timeline().to('#splitText8', {
    duration: 0.2,
    text: '2026년',
  });
  document.getElementById('splitText8').classList.add('active');
  gsap.timeline().to('#splitText9', {
    duration: 0.2,
    text: '이면',
  });
  document.getElementById('splitText9').classList.add('active');
  gsap.timeline().to('#splitText10', {
    duration: 0.3,
    text: '65세 이상',
  });
  document.getElementById('splitText10').classList.add('active');
  gsap.timeline().to('#splitText11', {
    duration: 0.08,
    text: '이',
  });
  document.getElementById('splitText11').classList.add('active');
  gsap.timeline().to('#splitText12', {
    duration: 0.3,
    text: '우리나라 ',
  });
  document.getElementById('splitText12').classList.add('active');
  gsap.timeline().to('#splitText13', {
    duration: 0.5,
    text: '인구 5명 중 1명',
  });
  document.getElementById('splitText13').classList.add('active');
  gsap.timeline().to('#splitText14', {
    duration: 0.08,
    text: '이',
  });
  document.getElementById('splitText14').classList.add('active');
  gsap.timeline().to('#splitText15', {
    duration: 0.2,
    text: '됩니다',
  });
  document.getElementById('splitText15').classList.add('active');
  gsap.timeline().to('#splitText16', {
    duration: 1.5,
    text: '어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다',
  });
  document.getElementById('splitText16').classList.add('active');
  gsap.timeline().to('#splitText17', {
    duration: 1.2,
    text: '사회가 감당해야 할 비용도 늘어납니다',
  });
  document.getElementById('splitText17').classList.add('active');
  gsap.timeline().to('#splitText18', {
    duration: 1.2,
    text: '집을 떠나 실·내외 공간에서 활동한다면,',
  });
  document.getElementById('splitText18').classList.add('active');
  gsap.timeline().to('#splitText19', {
    duration: 1,
    text: '그 공간에서 쉬는 것뿐 아니라',
  });
  document.getElementById('splitText19').classList.add('active');
  gsap.timeline().to('#splitText20', {
    duration: 1.3,
    text: '놀고, 치료받고, 일자리까지 얻을 수 있다면,',
  });
  document.getElementById('splitText20').classList.add('active');
  gsap.timeline().to('#splitText21', {
    duration: 1.1,
    text: '어르신들에게 어떤 변화가 생길까요',
  });
  document.getElementById('splitText21').classList.add('active');
} else {
  const fadingTexts = gsap.utils.toArray('.fading-text');

  ScrollTrigger.create({
    trigger: fadingTexts[0],
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      fadingTexts[0].classList.add('active');
      gsap.timeline().to('#splitText1', {
        duration: 1.5,
        text: '균형 감각이 떨어져 걷기 어렵고',
      });
      document.getElementById('splitText1').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText2', {
          duration: 1.8,
          text: '내가 지금 어디에 있는지 헷갈릴 때가 많아져요',
        });
        document.getElementById('splitText2').classList.add('active');
      }, 1500);
      setTimeout(() => {
        gsap.timeline().to('#splitText3', {
          duration: 1.5,
          text: '청각·후각 등의 감각이 무뎌지죠',
        });
        document.getElementById('splitText3').classList.add('active');
      }, 3300);
    },
  });

  ScrollTrigger.create({
    trigger: fadingTexts[1],
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      gsap.timeline().to('#splitText4', {
        duration: 1.5,
        text: '사회 활동이 줄어 자존감이 떨어지고',
      });
      document.getElementById('splitText4').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText5', {
          duration: 1,
          text: '홀로 회상에 잠기거나',
        });
        document.getElementById('splitText5').classList.add('active');
      }, 1500);
      setTimeout(() => {
        gsap.timeline().to('#splitText6', {
          duration: 1.5,
          text: '우울감에 허우적거리기도 합니다',
        });
        document.getElementById('splitText6').classList.add('active');
      }, 2500);
    },
  });

  ScrollTrigger.create({
    trigger: fadingTexts[2],
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      gsap.timeline().to('#splitText7', {
        duration: 1.6,
        text: '이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요',
      });
      document.getElementById('splitText7').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText8', {
          duration: 0.2,
          text: '2026년',
        });
      }, 1600);
      document.getElementById('splitText8').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText9', {
          duration: 0.2,
          text: '이면',
        });
        document.getElementById('splitText9').classList.add('active');
      }, 1800);
      setTimeout(() => {
        gsap.timeline().to('#splitText10', {
          duration: 0.3,
          text: '65세 이상',
        });
        document.getElementById('splitText10').classList.add('active');
      }, 2000);
      setTimeout(() => {
        gsap.timeline().to('#splitText11', {
          duration: 0.08,
          text: '이',
        });
        document.getElementById('splitText11').classList.add('active');
      }, 2300);
      setTimeout(() => {
        gsap.timeline().to('#splitText12', {
          duration: 0.3,
          text: '우리나라 ',
        });
      }, 2380);
      document.getElementById('splitText12').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText13', {
          duration: 0.5,
          text: '인구 5명 중 1명',
        });
        document.getElementById('splitText13').classList.add('active');
      }, 2680);
      setTimeout(() => {
        gsap.timeline().to('#splitText14', {
          duration: 0.08,
          text: '이',
        });
        document.getElementById('splitText14').classList.add('active');
      }, 3180);
      setTimeout(() => {
        gsap.timeline().to('#splitText15', {
          duration: 0.2,
          text: '됩니다',
        });
        document.getElementById('splitText15').classList.add('active');
      }, 3260);
      setTimeout(() => {
        gsap.timeline().to('#splitText16', {
          duration: 1.5,
          text: '어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다',
        });
        document.getElementById('splitText16').classList.add('active');
      }, 3460);
      setTimeout(() => {
        gsap.timeline().to('#splitText17', {
          duration: 1.2,
          text: '사회가 감당해야 할 비용도 늘어납니다',
        });
        document.getElementById('splitText17').classList.add('active');
      }, 4950);
    },
  });

  ScrollTrigger.create({
    trigger: fadingTexts[5],
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      gsap.timeline().to('#splitText18', {
        duration: 1.2,
        text: '집을 떠나 실·내외 공간에서 활동한다면,',
      });
      document.getElementById('splitText18').classList.add('active');
      setTimeout(() => {
        gsap.timeline().to('#splitText19', {
          duration: 1,
          text: '그 공간에서 쉬는 것뿐 아니라',
        });
        document.getElementById('splitText19').classList.add('active');
      }, 1200);
      setTimeout(() => {
        gsap.timeline().to('#splitText20', {
          duration: 1.3,
          text: '놀고, 치료받고, 일자리까지 얻을 수 있다면,',
        });
        document.getElementById('splitText20').classList.add('active');
      }, 2200);
      setTimeout(() => {
        gsap.timeline().to('#splitText21', {
          duration: 1.1,
          text: '어르신들에게 어떤 변화가 생길까요',
        });
        document.getElementById('splitText21').classList.add('active');
      }, 3500);
    },
  });
}

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  window.scrollTo(0, 0);
  document.body.scrollTo(0, 0);
});

// if (isNotPC) {
document.getElementById('scrollOnclick').onclick = () => {
  gsap.to('.snap-container', {
    scrollTo: {
      y: innerHeight,
      autoKill: false,
    },
    duration: 0.6,
    overwrite: true,
  });
};
// } else {
//   // should be placed after gsap scripts
//   // window.addEventListener('resize', () => {
//   //   document.body.scrollTo(0, 0);
//   // });
//   ScrollTrigger.defaults({
//     toggleActions: 'restart pause resume pause',
//   });

//   function goToSection(i, mode) {
//     gsap.set('body', { overflowY: 'hidden' });

//     let spacesOfNoneFullscreenSections = 0;

//     if (i > 12) {
//       const total =
//         document.getElementById('non1').offsetHeight +
//         document.getElementById('non2').offsetHeight;
//       spacesOfNoneFullscreenSections -= innerHeight * 2 - total;
//     }

//     if (i > 12) {
//       spacesOfNoneFullscreenSections += mode === 'enter' ? -1 : i < 16 ? -1 : 0;
//     }

//     // if (i > 52) {
//     //   spacesOfNoneFullscreenSections +=
//     //     document.getElementById('section_scroll11').offsetHeight - innerHeight;
//     // }

//     gsap.to('body', {
//       scrollTo: {
//         y: i * innerHeight + spacesOfNoneFullscreenSections,
//         autoKill: false,
//       },
//       duration: i === 15 && mode === 'enter' ? 0.05 : 0.6,
//       // duration: 0.6,
//       overwrite: true,
//       onComplete() {
//         gsap.set('body', { overflowY: 'auto' });

//         // console.log(
//         //   i,
//         //   document.body.scrollTop,
//         //   i * innerHeight + spacesOfNoneFullscreenSections
//         // );
//       },
//     });
//   }

//   /**
//    * .absolute.scrollable index 12, 13
//    * .absolute.scrollable index 52, 53
//    */

//   // const indexes = [12,13,52,53]
//   // const dynamicSections = document.getElementsByClassName('absolute scrollable');

//   gsap.utils.toArray('.snap-item').forEach((panel, i) => {
//     ScrollTrigger.create({
//       trigger: panel,
//       onEnter: () => {
//         document
//           .getElementsByClassName('snap-item')[12]
//           .classList.add('enter1');
//         document
//           .getElementsByClassName('snap-item')[13]
//           .classList.add('enter2');
//         // document.getElementsByClassName('scrollable')[52].classList.add('enter3');
//         // document.getElementsByClassName('scrollable')[53].classList.add('enter4');
//         document
//           .getElementsByClassName('snap-item')[12]
//           .classList.remove('enterBack1');
//         document
//           .getElementsByClassName('snap-item')[13]
//           .classList.remove('enterBack2');
//         // document
//         //   .getElementsByClassName('scrollable')[52]
//         //   .classList.remove('enterBack3');
//         // document
//         //   .getElementsByClassName('scrollable')[53]
//         //   .classList.remove('enterBack4');

//         goToSection(i, 'enter');
//       },
//     });

//     ScrollTrigger.create({
//       trigger: panel,
//       start: 'bottom bottom',
//       onEnterBack: () => {
//         document
//           .getElementsByClassName('snap-item')[12]
//           .classList.add('enterBack1');
//         document
//           .getElementsByClassName('snap-item')[13]
//           .classList.add('enterBack2');
//         // document
//         //   .getElementsByClassName('scrollable')[52]
//         //   .classList.add('enterBack3');
//         // document
//         //   .getElementsByClassName('scrollable')[53]
//         //   .classList.add('enterBack4');
//         document
//           .getElementsByClassName('snap-item')[12]
//           .classList.remove('enter1');
//         document
//           .getElementsByClassName('snap-item')[13]
//           .classList.remove('enter2');
//         // document
//         //   .getElementsByClassName('scrollable')[52]
//         //   .classList.remove('enter3');
//         // document
//         //   .getElementsByClassName('scrollable')[53]
//         //   .classList.remove('enter4');

//         goToSection(i, 'enterBack');
//       },
//     });
//   });

//   document.getElementById('scrollOnclick').onclick = () => {
//     goToSection(1);
//   };
// }
if (isNotPC) {
  // const goingUpTexts = document.getElementsByClassName('goingUp-text');

  // const snapIndexToShow = [
  //   1, 2, 12, 12, 25, 25, 38, 38, 52, 52, 52, 52, 53, 53, 54, 54, 56, 56, 57,
  //   58, 58,
  // ];

  // document.body.addEventListener('scroll', () => {
  //   snapIndexToShow.forEach((snapIndex, textIndex) => {
  //     let top = snapIndex * innerHeight;

  //     if (snapIndex > 13) {
  //       top +=
  //         document.getElementById('non1').offsetHeight -
  //         innerHeight +
  //         document.getElementById('non2').offsetHeight -
  //         innerHeight;
  //     }

  //     // if (snapIndex > 12) {
  //     //   top += document.getElementById('non2').offsetHeight - innerHeight;
  //     // }

  //     textIndex === 4 && console.log(top, document.body.scrollTop);

  //     textIndex === 2 && console.log(top, document.body.scrollTop);

  //     if (top === document.body.scrollTop) {
  //       gsap.fromTo(
  //         goingUpTexts[textIndex],
  //         { y: 100, opacity: 0, autoAlpha: 0 },
  //         {
  //           duration: 1.25,
  //           y: 0,
  //           opacity: 1,
  //           autoAlpha: 1,
  //           ease: 'back',
  //           overwrite: 'auto',
  //         }
  //       );
  //       return;
  //     }

  //     if (
  //       (snapIndex > 11 && top === document.body.scrollTop + innerHeight * 2) ||
  //       top === document.body.scrollTop - innerHeight * 2
  //     ) {
  //       gsap.fromTo(
  //         goingUpTexts[textIndex],
  //         { autoAlpha: 1 },
  //         { autoAlpha: 0, overwrite: 'auto' }
  //       );
  //       return;
  //     }

  //     if (
  //       top === document.body.scrollTop + innerHeight ||
  //       top === document.body.scrollTop - innerHeight
  //     ) {
  //       // alert('I am on');
  //       gsap.fromTo(
  //         goingUpTexts[textIndex],
  //         { autoAlpha: 1 },
  //         { autoAlpha: 0, overwrite: 'auto' }
  //       );
  //       return;
  //     }
  //   });
  // });
  const goingUpTexts = gsap.utils.toArray('.goingUp-text');
  goingUpTexts.forEach((elem) => {
    gsap.fromTo(
      elem,
      { y: 100, autoAlpha: 0 },
      {
        duration: 1.25,
        y: 0,
        autoAlpha: 1,
        ease: 'back',
        overwrite: 'auto',
      }
    );
  });
} else {
  const goingUpTexts = gsap.utils.toArray('.goingUp-text');
  goingUpTexts.forEach((elem) => {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 90%',
      end: 'bottom 10%',
      // markers: window.location.hostname === "127.0.0.1",
      onEnter() {
        setTimeout(() => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        }, 250);
      },
      onLeave() {
        gsap.fromTo(
          elem,
          { autoAlpha: 1 },
          { autoAlpha: 0, overwrite: 'auto' }
        );
      },
      onEnterBack() {
        gsap.fromTo(
          elem,
          { y: -100, autoAlpha: 0 },
          {
            duration: 1.25,
            y: 0,
            autoAlpha: 1,
            ease: 'back',
            overwrite: 'auto',
          }
        );
      },
      onLeaveBack() {
        gsap.fromTo(
          elem,
          { autoAlpha: 1 },
          { autoAlpha: 0, overwrite: 'auto' }
        );
      },
    });
  });
}

const TIME_OUT = 600; // It should be the same transition time of the sections
const body = document.querySelector('body');
const listSections = document.querySelectorAll('.section_scroll');
const sectionsQty = document.querySelectorAll('.section_scroll').length;
const sectionStick = document.querySelector('.section-stick');
const sectionScroll = document.getElementById('section-scroll');
const listHideScrollSreens = document.querySelectorAll('.hide_scroll');
const page01 = document.getElementById('page01');

let startFlag = true;
let qty = 0,
  main = null,
  next = null;

const listSectionScroll = [
  '노인들의 인지장애',
  '노인들의 치매와\n사회적 비용',
  '하안노인\n종합복지관',
  '인생정원 MAP',
  '입구',
  '기억산책길',
  '오감놀이터',
  '정원 쉼터',
  '마음숲',
  '초록마루',
  '인생정원\n해설사',
];

let listSessionHeight = [];

Array(sectionsQty)
  .fill()
  .forEach((values, index) => {
    sectionStick.innerHTML =
      // sectionStick.innerHTML + `<div class="stick">${listSectionScroll[index]}</div>`;
      sectionStick.innerHTML +
      `<div class="section-wrap" ">
    <div class="section-name" id = "section_text${index + 1}">${
        listSectionScroll[index]
      }</div>
    <div class="stick" id = "section${
      index + 1
    }"><div class="stick-progress" id="myBar${index + 1}"></div></div>
  </div>`;
  });

listSections.forEach((values, index) => {
  values.setAttribute('id', `section_scroll${index + 1}`);
});

listHideScrollSreens.forEach((values, index) => {
  values.setAttribute('id', `hide_scroll${index + 1}`);
});

listSessionHeight = [];
listSections.forEach((values, index) => {
  listSessionHeight.push(values.offsetTop);
});
listSessionHeight.push(page01.scrollHeight);

page01.addEventListener('scroll', (event) => {
  let scrolledSesssonHeight = 0;
  for (let index = 0; index < listHideScrollSreens.length; index++) {
    const hideScrollScreen = document.getElementById(`hide_scroll${index + 1}`);
    if (page01.scrollTop - hideScrollScreen.offsetTop == 0) {
      sectionScroll.style.opacity = 0;
      index = listHideScrollSreens.length;
    } else {
      sectionScroll.style.opacity = 1;
    }
  }

  listSections.forEach((values, index) => {
    const sectionTextID = document.getElementById(`section_text${index + 1}`);
    const sectionTextIDprevious = document.getElementById(
      `section_text${index}`
    );
    const sectionScreen = document.getElementById(values.getAttribute('id'));
    // console.log(scrolledSesssonHeight);
    if (page01.scrollTop - sectionScreen.offsetTop >= 0) {
      qty = index + 1;
      scrolledSesssonHeight = listSessionHeight[index];
      // console.log(`listSessionHeight---${listSessionHeight}`);
      // console.log(`listSessionHeight[qty]---${listSessionHeight[qty]}`);
      // console.log(`scrolledSesssonHeight---${scrolledSesssonHeight}`);
      // console.log(`page01.scrollTop---${page01.scrollTop}`);
      for (let j = 0; j < listSections.length; j++) {
        const sectionTextIDRest = document.getElementById(`section${j + 1}`);
        sectionTextIDRest.classList.remove('text_active');
      }
      sectionTextID.classList.add('text_active');
      // console.log(page01.scrollTop);
      if (sectionTextIDprevious != null) {
        sectionTextIDprevious.classList.remove('text_active');
      }
      // console.log(
      //   page01.scrollTop - scrolledSesssonHeight + innerHeight,
      //   listSessionHeight[qty] - scrolledSesssonHeight
      // );
      var scrolled =
        ((page01.scrollTop - scrolledSesssonHeight + innerHeight) /
          (listSessionHeight[qty] - scrolledSesssonHeight)) *
        100;
      // console.log(`----scrolled: ${scrolled}`);
      document.getElementById(`myBar${qty || 1}`).style.height = scrolled + '%';
      var previous = document.getElementById(`myBar${qty + 1}`);
      if (previous != null) {
        previous.style.height = 0 + '%';
      }
    } else {
      sectionTextID.classList.remove('text_active');
    }
  });
});

if (isNotPC) {
  const ctx = document
    .getElementById('statistics-chart-canvas')
    .getContext('2d');

  const firstColor = ColorUtil.getComputedColor('--primary');
  const secondColor = ColorUtil.getComputedColor('--primary-light');

  window.homeStatisticsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [2017, 2018, 2019, 2020, 2021],
      datasets: [
        {
          label: '60세 이상 추정치매환자수',
          backgroundColor: firstColor,
          data: [4, 5, 6, 7, 8],
          barThickness: 15,
        },
        {
          label: '치매환자 1인당 치매관리비',
          backgroundColor: secondColor,
          data: [5, 6, 7, 8, 9],
          barThickness: 15,
        },
      ],
    },
    options: {
      animation: {
        duration: 4000,
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
} else {
  const ctx = document
    .getElementById('statistics-chart-canvas')
    .getContext('2d');

  const firstColor = ColorUtil.getComputedColor('--primary');
  const secondColor = ColorUtil.getComputedColor('--primary-light');

  ScrollTrigger.create({
    trigger: '.statistics-chart',
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      window.homeStatisticsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [2017, 2018, 2019, 2020, 2021],
          datasets: [
            {
              label: '60세 이상 추정치매환자수',
              backgroundColor: firstColor,
              data: [4, 5, 6, 7, 8],
              barThickness: 15,
            },
            {
              label: '치매환자 1인당 치매관리비',
              backgroundColor: secondColor,
              data: [5, 6, 7, 8, 9],
              barThickness: 15,
            },
          ],
        },
        options: {
          animation: {
            duration: 4000,
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  });
}

if (!isNotPC) {
  gsap.registerEffect({
    name: 'zoom',
    effect: (targets, config) => {
      const vars = { transformOrigin: '0px 0px', ...config },
        { scale, origin } = config,
        clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
      delete vars.origin;
      vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
      vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
      vars.overwrite = 'auto';
      return gsap.to(targets, vars);
    },
    extendTimeline: true,
    defaults: { origin: [0.5, 0.5], scale: 2 },
  });

  const bg1 = document.querySelectorAll('.trigger-map');
  const bg2 = document.querySelectorAll('.trigger-map-shadow');
  bg1.forEach((element) => {
    element.classList.add('pc');
  });
  bg2.forEach((element) => {
    element.classList.add('pc');
  });

  if (!DeviceUtil.isIOS()) {
  } else {
    bg1.forEach((element) => {
      element.classList.add('active');
    });
    bg2.forEach((element) => {
      element.classList.add('active');
    });
  }

  function triggerZoomPointsMap() {
    const zoomData = [
      { scale: 1, origin: [0.5, 0.5] },
      { scale: 1.6, origin: [0.6, 0.6] },
      { scale: 4, origin: [0.2, 0.5] },
      { scale: 1, origin: [0.5, 0.5] },
    ];

    gsap.utils
      .toArray('.fixed-map_scrollable-section')
      .forEach((section, index) => {
        const zoom = zoomData[index];
        ScrollTrigger.create({
          trigger: section,
          onToggle(self) {
            if (self.isActive) {
              gsap.effects.zoom('.trigger-map', {
                scale: zoom.scale,
                origin: zoom.origin,
                duration: 1,
                ease: 'power1.inOut',
              });
            }
          },
          onEnter() {
            if (index === 0) {
              document.getElementById('fixed-map').classList.add('fixed-map');
            }
          },
          onLeave() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-map')
                .classList.remove('fixed-map');
            }
          },
          onEnterBack() {
            if (index === zoomData.length - 1) {
              document.getElementById('fixed-map').classList.add('fixed-map');
            }
          },
          onLeaveBack() {
            if (index === 0) {
              document
                .getElementById('fixed-map')
                .classList.remove('fixed-map');
            }
          },
        });
      });
  }

  const bg1a = document.querySelectorAll('.trigger-photo');
  const bg2a = document.querySelectorAll('.trigger-photo-shadow');
  bg1a.forEach((element) => {
    element.classList.add('pc');
  });
  bg2a.forEach((element) => {
    element.classList.add('pc');
  });

  if (!DeviceUtil.isIOS()) {
  } else {
    bg1a.forEach((element) => {
      element.classList.add('active');
    });
    bg2a.forEach((element) => {
      element.classList.add('active');
    });
  }

  function triggerZoom2dMap() {
    const zoomData =
      innerWidth < 1280
        ? [
            { scale: 1, origin: [0.5, 0.5] },
            // 3
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 4
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 5
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 6
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 7
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 8
            { scale: 3, origin: [0.68, 0.46] },
            { scale: 3, origin: [0.68, 0.46] },
            { scale: 1, origin: [0.5, 0.46] },
          ]
        : [
            { scale: 1, origin: [0.5, 0.5] },
            // 3
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 4
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 5
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 6
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 7
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 8
            { scale: 3, origin: [0.68, 0.35] },
            { scale: 3, origin: [0.68, 0.35] },
            { scale: 1, origin: [0.5, 0.5] },
          ];

    function showHideMiniMap(index, mode) {
      const startOpacity = mode === 'enter' ? 0 : 1;
      const endOpacity = mode === 'enter' ? 1 : 0;
      gsap.fromTo(
        miniMaps[index],
        { opacity: startOpacity, autoAlpha: 0 },
        {
          duration: 1,
          opacity: endOpacity,
          autoAlpha: 1,
          ease: 'power1.inOut',
          overwrite: 'auto',
        }
      );
    }

    const miniMaps = gsap.utils.toArray('.top-fixed-2d-map');
    const triggerZoomIndexes = [1, 7, 13, 18, 24, 30];

    gsap.utils
      .toArray('.fixed-bg_scrollable-section')
      .forEach((section, index) => {
        const zoom = zoomData[index];
        ScrollTrigger.create({
          trigger: section,
          onToggle(self) {
            if (self.isActive) {
              gsap.effects.zoom('.trigger-photo', {
                scale: zoom.scale,
                origin: zoom.origin,
                duration: 1,
                ease: 'power1.inOut',
              });
            }
          },
          onEnter() {
            if (index === 0) {
              document
                .getElementById('fixed-background')
                .classList.add('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'enter');
              }
            });
          },
          onLeave() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-background')
                .classList.remove('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'leave');
              }
            });
          },
          onEnterBack() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-background')
                .classList.add('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'enter');
              }
            });
          },
          onLeaveBack() {
            if (index === 0) {
              document
                .getElementById('fixed-background')
                .classList.remove('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'leave');
              }
            });
          },
        });
      });
  }

  // 01 page layout 02
  triggerZoomPointsMap();
  // 01 page layout 03 -> 07
  triggerZoom2dMap();
} else {
  document.getElementById('fixed-background').classList.add('snap-item');
  const bg1 = document.querySelectorAll('.trigger-map');
  const bg2 = document.querySelectorAll('.trigger-map-shadow');
  const bg3 = document.querySelectorAll('.fixed-map_scrollable-section');
  bg1.forEach((element) => {
    element.classList.add('mobile');
  });
  bg2.forEach((element) => {
    element.classList.add('mobile');
  });
  bg3.forEach((element) => {
    element.classList.add('mobile');
    element.classList.add('parallax');
  });

  const bg1a = document.querySelectorAll('.trigger-photo');
  const bg2a = document.querySelectorAll('.trigger-photo-shadow');
  const bg3a = document.querySelectorAll('.fixed-bg_scrollable-section');
  bg1a.forEach((element) => {
    element.classList.add('mobile');
  });
  bg2a.forEach((element) => {
    element.classList.add('mobile');
  });
  bg3a.forEach((element) => {
    element.classList.add('parallax');
  });

  bg3a[1].classList.add('mobile1');
  bg3a[7].classList.add('mobile2');
  bg3a[13].classList.add('mobile3');
  bg3a[18].classList.add('mobile4');
  bg3a[24].classList.add('mobile5');
  bg3a[30].classList.add('mobile6');

  const mobileHidden = document.querySelectorAll('.mobile-hidden');
  mobileHidden.forEach((element) => {
    element.classList.add('active');
  });

  // const pq = document.querySelectorAll('.page01_quotes');
  // pq[0].classList.add('mobile1');
  // pq[1].classList.add('mobile2');

  const fc = document.querySelectorAll('.focused-place');
  fc.forEach((element) => {
    element.classList.add('mobile');
  });

  if (!DeviceUtil.isIOS()) {
  } else {
    bg1.forEach((element) => {
      element.classList.add('active');
    });
    bg2.forEach((element) => {
      element.classList.add('active');
    });
    bg1a.forEach((element) => {
      element.classList.add('active');
    });
    bg2a.forEach((element) => {
      element.classList.add('active');
    });
  }
}
