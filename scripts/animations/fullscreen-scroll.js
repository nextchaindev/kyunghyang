// should be placed after gsap scripts
// window.addEventListener('resize', () => {
//   document.body.scrollTo(0, 0);
// });
ScrollTrigger.defaults({
  toggleActions: 'restart pause resume pause',
});

function goToSection(i, mode) {
  gsap.set('body', { overflowY: 'hidden' });

  let spacesOfNoneFullscreenSections = 0;

  if (i > 12) {
    const total =
      document.getElementById('non1').offsetHeight +
      document.getElementById('non2').offsetHeight;
    spacesOfNoneFullscreenSections -= innerHeight * 2 - total;
  }

  // if (i === 13 && mode === 'enterBack') {
  //   document
  // }

  if (i > 12) {
    spacesOfNoneFullscreenSections += mode === 'enter' ? -1 : i < 16 ? -1 : 0;
  }

  gsap.to('body', {
    scrollTo: {
      y: i * innerHeight + spacesOfNoneFullscreenSections,
      autoKill: false,
    },
    // duration: i === 15 && mode === 'enter' ? 0 : 0.6,
    duration: 0.6,
    overwrite: true,
    onComplete() {
      gsap.set('body', { overflowY: 'auto' });
    },
  });
}

gsap.utils.toArray('.scrollable').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    onEnter: () => {
      document.getElementsByClassName('scrollable')[12].classList.add('enter1');
      document.getElementsByClassName('scrollable')[13].classList.add('enter2');
      document
        .getElementsByClassName('scrollable')[12]
        .classList.remove('enterBack1');
      document
        .getElementsByClassName('scrollable')[13]
        .classList.remove('enterBack2');
      goToSection(i, 'enter');
    },
  });

  ScrollTrigger.create({
    trigger: panel,
    start: 'bottom bottom',
    onEnterBack: () => {
      document
        .getElementsByClassName('scrollable')[12]
        .classList.add('enterBack1');
      document
        .getElementsByClassName('scrollable')[13]
        .classList.add('enterBack2');
      document
        .getElementsByClassName('scrollable')[12]
        .classList.remove('enter1');
      document
        .getElementsByClassName('scrollable')[13]
        .classList.remove('enter2');
      goToSection(i, 'enterBack');
    },
  });
});

document.getElementById('scrollOnclick').onclick = () => {
  goToSection(1);
};

//

// function goToTopSection(i) {
//   gsap.set('body', { overflowY: 'hidden' });
//   let scrollValue = 0;
//   gsap.to('body', {
//     scrollTo: {
//       y: scrollValue,
//       autoKill: false,
//     },
//     duration: i === 12 ? 0 : 0.6,
//     overwrite: true,
//     onComplete() {
//       gsap.set('body', { overflowY: 'auto' });
//     },
//   });
// }

// function goToBottomSection(i) {
//   gsap.set('body', { overflowY: 'hidden' });
//   let scrollValue = 0;
//   gsap.to('body', {
//     scrollTo: {
//       y: scrollValue,
//       autoKill: false,
//     },
//     duration: i === 12 ? 0 : 0.6,
//     overwrite: true,
//     onComplete() {
//       gsap.set('body', { overflowY: 'auto' });
//     },
//   });
// }

// gsap.utils.toArray('.free.scrollable').forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     onEnter: () => {
//       goToTopSection(i);
//     },
//   });

//   ScrollTrigger.create({
//     trigger: panel,
//     start: 'bottom bottom',
//     onEnterBack: () => {
//       goToBottomSection(i);
//     },
//   });
// });
