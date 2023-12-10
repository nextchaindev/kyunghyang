// @ts-nocheck

// START: handle fullpageJS

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
const MAX = 1.4;
const ZOOM_SPEED = 0.4;
const zoomToNext = MAX + 0.1;
const zoomToPrev = MIN - 0.1;
let satelliteScrollEventAdded = false;

// map scroll value
let mapScrollValue = 1;
const MAP_MIN = 1;
const MAP_MAX = 1.4;
const MAP_ZOOM_SPEED = 0.4;
const mapZoomToNext = MAP_MAX + 0.1;
const mapZoomToPrev = MIN - 0.1;
let mapScrollEventAdded = false;

// 2nd map scroll value
let secondMapScrollValue = 1;
const SECOND_MAP_MIN = 1;
const SECOND_MAP_MAX = 1.4;
const SECOND_MAP_ZOOM_SPEED = 0.4;
const secondMapZoomToNext = SECOND_MAP_MAX + 0.1;
const secondMapZoomToPrev = SECOND_MAP_MIN - 0.1;
let secondMapScrollEventAdded = false;

// anchor variables
const INTRO_VIDEO = 'intro-video';
const AGRI_INDUSTRIAL = 'agri-industrial';
const BUILDINGS_AND_ROAD = 'buildings-and-road';
const THE_ROAD = 'the-road';
const NIGHT_FIRST_HALF = 'night-first-half';
const MOUNTAIN = 'the-mountain';
const LOTS_OF_HOUSES = 'lots-of-houses';
const THE_GRAPH = 'the-graph';
const MAP_WITH_TEXTS = 'map-with-texts';
const TALKING_GUY = 'talking-guy';
const MAP_NO_TEXT = 'map-no-text';
const THE_BOARDS = 'the-boards';
const THE_PLATE = 'the-plate';
const THE_RECYCLE_BIN = 'the-recycle-bin';
const THE_PARK_SITS = 'the-park-sits';
const THE_PARK_STAIR = 'the-park-stair';
const THE_PARK_BRIDGE = 'the-park-bridge';
const THE_BIKE = 'the-bike';
const THE_PURPLE_ART = 'the-purple-art';
const THE_UMBRELLAS = 'the-umbrellas';
const THE_MAP_WHITE_DOT = 'the-map-white-dot';
const THE_WHITE_BUILDING = 'the-white-building';
const THE_SMILE_WOMAN = 'the-smile-woman';
const THE_LIBRARY = 'the-library';
const THE_FLOWER_PANORAMA = 'the-flower-panorama';
const THE_POS = 'the-pos';
const THE_BLUE_PANORAMA = 'the-blue-panorama';
const THE_BRIGHT_ROOM = 'the-bright-room';
const THE_GLASS_WOMAN = 'the-glass-woman';
const ROOF_CLIP = 'roof-clip';
const BLACK_AND_WHITE = 'black-and-white';
const FOOTER = 'footer';

const barPositionToSections = {
  [AGRI_INDUSTRIAL]: [
    AGRI_INDUSTRIAL,
    BUILDINGS_AND_ROAD,
    THE_ROAD,
    NIGHT_FIRST_HALF,
    MOUNTAIN,
    LOTS_OF_HOUSES,
    THE_GRAPH,
    MAP_WITH_TEXTS,
    TALKING_GUY,
    MAP_NO_TEXT,
  ],
  [THE_BOARDS]: [THE_BOARDS, THE_PLATE, THE_RECYCLE_BIN],
  [THE_PARK_SITS]: [THE_PARK_SITS, THE_PARK_STAIR, THE_PARK_BRIDGE],
  [THE_BIKE]: [THE_BIKE, THE_PURPLE_ART, THE_UMBRELLAS],
  [THE_MAP_WHITE_DOT]: [
    THE_MAP_WHITE_DOT,
    THE_WHITE_BUILDING,
    THE_SMILE_WOMAN,
    THE_LIBRARY,
    THE_FLOWER_PANORAMA,
    THE_POS,
    THE_BLUE_PANORAMA,
    THE_BRIGHT_ROOM,
    THE_GLASS_WOMAN,
  ],
};

// common functions
const setTextOpacity = function (textId) {
  const stationTexts = document.querySelectorAll('.station-text');
  for (let i = 0; i < stationTexts.length; ++i) {
    stationTexts[i].style.opacity = 0.5;
  }
  const text = document.getElementById(textId);
  if (text) {
    text.style.opacity = 1;
    text.style.fontWeight = 700;
  }
};
const setTextColor = function (color) {
  const stationTexts = document.querySelectorAll('.station-text');
  for (let i = 0; i < stationTexts.length; ++i) {
    stationTexts[i].style.color = color;
  }
};

const handleSingleBarSection = function (barSection, sectionPosition) {
  const positions = barPositionToSections[barSection];

  const position = positions?.findIndex((pos) => pos === sectionPosition);
  const positionNumber = positions.length;
  const theBarSection = document.querySelector(
    `[data-section='${barSection}']`
  );
  const theBarProgress = theBarSection.children[0];
  if (theBarSection && position > -1) {
    const percent = (position + 1) / positionNumber;
    theBarProgress.style.height = `${percent * 100}%`;
  }
};
// functions for the map
const mapSection = document.querySelector('#map-section');
const miniMap = document.querySelector('#mini-map');

const zoomOutMap = function (isForcedLeave) {
  mapSection.classList.remove('map-transform');
  miniMap.style.opacity = 0;
  setTextOpacity('the-map-progress-text');
  canLeaveMap = true;
  if (isForcedLeave) {
    mapScrollValue = MAP_MIN;
  }
};

const zoomInMap = function (isForcedLeave) {
  mapSection.classList.add('map-transform');
  setTextOpacity('the-map-zoomed-progress-text');
  miniMap.style.opacity = 1;
  setTextColor('black');
  canLeaveMap = true;
  if (isForcedLeave) {
    mapScrollValue = MAP_MAX;
  }
};

// init
let myFullpage = new fullpage('#fullpage', {
  licenseKey: 'Y8LPJ-LT5QI-3KV97-JFVJK-IZBZL',
  scrollBar: true,
  normalScrollElements: '.last-section',
  fitToSection: false,
  afterLoad: function (origin, destination, direction, trigger) {
    const theBarSections = document.querySelectorAll('.bar-section');
    for (let i = 0; i < theBarSections.length; i++) {
      const theBarProgress = theBarSections[i].children?.[0];
      theBarProgress.style.transition = 'all 0.3s ease-in-out';
    }
    // scroll bar vars
    const scrollbar = document.getElementById('scrollbar');
    const showScrollBar = function () {
      scrollbar.classList.add('show');
    };
    const hideScrollBar = function () {
      scrollbar.classList.remove('show');
    };

    // the map
    if (destination.anchor === 'the-map') {
      if (!forceLeave) {
        const isSectionBefore = origin.index < destination.index;
        if (isSectionBefore) {
          mapScrollValue = MAP_MIN;
          zoomOutMap();
          handleBarProgress('the-map-zoom-out');
          handleSingleBarSection('the-map-zoom-out', 'the-map-zoom-out');
        } else {
          mapScrollValue = MAP_MAX;
          zoomInMap();
          handleBarProgress('the-map-zoom-in');
          handleSingleBarSection('the-map-zoom-in', 'the-map-zoom-in');
        }
      }
      showScrollBar();
      canLeaveMap = false;

      if (!mapScrollEventAdded) {
        mapSection.addEventListener('swiped', function (e) {
          if (e.detail.dir === 'up') {
            mapScrollValue += MAP_ZOOM_SPEED;
            mapScrollValue = Math.min(mapScrollValue, mapZoomToNext);
          } else {
            mapScrollValue -= MAP_ZOOM_SPEED;
            mapScrollValue = Math.max(mapZoomToPrev, mapScrollValue);
          }

          const zoom =
            mapScrollValue < MIN
              ? 1
              : mapScrollValue > MAX
              ? MAX
              : mapScrollValue;
          if (zoom === MAP_MIN) {
            zoomOutMap();
            handleBarProgress('the-map-zoom-out');
            handleSingleBarSection('the-map-zoom-out', 'the-map-zoom-out');
          } else if (zoom === MAP_MAX) {
            zoomInMap();
            handleBarProgress('the-map-zoom-in');
            handleSingleBarSection('the-map-zoom-in', 'the-map-zoom-in');
          }
        });

        mapSection.addEventListener(
          'wheel',
          function (e) {
            if (e.deltaY > 0) {
              mapScrollValue += MAP_ZOOM_SPEED;
              mapScrollValue = Math.min(mapScrollValue, mapZoomToNext);
            } else {
              mapScrollValue -= MAP_ZOOM_SPEED;
              mapScrollValue = Math.max(mapZoomToPrev, mapScrollValue);
            }
            const zoom =
              mapScrollValue < MIN
                ? 1
                : mapScrollValue > MAX
                ? MAX
                : mapScrollValue;
            if (zoom === MAP_MIN) {
              zoomOutMap();
              handleBarProgress('the-map-zoom-out');
              handleSingleBarSection('the-map-zoom-out', 'the-map-zoom-out');
            } else if (zoom === MAP_MAX) {
              zoomInMap();
              handleBarProgress('the-map-zoom-in');
              handleSingleBarSection('the-map-zoom-in', 'the-map-zoom-in');
            }
          },
          { passive: true }
        );
      }
      forceLeave = false;
      mapScrollEventAdded = true;
    }

    // handle scroll bar
    if (barPositionToSections[AGRI_INDUSTRIAL].includes(destination.anchor)) {
      showScrollBar();
      setTextOpacity('agri-industral-progress-text');
      handleBarProgress(AGRI_INDUSTRIAL);
      handleSingleBarSection(AGRI_INDUSTRIAL, destination.anchor);
      setTextColor(
        destination.anchor === TALKING_GUY ? 'black' : 'rgb(255, 255, 255)'
      );
    }

    if (barPositionToSections[THE_BOARDS].includes(destination.anchor)) {
      showScrollBar();
      setTextOpacity('the-boards-progress-text');
      handleBarProgress(THE_BOARDS);
      handleSingleBarSection(THE_BOARDS, destination.anchor);
      setTextColor('rgb(255, 255, 255)');
    }

    if (barPositionToSections[THE_PARK_SITS].includes(destination.anchor)) {
      showScrollBar();
      setTextOpacity('the-park-sits-progress-text');
      handleBarProgress(THE_PARK_SITS);
      handleSingleBarSection(THE_PARK_SITS, destination.anchor);
      setTextColor('rgb(255, 255, 255)');
    }

    if (barPositionToSections[THE_BIKE].includes(destination.anchor)) {
      showScrollBar();
      setTextOpacity('the-bike-progress-text');
      handleBarProgress(THE_BIKE);
      handleSingleBarSection(THE_BIKE, destination.anchor);
      setTextColor('rgb(255, 255, 255)');
    }

    if (barPositionToSections[THE_MAP_WHITE_DOT].includes(destination.anchor)) {
      showScrollBar();
      setTextOpacity('the-map-white-dot-progress-text');
      handleBarProgress(THE_MAP_WHITE_DOT);
      handleSingleBarSection(THE_MAP_WHITE_DOT, destination.anchor);
      setTextColor(
        [THE_SMILE_WOMAN, THE_GLASS_WOMAN].includes(destination.anchor)
          ? 'black'
          : 'rgb(255, 255, 255)'
      );
    }

    if (destination.anchor === AGRI_INDUSTRIAL) {
      const introVideo = document.querySelector('#introVideo');
      introVideo.pause();
    }
    //hide
    if (
      [INTRO_VIDEO, ROOF_CLIP, BLACK_AND_WHITE, FOOTER].includes(
        destination.anchor
      )
    ) {
      hideScrollBar();
      if (destination.anchor === 'orange-guy') {
        handleSingleBarSection('child-running', 'orange-guy');
      }
      if (destination.anchor === 'orange-guy') {
        handleSingleBarSection('the-map-zoom-in', 'talking-guy');
      }
    }
  },
  beforeLeave: function (origin, destination, direction, trigger) {
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
    if (origin.anchor === 'the-map') {
      if (
        ((mapScrollValue === mapZoomToNext ||
          mapScrollValue === mapZoomToPrev) &&
          canLeaveMap) ||
        forceLeave
      ) {
        return true;
      }
      return false;
    }
    if (origin.anchor === 'map-no-zoom') {
      if (
        ((secondMapScrollValue === secondMapZoomToNext ||
          secondMapScrollValue === secondMapZoomToPrev) &&
          canLeaveSecondMap) ||
        forceLeave
      ) {
        return true;
      }
      return false;
    }
    if (
      origin.anchor === 'buildings-with-stadium' &&
      destination.anchor === '1989'
    ) {
      const text = document.querySelector('#buildings-text');
      text.style.opacity = 0;
    }
    if (
      origin.anchor === '1989' &&
      destination.anchor === 'buildings-with-stadium'
    ) {
      const text = document.querySelector('#buildings-text');
      text.style.opacity = 1;
    }
    if (origin.anchor === 'children-1') {
      const introVideo = document.querySelector('#introVideo');
      introVideo.play();
    }
  },
});

// scroll down button
function onClickScrollDown() {
  myFullpage.moveTo(AGRI_INDUSTRIAL);
}

// onclick progress text
function handleBarProgress(anchor, forceLeave) {
  const theBarSection = document.querySelector(`[data-section='${anchor}']`);
  const theBarSections = document.querySelectorAll('.bar-section');
  if (theBarSection) {
    const index = theBarSection.getAttribute('data-index');
    for (let i = 0; i < theBarSections.length; i++) {
      if (i < index) {
        const theBarProgress = theBarSections[i].children?.[0];
        theBarProgress.style.transition = 'none';
        theBarProgress.style.height = '100%';
      } else if (i > index) {
        const theBarProgress = theBarSections[i].children?.[0];
        theBarProgress.style.transition = 'none';
        theBarProgress.style.height = '0px';
      } else {
        if (forceLeave) {
          handleSingleBarSection(anchor, barPositionToSections[anchor][0]);
        }
      }
    }
  }
}

function onClickProgressText(anchor) {
  forceLeave = true;
  if (anchor === 'the-map-zoom-out') {
    myFullpage.moveTo('the-map');
    zoomOutMap(forceLeave);
  } else if (anchor === 'the-map-zoom-in') {
    myFullpage.moveTo('the-map');
    zoomInMap(forceLeave);
  } else {
    myFullpage.moveTo(anchor);
  }
  handleBarProgress(anchor, forceLeave);
}

// END: handle fullpageJS

// fade in animation when texts are in viewport
const inViewport = (entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
    entry.target.classList.toggle('is-outViewport', !entry.isIntersecting);
  });
};

const fadeInTextObs = new IntersectionObserver(inViewport);

document.querySelectorAll('[data-inviewport]').forEach((el) => {
  fadeInTextObs.observe(el);
});

// handle GSAP

gsap.registerPlugin(ScrollTrigger);
// REVEAL //
gsap.utils.toArray('.revealUp').forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: 'top 100%',
    end: 'bottom 0%',
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        {
          duration: 1.5,
          y: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        {
          duration: 1.5,
          y: 0,
          autoAlpha: 1,
          ease: 'back',
          overwrite: 'auto',
        }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
    },
  });
});

// START: swipe detector
/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {
  'use strict';

  // patch CustomEvent to allow constructor creation (IE/Chrome)
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      };

      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      return evt;
    };

    window.CustomEvent.prototype = window.Event.prototype;
  }

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  var xDown = null;
  var yDown = null;
  var xDiff = null;
  var yDiff = null;
  var timeDown = null;
  var startEl = null;
  var touchCount = 0;

  /**
   * Fires swiped event if swipe detected on touchend
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchEnd(e) {
    // if the user released on a different target, cancel!
    if (startEl !== e.target) return;

    var swipeThreshold = parseInt(
      getNearestAttribute(startEl, 'data-swipe-threshold', '20'),
      10
    ); // default 20 units
    var swipeUnit = getNearestAttribute(startEl, 'data-swipe-unit', 'px'); // default px
    var swipeTimeout = parseInt(
      getNearestAttribute(startEl, 'data-swipe-timeout', '500'),
      10
    ); // default 500ms
    var timeDiff = Date.now() - timeDown;
    var eventType = '';
    var changedTouches = e.changedTouches || e.touches || [];

    if (swipeUnit === 'vh') {
      swipeThreshold = Math.round(
        (swipeThreshold / 100) * document.documentElement.clientHeight
      ); // get percentage of viewport height in pixels
    }
    if (swipeUnit === 'vw') {
      swipeThreshold = Math.round(
        (swipeThreshold / 100) * document.documentElement.clientWidth
      ); // get percentage of viewport height in pixels
    }

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        } else {
          eventType = 'swiped-right';
        }
      }
    } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
      if (yDiff > 0) {
        eventType = 'swiped-up';
      } else {
        eventType = 'swiped-down';
      }
    }

    if (eventType !== '') {
      var eventData = {
        dir: eventType.replace(/swiped-/, ''),
        touchType: (changedTouches[0] || {}).touchType || 'direct',
        fingers: touchCount, // Number of fingers used
        xStart: parseInt(xDown, 10),
        xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
        yStart: parseInt(yDown, 10),
        yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10),
      };

      // fire `swiped` event event on the element that started the swipe
      startEl.dispatchEvent(
        new CustomEvent('swiped', {
          bubbles: true,
          cancelable: true,
          detail: eventData,
        })
      );

      // fire `swiped-dir` event on the element that started the swipe
      startEl.dispatchEvent(
        new CustomEvent(eventType, {
          bubbles: true,
          cancelable: true,
          detail: eventData,
        })
      );
    }

    // reset values
    xDown = null;
    yDown = null;
    timeDown = null;
  }
  /**
   * Records current location on touchstart event
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchStart(e) {
    // if the element has data-swipe-ignore="true" we stop listening for swipe events
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

    startEl = e.target;

    timeDown = Date.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
    touchCount = e.touches.length;
  }

  /**
   * Records location diff in px on touchmove event
   * @param {object} e - browser event object
   * @returns {void}
   */
  function handleTouchMove(e) {
    if (!xDown || !yDown) return;

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  }

  /**
   * Gets attribute off HTML element or nearest parent
   * @param {object} el - HTML element to retrieve attribute from
   * @param {string} attributeName - name of the attribute
   * @param {any} defaultValue - default value to return if no match found
   * @returns {any} attribute value or defaultValue
   */
  function getNearestAttribute(el, attributeName, defaultValue) {
    // walk up the dom tree looking for attributeName
    while (el && el !== document.documentElement) {
      var attributeValue = el.getAttribute(attributeName);

      if (attributeValue) {
        return attributeValue;
      }

      el = el.parentNode;
    }

    return defaultValue;
  }
})(window, document);

// END: swipe detector

// START: panolens
function renderPanorama(containerId, imgSrc) {
  const container = document.getElementById(containerId);
  if (container) {
    const viewer = new PANOLENS.Viewer({
      container,
      controlBar: false,
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

renderPanorama('flower-panorama', './public/images/2층 메인 전시실 사진.JPG');
renderPanorama('blue-panorama', './public/images/2nd_panorama.JPG');

// END panolens

// START: handle play button

function handlePlayButton(id, buttonId) {
  const video = document.getElementById(id);
  const videoPlayButton = document.getElementById(buttonId);
  if (video && videoPlayButton) {
    videoPlayButton?.addEventListener('click', () => {
      // @ts-ignore
      video?.play();
    });
    video?.addEventListener('play', () => {
      if (videoPlayButton?.style) {
        videoPlayButton.style.visibility = 'hidden';
      }
    });
    video?.addEventListener('ended', () => {
      if (videoPlayButton?.style) {
        videoPlayButton.style.visibility = 'visible';
      }
    });
    video?.addEventListener('pause', () => {
      if (videoPlayButton?.style) {
        videoPlayButton.style.visibility = 'visible';
      }
    });
  }
}

handlePlayButton('roof-video', 'roof-video-play');

// END: handle play button
