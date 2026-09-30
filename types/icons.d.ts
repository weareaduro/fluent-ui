type HeroIconType =
  | React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> &
        React.RefAttributes<SVGSVGElement> & {
          title?: string;
          titleId?: string;
        }
    >
  | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
