const sizeMap = {
  large: 'px-3 py-1 text-base',
  normal: 'px-2.5 py-1 text-sm',
  small: 'px-2 py-0.5 text-xs',
};

export const Pill = ({
  size = 'normal',
  text,
  colour,
  outline,
}: {
  size?: keyof typeof sizeMap;
  text: string;
  colour: string;
  outline?: boolean;
}) => (
  <div
    style={
      outline
        ? { borderColor: colour, backgroundColor: `${colour}1A`, color: colour }
        : { borderColor: colour, backgroundColor: colour, color: 'black' }
    }
    className={`border size-fit font-bold rounded-full whitespace-nowrap ${sizeMap[size]}`}
  >
    <span>{text}</span>
  </div>
);
