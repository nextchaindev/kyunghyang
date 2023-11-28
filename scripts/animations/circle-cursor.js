gsap.utils.toArray(".centre-2d-map-info-3d").forEach((grabbableItem, i) => {
  ScrollTrigger.create({
    trigger: grabbableItem,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: () => {
      gsap.set(".circle-cursor", {
        xPercent: -50,
        yPercent: -110,
        visibility: "visible",
      });

      let xSetter = gsap.quickSetter(".circle-cursor", "x", "px");
      let ySetter = gsap.quickSetter(".circle-cursor", "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.x);
        ySetter(e.y);
      });
    },
    onLeave: () => {
      gsap.set(".circle-cursor", {
        visibility: "hidden",
      });
    },
    onEnterBack: () => {
      gsap.set(".circle-cursor", {
        xPercent: -50,
        yPercent: -110,
        visibility: "visible",
      });

      let xSetter = gsap.quickSetter(".circle-cursor", "x", "px");
      let ySetter = gsap.quickSetter(".circle-cursor", "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.x);
        ySetter(e.y);
      });
    },
    onLeaveBack: () => {
      gsap.set(".circle-cursor", {
        visibility: "hidden",
      });
    },
  });
});
