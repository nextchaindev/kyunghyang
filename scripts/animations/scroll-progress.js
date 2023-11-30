const TIME_OUT = 600; // It should be the same transition time of the sections
const body = document.querySelector('body');
const listSections = document.querySelectorAll('.section_scroll');
const sectionsQty = document.querySelectorAll('.section_scroll').length;
const sectionStick = document.querySelector('.section-stick');
const sectionScroll = document.getElementById('section-scroll');
const listHideScrollSreens = document.querySelectorAll('.hide_scroll');
const page01 = document.getElementById('page01');

let startFlag = true;
let qty = 0,
  main = null,
  next = null;

const listSectionScroll = [
  '노인들의 인지장애',
  '노인들의 치매와\n사회적 비용',
  '하안노인\n종합복지관',
  '인생정원 MAP',
  '입구',
  '기억산책길',
  '오감놀이터',
  '정원 쉼터',
  '마음숲',
  '초록마루',
  '인생정원\n해설사',
];

let listSessionHeight = [];

Array(sectionsQty)
  .fill()
  .forEach((values, index) => {
    sectionStick.innerHTML =
      // sectionStick.innerHTML + `<div class="stick">${listSectionScroll[index]}</div>`;
      sectionStick.innerHTML +
      `<div class="section-wrap" ">
    <div class="section-name" id = "section_text${index + 1}">${
        listSectionScroll[index]
      }</div>
    <div class="stick" id = "section${
      index + 1
    }"><div class="stick-progress" id="myBar${index + 1}"></div></div>
  </div>`;
  });

listSections.forEach((values, index) => {
  values.setAttribute('id', `section_scroll${index + 1}`);
});

listHideScrollSreens.forEach((values, index) => {
  values.setAttribute('id', `hide_scroll${index + 1}`);
});

listSessionHeight = [];
listSections.forEach((values, index) => {
  listSessionHeight.push(values.offsetTop);
});
listSessionHeight.push(page01.scrollHeight);

page01.addEventListener('scroll', (event) => {
  let scrolledSesssonHeight = 0;
  for (let index = 0; index < listHideScrollSreens.length; index++) {
    const hideScrollScreen = document.getElementById(`hide_scroll${index + 1}`);
    if (page01.scrollTop - hideScrollScreen.offsetTop == 0) {
      sectionScroll.style.opacity = 0;
      index = listHideScrollSreens.length;
    } else {
      sectionScroll.style.opacity = 1;
    }
  }

  listSections.forEach((values, index) => {
    const sectionTextID = document.getElementById(`section_text${index + 1}`);
    const sectionTextIDprevious = document.getElementById(
      `section_text${index}`
    );
    const sectionScreen = document.getElementById(values.getAttribute('id'));

    if (page01.scrollTop - sectionScreen.offsetTop >= 0) {
      qty = index + 1;
      for (let j = 0; j < qty; j++) {
        scrolledSesssonHeight = listSessionHeight[j];
      }
      // console.log(`listSessionHeight---${listSessionHeight}`);
      // console.log(`listSessionHeight[qty]---${listSessionHeight[qty]}`);
      // console.log(`scrolledSesssonHeight---${scrolledSesssonHeight}`);
      // console.log(`page01.scrollTop---${page01.scrollTop}`);
      for (let j = 0; j < listSections.length; j++) {
        const sectionTextIDRest = document.getElementById(`section${j + 1}`);
        sectionTextIDRest.classList.remove('text_active');
      }
      sectionTextID.classList.add('text_active');
      // console.log(page01.scrollTop);
      if (sectionTextIDprevious != null) {
        sectionTextIDprevious.classList.remove('text_active');
      }

      var scrolled =
        ((page01.scrollTop - scrolledSesssonHeight + innerHeight) /
          (listSessionHeight[qty] - scrolledSesssonHeight)) *
        100;
      // console.log(`----scrolled: ${scrolled}`);
      document.getElementById(`myBar${qty || 1}`).style.height = scrolled + '%';
      var previous = document.getElementById(`myBar${qty + 1}`);
      if (previous != null) {
        previous.style.height = 0 + '%';
      }
    } else {
      sectionTextID.classList.remove('text_active');
    }
  });
});
