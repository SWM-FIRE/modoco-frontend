/* eslint-disable object-shorthand */
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
  return true;
};

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return, func-names
      get: function () {
        supportsPassive = true;
      },
    }),
  );
} catch (e) {
  console.log(e);
}

const wheelOpt = supportsPassive ? { passive: false } : false;
// const wheelEvent =
//   'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener('wheel', preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

// call this to Enable
const enableScroll = () => {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener('wheel', preventDefault, false);
  window.removeEventListener('touchmove', preventDefault, false);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};

export { disableScroll, enableScroll };
