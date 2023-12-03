export const ColorUtil = {
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

export const ScreenUtil = {
  getScreenHeight() {
    const doc = document.documentElement;
    return doc.style.getPropertyValue('--doc-height');
  },
  setScreenHeight() {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', documentHeight);
  },
};

export const DeviceUtil = {
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
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
  },
};

export const ElementUtil = {
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};
