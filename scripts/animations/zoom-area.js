gsap.registerEffect({
  name: 'zoom',
  effect: (targets, config) => {
    const vars = { transformOrigin: '0px 0px', ...config },
      { scale, origin } = config,
      clamp = gsap.utils.clamp(-100 * (scale - 1), 0);
    delete vars.origin;
    vars.xPercent = clamp((0.5 - origin[0] * scale) * 100);
    vars.yPercent = clamp((0.5 - origin[1] * scale) * 100);
    vars.overwrite = 'auto';
    return gsap.to(targets, vars);
  },
  extendTimeline: true,
  defaults: { origin: [0.5, 0.5], scale: 2 },
});

const zoomData = [
  { scale: 1, origin: [0.5, 0.5] },
  // 3
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 3, origin: [0.1, 0.5] },
  { scale: 1, origin: [0.5, 0.5] },
  // 4
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 3, origin: [0.4, 0.5] },
  { scale: 1, origin: [0.5, 0.5] },
  // 5
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 3, origin: [0.72, 0.5] },
  { scale: 1, origin: [0.5, 0.5] },
  // 6
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 3.2, origin: [0.85, 0.5] },
  { scale: 1, origin: [0.5, 0.5] },
  // 7
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 3.2, origin: [0.8, 0.35] },
  { scale: 1, origin: [0.5, 0.5] },
  // 8
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  { scale: 3, origin: [0.68, 0.35] },
  // end
  { scale: 1, origin: [0.5, 0.5] },
];

const miniMaps = document.getElementsByClassName('top-fixed-2d-map');

gsap.utils.toArray('.fixed-bg_scrollable-section').forEach((section, index) => {
  const zoom = zoomData[index];
  ScrollTrigger.create({
    trigger: section,
    onToggle(self) {
      if (self.isActive) {
        gsap.effects.zoom('.trigger-photo', {
          scale: zoom.scale,
          origin: zoom.origin,
          duration: 1,
          ease: 'power1.inOut',
        });
      }
    },
    onEnter() {
      if (index === 0) {
        document
          .getElementById('fixed-background')
          .classList.add('fixed-background');
      }
      if (index === 1) {
        miniMaps[0].classList.add('active');
      }
      if (index === 11) {
        miniMaps[1].classList.add('active');
      }
      if (index === 20) {
        miniMaps[2].classList.add('active');
      }
      if (index === 28) {
        miniMaps[3].classList.add('active');
      }
      if (index === 37) {
        miniMaps[4].classList.add('active');
      }
      if (index === 46) {
        miniMaps[5].classList.add('active');
      }
    },
    onLeave() {
      if (index === zoomData.length - 1) {
        document
          .getElementById('fixed-background')
          .classList.remove('fixed-background');
      }
      if (index === 1) {
        miniMaps[0].classList.remove('active');
      }
      if (index === 11) {
        miniMaps[1].classList.remove('active');
      }
      if (index === 20) {
        miniMaps[2].classList.remove('active');
      }
      if (index === 28) {
        miniMaps[3].classList.remove('active');
      }
      if (index === 37) {
        miniMaps[4].classList.remove('active');
      }
      if (index === 46) {
        miniMaps[5].classList.remove('active');
      }
    },
    onEnterBack() {
      if (index === zoomData.length - 1) {
        document
          .getElementById('fixed-background')
          .classList.add('fixed-background');
      }
      if (index === 1) {
        miniMaps[0].classList.add('active');
      }
      if (index === 11) {
        miniMaps[1].classList.add('active');
      }
      if (index === 20) {
        miniMaps[2].classList.add('active');
      }
      if (index === 28) {
        miniMaps[3].classList.add('active');
      }
      if (index === 37) {
        miniMaps[4].classList.add('active');
      }
      if (index === 46) {
        miniMaps[5].classList.add('active');
      }
    },
    onLeaveBack() {
      if (index === 0) {
        document
          .getElementById('fixed-background')
          .classList.remove('fixed-background');
      }
      if (index === 1) {
        miniMaps[0].classList.remove('active');
      }
      if (index === 11) {
        miniMaps[1].classList.remove('active');
      }
      if (index === 20) {
        miniMaps[2].classList.remove('active');
      }
      if (index === 28) {
        miniMaps[3].classList.remove('active');
      }
      if (index === 37) {
        miniMaps[4].classList.remove('active');
      }
      if (index === 46) {
        miniMaps[5].classList.remove('active');
      }
    },
  });
});
