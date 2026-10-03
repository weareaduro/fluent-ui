import { useId } from 'react';

export const Loader = ({
  width = 38,
  height = 38,
  fill = 'currentColor',
  className,
  label = 'Loading',
}: {
  width?: number | undefined;
  height?: number | undefined;
  fill?: string | undefined;
  className?: string | undefined;
  label?: string | undefined;
}) => {
  const paintId = `loader-${useId().replace(/:/g, '')}`;
  const branded = fill === 'currentColor';
  const paint = branded ? `url(#${paintId})` : fill;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={label}
    >
      {branded ? (
        <defs>
          <pattern id={paintId} patternUnits="userSpaceOnUse" width="38" height="38">
            <foreignObject width="38" height="38">
              <div className="h-full w-full bg-primary-main" />
            </foreignObject>
          </pattern>
        </defs>
      ) : null}
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path d="M36 18c0-9.94-8.06-18-18-18" stroke={paint} strokeWidth="2">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill={paint} cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

export const FullLoader = ({ className }: { className?: string | undefined }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading"
    className={['flex min-h-0 w-full flex-1 items-center justify-center p-8', className].filter(Boolean).join(' ')}
  >
    <Loader className={className} />
  </div>
);
