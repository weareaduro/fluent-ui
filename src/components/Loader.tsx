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
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-orange-100 ${className ?? ''}`}
    role="img"
    aria-label={label}
  >
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stopColor={fill} stopOpacity="0" offset="0%" />
        <stop stopColor={fill} stopOpacity=".631" offset="63.146%" />
        <stop stopColor={fill} offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)">
        <path
          d="M36 18c0-9.94-8.06-18-18-18"
          id="Oval-2"
          stroke="url(#a)"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
        <circle fill={fill} cx="36" cy="18" r="1">
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

export const FullLoader = ({ className }: { className?: string | undefined }) => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading"
    className="flex flex-1 items-center justify-center p-8 min-h-[120px]"
  >
    <Loader className={className} />
  </div>
);
