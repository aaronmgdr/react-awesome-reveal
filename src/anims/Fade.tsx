import * as React from 'react';
import { AnimationString, CommonProps, Direction } from '../const';
import { Reveal } from '../Reveal';

interface FadeOptions {
  direction?: Direction;
}

function getFadeAnimationString(direction: Direction): AnimationString {
  switch (direction) {
    case 'top':
      return 'fadeInUp';
    case 'left':
      return 'fadeInLeft';
    case 'bottom':
      return 'fadeInDown';
    case 'right':
      return 'fadeInRight';
    default:
      return 'fadeIn';
  }
}

export const Fade: React.FC<FadeOptions & CommonProps> = ({
  direction,
  ...props
}) => <Reveal animation={getFadeAnimationString(direction)} {...props} />;
