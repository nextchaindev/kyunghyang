// should be placed after gsap scripts

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
    onLeave: function () {
      gsap.fromTo(
        elem,
        { opacity: 1, autoAlpha: 0 },
        {
          duration: 5,
          opacity: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        }
      );
    },
    onEnterBack: function () {
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
    onLeaveBack: function () {
      gsap.fromTo(
        elem,
        { opacity: 1, autoAlpha: 0 },
        {
          duration: 5,
          opacity: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        }
      );
    },
  });
});
