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
  { scale: 2.5, origin: [-2, 0.6] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 2.3, origin: [0.4, 0.6] },
  { scale: 2.3, origin: [0.4, 0.6] },
  { scale: 1, origin: [1, 1] },
  { scale: 3, origin: [2, 0.5] },
  { scale: 3, origin: [2, 0.5] },
  { scale: 3, origin: [2, 0.5] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
  { scale: 1, origin: [1, 1] },
];

gsap.utils.toArray('.centre-2d-map-content').forEach((section, index) => {
  const zoom = zoomData[index];
  ScrollTrigger.create({
    trigger: section,
    onToggle(self) {
      if (self.isActive) {
        console.log('zoom', index);
        // Use the custom "zoom" effect you registered
        gsap.effects.zoom('.life-garden-background-map', {
          scale: zoom.scale,
          origin: zoom.origin,
          duration: 1,
          ease: 'power1.inOut',
        });
      }
    },
    onEnter() {
      if (index === 0) {
        $('#page01_centre-2d-map-bg').addClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').show();
      } else if (index === 4) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map/map-2nd.png'
        );
      } else if (index === 9) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map/map-3rd.png'
        );
      } else if (index === 13) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map/map-4th.png'
        );
      } else if (index === 17) {
        $('.page01-main-minimap').attr(
          'src',
          '/assets/images/01/2d-map/map-5th.png'
        );
      }
    },
    onLeave() {
      if (index === gsap.utils.toArray('.centre-2d-map-content').length - 1) {
        $('#page01_centre-2d-map-bg').removeClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').hide();
      }
    },
    onEnterBack() {
      if (index === gsap.utils.toArray('.centre-2d-map-content').length - 1) {
        $('#page01_centre-2d-map-bg').addClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').show();
      }
    },
    onLeaveBack() {
      if (index === 0) {
        $('#page01_centre-2d-map-bg').removeClass('page01_centre-2d-map-fixed');
        $('.page01-main-minimap').hide();
      }
    },
  });
});
