// should be placed after gsap scripts
import { DeviceUtil } from '../common.util.js';

const isNotPC = DeviceUtil.isNotPC();

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
