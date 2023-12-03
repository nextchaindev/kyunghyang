import { DeviceUtil } from '../common.util.js';

const isNotPC = DeviceUtil.isNotPC();

console.log('isNotPC', isNotPC);

if (!isNotPC) {
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

  const bg1 = document.querySelectorAll('.trigger-map');
  const bg2 = document.querySelectorAll('.trigger-map-shadow');
  bg1.forEach((element) => {
    element.classList.add('pc');
  });
  bg2.forEach((element) => {
    element.classList.add('pc');
  });

  function triggerZoomPointsMap() {
    const zoomData = [
      { scale: 1, origin: [0.5, 0.5] },
      { scale: 1.6, origin: [0.6, 0.6] },
      { scale: 4, origin: [0.2, 0.5] },
      { scale: 1, origin: [0.5, 0.5] },
    ];

    gsap.utils
      .toArray('.fixed-map_scrollable-section')
      .forEach((section, index) => {
        const zoom = zoomData[index];
        ScrollTrigger.create({
          trigger: section,
          onToggle(self) {
            if (self.isActive) {
              gsap.effects.zoom('.trigger-map', {
                scale: zoom.scale,
                origin: zoom.origin,
                duration: 1,
                ease: 'power1.inOut',
              });
            }
          },
          onEnter() {
            if (index === 0) {
              document.getElementById('fixed-map').classList.add('fixed-map');
            }
          },
          onLeave() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-map')
                .classList.remove('fixed-map');
            }
          },
          onEnterBack() {
            if (index === zoomData.length - 1) {
              document.getElementById('fixed-map').classList.add('fixed-map');
            }
          },
          onLeaveBack() {
            if (index === 0) {
              document
                .getElementById('fixed-map')
                .classList.remove('fixed-map');
            }
          },
        });
      });
  }

  function triggerZoom2dMap() {
    const zoomData =
      innerWidth < 1280
        ? [
            { scale: 1, origin: [0.5, 0.5] },
            // 3
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 3, origin: [0.05, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 4
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 2.6, origin: [0.37, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 5
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 3.8, origin: [0.76, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 6
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 4, origin: [0.85, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 7
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 4, origin: [0.8, 0.46] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 8
            { scale: 3, origin: [0.68, 0.46] },
            { scale: 3, origin: [0.68, 0.46] },
            { scale: 1, origin: [0.5, 0.46] },
          ]
        : [
            { scale: 1, origin: [0.5, 0.5] },
            // 3
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 3, origin: [0.1, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 4
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 3, origin: [0.4, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 5
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 3, origin: [0.72, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 6
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 3.2, origin: [0.85, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 7
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 3.2, origin: [0.8, 0.35] },
            { scale: 1, origin: [0.5, 0.5] },
            { scale: 1, origin: [0.5, 0.5] },
            // 8
            { scale: 3, origin: [0.68, 0.35] },
            { scale: 3, origin: [0.68, 0.35] },
            { scale: 1, origin: [0.5, 0.5] },
          ];

    function showHideMiniMap(index, mode) {
      const startOpacity = mode === 'enter' ? 0 : 1;
      const endOpacity = mode === 'enter' ? 1 : 0;
      gsap.fromTo(
        miniMaps[index],
        { opacity: startOpacity, autoAlpha: 0 },
        {
          duration: 1,
          opacity: endOpacity,
          autoAlpha: 1,
          ease: 'power1.inOut',
          overwrite: 'auto',
        }
      );
    }

    const miniMaps = gsap.utils.toArray('.top-fixed-2d-map');
    const triggerZoomIndexes = [1, 7, 13, 18, 24, 30];

    gsap.utils
      .toArray('.fixed-bg_scrollable-section')
      .forEach((section, index) => {
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
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'enter');
              }
            });
          },
          onLeave() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-background')
                .classList.remove('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'leave');
              }
            });
          },
          onEnterBack() {
            if (index === zoomData.length - 1) {
              document
                .getElementById('fixed-background')
                .classList.add('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'enter');
              }
            });
          },
          onLeaveBack() {
            if (index === 0) {
              document
                .getElementById('fixed-background')
                .classList.remove('fixed-background');
            }
            triggerZoomIndexes.forEach((sectionIndex, minimapIndex) => {
              if (index === sectionIndex) {
                showHideMiniMap(minimapIndex, 'leave');
              }
            });
          },
        });
      });
  }

  // 01 page layout 02
  triggerZoomPointsMap();

  // 01 page layout 03 -> 07
  triggerZoom2dMap();
} else {
  const zoomFixed = document.getElementById('fixed-map');

  const bg1 = document.querySelectorAll('.trigger-map');
  const bg2 = document.querySelectorAll('.trigger-map-shadow');
  const bg3 = document.querySelectorAll('.fixed-map_scrollable-section');
  bg1.forEach((element) => {
    element.classList.add('mobile');
  });
  bg2.forEach((element) => {
    element.classList.add('mobile');
  });
  bg3.forEach((element) => {
    element.classList.add('mobile');
    element.classList.add('parallax');
  });
}
