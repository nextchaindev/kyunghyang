// should be placed after gsap scripts

document.onload = () => {
  document.body.scrollTop(0);
};

function goToSection(i, anim) {
  gsap.set("body", { overflow: "hidden" });
  gsap.to("body", {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 1,
    overwrite: true,
    onComplete: () => gsap.set("body", { overflow: "auto" }),
  });
}

gsap.utils.toArray(".fullscreen.scrollable").forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    onEnter: () => goToSection(i),
  });

  ScrollTrigger.create({
    trigger: panel,
    start: "bottom bottom",
    onEnterBack: () => goToSection(i),
  });
});

document.getElementById("scrollOnclick").onclick = () => {
  goToSection(1);
};
