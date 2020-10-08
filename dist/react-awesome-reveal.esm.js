import { Fragment, Children, cloneElement, createElement } from 'react';
import cn from 'classnames';
import { keyframes, css, jsx } from '@emotion/core';
import { isFragment } from 'react-is';
import { InView } from 'react-intersection-observer';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInLeft.css}
 */

var fadeInLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject());

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n    animation-duration: ", "ms;\n    animation-timing-function: ", ";\n    animation-delay: ", "ms;\n    animation-name: ", ";\n    animation-direction: normal;\n    animation-fill-mode: both;\n    animation-iteration-count: ", ";\n  "]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
function getAnimationCss(_ref) {
  var _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$timingFunction = _ref.timingFunction,
      timingFunction = _ref$timingFunction === void 0 ? "ease" : _ref$timingFunction,
      _ref$keyframes = _ref.keyframes,
      keyframes = _ref$keyframes === void 0 ? fadeInLeft : _ref$keyframes,
      _ref$iterationCount = _ref.iterationCount,
      iterationCount = _ref$iterationCount === void 0 ? 1 : _ref$iterationCount;
  return css(_templateObject$1(), duration, timingFunction, delay, keyframes, iterationCount);
}

var Reveal = function Reveal(_ref) {
  var _ref$cascade = _ref.cascade,
      cascade = _ref$cascade === void 0 ? false : _ref$cascade,
      _ref$damping = _ref.damping,
      damping = _ref$damping === void 0 ? 0.5 : _ref$damping,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$fraction = _ref.fraction,
      fraction = _ref$fraction === void 0 ? 0 : _ref$fraction,
      _ref$keyframes = _ref.keyframes,
      keyframes = _ref$keyframes === void 0 ? fadeInLeft : _ref$keyframes,
      _ref$triggerOnce = _ref.triggerOnce,
      triggerOnce = _ref$triggerOnce === void 0 ? false : _ref$triggerOnce,
      _ref$run = _ref.run,
      run = _ref$run === void 0 ? true : _ref$run,
      css = _ref.css,
      className = _ref.className,
      style = _ref.style,
      childClassName = _ref.childClassName,
      childStyle = _ref.childStyle,
      children = _ref.children;

  function makeAnimated(nodes) {
    if (!nodes) {
      return null;
    }

    if (typeof nodes === "string") {
      return makeAnimatedText(nodes);
    }

    if (isFragment(nodes)) {
      return jsx(InView, {
        threshold: fraction,
        triggerOnce: triggerOnce
      }, function (_ref2) {
        var inView = _ref2.inView,
            ref = _ref2.ref;
        return jsx("div", {
          ref: ref,
          css: inView && run ? [css, getAnimationCss({
            keyframes: keyframes,
            delay: delay,
            duration: duration
          })] : {
            opacity: 0
          },
          className: className,
          style: style
        }, nodes);
      });
    }

    return Children.map(nodes, function (node, index) {
      var nodeElement = node;
      var nodeCss = nodeElement.props.css ? [nodeElement.props.css] : [];
      nodeCss.push(getAnimationCss({
        keyframes: keyframes,
        delay: delay + (cascade ? index * duration * damping : 0),
        duration: duration
      }));

      switch (nodeElement.type) {
        case "ol":
        case "ul":
          return cloneElement(nodeElement, {
            className: cn(className, nodeElement.props.className),
            style: _extends({}, style, nodeElement.props.style)
          }, makeAnimated(nodeElement.props.children));

        case "li":
          return jsx(InView, {
            threshold: fraction,
            triggerOnce: triggerOnce
          }, function (_ref3) {
            var inView = _ref3.inView,
                ref = _ref3.ref;
            return jsx(nodeElement.type, _extends({}, nodeElement.props, {
              ref: ref,
              css: inView && run ? [css].concat(nodeCss) : {
                opacity: 0
              },
              className: cn(childClassName, nodeElement.props.className),
              style: _extends({}, childStyle, nodeElement.props.style)
            }));
          });

        default:
          return jsx(InView, {
            threshold: fraction,
            triggerOnce: triggerOnce
          }, function (_ref4) {
            var inView = _ref4.inView,
                ref = _ref4.ref;
            return jsx("div", {
              ref: ref,
              css: inView && run ? [css].concat(nodeCss) : {
                opacity: 0
              },
              className: className,
              style: style
            }, cloneElement(nodeElement, {
              className: cn(childClassName, nodeElement.props.className),
              style: _extends({}, childStyle, nodeElement.props.style)
            }));
          });
      }
    });
  }

  function makeAnimatedText(text) {
    var baseCss = {
      display: "inline-block",
      whiteSpace: "pre"
    };
    return jsx(InView, {
      threshold: fraction,
      triggerOnce: triggerOnce
    }, function (_ref5) {
      var inView = _ref5.inView,
          ref = _ref5.ref;
      return jsx("div", {
        ref: ref,
        css: [css, baseCss],
        className: className,
        style: style
      }, text.split("").map(function (_char, index) {
        var textCss = inView ? getAnimationCss({
          keyframes: keyframes,
          delay: delay + (cascade ? index * duration * damping : 0),
          duration: duration
        }) : {
          opacity: 0
        };
        return jsx("span", {
          key: index,
          css: textCss,
          className: childClassName,
          style: childStyle
        }, _char);
      }));
    });
  }

  return jsx(Fragment, null, makeAnimated(children));
};

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  20%,\n  53%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0);\n  }\n\n  40%,\n  43% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -30px, 0) scaleY(1.1);\n  }\n\n  70% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -15px, 0) scaleY(1.05);\n  }\n\n  80% {\n    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0) scaleY(0.95);\n  }\n\n  90% {\n    transform: translate3d(0, -4px, 0) scaleY(1.02);\n  }\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/bounce.css}
 */

var bounce = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$2());

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  50%,\n  to {\n    opacity: 1;\n  }\n\n  25%,\n  75% {\n    opacity: 0;\n  }\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/flash.css}
 */

var flash = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$3());

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["\n  0% {\n    transform: translateX(0);\n  }\n\n  6.5% {\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    transform: translateX(0);\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/headShake.css}
 */

var headShake = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$4());

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["\n  0% {\n    transform: scale(1);\n  }\n\n  14% {\n    transform: scale(1.3);\n  }\n\n  28% {\n    transform: scale(1);\n  }\n\n  42% {\n    transform: scale(1.3);\n  }\n\n  70% {\n    transform: scale(1);\n  }\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/heartBeat.css}
 */

var heartBeat = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$5());

function _templateObject$6() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  11.1%,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  22.2% {\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/jello.css}
 */

var jello = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$6());

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/pulse.css}
 */

var pulse = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$7());

function _templateObject$8() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    transform: scale3d(0.95, 1.05, 1);\n  }\n\n  75% {\n    transform: scale3d(1.05, 0.95, 1);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/rubberBand.css}
 */

var rubberBand = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$8());

function _templateObject$9() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(10px, 0, 0);\n  }\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/shake.css}
 */

var shake = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$9());

function _templateObject$a() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(10px, 0, 0);\n  }\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/shakeX.css}
 */

var shakeX = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$a());

function _templateObject$b() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(0, 10px, 0);\n  }\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/shakeY.css}
 */

var shakeY = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$b());

function _templateObject$c() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/swing.css}
 */

var swing = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$c());

function _templateObject$d() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%,\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%,\n  60%,\n  80% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/tada.css}
 */

var tada = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$d());

function _templateObject$e() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  15% {\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/attention_seekers/wobble.css}
 */

var wobble = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$e());

function getAttentionSeekerKeyframesAndCss(effect) {
  switch (effect) {
    case "flash":
      return [flash];

    case "headShake":
      return [headShake, {
        animationTimingFunction: "ease-in-out"
      }];

    case "heartBeat":
      return [heartBeat, {
        animationTimingFunction: "ease-in-out"
      }];

    case "jello":
      return [jello, {
        transformOrigin: "center"
      }];

    case "pulse":
      return [pulse, {
        animationTimingFunction: "ease-in-out"
      }];

    case "rubberBand":
      return [rubberBand];

    case "shake":
      return [shake];

    case "shakeX":
      return [shakeX];

    case "shakeY":
      return [shakeY];

    case "swing":
      return [swing, {
        transformOrigin: "top center"
      }];

    case "tada":
      return [tada];

    case "wobble":
      return [wobble];

    case "bounce":
    default:
      return [bounce, {
        transformOrigin: "center bottom"
      }];
  }
}

var AttentionSeeker = function AttentionSeeker(_ref) {
  var _ref$effect = _ref.effect,
      effect = _ref$effect === void 0 ? "bounce" : _ref$effect,
      css = _ref.css,
      rest = _objectWithoutPropertiesLoose(_ref, ["effect", "css"]);

  var _getAttentionSeekerKe = getAttentionSeekerKeyframesAndCss(effect),
      keyframes = _getAttentionSeekerKe[0],
      animationCss = _getAttentionSeekerKe[1];

  return createElement(Reveal, Object.assign({
    keyframes: keyframes,
    css: [css, animationCss]
  }, rest));
};

function _templateObject$f() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  20%,\n  40%,\n  60%,\n  80%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  20% {\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  40% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(1.03, 1.03, 1.03);\n  }\n\n  80% {\n    transform: scale3d(0.97, 0.97, 0.97);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n"]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_entrances/bounceIn.css}
 */

var bounceIn = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$f());

function _templateObject$g() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0) scaleY(3);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0) scaleY(0.9);\n  }\n\n  75% {\n    transform: translate3d(0, -10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    transform: translate3d(0, 5px, 0) scaleY(0.985);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_entrances/bounceInDown.css}
 */

var bounceInDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$g());

function _templateObject$h() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    transform: translate3d(-10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    transform: translate3d(5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_entrances/bounceInLeft.css}
 */

var bounceInLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$h());

function _templateObject$i() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0) scaleX(3);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0) scaleX(1);\n  }\n\n  75% {\n    transform: translate3d(10px, 0, 0) scaleX(0.98);\n  }\n\n  90% {\n    transform: translate3d(-5px, 0, 0) scaleX(0.995);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_entrances/bounceInRight.css}
 */

var bounceInRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$i());

function _templateObject$j() {
  var data = _taggedTemplateLiteralLoose(["\n  from,\n  60%,\n  75%,\n  90%,\n  to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0) scaleY(5);\n  }\n\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  75% {\n    transform: translate3d(0, 10px, 0) scaleY(0.95);\n  }\n\n  90% {\n    transform: translate3d(0, -5px, 0) scaleY(0.985);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_entrances/bounceInUp.css}
 */

var bounceInUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$j());

function _templateObject$k() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9);\n  }\n\n  50%,\n  55% {\n    opacity: 1;\n    transform: scale3d(1.1, 1.1, 1.1);\n  }\n\n  to {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n"]);

  _templateObject$k = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_exits/bounceOut.css}
 */

var bounceOut = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$k());

function _templateObject$l() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    transform: translate3d(0, 10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0) scaleY(3);\n  }\n"]);

  _templateObject$l = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_exits/bounceOutDown.css}
 */

var bounceOutDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$l());

function _templateObject$m() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0) scaleX(2);\n  }\n"]);

  _templateObject$m = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_exits/bounceOutLeft.css}
 */

var bounceOutLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$m());

function _templateObject$n() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0) scaleX(0.9);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0) scaleX(2);\n  }\n"]);

  _templateObject$n = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_exits/bounceOutRight.css}
 */

var bounceOutRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$n());

function _templateObject$o() {
  var data = _taggedTemplateLiteralLoose(["\n  20% {\n    transform: translate3d(0, -10px, 0) scaleY(0.985);\n  }\n\n  40%,\n  45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0) scaleY(0.9);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0) scaleY(3);\n  }\n"]);

  _templateObject$o = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/bouncing_exits/bounceOutUp.css}
 */

var bounceOutUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$o());

function getBounceKeyframes(reverse, direction) {
  switch (direction) {
    case "down":
      return reverse ? bounceOutDown : bounceInDown;

    case "left":
      return reverse ? bounceOutLeft : bounceInLeft;

    case "right":
      return reverse ? bounceOutRight : bounceInRight;

    case "up":
      return reverse ? bounceOutUp : bounceInUp;

    default:
      return reverse ? bounceOut : bounceIn;
  }
}

var Bounce = function Bounce(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction", "reverse"]);

  return createElement(Reveal, Object.assign({
    keyframes: getBounceKeyframes(reverse, direction)
  }, rest));
};

function _templateObject$p() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n"]);

  _templateObject$p = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeIn.css}
 */

var fadeIn = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$p());

function _templateObject$q() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$q = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInBottomLeft.css}
 */

var fadeInBottomLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$q());

function _templateObject$r() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(100%, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$r = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInBottomRight.css}
 */

var fadeInBottomRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$r());

function _templateObject$s() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$s = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInDown.css}
 */

var fadeInDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$s());

function _templateObject$t() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$t = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInDownBig.css}
 */

var fadeInDownBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$t());

function _templateObject$u() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$u = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInLeftBig.css}
 */

var fadeInLeftBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$u());

function _templateObject$v() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$v = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInRight.css}
 */

var fadeInRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$v());

function _templateObject$w() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$w = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInRightBig.css}
 */

var fadeInRightBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$w());

function _templateObject$x() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$x = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInTopLeft.css}
 */

var fadeInTopLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$x());

function _templateObject$y() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(100%, -100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$y = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInTopRight.css}
 */

var fadeInTopRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$y());

function _templateObject$z() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$z = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInUp.css}
 */

var fadeInUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$z());

function _templateObject$A() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$A = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_entrances/fadeInUpBig.css}
 */

var fadeInUpBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$A());

function _templateObject$B() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n"]);

  _templateObject$B = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOut.css}
 */

var fadeOut = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$B());

function _templateObject$C() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(-100%, 100%, 0);\n  }\n"]);

  _templateObject$C = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutBottomLeft.css}
 */

var fadeOutBottomLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$C());

function _templateObject$D() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 100%, 0);\n  }\n"]);

  _templateObject$D = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutBottomRight.css}
 */

var fadeOutBottomRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$D());

function _templateObject$E() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, 100%, 0);\n  }\n"]);

  _templateObject$E = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutDown.css}
 */

var fadeOutDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$E());

function _templateObject$F() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n"]);

  _templateObject$F = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutDownBig.css}
 */

var fadeOutDownBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$F());

function _templateObject$G() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0);\n  }\n"]);

  _templateObject$G = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutLeft.css}
 */

var fadeOutLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$G());

function _templateObject$H() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n"]);

  _templateObject$H = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutLeftBig.css}
 */

var fadeOutLeftBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$H());

function _templateObject$I() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0);\n  }\n"]);

  _templateObject$I = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutRight.css}
 */

var fadeOutRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$I());

function _templateObject$J() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n"]);

  _templateObject$J = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutRightBig.css}
 */

var fadeOutRightBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$J());

function _templateObject$K() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(-100%, -100%, 0);\n  }\n"]);

  _templateObject$K = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutTopLeft.css}
 */

var fadeOutTopLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$K());

function _templateObject$L() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(100%, -100%, 0);\n  }\n"]);

  _templateObject$L = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutTopRight.css}
 */

var fadeOutTopRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$L());

function _templateObject$M() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, -100%, 0);\n  }\n"]);

  _templateObject$M = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutUp.css}
 */

var fadeOutUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$M());

function _templateObject$N() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n"]);

  _templateObject$N = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/fading_exits/fadeOutUpBig.css}
 */

var fadeOutUpBig = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$N());

function getFadeKeyframes(big, reverse, direction) {
  switch (direction) {
    case "bottom-left":
      return reverse ? fadeOutBottomLeft : fadeInBottomLeft;

    case "bottom-right":
      return reverse ? fadeOutBottomRight : fadeInBottomRight;

    case "down":
      return big ? reverse ? fadeOutDownBig : fadeInDownBig : reverse ? fadeOutDown : fadeInDown;

    case "left":
      return big ? reverse ? fadeOutLeftBig : fadeInLeftBig : reverse ? fadeOutLeft : fadeInLeft;

    case "right":
      return big ? reverse ? fadeOutRightBig : fadeInRightBig : reverse ? fadeOutRight : fadeInRight;

    case "top-left":
      return reverse ? fadeOutTopLeft : fadeInTopLeft;

    case "top-right":
      return reverse ? fadeOutTopRight : fadeInTopRight;

    case "up":
      return big ? reverse ? fadeOutUpBig : fadeInUpBig : reverse ? fadeOutUp : fadeInUp;

    default:
      return reverse ? fadeOut : fadeIn;
  }
}

var Fade = function Fade(_ref) {
  var _ref$big = _ref.big,
      big = _ref$big === void 0 ? false : _ref$big,
      direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["big", "direction", "reverse"]);

  return createElement(Reveal, Object.assign({
    keyframes: getFadeKeyframes(big, reverse, direction)
  }, rest));
};

function _templateObject$O() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in;\n  }\n"]);

  _templateObject$O = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/flippers/flip.css}
 */

var flip = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$O());

function _templateObject$P() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n\n  to {\n    transform: perspective(400px);\n  }\n"]);

  _templateObject$P = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/flippers/flipInX.css}
 */

var flipInX = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$P());

function _templateObject$Q() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n\n  40% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    animation-timing-function: ease-in;\n  }\n\n  60% {\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1;\n  }\n\n  80% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n  }\n\n  to {\n    transform: perspective(400px);\n  }\n"]);

  _templateObject$Q = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/flippers/flipInY.css}
 */

var flipInY = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$Q());

function _templateObject$R() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: perspective(400px);\n  }\n\n  30% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n\n  to {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$R = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/flippers/flipOutX.css}
 */

var flipOutX = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$R());

function _templateObject$S() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: perspective(400px);\n  }\n\n  30% {\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1;\n  }\n\n  to {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$S = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/flippers/flipOutY.css}
 */

var flipOutY = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$S());

function getFlipKeyframes(reverse, direction) {
  switch (direction) {
    case "horizontal":
      return reverse ? flipOutX : flipInX;

    case "vertical":
      return reverse ? flipOutY : flipInY;

    default:
      return flip;
  }
}

var Flip = function Flip(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      css = _ref.css,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction", "reverse", "css"]);

  var animationCss = {
    backfaceVisibility: "visible"
  };
  return createElement(Reveal, Object.assign({
    keyframes: getFlipKeyframes(reverse, direction),
    css: [css, animationCss]
  }, rest));
};

function _templateObject$T() {
  var data = _taggedTemplateLiteralLoose(["\n  0% {\n    animation-timing-function: ease-in-out;\n  }\n\n  20%,\n  60% {\n    transform: rotate3d(0, 0, 1, 80deg);\n    animation-timing-function: ease-in-out;\n  }\n\n  40%,\n  80% {\n    transform: rotate3d(0, 0, 1, 60deg);\n    animation-timing-function: ease-in-out;\n    opacity: 1;\n  }\n\n  to {\n    transform: translate3d(0, 700px, 0);\n    opacity: 0;\n  }\n"]);

  _templateObject$T = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/specials/hinge.css}
 */

var hinge = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$T());

function _templateObject$U() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale(0.1) rotate(30deg);\n    transform-origin: center bottom;\n  }\n\n  50% {\n    transform: rotate(-10deg);\n  }\n\n  70% {\n    transform: rotate(3deg);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n"]);

  _templateObject$U = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/specials/jackInTheBox.css}
 */

var jackInTheBox = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$U());

function _templateObject$V() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n  }\n\n  to {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$V = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/specials/rollIn.css}
 */

var rollIn = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$V());

function _templateObject$W() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n  }\n"]);

  _templateObject$W = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/specials/rollOut.css}
 */

var rollOut = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$W());

var Hinge = function Hinge(_ref) {
  var css = _ref.css,
      rest = _objectWithoutPropertiesLoose(_ref, ["css"]);

  var animationCss = {
    transformOrigin: "top left"
  };
  return createElement(Reveal, Object.assign({
    keyframes: hinge,
    css: [css, animationCss]
  }, rest));
};

var JackInTheBox = function JackInTheBox(props) {
  return createElement(Reveal, Object.assign({
    keyframes: jackInTheBox
  }, props));
};

function getRollKeyframes(reverse) {
  return reverse ? rollOut : rollIn;
}

var Roll = function Roll(_ref) {
  var _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["reverse"]);

  return createElement(Reveal, Object.assign({
    keyframes: getRollKeyframes(reverse)
  }, rest));
};

function _templateObject$X() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n"]);

  _templateObject$X = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_entrances/rotateIn.css}
 */

var rotateIn = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$X());

function _templateObject$Y() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n"]);

  _templateObject$Y = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_entrances/rotateInDownLeft.css}
 */

var rotateInDownLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$Y());

function _templateObject$Z() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n"]);

  _templateObject$Z = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_entrances/rotateInDownRight.css}
 */

var rotateInDownRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$Z());

function _templateObject$_() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n"]);

  _templateObject$_ = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_entrances/rotateInUpLeft.css}
 */

var rotateInUpLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$_());

function _templateObject$$() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n    opacity: 1;\n  }\n"]);

  _templateObject$$ = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_entrances/rotateInUpRight.css}
 */

var rotateInUpRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$$());

function _templateObject$10() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$10 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_exits/rotateOut.css}
 */

var rotateOut = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$10());

function _templateObject$11() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$11 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_exits/rotateOutDownLeft.css}
 */

var rotateOutDownLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$11());

function _templateObject$12() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$12 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_exits/rotateOutDownRight.css}
 */

var rotateOutDownRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$12());

function _templateObject$13() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$13 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_exits/rotateOutUpLeft.css}
 */

var rotateOutUpLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$13());

function _templateObject$14() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0;\n  }\n"]);

  _templateObject$14 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/rotating_exits/rotateOutUpRight.css}
 */

var rotateOutUpRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$14());

function getRotateKeyframesAndCss(reverse, direction) {
  switch (direction) {
    case "bottom-left":
      return reverse ? [rotateOutDownLeft, {
        transformOrigin: "left bottom"
      }] : [rotateInDownLeft, {
        transformOrigin: "left bottom"
      }];

    case "bottom-right":
      return reverse ? [rotateOutDownRight, {
        transformOrigin: "right bottom"
      }] : [rotateInDownRight, {
        transformOrigin: "right bottom"
      }];

    case "top-left":
      return reverse ? [rotateOutUpLeft, {
        transformOrigin: "left bottom"
      }] : [rotateInUpLeft, {
        transformOrigin: "left bottom"
      }];

    case "top-right":
      return reverse ? [rotateOutUpRight, {
        transformOrigin: "right bottom"
      }] : [rotateInUpRight, {
        transformOrigin: "right bottom"
      }];

    default:
      return reverse ? [rotateOut, {
        transformOrigin: "center"
      }] : [rotateIn, {
        transformOrigin: "center"
      }];
  }
}

var Rotate = function Rotate(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      css = _ref.css,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction", "reverse", "css"]);

  var _getRotateKeyframesAn = getRotateKeyframesAndCss(reverse, direction),
      keyframes = _getRotateKeyframesAn[0],
      animationCss = _getRotateKeyframesAn[1];

  return createElement(Reveal, Object.assign({
    keyframes: keyframes,
    css: [css, animationCss]
  }, rest));
};

function _templateObject$15() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$15 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_entrances/slideInDown.css}
 */

var slideInDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$15());

function _templateObject$16() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$16 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_entrances/slideInLeft.css}
 */

var slideInLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$16());

function _templateObject$17() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(100%, 0, 0);\n    visibility: visible;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$17 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_entrances/slideInRight.css}
 */

var slideInRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$17());

function _templateObject$18() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n"]);

  _templateObject$18 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_entrances/slideInUp.css}
 */

var slideInUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$18());

function _templateObject$19() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    transform: translate3d(0, 100%, 0);\n  }\n"]);

  _templateObject$19 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_exits/slideOutDown.css}
 */

var slideOutDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$19());

function _templateObject$1a() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    transform: translate3d(-100%, 0, 0);\n  }\n"]);

  _templateObject$1a = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_exits/slideOutLeft.css}
 */

var slideOutLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1a());

function _templateObject$1b() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    transform: translate3d(100%, 0, 0);\n  }\n"]);

  _templateObject$1b = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_exits/slideOutRight.css}
 */

var slideOutRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1b());

function _templateObject$1c() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  to {\n    visibility: hidden;\n    transform: translate3d(0, -100%, 0);\n  }\n"]);

  _templateObject$1c = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/sliding_exits/slideOutUp.css}
 */

var slideOutUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1c());

function getSlideKeyframes(reverse, direction) {
  switch (direction) {
    case "down":
      return reverse ? slideOutDown : slideInDown;

    case "right":
      return reverse ? slideOutRight : slideInRight;

    case "up":
      return reverse ? slideOutUp : slideInUp;

    case "left":
    default:
      return reverse ? slideOutLeft : slideInLeft;
  }
}

var Slide = function Slide(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction", "reverse"]);

  return createElement(Reveal, Object.assign({
    keyframes: getSlideKeyframes(reverse, direction)
  }, rest));
};

function _templateObject$1d() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  50% {\n    opacity: 1;\n  }\n"]);

  _templateObject$1d = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_entrances/zoomIn.css}
 */

var zoomIn = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1d());

function _templateObject$1e() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1e = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_entrances/zoomInDown.css}
 */

var zoomInDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1e());

function _templateObject$1f() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1f = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_entrances/zoomInLeft.css}
 */

var zoomInLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1f());

function _templateObject$1g() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1g = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_entrances/zoomInRight.css}
 */

var zoomInRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1g());

function _templateObject$1h() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  60% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1h = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_entrances/zoomInUp.css}
 */

var zoomInUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1h());

function _templateObject$1i() {
  var data = _taggedTemplateLiteralLoose(["\n  from {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n\n  to {\n    opacity: 0;\n  }\n"]);

  _templateObject$1i = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_exits/zoomOut.css}
 */

var zoomOut = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1i());

function _templateObject$1j() {
  var data = _taggedTemplateLiteralLoose(["\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1j = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_exits/zoomOutDown.css}
 */

var zoomOutDown = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1j());

function _templateObject$1k() {
  var data = _taggedTemplateLiteralLoose(["\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n  }\n"]);

  _templateObject$1k = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_exits/zoomOutLeft.css}
 */

var zoomOutLeft = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1k());

function _templateObject$1l() {
  var data = _taggedTemplateLiteralLoose(["\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n  }\n\n  to {\n    opacity: 0;\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n  }\n"]);

  _templateObject$1l = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_exits/zoomOutRight.css}
 */

var zoomOutRight = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1l());

function _templateObject$1m() {
  var data = _taggedTemplateLiteralLoose(["\n  40% {\n    opacity: 1;\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n  }\n\n  to {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n  }\n"]);

  _templateObject$1m = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * @see {@link https://github.com/animate-css/animate.css/blob/master/source/zooming_exits/zoomOutUp.css}
 */

var zoomOutUp = /*#__PURE__*/keyframes( /*#__PURE__*/_templateObject$1m());

function getZoomKeyframes(reverse, direction) {
  switch (direction) {
    case "down":
      return reverse ? zoomOutDown : zoomInDown;

    case "left":
      return reverse ? zoomOutLeft : zoomInLeft;

    case "right":
      return reverse ? zoomOutRight : zoomInRight;

    case "up":
      return reverse ? zoomOutUp : zoomInUp;

    default:
      return reverse ? zoomOut : zoomIn;
  }
}

var Zoom = function Zoom(_ref) {
  var direction = _ref.direction,
      _ref$reverse = _ref.reverse,
      reverse = _ref$reverse === void 0 ? false : _ref$reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["direction", "reverse"]);

  return createElement(Reveal, Object.assign({
    keyframes: getZoomKeyframes(reverse, direction)
  }, rest));
};

export default Reveal;
export { AttentionSeeker, Bounce, Fade, Flip, Hinge, JackInTheBox, Roll, Rotate, Slide, Zoom };
//# sourceMappingURL=react-awesome-reveal.esm.js.map
