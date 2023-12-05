$(document).ready(function () {
  // the cyan progress
  // const scrollProgress = document.getElementById('the-bar-progress');
  // this var = true: allow to leave section by click on progress bar
  let forceLeave = false;
  // these vars = true: allow to leave section on scroll
  let canLeaveSatellite = false;
  let canLeaveMap = false;
  let canLeaveSecondMap = false;
  // satellite scroll value
  let scrollValue = 1;
  const MIN = 1;
  const MAX = 2.2;
  // const MAX = 7;
  const ZOOM_SPEED = 0.4;
  const zoomToNext = MAX + 0.1;
  const zoomToPrev = MIN - 0.1;
  let satelliteScrollEventAdded = false;

  const sectionToPositionsMapping = {
    1989: ['1989', 'satellite-zoom-out', 'satellite-zoom-in'],
    'child-running': ['child-running'],
    'the-map-zoom-out': ['the-map-zoom-out'],
    'the-map-zoom-in': [
      'the-map-zoom-in',
      'wall-and-pavement',
      'wooden-chair',
      'white-bear',
      'traffic-light',
    ],
    'map-no-zoom': [
      'map-no-zoom',
      'back-of-walking-kid',
      'the-truck',
      '3-cars',
      'white-wall',
      'short-hair-woman',
      'pavement-sits',
      'orange-pavement',
      'talking-child',
      'pavement-pole',
    ],
    'car-rear': ['car-rear', 'walking-people'],
  };

  let fullPage = new fullpage('#fullpage', {
    licenseKey: 'Y8LPJ-LT5QI-3KV97-JFVJK-IZBZL',
    scrollBar: true,
    normalScrollElements: '',
    fitToSection: false,
    afterLoad: async function (origin, destination, direction, trigger) {
      console.log('destination.index', destination.index);
      switch (destination.index) {
        case 0:
          $('.attached-video-bg').each(function (index) {
            $(this).get(0).play();
          });
          break;
        case 1:
          $('#section-2').css(
            'background-image',
            'url(../../assets/images/01/young-girl-bg/04_img.png)'
          );
          $('#section-2').addClass('animate__animated animate__fadeIn');
          $('#section-2 .quotes-title').css('display', 'flex');
          // $('.section-2 .goingUp-text').addClass(
          //   'animate__animated animate__fadeInUp'
          // );
          break;
        case 2:
          $('#section-3').css(
            'background-image',
            'url(../../assets/images/01/middle-woman-bg/05_img.png)'
          );
          $('#section-3').addClass('animate__animated animate__fadeIn');
          $('#section-3 .quotes-title').css('display', 'flex');
          // $('.section-3 .goingUp-text').addClass(
          //   'animate__animated animate__fadeInUp'
          // );
          break;
        case 3:
          animateText(
            '.section-4-text-box-1st',
            '균형 감각이 떨어져 걷기 어렵고 <br/> 내가 지금 어디에 있는지 헷갈릴 때가 많아져요 <br/> 청각·후각 등의 감각이 무뎌지죠'
          );
          break;
        case 4:
          animateText(
            '.section-5-text-box-1st',
            '사회 활동이 줄어 자존감이 떨어지고 <br/> 홀로 회상에 잠기거나 <br/> 우울감에 허우적거리기도 합니다.'
          );
          break;
        case 5:
          animateText(
            '.section-6-text-box-1st',
            '이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요. <br/> <br/> 2026년이면 65세 이상이 <br/> <br/> 우리나라 인구 5명 중 1명이 됩니다. <br/> <br/> 어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다. <br/> 사회가 감당해야 할 비용도 늘어납니다. ',
            true
          );
          break;
        default:
          break;
      }

      if (destination.anchor === 'satellite') {
        if (origin.anchor === 'child-running') {
          scrollValue = MAX;
        } else {
          scrollValue = MIN;
        }
        forceLeave = false;
        canLeaveSatellite = false;
        if (!satelliteScrollEventAdded) {
          const sectionEle = $('#satellite-zoom');
          const titleBoxEl = $('.center-top');

          sectionEle.on('swiped', function (e) {
            console.log('swiped', swiped);
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MIN ? 1 : scrollValue > MAX ? MAX : scrollValue;
            if (zoom === MIN) {
              sectionEle.css({
                transform: 'scale(1)',
              });
              canLeaveSatellite = true;
            } else if (zoom === MAX) {
              sectionEle.css({
                transform: 'scale(1.4)',
                transformOrigin: '100% 100%',
              });
              canLeaveSatellite = true;
            }
          });

          sectionEle.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MIN ? 1 : scrollValue > MAX ? MAX : scrollValue;
            console.log(
              'Math.round(zoom * 10) / 10',
              Math.round(zoom * 10) / 10
            );
            switch (Math.round(zoom * 10) / 10) {
              case MIN:
                $('.point1').hide();
                titleBoxEl.hide();
                sectionEle.css({
                  transform: 'scale(1)',
                });
                canLeaveSatellite = true;
                break;
              case 1.4:
                $('#satellite-title-1').html(
                  "<h3 class='text-light point-1'>" +
                    '경기도 광명시 구도심에 있는 하안노인복지관은<br />어르신들의 ' +
                    "<span class='text-strong'>핫 플레이스</span> 입니다" +
                    '</h3>'
                );
                sectionEle.css({
                  transform: 'scale(1.2)',
                  transformOrigin: '100% 100%',
                });
                titleBoxEl.show();
                titleBoxEl.css({
                  transform: 'translateX(-54%)',
                  top: '20.5%',
                  left: '61%',
                });
                $('.point1').css({
                  top: '42%',
                  left: ' 57%',
                });
                $('.point1').show();

                canLeaveSatellite = false;
                break;
              case 1.8:
                $('#satellite-title-1').html(
                  "<h3 class='text-light point-1'>" +
                    '2023년 기준 등록 어르신이  ' +
                    "<span class='text-strong'>4,200여명스</span> 입니다 <br/> 인근 철산동·소하동에 사는 어르신들도  이곳을 찾습니다." +
                    '</h3>'
                );
                sectionEle.css({
                  transform: 'scale(1.6)',
                  transformOrigin: '100% 100%',
                });
                titleBoxEl.css({
                  transform: 'translateX(-54%)',
                  top: '20.5%',
                  left: '61%',
                });

                $('.point1').css({
                  top: '49%',
                  left: ' 58%',
                });
                canLeaveSatellite = false;
                break;
              // case 2.2:
              //   sectionEle.css({
              //     transform: 'scale(2.6)',
              //     transformOrigin: '0.37% 0.5%',
              //   });
              //   canLeaveSatellite = false;
              //   break;
              // case 2.6:
              //   sectionEle.css({
              //     transform: 'scale(3.8)',
              //     transformOrigin: '0.76% 0.5%',
              //   });
              //   canLeaveSatellite = false;
              //   break;
              // case 3:
              //   sectionEle.css({
              //     transform: 'scale(4)',
              //     transformOrigin: '0.85% 0.5%',
              //   });
              //   canLeaveSatellite = false;
              //   break;
              case MAX:
                sectionEle.css({
                  transform: 'scale(1.4)',
                  transformOrigin: '100% 100%',
                });
                canLeaveSatellite = true;
                break;
              default:
                sectionEle.css({
                  transform: 'scale(1)',
                });
                canLeaveSatellite = true;
                break;
            }
          });

          satelliteScrollEventAdded = true;
        }
      }
    },
    beforeLeave: function (origin, destination, direction, trigger) {
      switch (destination.index) {
        case 1:
          $('#section-2').css('background-image', 'none');
          $('#section-2').removeClass('animate__animated animate__fadeIn');
          $('#section-2 .quotes-title').hide();
          $('.section-2 .goingUp-text').removeClass(
            'animate__animated animate__fadeInUp'
          );
          break;
        case 2:
          $('#section-3').css('background-image', 'none');
          $('#section-3').removeClass('animate__animated animate__fadeIn');
          $('#section-3 .quotes-title').hide();
          $('.section-3 .goingUp-text').removeClass(
            'animate__animated animate__fadeInUp'
          );
          break;
        default:
          break;
      }
      if (destination.index !== 3) {
        $('.section-4-text-box-1st').html('');
      }
      if (destination.index !== 4) {
        $('.section-5-text-box-1st').html('');
      }
      if (destination.index !== 5) {
        $('.section-6-text-box-1st').html('');
      }
    },
  });

  // scroll down button
  $('#scrollDownButton').on('click', function () {
    fullPage.moveTo('the-tea-girl');
  });

  function animateText(selector, newText, isChart) {
    var $el = $(selector),
      text = $.trim(newText),
      words = text.split(' '),
      html = '';

    for (var i = 0; i < words.length; i++) {
      if (isChart) {
        if (
          words[i] === '2026년이면' ||
          words[i] === '65세' ||
          words[i] === '이상이' ||
          words[i] === '인구' ||
          words[i] === '5명' ||
          words[i] === '중' ||
          words[i] === '1명이'
        ) {
          html +=
            '<span class="text-strong-2">' +
            words[i] +
            (i + 1 === words.length ? '' : ' ') +
            '</span>';
        } else {
          html +=
            '<span>' +
            words[i] +
            (i + 1 === words.length ? '' : ' ') +
            '</span>';
        }
      } else {
        html +=
          '<span>' + words[i] + (i + 1 === words.length ? '' : ' ') + '</span>';
      }
    }

    $el
      .html(html)
      .children()
      .hide()
      .each(function (i) {
        $(this)
          .delay(i * 200)
          .fadeIn(700);
      });

    $el
      .find('span')
      .promise()
      .done(function () {
        $el.html(function (i, text) {
          return $.trim(text);
        });
      });
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const DeviceUtil = {
    isNotPC() {
      const userAgent = navigator.userAgent.toLowerCase();
      var isMobile = /iPhone|Android/i.test(navigator.userAgent);
      const isTablet =
        /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
          userAgent
        );
      return isMobile || isTablet;
    },
    isIOS() {
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      return (
        [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod',
        ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document) ||
        isSafari
      );
    },
  };

  const ColorUtil = {
    getComputedColor(color) {
      const computedStyle = getComputedStyle(document.documentElement);
      return computedStyle.getPropertyValue(color);
    },
    isLightHexColor(color) {
      const hex = color.replace('#', '');
      const c_r = parseInt(hex.substring(0, 0 + 2), 16);
      const c_g = parseInt(hex.substring(2, 2 + 2), 16);
      const c_b = parseInt(hex.substring(4, 4 + 2), 16);
      const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
      return brightness > 155;
    },
  };

  // chart
  const ctx = document
    .getElementById('statistics-chart-canvas')
    .getContext('2d');

  const firstColor = ColorUtil.getComputedColor('--primary');
  const secondColor = ColorUtil.getComputedColor('--primary-light');

  window.homeStatisticsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [2017, 2018, 2019, 2020, 2021],
      datasets: [
        {
          label: '60세 이상 추정치매환자수',
          backgroundColor: firstColor,
          data: [4, 5, 6, 7, 8],
          barThickness: 15,
        },
        {
          label: '치매환자 1인당 치매관리비',
          backgroundColor: secondColor,
          data: [5, 6, 7, 8, 9],
          barThickness: 15,
        },
      ],
    },
    options: {
      animation: {
        duration: 4000,
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  $('.section-8-carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 4,
    infinite: true,
    arrows: true,
    prevArrow:
      '<svg class="slick-left-arrow" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.9543 40 -2.7141e-06 31.0457 -1.74846e-06 20C-7.8281e-07 8.9543 8.95431 -2.7141e-06 20 -1.74846e-06C31.0457 -7.8281e-07 40 8.9543 40 20C40 31.0457 31.0457 40 20 40ZM16.1206 13.5198C15.7554 13.1055 15.1632 13.1055 14.798 13.5198L9.58704 19.4308C9.22182 19.8451 9.22182 20.5168 9.58704 20.931L14.798 26.8421C15.1632 27.2563 15.7554 27.2563 16.1206 26.8421C16.4858 26.4278 16.4858 25.7561 16.1206 25.3418L12.4912 21.2248L29.6865 21.2248C30.2388 21.2248 30.6865 20.7771 30.6865 20.2248C30.6865 19.6725 30.2388 19.2248 29.6865 19.2248L12.4138 19.2248L16.1206 15.02C16.4858 14.6057 16.4858 13.934 16.1206 13.5198Z" fill="#866d6e"/></svg>',
    nextArrow:
      '<svg class="slick-right-arrow" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 3.49691e-06C31.0457 5.4282e-06 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 1.56562e-06 31.0457 3.49691e-06 20C5.4282e-06 8.95431 8.95431 1.56562e-06 20 3.49691e-06ZM23.8794 26.4802C24.2446 26.8945 24.8368 26.8945 25.202 26.4802L30.413 20.5692C30.7782 20.1549 30.7782 19.4833 30.413 19.069L25.202 13.1579C24.8368 12.7437 24.2446 12.7437 23.8794 13.1579C23.5142 13.5722 23.5142 14.2439 23.8794 14.6582L27.5088 18.7752L10.3135 18.7752C9.7612 18.7752 9.31348 19.2229 9.31348 19.7752C9.31348 20.3275 9.76119 20.7752 10.3135 20.7752L27.5862 20.7752L23.8794 24.98C23.5142 25.3943 23.5142 26.066 23.8794 26.4802Z" fill="#866d6e"/></svg>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  });
});
