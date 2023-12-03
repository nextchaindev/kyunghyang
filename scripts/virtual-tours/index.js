// should be placed after 360 viewer scripts
import { DeviceUtil } from '../common.util.js';

const isNotPC = DeviceUtil.isNotPC();

if (isNotPC) {
  let viewer1Enable = false;
  document.getElementById('notice-viewer1').click = () => {
    if (viewer1Enable) {
      viewer1Enable = false;
      return;
    }
    viewer1Enable = true;
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
  };
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
