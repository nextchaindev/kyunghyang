const fadingTexts = gsap.utils.toArray('.body_text_effect');

let listTextDefault = '';

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: 'top 90%',
  end: 'bottom 10%',
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    onBodyTextEffect();
  },
  onEnterBack() {
    onBodyTextEffect();
  },
  onLeaveBack: function () {
    console.log(`listTextDefault----${listTextDefault}`);
    fadingTexts[0].innerHTML = listTextDefault;
    listTextDefault = '';
  },
  onLeave: function () {
    console.log(`listTextDefault----${listTextDefault}`);
    fadingTexts[0].innerHTML = listTextDefault;
    listTextDefault = '';
  },
});

function onBodyTextEffect() {
  listTextDefault = fadingTexts[0].innerHTML.toString();
  let listTextLine = fadingTexts[0].innerHTML.toString().trim().split('<br>');
  let newText = '';

  listTextLine.forEach((text, index) => {
    newText += text.replace(/\n/g, '').trim() + ' ' + '<br/>' + ' ';
  });

  let listNewText = newText.split(' ');
  fadingTexts[0].innerText = null;
  listNewText.forEach((text, index) => {
    console.log(text, text.includes('<br/>'));
    if (text.includes('<br/>') == true) {
      fadingTexts[0].innerHTML = fadingTexts[0].innerHTML + '<br/>';
    } else {
      fadingTexts[0].innerHTML =
        fadingTexts[0].innerHTML +
        `<span style="animation: fade-in 0.8s ${
          (index + 1) / 10
        }s forwards cubic-bezier(0.11, 0, 0.5, 0)">${text}&nbsp</span>`;
    }
  });
  console.log(fadingTexts[0].innerHTML);
}
