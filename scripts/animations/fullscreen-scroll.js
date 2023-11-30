// should be placed after gsap scripts
// window.addEventListener('resize', () => {
//   document.body.scrollTo(0, 0);
// });

function goToSection(i) {
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
      goToSection(i);
    },
  });

  ScrollTrigger.create({
    trigger: panel,
    start: 'bottom bottom',
    onEnterBack: () => {
      goToSection(i);
    },
  });
});

document.getElementById('scrollOnclick').onclick = () => {
  goToSection(1);
};

// gsap.utils.toArray('.hide_scroll').forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     onEnter: () => {
//       document.getElementById('section-scroll').style.opacity = 0;
//     },
//     onLeave: () => {
//       document.getElementById('section-scroll').style.opacity = 1;
//     },
//   });
// });

// ScrollTrigger.create({
//   trigger: '#section_scroll11',
//   onEnter: () => {
//     const sectionTextID = document.getElementById(`section_text11`);
//     sectionTextID.classList.add('text_active');
//     document.getElementById(`myBar11`).style.height = '100%';
//   },
//   onLeave: () => {
//     const sectionTextID = document.getElementById(`section_text11`);
//     sectionTextID.classList.remove('text_active');
//     document.getElementById(`myBar11`).style.height = '0%';
//   },
// });
