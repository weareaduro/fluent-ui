type HeroIconType =
  | React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> &
        React.RefAttributes<SVGSVGElement> & {
          title?: string | undefined;
          titleId?: string | undefined;
        }
    >
  | React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> &
        React.RefAttributes<SVGSVGElement> & {
          title?: string;
          titleId?: string;
        }
    >
  | ((props: React.SVGProps<SVGSVGElement>) => React.ReactElement | null);
