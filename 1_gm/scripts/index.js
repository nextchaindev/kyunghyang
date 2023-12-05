$(document).ready(function () {
  let fullPage = new fullpage('#fullpage', {
    licenseKey: 'Y8LPJ-LT5QI-3KV97-JFVJK-IZBZL',
    scrollBar: true,
    normalScrollElements: '',
    scrollOverflowOptions: {
      disablePointer: false,
      preventDefault: false,
    },
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
          $('.section-2 .goingUp-text').addClass(
            'animate__animated animate__fadeInUp'
          );
          break;
        case 2:
          $('#section-3').css(
            'background-image',
            'url(../../assets/images/01/middle-woman-bg/05_img.png)'
          );
          $('#section-3').addClass('animate__animated animate__fadeIn');
          $('#section-3 .quotes-title').css('display', 'flex');
          $('.section-3 .goingUp-text').addClass(
            'animate__animated animate__fadeInUp'
          );
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
});
