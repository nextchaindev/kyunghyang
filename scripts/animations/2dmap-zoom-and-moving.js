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

// for each section, we define the zoom data here
const zoomData = [
  { scale: 2.5, origin: [-2, 0.6] },
  { scale: 2.5, origin: [-2, 0.6] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 2, origin: [0.4, 0.5] },
  { scale: 2, origin: [0.4, 0.5] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 3, origin: [2, 0.5] },
  { scale: 3, origin: [2, 0.5] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 5, origin: [1, 0.5] },
  { scale: 5, origin: [1, 0.5] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 3, origin: [1, 0.3] },
  { scale: 3, origin: [1, 0.3] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 3, origin: [0.7, 0.3] },
  { scale: 3, origin: [0.7, 0.3] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
];

gsap.utils.toArray('.page01_centre-2d-map-zoom').forEach((section, index) => {
  const zoom = zoomData[index];
  ScrollTrigger.create({
    trigger: section,
    onToggle(self) {
      if (self.isActive) {
        gsap.effects.zoom('.page01-main-fullmap', {
          scale: zoom.scale,
          origin: zoom.origin,
          duration: 1,
          ease: 'power1.inOut',
        });
      }
    },
    onEnter() {
      if (index === 0) {
        setTimeout(() => $('.page01-main-minimap').show(), 800);
        $('.page01_centre-2d-map').addClass('page01_centre-2d-map-fixed');
      } else if (index === 7) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map-image/minimap-2.png'
        );
      } else if (index === 14) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map-image/minimap-3.png'
        );
      } else if (index === 21) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map-image/minimap-4.png'
        );
      } else if (index === 29) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map-image/minimap-5.png'
        );
      } else if (index === 37) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map-image/minimap-6.png'
        );
      }
    },
    onLeave() {
      if (index === 43) {
        $('.page01_centre-2d-map').removeClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').hide();
      }
    },
    onEnterBack() {
      if (index === 0) {
        $('.page01_centre-2d-map').removeClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').hide();
        gsap.effects.zoom('.page01-main-fullmap', {
          scale: 1,
          origin: [1, 1],
          duration: 1,
          ease: 'power1.inOut',
        });
      }

      if (index === 43) {
        $('.page01_centre-2d-map').addClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').show();
      }
    },
    onLeaveBack() {
      if (index === 0) {
        gsap.effects.zoom('.page01-main-fullmap', {
          scale: 1,
          origin: [1, 1],
          duration: 1,
          ease: 'power1.inOut',
        });
        $('.page01_centre-2d-map').removeClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').hide();
      }
    },
  });
});
