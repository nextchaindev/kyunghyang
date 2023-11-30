const fadingTexts = gsap.utils.toArray('.body_text_effect');

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: 'top 90%',
  end: 'bottom 10%',
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    console.log(page02id);
    listTextDefault = fadingTexts[0].innerHTML.toString();
    let listTextLine = fadingTexts[0].innerHTML.toString().trim().split('<br>');
    let newText = '';

    listTextLine.forEach((text, index) => {
      // console.log(text.replace(/\n/g, '').trim() + "<br/>")
      newText += text.replace(/\n/g, '').trim() + ' ' + '<br/>' + ' ';
      // console.log(text);
      // if(index !== listTextLine.length - 1) {
      //   newText = newText + text.trim()
      // } else {
      //   newText = newText + text.trim()
      // }
    }); // should be placed after gsap scripts

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

    document.onload = () => {
      document.body.scrollTop(0);
    };

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

    listSections.forEach((values, index) => {
      listSessionHeight.push(values.offsetTop);
    });

    function goToSection(i) {
      gsap.set('body', { overflowY: 'hidden' });
      gsap.to('body', {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 0.6,
        overwrite: true,
        onComplete: () => {
          gsap.set('body', { overflowY: 'auto' });
        },
      });
    }

    page01.addEventListener('scroll', (event) => {
      console.log(page01.scrollTop);
      let scrolledSesssonHeight = 0;
      for (let index = 0; index < listHideScrollSreens.length; index++) {
        const hideScrollScreen = document.getElementById(
          `hide_scroll${index + 1}`
        );
        if (page01.scrollTop - hideScrollScreen.offsetTop == 0) {
          sectionScroll.style.opacity = 0;
          index = listHideScrollSreens.length;
        } else {
          sectionScroll.style.opacity = 1;
        }
      }
      listSections.forEach((values, index) => {
        const sectionTextID = document.getElementById(
          `section_text${index + 1}`
        );
        const sectionTextIDprevious = document.getElementById(
          `section_text${index}`
        );
        const sectionScreen = document.getElementById(
          values.getAttribute('id')
        );

        if (page01.scrollTop - sectionScreen.offsetTop >= 0) {
          qty = index + 1;
          for (let j = 0; j < qty - 1; j++) {
            scrolledSesssonHeight += listSessionHeight[j];
          }
          for (let j = 0; j < listSections.length; j++) {
            const sectionTextIDRest = document.getElementById(
              `section${j + 1}`
            );
            sectionTextIDRest.classList.remove('text_active');
          }
          sectionTextID.classList.add('text_active');
          if (sectionTextIDprevious != null) {
            sectionTextIDprevious.classList.remove('text_active');
          }

          var scrolled =
            ((page01.scrollTop + innerHeight - scrolledSesssonHeight) /
              listSessionHeight[qty]) *
            100;
          document.getElementById(`myBar${qty || 1}`).style.height =
            scrolled + '%';
          var previous = document.getElementById(`myBar${qty + 1}`);
          if (previous != null) {
            previous.style.height = 0 + '%';
          }
        } else {
          sectionTextID.classList.remove('text_active');
        }
      });
    });

    gsap.utils.toArray('.fullscreen.scrollable').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        onEnter: () => {
          goToSection(i);
        },
      });

      ScrollTrigger.create({
        trigger: panel,
        start: 'bottom bottom',
        onEnterBack: () => goToSection(i),
      });
    });

    document.getElementById('scrollOnclick').onclick = () => {
      goToSection(1);
    };

    gsap.utils.toArray('.hide_scroll').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        onEnter: () => {
          document.getElementById('section-scroll').style.opacity = 0;
        },
        onLeave: () => {
          document.getElementById('section-scroll').style.opacity = 1;
        },
      });
    });

    ScrollTrigger.create({
      trigger: '#section_scroll11',
      onEnter: () => {
        const sectionTextID = document.getElementById(`section_text11`);
        sectionTextID.classList.add('text_active');
        document.getElementById(`myBar11`).style.height = '100%';
      },
      onLeave: () => {
        const sectionTextID = document.getElementById(`section_text11`);
        sectionTextID.classList.remove('text_active');
        document.getElementById(`myBar11`).style.height = '0%';
      },
    });

    let listNewText = newText.split(' ');

    // let listNewTextWithBreak = [];
    // for(let i = 0; i < newText.split(" ").length; i++){
    //   if(listNewText[i].con)
    // }
    console.log(`listNewText ---- ${listNewText}`);
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
  },
  onLeaveBack: function () {
    console.log(`listTextDefault----${listTextDefault}`);
    fadingTexts[0].innerHTML = listTextDefault;
    listTextDefault = '';
  },
});

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: 'top 90%',
  end: 'bottom 10%',
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    listTextDefault = fadingTexts[0].innerHTML.toString();
    let listTextLine = fadingTexts[0].innerHTML.toString().trim().split('<br>');
    let newText = '';

    listTextLine.forEach((text, index) => {
      // console.log(text.replace(/\n/g, '').trim() + "<br/>")
      newText += text.replace(/\n/g, '').trim() + ' ' + '<br/>' + ' ';
      // console.log(text);
      // if(index !== listTextLine.length - 1) {
      //   newText = newText + text.trim()
      // } else {
      //   newText = newText + text.trim()
      // }
    });

    let listNewText = newText.split(' ');

    // let listNewTextWithBreak = [];
    // for(let i = 0; i < newText.split(" ").length; i++){
    //   if(listNewText[i].con)
    // }
    console.log(`listNewText ---- ${listNewText}`);
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
  },
  onLeaveBack: function () {
    console.log(`listTextDefault----${listTextDefault}`);
    fadingTexts[0].innerHTML = listTextDefault;
    listTextDefault = '';
  },
});
