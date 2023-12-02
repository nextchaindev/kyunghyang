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

  if (i > 12) {
    spacesOfNoneFullscreenSections += mode === 'enter' ? -1 : i < 16 ? -1 : 0;
  }

  // if (i > 52) {
  //   spacesOfNoneFullscreenSections +=
  //     document.getElementById('section_scroll11').offsetHeight - innerHeight;
  // }

  gsap.to('body', {
    scrollTo: {
      y: i * innerHeight + spacesOfNoneFullscreenSections,
      autoKill: false,
    },
    duration: i === 15 && mode === 'enter' ? 0.05 : 0.6,
    // duration: 0.6,
    overwrite: true,
    onComplete() {
      gsap.set('body', { overflowY: 'auto' });

      // console.log(
      //   i,
      //   document.body.scrollTop,
      //   i * innerHeight + spacesOfNoneFullscreenSections
      // );
    },
  });
}

/**
 * .absolute.scrollable index 12, 13
 * .absolute.scrollable index 52, 53
 */

// const indexes = [12,13,52,53]
// const dynamicSections = document.getElementsByClassName('absolute scrollable');

gsap.utils.toArray('.scrollable').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    onEnter: () => {
      document.getElementsByClassName('scrollable')[12].classList.add('enter1');
      document.getElementsByClassName('scrollable')[13].classList.add('enter2');
      // document.getElementsByClassName('scrollable')[52].classList.add('enter3');
      // document.getElementsByClassName('scrollable')[53].classList.add('enter4');
      document
        .getElementsByClassName('scrollable')[12]
        .classList.remove('enterBack1');
      document
        .getElementsByClassName('scrollable')[13]
        .classList.remove('enterBack2');
      // document
      //   .getElementsByClassName('scrollable')[52]
      //   .classList.remove('enterBack3');
      // document
      //   .getElementsByClassName('scrollable')[53]
      //   .classList.remove('enterBack4');

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
      // document
      //   .getElementsByClassName('scrollable')[52]
      //   .classList.add('enterBack3');
      // document
      //   .getElementsByClassName('scrollable')[53]
      //   .classList.add('enterBack4');
      document
        .getElementsByClassName('scrollable')[12]
        .classList.remove('enter1');
      document
        .getElementsByClassName('scrollable')[13]
        .classList.remove('enter2');
      // document
      //   .getElementsByClassName('scrollable')[52]
      //   .classList.remove('enter3');
      // document
      //   .getElementsByClassName('scrollable')[53]
      //   .classList.remove('enter4');

      goToSection(i, 'enterBack');
    },
  });
});

document.getElementById('scrollOnclick').onclick = () => {
  goToSection(1);
};
