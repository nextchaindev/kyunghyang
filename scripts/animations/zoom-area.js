gsap.registerEffect({
  name: "zoom",
  effect: (targets, config) => {
    const vars = { transformOrigin: "0px 0px", ...config },
      { scale, origin } = config,
      clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
    delete vars.origin;
    vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
    vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
    vars.overwrite = "auto";
    return gsap.to(targets, vars);
  },
  extendTimeline: true,
  defaults: { origin: [0.5, 0.5], scale: 2 },
});

// for each section, we define the zoom data here
const zoomData = [
  { scale: 1.5, origin: [0.4, 0.25] },
  // { scale: 3, origin: [0.6, 1] },
  // { scale: 1, origin: [0.5, 0.5] },
  { scale: 1, origin: [0, 0] },
];

const list = gsap.utils.toArray(".zoom-image-scrollable");

list.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    onEnter() {
      if (index === 0) {
        document.getElementById("zoom-image").classList.add("zoom-image");
        gsap.effects.zoom(".save", {
          scale: zoomData[0].scale,
          origin: zoomData[0].origin,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    onLeave() {
      if (index === list.length - 1) {
        document.getElementById("zoom-image").classList.remove("zoom-image");
        gsap.effects.zoom(".save", {
          scale: zoomData[1].scale,
          origin: zoomData[1].origin,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    onEnterBack() {
      if (index === list.length - 1) {
        document.getElementById("zoom-image").classList.add("zoom-image");
        gsap.effects.zoom(".save", {
          scale: zoomData[0].scale,
          origin: zoomData[0].origin,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    onLeaveBack() {
      if (index === 0) {
        document.getElementById("zoom-image").classList.remove("zoom-image");
        gsap.effects.zoom(".save", {
          scale: zoomData[1].scale,
          origin: zoomData[1].origin,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
  });
});
