// should be placed after gsap scripts

const goingUpTexts = gsap.utils.toArray(".goingUp-text");

goingUpTexts.forEach((elem) => {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 90%",
    end: "bottom 10%",
    // markers: window.location.hostname === "127.0.0.1",
    onEnter() {
      setTimeout(() => {
        gsap.fromTo(
          elem,
          { y: 100, autoAlpha: 0 },
          {
            duration: 1.6,
            y: 0,
            autoAlpha: 1,
            ease: "back",
            overwrite: "auto",
          }
        );
        gsap.fromTo(
          elem,
          { y: 100, autoAlpha: 0 },
          {
            duration: 1.6,
            y: 0,
            autoAlpha: 1,
            ease: "back",
            overwrite: "auto",
          }
        );
      }, 250);
    },
    onLeave() {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack() {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.6,
          y: 0,
          autoAlpha: 1,
          ease: "back",
          overwrite: "auto",
        }
      );
    },
    onLeaveBack() {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
  });
});
