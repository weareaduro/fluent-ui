type HeroIconType =
  | React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> &
        React.RefAttributes<SVGSVGElement> & {
          title?: string | undefined;
          titleId?: string | undefined;
        }
    >
  | ((props: React.SVGProps<SVGSVGElement>) => React.ReactElement | null);
