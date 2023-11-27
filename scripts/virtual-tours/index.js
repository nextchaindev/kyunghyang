// should be placed after 360 viewer scripts

window.addEventListener("DOMContentLoaded", () => {
  function renderViewer(containerId, imgSrc) {
    const container = document.getElementById(containerId);
    const viewer = new PANOLENS.Viewer({
      container,
    });
    const panorama = new PANOLENS.ImagePanorama(imgSrc);
    viewer.add(panorama);
    viewer.OrbitControls.noZoom = true;
    container.onmousedown = () => {
      container.style.cursor = "grabbing";
    };
    container.onmouseup = () => {
      container.style.cursor = "grab";
    };
  }

  renderViewer("viewer1", "/assets/images/01/2d-map-4th/36.1.JPG");

  renderViewer("viewer2", "/assets/images/01/2d-map-5th/41.1.JPG");
});
