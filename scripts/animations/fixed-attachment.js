gsap.utils.toArray('.fixed-attachment').forEach((element, idx) => {
  ScrollTrigger.create({
    trigger: element,
    onEnter() {
      if (idx % 2 === 0) {
        setTimeout(
          () =>
            document
              .getElementsByClassName('fixed-attachment')
              [idx].classList.add('parallax'),
          610
        );
      } else {
        setTimeout(
          () =>
            document
              .getElementsByClassName('fixed-attachment')
              [idx].classList.remove('parallax'),
          610
        );
      }
    },
    onEnterBack() {
      if (idx % 2 === 0) {
        setTimeout(
          () =>
            document
              .getElementsByClassName('fixed-attachment')
              [idx].classList.remove('parallax'),
          610
        );
      } else {
        setTimeout(
          () =>
            document
              .getElementsByClassName('fixed-attachment')
              [idx].classList.add('parallax'),
          610
        );
      }
    },
  });
});

gsap.utils.toArray('.trigger-none-attachment').forEach((element, idx) => {
  if (idx % 2 === 0) {
    ScrollTrigger.create({
      trigger: '.trigger-photo-shadow',
      onEnter() {
        document
          .getElementsByClassName('trigger-none-attachment')
          [idx].classList.add('trigger-fixed-attachment');
      },
      onLeaveBack() {
        document
          .getElementsByClassName('trigger-none-attachment')
          [idx].classList.remove('trigger-fixed-attachment');
      },
    });
  } else {
    ScrollTrigger.create({
      trigger: element,
      onEnter() {
        setTimeout(
          () =>
            document
              .getElementsByClassName('trigger-none-attachment')
              [idx].classList.remove('trigger-fixed-attachment'),
          610
        );
      },
      onEnterBack() {
        setTimeout(
          () =>
            document
              .getElementsByClassName('trigger-none-attachment')
              [idx].classList.add('trigger-fixed-attachment'),
          610
        );
      },
    });
  }
});
