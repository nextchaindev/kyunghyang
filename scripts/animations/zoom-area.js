// gsap.registerEffect({
//   name: "zoom",
//   effect: (targets, config) => {
//     const vars = { transformOrigin: "0px 0px", ...config },
//       { scale, origin } = config,
//       clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
//     delete vars.origin;
//     vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
//     vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
//     vars.overwrite = "auto";
//     return gsap.to(targets, vars);
//   },
//   extendTimeline: true,
//   defaults: { origin: [0.5, 0.5], scale: 2 },
// });

// // for each section, we define the zoom data here
// const zoomData = [
//   { scale: 1, origin: [0, 0] },
//   { scale: 2, origin: [0.5, 0.5] },
//   { scale: 2, origin: [0.5, 0.5] },
//   { scale: 1, origin: [0, 0] },
// ];

// gsap.utils.toArray(".zoom1-scrollable").forEach((section, index) => {
//   const zoom = zoomData[index];
//   ScrollTrigger.create({
//     trigger: section,
//     onToggle(self) {
//       if (self.isActive) {
//         // if it enters forward or backward
//         console.log(index);
//         gsap.effects.zoom(".zoom1-photo", {
//           scale: zoom.scale,
//           origin: zoom.origin,
//           duration: 1,
//           ease: "power1.inOut",
//         });
//       }
//     },
//     onEnter() {
//       if (index === 0) {
//         document.getElementById("zoom1").classList.add("zoom1");
//       }
//     },
//     onLeave() {
//       if (index === gsap.utils.toArray(".zoom1-scrollable").length - 1) {
//         document.getElementById("zoom1").classList.remove("zoom1");
//       }
//     },
//     onEnterBack() {
//       if (index === gsap.utils.toArray(".zoom1-scrollable").length - 1) {
//         document.getElementById("zoom1").classList.add("zoom1");
//       }
//     },
//     onLeaveBack() {
//       if (index === 0) {
//         document.getElementById("zoom1").classList.remove("zoom1");
//       }
//     },
//   });
// });
