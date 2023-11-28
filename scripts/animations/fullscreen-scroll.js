// should be placed after gsap scripts



const TIME_OUT = 600; // It should be the same transition time of the sections
const body = document.querySelector("body");
const listSections = document.querySelectorAll(".section_scroll")
const sectionsQty = document.querySelectorAll(".section_scroll").length;
const sectionStick = document.querySelector(".section-stick");
const sectionScroll = document.getElementById("section-scroll");
const listHideScrollSreens = document.querySelectorAll(".hide_scroll");

let startFlag = true;
let qty = 0,
  main = null,
  next = null;

document.onload = () => {
  document.body.scrollTop(0);
};

const listSectionScroll = [
  "노인들의 인지장애",
  "노인들의 치매와\n사회적 비용",
  "하안노인\n종합복지관",
  "인생정원 MAP",
  "입구",
  "기억산책길",
  "오감놀이터",
  "정원 쉼터",
  "마음숲",
  "초록마루",
  "인생정원\n해설사"
]

let listSessionHeight = []

Array(sectionsQty)
  .fill()
  .forEach((values, index) => {
    sectionStick.innerHTML =
    // sectionStick.innerHTML + `<div class="stick">${listSectionScroll[index]}</div>`;
    sectionStick.innerHTML + `<div class="section-wrap" ">
    <div class="section-name" id = "section_text${index + 1}">${listSectionScroll[index]}</div>
    <div class="stick" id = "section${index + 1}"><div class="stick-progress" id="myBar${index + 1}"></div></div>
  </div>`;
  });


  listSections.forEach((values, index) =>  {
    values.setAttribute('id', `section_scroll${index + 1}`);
  })

  listHideScrollSreens.forEach((values, index) =>  {
    values.setAttribute('id', `hide_scroll${index + 1}`);
  })

  listSections.forEach((values, index) =>  {
  listSessionHeight.push(values.offsetTop);
  
  })
  
  

function goToSection(i) {
  console.log(window.screenY);
  let scrolledSesssonHeight = 0;
  for(let index = 0; index < listHideScrollSreens.length; index++){
    const hideScrollScreen = document.getElementById(`hide_scroll${index + 1}`);
    if(i * innerHeight - hideScrollScreen.offsetTop == 0){
      sectionScroll.style.opacity = 0;
      index = listHideScrollSreens.length
    } else {
      sectionScroll.style.opacity = 1;
    }
  }
  listSections.forEach((values, index) => {
    const sectionTextID = document.getElementById(`section_text${index + 1}`);
    const sectionTextIDprevious = document.getElementById(`section_text${index}`);
    const sectionScreen = document.getElementById(values.getAttribute("id"));
   
    if(i * innerHeight - sectionScreen.offsetTop >= 0){

      qty = index + 1
      for(let j = 0; j < qty - 1 ; j++){
        scrolledSesssonHeight += listSessionHeight[j]
      }
      for(let j = 0; j < listSections.length; j++){
        const sectionTextIDRest = document.getElementById(`section${j + 1}`);
        sectionTextIDRest.classList.remove("text_active");
      }
      sectionTextID.classList.add("text_active");
      if(sectionTextIDprevious != null)
      {
        sectionTextIDprevious.classList.remove("text_active");
      }
      
      var scrolled = (((i + 1) * innerHeight - scrolledSesssonHeight) / listSessionHeight[qty]) * 100;
      document.getElementById(`myBar${qty || 1}`).style.height = scrolled + "%";
      var previous = document.getElementById(`myBar${qty + 1}`)
      if(previous != null){
        previous.style.height = 0 + "%";
      }
    } else {
      sectionTextID.classList.remove("text_active");
    }
  })

  
  gsap.set("body", { overflowY: "hidden" });
  gsap.to("body", {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 1,
    overwrite: true,
    onComplete: () => gsap.set("body", { overflowY: "auto" }),
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
