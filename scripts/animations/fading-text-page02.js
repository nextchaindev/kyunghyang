const fadingTexts = gsap.utils.toArray('.body_text_effect');

let listTextDefault = [];
fadingTexts.forEach((fadingText) => {
  listTextDefault.push(fadingText.innerHTML.toString());
});

fadingTexts.forEach((fadingText, index) => {
  let textDefault = listTextDefault[index];
  ScrollTrigger.create({
    trigger: fadingText,
    start: 'top 90%',
    end: 'bottom 10%',
    // markers: window.location.hostname === "127.0.0.1",
    onEnter: () => {
      onBodyTextEffect(fadingText);
    },
    onEnterBack() {
      onBodyTextEffect(fadingText);
    },
    onLeaveBack: function () {
      console.log(`textDefault----${textDefault}`);
      fadingText.innerHTML = textDefault;
    },
    onLeave: function () {
      console.log(`textDefault----${textDefault}`);
      fadingText.innerHTML = textDefault;
    },
  });
});

function onBodyTextEffect(fadingText, textDefault) {
  let listTextLine = fadingText.innerHTML.toString().trim().split('<br>');
  let newText = '';

  listTextLine.forEach((text, index) => {
    newText +=
      text
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .replace('<span class="text-strong">', ' strongStart ')
        .replace('</span>', ' strongEnd ') +
      ' ' +
      '<br/>' +
      ' ';
  });
  console.log(`newText------${newText}`);
  let listNewText = newText.split(' ');
  fadingText.innerText = null;
  let newInnerText = '';
  for (let i = 0; i < listNewText.length; i++) {
    newInnerText = newInnerText + '<div>';
    for (let j = i; j < listNewText.length; j++) {
      if (listNewText[j].includes('<br/>')) {
        newInnerText = newInnerText + '</div>';
        i = j + 1;
        break;
      } else if (listNewText[j].includes('strongStart')) {
        newInnerText =
          newInnerText +
          '<span style = "font-family: Pretendard-Bold; opacity: 1; filter: unset">';
        continue;
      } else if (listNewText[j].includes('strongEnd')) {
        newInnerText += '</span>';
        continue;
      }
      newInnerText =
        newInnerText +
        `<span style="animation: fade-in 0.8s ${
          (j + 1) / 10
        }s forwards cubic-bezier(0.11, 0, 0.5, 0)">${
          listNewText[j]
        }&nbsp</span>`;
    }
  }
  fadingText.innerHTML = newInnerText.replace('<div></div>', '<br/>');
  // console.log(fadingText.innerHTML);
}
