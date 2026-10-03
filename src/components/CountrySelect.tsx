import { type ReactElement } from 'react';
import { Select, type SelectOption } from './Select';

const COUNTRY_CODES =
  'AF,AX,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BQ,BA,BW,BV,BR,IO,BN,BG,BF,BI,CV,KH,CM,CA,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CW,CY,CZ,DK,DJ,DM,DO,EC,EG,SV,GQ,ER,EE,SZ,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GG,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IM,IL,IT,JM,JP,JE,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,ME,MS,MA,MZ,MM,NA,NR,NP,NL,NC,NZ,NI,NE,NG,NU,NF,MK,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,BL,SH,KN,LC,MF,PM,VC,WS,SM,ST,SA,SN,RS,SC,SL,SG,SX,SK,SI,SB,SO,ZA,GS,SS,ES,LK,SD,SR,SJ,SE,CH,SY,TW,TJ,TZ,TH,TL,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,ZM,ZW';

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const countryOptions: Array<SelectOption<string>> = COUNTRY_CODES.split(',')
  .map((code) => ({ value: code, label: countryNames.of(code) ?? code }))
  .sort((left, right) => left.label.localeCompare(right.label, 'en'));

const codeByLabel = new Map(countryOptions.map((option) => [option.label.toLowerCase(), option.value]));

/** ISO code when `value` is a code or an English country name, otherwise `''`. */
export const countryCode = (value: string | null | undefined): string => {
  const trimmed = value?.trim() ?? '';

  if (trimmed === '') return '';

  const upper = trimmed.toUpperCase();

  if (countryOptions.some((option) => option.value === upper)) return upper;

  return codeByLabel.get(trimmed.toLowerCase()) ?? '';
};

/** Code when the value is recognised, otherwise the original text. */
export const countryValue = (value: string | null | undefined): string => {
  const trimmed = value?.trim() ?? '';

  return countryCode(trimmed) || trimmed;
};

/** English country name for a code or an existing name. */
export const countryName = (value: string | null | undefined): string => {
  const trimmed = value?.trim() ?? '';

  if (trimmed === '') return '';

  const code = countryCode(trimmed);

  if (code === '') return trimmed;

  return countryOptions.find((option) => option.value === code)?.label ?? trimmed;
};

export const CountrySelect = ({
  className,
  disabled,
  error,
  label = 'Country',
  name = 'country',
  onChange,
  placeholder = 'Select a country',
  value,
}: {
  className?: string | undefined;
  disabled?: boolean | undefined;
  error?: string | undefined;
  label?: string | undefined;
  name?: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  value: string;
}): ReactElement => (
  <Select
    className={className}
    disabled={disabled}
    error={error}
    label={label}
    name={name}
    options={countryOptions}
    placeholder={placeholder}
    value={countryCode(value)}
    onChange={onChange}
  />
);
