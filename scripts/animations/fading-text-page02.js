const fadingTexts = gsap.utils.toArray(".body_text_effect");

ScrollTrigger.create({
  trigger: fadingTexts[0],
  start: "top 90%",
  end: "bottom 10%",
  // markers: window.location.hostname === "127.0.0.1",
  onEnter: () => {
    let listText = fadingTexts[0].innerText.toString().split(" ");
    let listTextLine = fadingTexts[0].innerHTML.toString().trim().split("<br>")
    let newText = ""
    
    listTextLine.forEach((text, index) => {
      // console.log(text.replace(/\n/g, '').trim() + "<br/>")
      newText += text.replace(/\n/g, '').trim() + " " + "<br/>" + " "
      // console.log(text);
      // if(index !== listTextLine.length - 1) {
      //   newText = newText + text.trim() 
      // } else {
      //   newText = newText + text.trim() 
      // }
    });
    
    let listNewText = newText.split(" ");

    // let listNewTextWithBreak = [];
    // for(let i = 0; i < newText.split(" ").length; i++){
    //   if(listNewText[i].con)
    // }
    console.log(`listNewText ---- ${listNewText}`);
    fadingTexts[0].innerText = null;
    listNewText.forEach((text, index) => {
      console.log(text, text.includes("<br/>"));
      if(text.includes("<br/>") == true){
        fadingTexts[0].innerHTML = fadingTexts[0].innerHTML + "<br/>"
      }
      else {
        fadingTexts[0].innerHTML = fadingTexts[0].innerHTML +  `<span style="animation: fade-in 0.8s ${(index + 1) / 10}s forwards cubic-bezier(0.11, 0, 0.5, 0)">${text}&nbsp</span>`
      }
      
    });
    console.log(fadingTexts[0].innerHTML);
    
  }
});