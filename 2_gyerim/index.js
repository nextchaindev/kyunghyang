// fade in animation when texts are in viewport
const inViewport = (entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    entry.target.classList.toggle("is-outViewport", !entry.isIntersecting);
  });
};

const fadeInTextObs = new IntersectionObserver(inViewport);

document.querySelectorAll("[data-inviewport]").forEach((el) => {
  fadeInTextObs.observe(el);
});

// vertical progress bar
function progressBarScroll() {
  let winScroll =
      (document.body.scrollTop || document.documentElement.scrollTop) -
      window.innerHeight * 7,
    height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight,
    scrolled = (winScroll / height) * 100;
  // document.getElementById("progressBar").style.width = scrolled + "%";
}

// play button for car clip
const carVideo = document.getElementById("car-video");
const carVideoPlayButton = document.getElementById("car-video-play");
carVideoPlayButton?.addEventListener("click", () => {
  // @ts-ignore
  carVideo?.play();
});
carVideo?.addEventListener("play", () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = "hidden";
  }
});
carVideo?.addEventListener("ended", () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = "visible";
  }
});
carVideo?.addEventListener("pause", () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = "visible";
  }
});

// play button for girl clip
const girlVideo = document.getElementById("girl-video");
const girlVideoPlayButton = document.getElementById("girl-video-play");
girlVideoPlayButton?.addEventListener("click", () => {
  // @ts-ignore
  girlVideo?.play();
});
girlVideo?.addEventListener("play", () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = "hidden";
  }
});
girlVideo?.addEventListener("ended", () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = "visible";
  }
});
girlVideo?.addEventListener("pause", () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = "visible";
  }
});
