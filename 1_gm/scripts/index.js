$(document).ready(function () {
  // the cyan progress
  // const scrollProgress = document.getElementById('the-bar-progress');
  // this var = true: allow to leave section by click on progress bar
  let forceLeave = false;
  // these vars = true: allow to leave section on scroll
  let canLeaveSatellite = false;
  let canLeaveMap = false;
  let canLeaveMap2 = false;
  let canLeaveMap3 = false;
  let canLeaveMap4 = false;
  let canLeaveMap5 = false;
  let canLeaveMap6 = false;

  // satellite scroll value
  let scrollValue = 1;
  const MIN = 1;
  const MAX = 2.2;

  const MAP_2D_1st_MIN = 1;
  const MAP_2D_1st_MAX = 1.4;

  // const MAX = 7;
  const ZOOM_SPEED = 0.4;
  const zoomToNext = MAX + 0.1;
  const zoomToPrev = MIN - 0.1;
  let satelliteScrollEventAdded = false;
  let map2d_1st_scroll_event_added = false;
  let map2d_2nd_scroll_event_added = false;
  let map2d_3rd_scroll_event_added = false;
  let map2d_4th_scroll_event_added = false;
  let map2d_5th_scroll_event_added = false;
  let map2d_6th_scroll_event_added = false;

  let fullPage = new fullpage('#fullpage', {
    licenseKey: 'Y8LPJ-LT5QI-3KV97-JFVJK-IZBZL',
    scrollBar: true,
    normalScrollElements: '',
    fitToSection: false,
    afterLoad: async function (origin, destination, direction, trigger) {
      switch (destination.index) {
        case 0:
          $('.attached-video-bg').each(function (index) {
            $(this).get(0).play();
          });
          break;
        case 1:
          $('#section-2').css(
            'background-image',
            'url(../assets/images/01/young-girl-bg/04_img.png)'
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
            'url(../assets/images/01/middle-woman-bg/05_img.png)'
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
        case 5: {
          // animateText(
          //   '.section-6-text-box-1st',
          //   '이 같은 어려움을 겪는 어르신은 해마다 늘고 있어요. <br/> <br/> 2026년이면 65세 이상이 <br/> <br/> 우리나라 인구 5명 중 1명이 됩니다. <br/> <br/> 어른신들은 홀로 지낼수록 치매에 걸리기 쉽습니다. <br/> 사회가 감당해야 할 비용도 늘어납니다. ',
          //   true
          // );
          $('.section-6-text-box-1st').addClass(
            'animate__animated animate__fadeIn'
          );
          $('.section-6-text-box-1st').css('display', 'flex');

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

          break;
        }
        default:
          break;
      }

      if (destination.anchor === 'satellite') {
        scrollValue = MIN;
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
                  top: '18.5%',
                  left: '54%',
                });

                $('.point1').css({
                  top: '44%',
                  left: ' 51%',
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
                  top: '26.5%',
                  left: '61%',
                });
                $('.point1').css({
                  top: '52%',
                  left: ' 58%',
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
                  top: '18.5%',
                  left: '54%',
                });

                $('.point1').css({
                  top: '44%',
                  left: '51%',
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
      if (destination.anchor === 'map-2d-1st') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap = false;
        if (!map2d_1st_scroll_event_added) {
          const mapEl = $('#map-2d-1st');
          const minimapEl = $('.top-fixed-2d-map-1st');
          const map2d = $('.map-2d-location-1st');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(1.8)',
                  transformOrigin: '-34% 57%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap = true;
                break;
              default:
                canLeaveMap = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            console.log(
              'Math.round(zoom * 10) / 10',
              Math.round(zoom * 10) / 10
            );
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(1.8)',
                  transformOrigin: '-34% 57%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap = true;
                break;
              default:
                canLeaveMap = true;
                break;
            }
          });

          map2d_1st_scroll_event_added = true;
        }
      }
      if (destination.anchor === 'map-2d-2nd') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap2 = false;
        if (!map2d_2nd_scroll_event_added) {
          const mapEl = $('#map-2d-2nd');
          const minimapEl = $('.top-fixed-2d-map-2nd');
          const map2d = $('.map-2d-location-2nd');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap2 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(1.8)',
                  transformOrigin: '-34% 57%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap2 = true;
                break;
              default:
                canLeaveMap2 = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            console.log(
              'Math.round(zoom * 10) / 10',
              Math.round(zoom * 10) / 10
            );
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap2 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(1.7)',
                  transformOrigin: '24% 56%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap2 = true;
                break;
              default:
                canLeaveMap2 = true;
                break;
            }
          });

          map2d_2nd_scroll_event_added = true;
        }
      }
      if (destination.anchor === 'map-2d-3rd') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap3 = false;
        if (!map2d_3rd_scroll_event_added) {
          const mapEl = $('#map-2d-3rd');
          const minimapEl = $('.top-fixed-2d-map-3rd');
          const map2d = $('.map-2d-location-3rd');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap3 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(2.8)',
                  transformOrigin: '96% 56%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap3 = true;
                break;
              default:
                canLeaveMap3 = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap3 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(2.8)',
                  transformOrigin: '96% 56%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap3 = true;
                break;
              default:
                canLeaveMap3 = true;
                break;
            }
          });

          map2d_3rd_scroll_event_added = true;
        }
      }
      if (destination.anchor === 'map-2d-4th') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap4 = false;
        if (!map2d_4th_scroll_event_added) {
          const mapEl = $('#map-2d-4th');
          const minimapEl = $('.top-fixed-2d-map-4th');
          const map2d = $('.map-2d-location-4th');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap4 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.8)',
                  transformOrigin: '113% 49%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap4 = true;
                break;
              default:
                canLeaveMap4 = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap4 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.8)',
                  transformOrigin: '113% 49%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap4 = true;
                break;
              default:
                canLeaveMap4 = true;
                break;
            }
          });

          map2d_3rd_scroll_event_added = true;
        }
      }
      if (destination.anchor === 'map-2d-5th') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap4 = false;
        if (!map2d_5th_scroll_event_added) {
          const mapEl = $('#map-2d-5th');
          const minimapEl = $('.top-fixed-2d-map-5th');
          const map2d = $('.map-2d-location-5th');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap5 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.0)',
                  transformOrigin: '116% 7%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap5 = true;
                break;
              default:
                canLeaveMap5 = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap5 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.0)',
                  transformOrigin: '116% 7%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap5 = true;
                break;
              default:
                canLeaveMap5 = true;
                break;
            }
          });

          map2d_5th_scroll_event_added = true;
        }
      }
      if (destination.anchor === 'map-2d-6th') {
        scrollValue = MAP_2D_1st_MIN;
        forceLeave = false;
        canLeaveMap6 = false;
        if (!map2d_6th_scroll_event_added) {
          const mapEl = $('#map-2d-6th');
          const minimapEl = $('.top-fixed-2d-map-6th');
          const map2d = $('.map-2d-location-6th');

          mapEl.on('swiped', function (e) {
            if (e.detail.dir === 'up') {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap6 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.1)',
                  transformOrigin: '85% 8%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap6 = true;
                break;
              default:
                canLeaveMap6 = true;
                break;
            }
          });

          mapEl.on('wheel', function (e) {
            if (e.originalEvent.deltaY > 0) {
              scrollValue += ZOOM_SPEED;
              scrollValue = Math.min(scrollValue, zoomToNext);
            } else {
              scrollValue -= ZOOM_SPEED;
              scrollValue = Math.max(zoomToPrev, scrollValue);
            }
            const zoom =
              scrollValue < MAP_2D_1st_MIN
                ? 1
                : scrollValue > MAP_2D_1st_MAX
                ? MAP_2D_1st_MAX
                : scrollValue;
            switch (Math.round(zoom * 10) / 10) {
              case MAP_2D_1st_MIN:
                map2d.css({
                  transform: 'scale(1)',
                  transformOrigin: '100% 100%',
                });
                minimapEl.css({
                  opacity: '0',
                });
                canLeaveMap6 = true;
                break;
              case MAP_2D_1st_MAX:
                map2d.css({
                  transform: 'scale(3.1)',
                  transformOrigin: '85% 8%',
                });
                minimapEl.css({
                  opacity: '1',
                });
                canLeaveMap6 = true;
                break;
              default:
                canLeaveMap6 = true;
                break;
            }
          });

          map2d_6th_scroll_event_added = true;
        }
      }
    },
    beforeLeave: function (origin, destination, direction, trigger) {
      switch (destination.index) {
        case 1:
          $('#section-2').css('background-image', 'none');
          $('#section-2').removeClass('animate__animated animate__fadeIn');
          // $('#section-2 .quotes-title').hide();
          // $('.section-2 .goingUp-text').removeClass(
          //   'animate__animated animate__fadeInUp'
          // );
          break;
        case 2:
          $('#section-3').css('background-image', 'none');
          $('#section-3').removeClass('animate__animated animate__fadeIn');
          // $('#section-3 .quotes-title').hide();
          // $('.section-3 .goingUp-text').removeClass(
          //   'animate__animated animate__fadeInUp'
          // );
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
      // if (destination.index !== 5) {
      // $('.section-6-text-box-1st').html('');
      // }

      if (origin.anchor === 'satellite') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveSatellite) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-1st') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-2nd') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap2) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-3rd') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap3) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-4th') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap4) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-5th') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap5) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
      if (origin.anchor === 'map-2d-6th') {
        if (
          ((scrollValue === zoomToPrev || scrollValue === zoomToNext) &&
            canLeaveMap6) ||
          forceLeave
        ) {
          return true;
        }
        return false;
      }
    },
  });

  // scroll down button
  $('#scrollDownButton').on('click', function () {
    console.log('fullpage', fullPage);
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

  function renderViewer(containerId, imgSrc, messageId) {
    const isNotPC = DeviceUtil.isNotPC();
    if (isNotPC) {
      // const message = document.getElementById(messageId);
      // message.getElementsByTagName('h4')[0].innerText = 'Tab to explore';
      // const container = document.getElementById(containerId);
      // const viewer = new PANOLENS.Viewer({
      //   container,
      // });
      // message.onclick = () => {
      //   if (
      //     message.getElementsByTagName('h4')[0].innerText === 'Tab to explore'
      //   ) {
      //     message.getElementsByTagName('h4')[0].innerText =
      //       '화면에서 마우스를 움직이면 360도 영상으로 볼 수 있어요';
      //     const panorama = new PANOLENS.ImagePanorama(imgSrc);
      //     viewer.add(panorama);
      //     viewer.OrbitControls.noZoom = true;
      //     container.onmousedown = () => {
      //       container.style.cursor = 'grabbing';
      //     };
      //     container.onmouseup = () => {
      //       container.style.cursor = 'grab';
      //     };
      //   } else {
      //     message.getElementsByTagName('h4')[0].innerText = 'Tab to explore';
      //     viewer.dispose();
      //   }
      // };
      const viewers = document.querySelectorAll('.centre-2d-map-info-3d');
      viewers[0].classList.add('mobile-3d1');
      viewers[1].classList.add('mobile-3d2');
    } else {
      const container = document.getElementById(containerId);
      const viewer = new PANOLENS.Viewer({
        container,
      });
      const panorama = new PANOLENS.ImagePanorama(imgSrc);
      viewer.add(panorama);
      viewer.OrbitControls.noZoom = true;
      container.onmousedown = () => {
        container.style.cursor = 'grabbing';
      };
      container.onmouseup = () => {
        container.style.cursor = 'grab';
      };
    }
  }

  renderViewer(
    'viewer1',
    '../assets/images/01/2d-map-4th/36.1.JPG',
    'notice-viewer1'
  );

  renderViewer(
    'viewer2',
    '/assets/images/01/2d-map-5th/41.1.JPG',
    'notice-viewer2'
  );

  const hanldeDisplayMovingMap = () => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      // The viewport is less than 768 pixels wide
      $('#satelliteID').hide();
      $('#map-2d-1st-id').hide();
      $('#map-2d-2nd-id').hide();
      $('#map-2d-3rd-id').hide();
      $('#map-2d-4th-id').hide();
      $('#map-2d-5th-id').hide();
      $('#map-2d-6th-id').hide();
    } else {
      // The viewport is at least 768 pixels wide
      $('#satelliteID').show();
      $('#map-2d-1st-id').show();
      $('#map-2d-2nd-id').show();
      $('#map-2d-4rd-id').show();
      $('#map-2d-3th-id').show();
      $('#map-2d-5th-id').show();
      $('#map-2d-6th-id').show();
    }
  };

  hanldeDisplayMovingMap();
  $(window).resize(function () {
    hanldeDisplayMovingMap();
  });

  function controllVideos() {
    const isIOS = DeviceUtil.isIOS();
    const video = document.querySelectorAll('video');
    const playIcons = document.getElementsByClassName('video-playpause');
    video[0].setAttribute('muted', 'true');
    video[1].setAttribute('muted', 'true');
    if (isIOS) {
      video[0].setAttribute('controls', 'true');
      video[1].setAttribute('controls', 'true');
      video[0].setAttribute('preload', 'none');
      video[1].setAttribute('preload', 'none');
      playIcons[0].style.opacity = 0;
      playIcons[1].style.opacity = 0;
    } else {
      var playPromise = video[0].play();
      var playPromise = video[1].play();
      function controlvideo1() {
        if (video[0].paused) {
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                video[0].play();
                playIcons[0].style.opacity = 0;
              })
              .catch((error) => {
                console.error('Can not resolve this video!');
              });
          }
        } else {
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                video[0].pause();
                playIcons[0].style.opacity = 1;
              })
              .catch((error) => {
                console.error('Can not resolve this video!');
              });
          }
        }
      }
      function controlVideo2() {
        if (video[1].paused) {
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                video[1].play();
                playIcons[1].style.opacity = 0;
              })
              .catch((error) => {
                console.error('Can not resolve this video!');
              });
          }
        } else {
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                video[1].pause();
                playIcons[1].style.opacity = 1;
              })
              .catch((error) => {
                console.error('Can not resolve this video!');
              });
          }
        }
      }
      video[0].addEventListener('click', controlvideo1);
      playIcons[0].addEventListener('click', controlvideo1);

      video[1].addEventListener('click', controlVideo2);
      playIcons[1].addEventListener('click', controlVideo2);
    }
  }

  controllVideos();

  gsap.registerPlugin(ScrollTrigger);
  // REVEAL //
  gsap.utils.toArray('.goingUp-text').forEach(function (elem) {
    ScrollTrigger.create({
      trigger: elem,
      start: 'top 100%',
      end: 'bottom 0%',
      onEnter: function () {
        gsap.fromTo(
          elem,
          { y: 100, autoAlpha: 0 },
          {
            delay: 0.5,
            duration: 1.5,
            y: 0,
            autoAlpha: 1,
            ease: 'back',
            overwrite: 'auto',
          }
        );
      },
      onLeave: function () {
        gsap.fromTo(
          elem,
          { autoAlpha: 1 },
          { autoAlpha: 0, overwrite: 'auto' }
        );
      },
      onEnterBack: function () {
        gsap.fromTo(
          elem,
          { y: -100, autoAlpha: 0 },
          {
            delay: 0.5,
            duration: 1.5,
            y: 0,
            autoAlpha: 1,
            ease: 'back',
            overwrite: 'auto',
          }
        );
      },
      onLeaveBack: function () {
        gsap.fromTo(
          elem,
          { autoAlpha: 1 },
          { autoAlpha: 0, overwrite: 'auto' }
        );
      },
    });
  });
});
