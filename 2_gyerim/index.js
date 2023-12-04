// take 1% of innerHeight as --vh variable
const resizeOps = () => {
  document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
  );

  const setHeight = () => {
    console.log('111');
    document.getElementsByTagName('html')[0].style.height =
      window.innerHeight + 'px';
    document.getElementsByTagName('body')[0].style.height =
      window.innerHeight + 'px';
    document.getElementsByTagName('section')[0].style.height =
      window.innerHeight + 'px';
  };

  // define mobile screen size:

  let deviceWidth = window.matchMedia('(max-width: 1024px)');

  if (deviceWidth.matches) {
    // set an event listener that detects when innerHeight changes:

    window.addEventListener('resize', setHeight);

    // call the function once to set initial height:

    setHeight();
  }
};

// resizeOps();
// window.addEventListener('resize', resizeOps);

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

// play button for car clip
const carVideo = document.getElementById('car-video');
const carVideoPlayButton = document.getElementById('car-video-play');
carVideoPlayButton?.addEventListener('click', () => {
  // @ts-ignore
  carVideo?.play();
});
carVideo?.addEventListener('play', () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = 'hidden';
  }
});
carVideo?.addEventListener('ended', () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = 'visible';
  }
});
carVideo?.addEventListener('pause', () => {
  if (carVideoPlayButton?.style) {
    carVideoPlayButton.style.visibility = 'visible';
  }
});

// play button for girl clip
const girlVideo = document.getElementById('girl-video');
const girlVideoPlayButton = document.getElementById('girl-video-play');
girlVideoPlayButton?.addEventListener('click', () => {
  // @ts-ignore
  girlVideo?.play();
});
girlVideo?.addEventListener('play', () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = 'hidden';
  }
});
girlVideo?.addEventListener('ended', () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = 'visible';
  }
});
girlVideo?.addEventListener('pause', () => {
  if (girlVideoPlayButton?.style) {
    girlVideoPlayButton.style.visibility = 'visible';
  }
});

// swipe detector
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
