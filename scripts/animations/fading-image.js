// should be placed after gsap scripts
import { DeviceUtil } from '../common.util.js';

const isNotPC = DeviceUtil.isNotPC();

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
