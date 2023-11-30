// should be placed after gsap scripts
// window.addEventListener('resize', () => {
//   document.body.scrollTo(0, 0);
// });

function goToSection(i, mode) {
  gsap.set('body', { overflowY: 'hidden' });

  let spacesOfNoneFullscreenSections = 0;

  // if (i > 62) {
  //   scrollY += document.getElementById("non4").offsetHeight + innerHeight;
  // }

  // if (i > 59) {
  //   scrollY += document.getElementById("non3").offsetHeight + innerHeight + 1;
  // }

  if (i > 11) {
    spacesOfNoneFullscreenSections +=
      document.getElementById('non1').offsetHeight +
      document.getElementById('non2').offsetHeight +
      innerHeight;
  }

  if ((mode = 'enter' && i > 11)) {
    spacesOfNoneFullscreenSections -= 2;
  }

  if ((mode = 'enterBack' && i > 11)) {
    spacesOfNoneFullscreenSections += 3;
  }

  gsap.to('body', {
    scrollTo: {
      y: i * innerHeight + spacesOfNoneFullscreenSections,
      autoKill: false,
    },
    duration: 0.6,
    overwrite: true,
    onComplete() {
      gsap.set('body', { overflowY: 'auto' });
    },
  });
}

ScrollTrigger.defaults({
  toggleActions: 'restart pause resume pause',
});

gsap.utils.toArray('.fullscreen.scrollable').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    onEnter: () => {
      goToSection(i, 'enter');
    },
  });

  ScrollTrigger.create({
    trigger: panel,
    start: 'bottom bottom',
    onEnterBack: () => {
      goToSection(i, 'enterBack');
    },
  });
});

document.getElementById('scrollOnclick').onclick = () => {
  goToSection(1);
};
