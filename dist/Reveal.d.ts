/** @jsx jsx */
import * as React from "react";
import { Interpolation } from "@emotion/core";
import { Keyframes } from "@emotion/serialize";
export interface RevealProps {
    /**
     * Should the animation initiate? if false will not run
     * @default true
     */
    run?: boolean;
    /**
     * Stagger its children animations.
     * @default false
     */
    cascade?: boolean;
    /**
     * Factor that affects the delay that each animated element in a cascade animation will be assigned.
     * @default 0.5
     */
    damping?: number;
    /**
     * Initial delay, in milliseconds.
     * @default 0
     */
    delay?: number;
    /**
     * Animation duration, in milliseconds.
     * @default 1000
     */
    duration?: number;
    /**
     * Float number between 0 and 1 indicating how much the element should be in viewport before the animation is triggered.
     * @default 0
     */
    fraction?: number;
    /**
     * Custom Emotion animation keyframes.
     */
    keyframes?: Keyframes;
    /**
     * Specifies if the animation should run only once or everytime the element enters/exits/re-enters the viewport.
     * @default false
     */
    triggerOnce?: boolean;
    /**
     * Custom Emotion styles.
     */
    css?: Interpolation;
    /**
     * Class names to add to the container element.
     */
    className?: string;
    /**
     * Inline styles to add to the container element.
     */
    style?: React.CSSProperties;
    /**
     * Class names to add to the child element.
     */
    childClassName?: string;
    /**
     * Inline styles to add to the child element.
     */
    childStyle?: React.CSSProperties;
}
export declare const Reveal: React.FC<RevealProps>;