const playIcons = document.getElementsByClassName("video-playpause");

const video0 = document.getElementById("controlled-video-car-on-street");
video0.addEventListener("click", () => {
  if (video0.paused) {
    video0.play();
  } else {
    video0.pause();
  }
});
playIcons[0].addEventListener("click", () => {
  if (video0.paused) {
    video0.play();
  } else {
    video0.pause();
  }
});
video0.onplay = () => {
  playIcons[0].style.opacity = 0;
};
video0.onpause = () => {
  playIcons[0].style.opacity = 1;
};

const video1 = document.getElementById("controlled-video-walking-girl");
video1.addEventListener("click", () => {
  if (video1.paused) {
    video1.play();
  } else {
    video1.pause();
  }
});
playIcons[1].addEventListener("click", () => {
  if (video1.paused) {
    video1.play();
  } else {
    video1.pause();
  }
});
video1.onplay = () => {
  playIcons[1].style.opacity = 0;
};
video1.onpause = () => {
  playIcons[1].style.opacity = 1;
};
