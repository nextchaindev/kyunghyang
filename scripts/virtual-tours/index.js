// should be placed after 360 viewer scripts
import { DeviceUtil } from '../common.util.js';

const isNotPC = DeviceUtil.isNotPC();

if (isNotPC) {
  // let viewer1Enable = false;
  // document.getElementById('notice-viewer1').click = () => {
  //   if (viewer1Enable) {
  //     viewer1Enable = false;
  //     window.addEventListener('DOMContentLoaded', () => {
  //       const container = document.getElementById('viewer1');
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       viewer.dispose();
  //     });
  //     return;
  //   }
  //   viewer1Enable = true;
  //   window.addEventListener('DOMContentLoaded', () => {
  //     function renderViewer(containerId, imgSrc) {
  //       const container = document.getElementById(containerId);
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       const panorama = new PANOLENS.ImagePanorama(imgSrc);
  //       viewer.add(panorama);
  //       viewer.OrbitControls.noZoom = true;
  //       container.onmousedown = () => {
  //         container.style.cursor = 'grabbing';
  //       };
  //       container.onmouseup = () => {
  //         container.style.cursor = 'grab';
  //       };
  //     }
  //     renderViewer('viewer1', '/assets/images/01/2d-map-4th/36.1.JPG');
  //   });
  // };
  // let viewer2Enable = false;
  // document.getElementById('notice-viewer2').click = () => {
  //   if (viewer2Enable) {
  //     viewer2Enable = false;
  //     window.addEventListener('DOMContentLoaded', () => {
  //       const container = document.getElementById('viewer2');
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       viewer.dispose();
  //     });
  //     return;
  //   }
  //   viewer2Enable = true;
  //   window.addEventListener('DOMContentLoaded', () => {
  //     function renderViewer(containerId, imgSrc) {
  //       const container = document.getElementById(containerId);
  //       const viewer = new PANOLENS.Viewer({
  //         container,
  //       });
  //       const panorama = new PANOLENS.ImagePanorama(imgSrc);
  //       viewer.add(panorama);
  //       viewer.OrbitControls.noZoom = true;
  //       container.onmousedown = () => {
  //         container.style.cursor = 'grabbing';
  //       };
  //       container.onmouseup = () => {
  //         container.style.cursor = 'grab';
  //       };
  //     }
  //     renderViewer('viewer2', '/assets/images/01/2d-map-4th/36.1.JPG');
  //   });
  // };

  // document.getElementById('viewer1').style.backgroundImage =
  //   '/assets/images/01/2d-map-4th/36.1.JPG';
  // document.getElementById('viewer2').style.backgroundImage =
  //   '/assets/images/01/2d-map-5th/41.1.JPG';
  // document.getElementById('notice-viewer1').style.opacity = 0;
  // document.getElementById('notice-viewer2').style.opacity = 0;
  const bg1a = document.querySelectorAll('.centre-2d-map-info-3d');
  bg1a[0].classList.add('mobile-3d1');
  bg1a[1].classList.add('mobile-3d2');
  const message = document.querySelectorAll('.notice-message');
  message.forEach((element) => {
    element.style.opacity = 0;
  });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    function renderViewer(containerId, imgSrc) {
      const container = document.getElementById(containerId);
      const viewer = new PANOLENS.Viewer({
        container,
      });
      const panorama = new PANOLENS.ImagePanorama(imgSrc);
      viewer.add(panorama);
      viewer.OrbitControls.noZoom = true;
      container.onmousedown = () => {
        container.style.cursor = 'grabbing';
      };
      container.onmouseup = () => {
        container.style.cursor = 'grab';
      };
    }

    renderViewer('viewer1', '/assets/images/01/2d-map-4th/36.1.JPG');

    renderViewer('viewer2', '/assets/images/01/2d-map-5th/41.1.JPG');
  });
}
