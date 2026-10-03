import type { ReactElement } from 'react';

const emblemPaths = [
  'M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z',
  'M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z',
  'M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z',
];

/** Favicon placement: the disc reaches the inner corner where the right stroke meets the base. */
const join = { x: 28.31, y: 26.87 };
const radius = 5.3;
const border = 6.43;

/** The Aduro mark at its existing size, with the favicon's corner disc. */
export const AduroEmblem = ({ className = 'h-5 w-auto' }: { className?: string }): ReactElement => (
  <svg viewBox="0 0 33 29" fill="none" aria-hidden="true" className={`overflow-visible ${className}`}>
    {emblemPaths.map((path) => (
      <path key={path} d={path} fill="white" />
    ))}
    <circle cx={join.x} cy={join.y} r={border} fill="var(--color-primary)" />
    <foreignObject x={join.x - radius} y={join.y - radius} width={radius * 2} height={radius * 2}>
      <div className="h-full w-full rounded-full bg-primary-main" />
    </foreignObject>
  </svg>
);
