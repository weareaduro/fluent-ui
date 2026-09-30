// src/components/Button.tsx
import { Link } from "@tanstack/react-router";
import classNames from "classnames";

// src/components/Loader.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Loader = ({
  width = 38,
  height = 38,
  fill = "currentColor",
  className,
  label = "Loading"
}) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width,
    height,
    viewBox: "0 0 38 38",
    xmlns: "http://www.w3.org/2000/svg",
    className: `text-orange-100 ${className ?? ""}`,
    role: "img",
    "aria-label": label,
    children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%", id: "a", children: [
        /* @__PURE__ */ jsx("stop", { stopColor: fill, stopOpacity: "0", offset: "0%" }),
        /* @__PURE__ */ jsx("stop", { stopColor: fill, stopOpacity: ".631", offset: "63.146%" }),
        /* @__PURE__ */ jsx("stop", { stopColor: fill, offset: "100%" })
      ] }) }),
      /* @__PURE__ */ jsx("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ jsxs("g", { transform: "translate(1 1)", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M36 18c0-9.94-8.06-18-18-18",
            id: "Oval-2",
            stroke: "url(#a)",
            strokeWidth: "2",
            children: /* @__PURE__ */ jsx(
              "animateTransform",
              {
                attributeName: "transform",
                type: "rotate",
                from: "0 18 18",
                to: "360 18 18",
                dur: "0.9s",
                repeatCount: "indefinite"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("circle", { fill, cx: "36", cy: "18", r: "1", children: /* @__PURE__ */ jsx(
          "animateTransform",
          {
            attributeName: "transform",
            type: "rotate",
            from: "0 18 18",
            to: "360 18 18",
            dur: "0.9s",
            repeatCount: "indefinite"
          }
        ) })
      ] }) })
    ]
  }
);
var FullLoader = ({ className }) => /* @__PURE__ */ jsx(
  "div",
  {
    role: "status",
    "aria-live": "polite",
    "aria-label": "Loading",
    className: "flex flex-1 items-center justify-center p-8 min-h-[120px]",
    children: /* @__PURE__ */ jsx(Loader, { className })
  }
);

// src/components/Button.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var sizeMap = {
  xl: 16,
  large: 10,
  medium: 8,
  small: 8,
  /** 44px, matching the filter dropdowns it sits beside. */
  control: 0
};
var typeMap = {
  /** Brand call-to-action. Each product sets this colour in its theme. */
  primary: "hover:brightness-110 bg-primary-main text-black/85 font-open",
  /** Filled grey. Not the brand gradient. */
  accent: "hover:brightness-125 bg-grey-200 text-black/85 font-open",
  /** Figma modal Cancel — orange text, no fill. */
  ghost: "hover:brightness-125 text-orange-100 font-open",
  secondary: "hover:brightness-125 border border-grey-700t font-open",
  tertiary: "hover:brightness-200 bg-grey-900t text-white font-open",
  icon: "active:bg-grey-200 active:text-black/85 rounded-full transition-all flex items-center justify-center p-3.5 [disabled]:opacity-50 [disabled]:cursor-not-allowed outline-none",
  menu: "inline-flex justify-center after:transition-all after:w-0 hover:after:w-4/5 after:h-px after:absolute after:-bottom-1.5 after:bg-orange-100 relative outline-none",
  basic: "active:shadow-focused-dark bg-grey-900t hover:bg-grey-800t",
  simple: "active:shadow-focused-dark hover:bg-grey-800t text-low",
  "low-priority": "active:shadow-focused-dark hover:bg-grey-900t border-solid! border border-grey-700t",
  delete: "active:shadow-focused-dark border border-grey-700t text-red-400"
};
var getButtonClassnames = ({
  type
}) => `justify-center rounded-xs ${typeMap[type]} group-disabled:text-text-disabled group-disabled:bg-background-disabled flex outline-none group-focus-visible:shadow-focused group-active:shadow-focused-dark cursor-pointer transition items-center space-x-3 group-disabled:active:shadow-none group-disabled:border-background-disabled group-disabled:hover:bg-background-disabled`;
var getButtonTextSize = ({
  size
}) => ({
  large: "text-[0.9375rem] leading-6",
  xl: "text-[17px] leading-6",
  small: "text-sm",
  medium: "text-base",
  control: "text-[0.9375rem] leading-6"
})[size];
var getButtonStyle = ({
  size,
  type
}) => {
  if (type === "ghost") {
    return {
      padding: "8px 0"
    };
  }
  if (size === "control") {
    return { boxSizing: "border-box", height: "44px", padding: "0 16px" };
  }
  if (size === "large" && type !== "low-priority" && type !== "delete") {
    return { padding: "12px 20px" };
  }
  const paddingY = sizeMap[size] - (type === "low-priority" || type === "delete" ? 1 : 0);
  const paddingX = paddingY * 2;
  return {
    padding: `${paddingY}px ${paddingX}px`
  };
};
var getButtonStyles = ({
  size,
  type,
  additionalClassnames = ""
}) => ({
  style: getButtonStyle({
    size,
    type
  }),
  className: `${getButtonClassnames({
    type
  })} font-bold whitespace-nowrap ${getButtonTextSize({
    size
  })} ${additionalClassnames}`
});
var ButtonInner = ({
  text,
  type = "primary",
  size = "medium",
  IconStart,
  IconEnd,
  showActiveButton,
  loading
}) => {
  const { style, className: cs } = getButtonStyles({ type, size });
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: classNames(cs, {
        "group-data-[status=active]:bg-grey-t-800 group-data-[status=active]:text-black": showActiveButton
      }),
      style,
      children: [
        IconStart && /* @__PURE__ */ jsx2(IconStart, { "aria-hidden": "true", className: "size-5" }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center relative", children: [
          text,
          " ",
          loading && /* @__PURE__ */ jsx2(
            Loader,
            {
              fill: "#ffffff4d",
              className: "size-4 absolute -right-8",
              label: "Loading"
            }
          )
        ] }),
        IconEnd && /* @__PURE__ */ jsx2(IconEnd, { "aria-hidden": "true", className: "size-5" })
      ]
    }
  );
};
var ButtonButton = ({
  disabled,
  onClick,
  isSubmit,
  shrink,
  loading,
  ...rest
}) => /* @__PURE__ */ jsx2(
  "button",
  {
    disabled,
    type: isSubmit ? "submit" : "button",
    onClick,
    "aria-busy": loading,
    className: classNames("group", {
      "w-full": !shrink,
      "w-fit": shrink
    }),
    children: /* @__PURE__ */ jsx2(ButtonInner, { loading, ...rest })
  }
);
var DynamicLink = ({
  children,
  link,
  onClick,
  shrink
}) => link.href ? /* @__PURE__ */ jsx2(
  "a",
  {
    onClick,
    href: link.href,
    rel: "noreferrer noopener",
    target: link.target,
    children
  }
) : /* @__PURE__ */ jsx2(
  Link,
  {
    className: classNames("group", shrink ? "inline-block" : "block"),
    onClick,
    ...link,
    children
  }
);
var Button = ({ button, link }) => link && !button.disabled ? /* @__PURE__ */ jsx2(DynamicLink, { onClick: button.onClick, link, shrink: button.shrink, children: /* @__PURE__ */ jsx2(ButtonInner, { ...button }) }) : /* @__PURE__ */ jsx2(ButtonButton, { ...button });

// src/components/IconButton.tsx
import { Tooltip } from "react-tooltip";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var sizeMap2 = {
  xs: 8,
  small: 9,
  medium: 11,
  large: 14
};
var typeMap2 = {
  primary: "bg-primary-400 hover:bg-primary-300 active:enabled:shadow-focused",
  secondary: "bg-grey-200 hover:bg-grey-100 active:enabled:shadow-focused-dark",
  subtle: "hover:bg-primary-t-1000 active:enabled:shadow-focused-dark",
  delete: "hover:bg-red-t-1000 active:enabled:shadow-focused-dark",
  tertiary: "border border-grey-t-600 border-inset hover:bg-grey-t-800 active:enabled:shadow-focused-dark",
  basic: 'hover:bg-grey-t-900 active:enabled:shadow-focused-dark [&[data-active]:not([data-active="false"])]:bg-grey-t-900',
  light: "bg-grey-t-900 hover:bg-grey-t-800 active:enabled:shadow-focused-dark"
};
var typeMapDisabled = {
  primary: "disabled:bg-background-disabled",
  secondary: "disabled:bg-background-disabled",
  subtle: "",
  delete: "",
  tertiary: "",
  basic: "",
  light: "disabled:bg-background-disabled"
};
var strokeTypeMap = {
  primary: "stroke-text-filled-component",
  secondary: "stroke-text-filled-component",
  subtle: "stroke-primary-400",
  delete: "stroke-red-400",
  tertiary: "stroke-white",
  basic: "stroke-white",
  light: "stroke-white"
};
var iconSizeMap = {
  large: "size-5",
  medium: "size-[18px]",
  small: "size-4",
  xs: "size-4"
};
var getIconButtonStyles = ({
  type,
  size,
  disabled,
  additionalClassnames
}) => ({
  className: `disabled:border-none disabled:text-disabled-text relative rounded-xs group outline-none focus-visible:shadow-focused cursor-pointer disabled:cursor-not-allowed ${!disabled ? typeMap2[type] : typeMapDisabled[type]} ${additionalClassnames}`,
  style: {
    padding: `${sizeMap2[size] - (type === "tertiary" ? 1 : 0)}px`
  }
});
var IconButtonIcon = ({
  Icon,
  size,
  type,
  iconClassName
}) => /* @__PURE__ */ jsx3(
  Icon,
  {
    className: `${iconSizeMap[size]} ${strokeTypeMap[type]} group-disabled:stroke-text-disabled ${iconClassName}`
  }
);
var IconButton = ({
  Icon,
  children,
  onClick,
  size = "medium",
  type = "basic",
  disabled,
  tooltip,
  tooltipId,
  active,
  iconClassName,
  className,
  isSubmit,
  id,
  "aria-label": ariaLabel
}) => {
  const ttId = tooltipId ?? tooltip?.replace(/ /g, "-").toLowerCase();
  const resolvedAriaLabel = ariaLabel ?? tooltip;
  return /* @__PURE__ */ jsxs3(
    "button",
    {
      type: isSubmit ? "submit" : "button",
      "data-active": active,
      "data-tooltip-place": "bottom",
      ...ttId ? { "data-tooltip-id": ttId } : {},
      ...tooltip ? { "data-tooltip-content": tooltip } : {},
      "data-tooltip-delay-show": 350,
      onClick,
      disabled,
      id,
      "aria-label": resolvedAriaLabel,
      ...getIconButtonStyles({
        type,
        size,
        disabled: !!disabled,
        additionalClassnames: className
      }),
      children: [
        /* @__PURE__ */ jsx3(
          IconButtonIcon,
          {
            Icon,
            iconClassName: iconClassName ?? "",
            type,
            size
          }
        ),
        children,
        ttId && /* @__PURE__ */ jsx3(
          Tooltip,
          {
            openEvents: { mouseover: true },
            closeEvents: { click: true, mouseleave: true, blur: true },
            className: "z-20",
            id: ttId
          }
        )
      ]
    }
  );
};

// src/components/Input.tsx
import {
  useState
} from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import classNames2 from "classnames";

// src/components/FieldVariantContext.tsx
import { createContext, useContext } from "react";
var FieldVariantContext = createContext(null);
var useFieldVariant = (override) => {
  const fromContext = useContext(FieldVariantContext);
  return override ?? fromContext ?? "plain";
};

// src/components/Input.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var styles = {
  /** Figma "Inputs/Input text": 2px radius, `bg-input` surface, 16px/24px Open Sans. */
  input: "w-full bg-secondary border rounded-xs text-white text-base leading-6 font-open focus-within:outline-none transition-colors",
  placeholder: "placeholder:italic placeholder:text-grey-600",
  inputError: "border-red-500",
  label: "text-white text-sm font-semibold text-left"
};
var Input = ({
  value,
  label,
  helperText,
  onChange,
  className = "",
  type = "text",
  required = false,
  Icon,
  error,
  pattern,
  max,
  min,
  onBlur,
  inputClassname = "",
  placeholder,
  loading,
  disabled,
  IconEnd,
  inlineButton,
  name,
  autoComplete,
  variant
}) => {
  const resolvedVariant = useFieldVariant(
    variant ?? (label ? "outlined" : void 0)
  );
  const [inputType, setInputType] = useState(type);
  const errorId = error && typeof error === "string" ? `${name}-error` : void 0;
  const helperTextId = helperText ? `${name}-helper` : void 0;
  const describedByIds = [helperTextId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs4("div", { className: `flex flex-col ${className}`, children: [
    !!label && /* @__PURE__ */ jsx4(
      "label",
      {
        htmlFor: name,
        className: `${helperText ? "" : "mb-2"} ${resolvedVariant === "outlined" ? "text-left text-[15px] font-semibold leading-6 text-low-priority" : styles.label}`,
        children: label
      }
    ),
    !!helperText && /* @__PURE__ */ jsx4("span", { id: helperTextId, className: "mb-2 mt-1 text-low text-sm", children: helperText }),
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: classNames2(styles.input, {
          "border-transparent": resolvedVariant === "plain" && !error,
          "border-grey-700t": resolvedVariant === "outlined" && !error,
          "border-red-300": !!error,
          "text-text-disabled": disabled
        }),
        children: /* @__PURE__ */ jsxs4("div", { className: "relative flex", children: [
          Icon ? /* @__PURE__ */ jsx4("div", { className: "absolute top-1/2 transform -translate-y-1/2 ml-3", children: /* @__PURE__ */ jsx4(
            Icon,
            {
              "aria-hidden": "true",
              className: classNames2("size-5", {
                "stroke-text-disabled": disabled
              })
            }
          ) }) : /* @__PURE__ */ jsx4(Fragment, {}),
          type !== "textarea" ? /* @__PURE__ */ jsx4(
            "input",
            {
              className: classNames2(
                `w-full rounded-xs outline-none disabled:text-text-disabled py-2.5 leading-6 px-3 ${resolvedVariant === "outlined" ? "h-10" : "h-11"} ${inputClassname}`,
                styles.placeholder,
                {
                  "pl-12": !!Icon,
                  "pr-12": !!IconEnd
                }
              ),
              value,
              disabled,
              onChange,
              onBlur,
              type: inputType,
              required,
              max,
              min,
              id: name,
              name,
              placeholder,
              pattern,
              autoComplete,
              "aria-invalid": !!error,
              "aria-describedby": describedByIds
            }
          ) : /* @__PURE__ */ jsx4(
            "textarea",
            {
              className: `w-full rounded-xs outline-none disabled:text-text-disabled p-3 ${styles.placeholder} ${inputClassname}`,
              value,
              disabled,
              onChange,
              rows: 4,
              required,
              onBlur,
              id: name,
              maxLength: max,
              name,
              "aria-invalid": !!error,
              "aria-describedby": describedByIds
            }
          ),
          type === "password" && /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              "aria-label": inputType === "password" ? "Show password" : "Hide password",
              "aria-controls": name,
              onPointerDown: (e) => e.preventDefault(),
              onClick: () => inputType === "password" ? setInputType("text") : setInputType("password"),
              className: "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer",
              children: inputType === "password" ? /* @__PURE__ */ jsx4(EyeIcon, { "aria-hidden": "true", className: "size-5" }) : /* @__PURE__ */ jsx4(EyeSlashIcon, { "aria-hidden": "true", className: "size-5" })
            }
          ),
          inlineButton && /* @__PURE__ */ jsx4(Button, { ...inlineButton }),
          loading && /* @__PURE__ */ jsx4(Loader, { className: "size-5 absolute top-1/2 right-4 -translate-y-1/2" }),
          IconEnd ? /* @__PURE__ */ jsx4("div", { className: "absolute top-1/2 transform right-0 -translate-y-1/2 mr-3", children: /* @__PURE__ */ jsx4(
            IconEnd,
            {
              className: classNames2("size-5", {
                "stroke-text-disabled": disabled
              })
            }
          ) }) : /* @__PURE__ */ jsx4(Fragment, {})
        ] })
      }
    ),
    error && typeof error === "string" && /* @__PURE__ */ jsxs4("div", { id: errorId, role: "alert", className: "flex space-x-1.5 items-start mt-2", children: [
      /* @__PURE__ */ jsx4(InformationCircleIcon, { "aria-hidden": "true", className: "shrink-0 size-4 text-red-300 mt-[3px]" }),
      /* @__PURE__ */ jsx4("span", { className: "text-body-smallest text-red-300", children: error })
    ] }),
    type === "textarea" && max && /* @__PURE__ */ jsx4("div", { className: "flex mt-2 items-center justify-end", children: /* @__PURE__ */ jsxs4("span", { className: "text-low-priority", children: [
      (value ? String(value) : "").length,
      "/",
      max,
      " characters"
    ] }) })
  ] });
};

// src/components/Table.tsx
import classNames4 from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// src/components/Select.tsx
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react";
import {
  ChevronDownIcon,
  InformationCircleIcon as InformationCircleIcon2
} from "@heroicons/react/24/outline";
import classNames3 from "classnames";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var dropdownTriggerStyles = "w-full bg-secondary border rounded-xs focus-within:outline-none transition-colors";
var dropdownPanelStyles = "z-50 mt-1 w-[var(--button-width)] origin-top overflow-y-auto rounded-xs border border-transparent bg-secondary p-1 outline-none transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0";
var dropdownOptionStyles = "w-full cursor-pointer rounded-xs px-3 py-2.5 text-left text-sm text-white hover:bg-grey/20 data-[focus]:bg-grey/20";
function Select({
  options,
  value,
  onChange,
  label,
  helperText,
  placeholder = "-- Select --",
  disabled,
  error,
  name,
  className = "",
  widthClass,
  size = "default",
  Icon,
  variant
}) {
  const resolvedVariant = useFieldVariant(
    variant ?? (label ? "outlined" : void 0)
  );
  const outlined = resolvedVariant === "outlined";
  const selectedOption = options.find((o) => o.value === value);
  const display = selectedOption ? selectedOption.label : placeholder;
  const heightClass = size === "small" ? "h-9 py-2" : outlined ? "h-10 py-2.5" : "h-11 py-3";
  const errorId = error ? `${name ?? "select"}-error` : void 0;
  const helperTextId = helperText ? `${name ?? "select"}-helper` : void 0;
  const ariaLabel = label ?? placeholder;
  return /* @__PURE__ */ jsxs5("div", { className: classNames3("flex flex-col", widthClass, className), children: [
    !!label && /* @__PURE__ */ jsx5(
      "label",
      {
        htmlFor: name,
        className: classNames3(
          outlined ? "text-left text-[15px] font-semibold leading-6 text-low-priority" : "text-left text-sm font-semibold text-white",
          helperText ? "" : "mb-2"
        ),
        children: label
      }
    ),
    !!helperText && /* @__PURE__ */ jsx5("span", { id: helperTextId, className: "mb-2 mt-1 text-low text-sm", children: helperText }),
    /* @__PURE__ */ jsxs5(
      Listbox,
      {
        as: "div",
        value,
        onChange: (v) => onChange(v),
        disabled: !!disabled,
        className: "group",
        children: [
          /* @__PURE__ */ jsx5(
            "div",
            {
              className: classNames3(dropdownTriggerStyles, {
                "border-transparent": !outlined && !error,
                "border-grey-700t": outlined && !error,
                "border-red-300": !!error,
                "text-low-priority": !outlined && !disabled,
                "text-white": outlined && !!selectedOption && !disabled,
                "text-low-priority/70": outlined && !selectedOption && !disabled || !outlined && !selectedOption && !disabled,
                "text-text-disabled": disabled
              }),
              children: /* @__PURE__ */ jsxs5(
                ListboxButton,
                {
                  id: name,
                  name,
                  "aria-label": ariaLabel,
                  "aria-invalid": !!error,
                  "aria-describedby": [helperTextId, errorId].filter(Boolean).join(" ") || void 0,
                  className: classNames3(
                    "flex w-full items-center justify-between rounded-xs px-3 text-left leading-none outline-none disabled:text-text-disabled",
                    heightClass
                  ),
                  children: [
                    /* @__PURE__ */ jsxs5("span", { className: "flex min-w-0 items-center gap-2", children: [
                      Icon ? /* @__PURE__ */ jsx5(
                        Icon,
                        {
                          "aria-hidden": "true",
                          className: classNames3("size-5 shrink-0", {
                            "stroke-text-disabled": disabled
                          })
                        }
                      ) : null,
                      /* @__PURE__ */ jsx5("span", { className: "truncate", children: display })
                    ] }),
                    /* @__PURE__ */ jsx5(
                      ChevronDownIcon,
                      {
                        "aria-hidden": "true",
                        strokeWidth: 2.5,
                        className: classNames3(
                          "size-3 shrink-0 transition-transform group-data-[open]:rotate-180",
                          { "stroke-text-disabled": disabled }
                        )
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx5(ListboxOptions, { anchor: "bottom start", className: dropdownPanelStyles, children: options.map((opt) => /* @__PURE__ */ jsx5(
            ListboxOption,
            {
              value: opt.value,
              className: dropdownOptionStyles,
              children: opt.label
            },
            opt.value
          )) })
        ]
      }
    ),
    error && /* @__PURE__ */ jsxs5(
      "div",
      {
        id: errorId,
        role: "alert",
        className: "flex space-x-1.5 items-start mt-2",
        children: [
          /* @__PURE__ */ jsx5(
            InformationCircleIcon2,
            {
              "aria-hidden": "true",
              className: "shrink-0 size-4 text-red-300 mt-[3px]"
            }
          ),
          /* @__PURE__ */ jsx5("span", { className: "text-body-smallest text-red-300", children: error })
        ]
      }
    )
  ] });
}

// src/components/Table.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var getStyles = (widthType, width) => {
  if (widthType === "pc")
    return {
      width: `${width}%`,
      flexGrow: 1,
      minWidth: 0
    };
  return {
    width: `${width}px`,
    minWidth: `${width}px`,
    maxWidth: `${width}px`
  };
};
var TableColumns = ({
  columns,
  widthType
}) => /* @__PURE__ */ jsx6("div", { className: "flex shrink-0 border-b border-grey-700t px-2", children: columns.map((c, i) => /* @__PURE__ */ jsx6(
  "div",
  {
    style: getStyles(widthType, c.width),
    className: `flex min-w-0 items-center overflow-hidden px-3 py-4 text-xs font-bold uppercase text-grey-500 ${c.className ?? ""}`,
    children: /* @__PURE__ */ jsx6("span", { className: "truncate", children: c.heading })
  },
  `${c.heading}-${i}`
)) });
var TableRows = ({
  rows,
  widthType
}) => /* @__PURE__ */ jsx6("div", { className: "flex min-h-0 flex-col overflow-hidden grow", children: /* @__PURE__ */ jsx6("div", { className: "min-h-0 overflow-x-hidden overflow-y-auto grow", children: rows.length ? rows.map(
  (r) => r.uuid && /* @__PURE__ */ jsx6(
    "div",
    {
      className: "flex w-full min-w-0 items-center border-b border-grey-700t last:border-b-0 transition hover:bg-secondary/50",
      children: r.cells.map((c, i) => /* @__PURE__ */ jsx6(
        "div",
        {
          style: getStyles(widthType, c.width),
          className: `flex min-w-0 items-center overflow-hidden px-5 py-3 text-sm ${c.wrapperClassname ?? ""}`,
          children: typeof c.content === "string" ? /* @__PURE__ */ jsx6("span", { className: "min-w-0 truncate", children: c.content }) : /* @__PURE__ */ jsx6(
            "div",
            {
              className: `flex min-w-0 w-full items-center overflow-hidden ${c.wrapperClassname ?? ""}`,
              children: c.content
            }
          )
        },
        i
      ))
    },
    r.uuid
  )
) : /* @__PURE__ */ jsx6("div", { className: "text-center my-4", children: /* @__PURE__ */ jsx6("span", { className: "text-subtle text-sm", children: "No data found" }) }) }) });
var TableBody = ({
  children,
  className
}) => /* @__PURE__ */ jsx6(
  "div",
  {
    className: classNames4(
      "flex min-h-0 flex-1 flex-col overflow-hidden",
      className
    ),
    children: /* @__PURE__ */ jsx6("div", { className: "min-h-0 flex-1 overflow-y-auto", children })
  }
);
var TableContainer = ({
  title,
  titleAddon,
  toolbar,
  className,
  flush,
  headerBorder = true,
  children
}) => /* @__PURE__ */ jsxs6(
  "div",
  {
    className: classNames4(
      "flex w-full min-h-0 flex-col overflow-hidden",
      flush ? null : "border border-grey-700t rounded-[2px]",
      className
    ),
    children: [
      (title ? true : toolbar != null || titleAddon != null) && /* @__PURE__ */ jsxs6(
        "div",
        {
          className: classNames4("flex items-center gap-4 p-5", {
            "border-b border-grey-700t": headerBorder
          }),
          children: [
            title ? /* @__PURE__ */ jsxs6("div", { className: "flex min-w-0 items-center", children: [
              /* @__PURE__ */ jsx6("h2", { className: "mr-5 truncate font-grotesque text-[24px]/[28px] font-semibold text-white", children: title }),
              titleAddon
            ] }) : titleAddon,
            toolbar != null && /* @__PURE__ */ jsx6("div", { className: "flex flex-grow shrink-0 flex-wrap items-center justify-end gap-3", children: toolbar })
          ]
        }
      ),
      children
    ]
  }
);
var TablePagination = ({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange
}) => {
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = total === 0 ? 0 : Math.min(page * perPage, total);
  return /* @__PURE__ */ jsxs6("nav", { "aria-label": "Table pagination", className: "flex shrink-0 items-center justify-between gap-3 border-t border-grey-700t px-4 py-3 text-sm text-grey-500", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs6("span", { "aria-live": "polite", "aria-atomic": "true", className: "sr-only", children: [
        "Showing ",
        from,
        "-",
        to,
        " of ",
        total
      ] }),
      /* @__PURE__ */ jsx6("label", { htmlFor: "table-rows-per-page", children: "Rows per page" }),
      /* @__PURE__ */ jsx6(
        Select,
        {
          size: "small",
          widthClass: "w-20",
          name: "table-rows-per-page",
          value: String(perPage),
          onChange: (v) => onPerPageChange(Number(v)),
          options: [10, 15, 25, 50].map((n) => ({
            value: String(n),
            label: String(n)
          }))
        }
      )
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx6(
        IconButton,
        {
          Icon: ChevronLeftIcon,
          onClick: () => onPageChange(Math.max(1, page - 1)),
          disabled: page <= 1,
          type: "tertiary",
          size: "small",
          tooltip: "Previous page"
        }
      ),
      /* @__PURE__ */ jsx6("span", { "aria-current": "page", children: page }),
      /* @__PURE__ */ jsxs6("span", { children: [
        "Of ",
        lastPage
      ] }),
      /* @__PURE__ */ jsx6(
        IconButton,
        {
          Icon: ChevronRightIcon,
          onClick: () => onPageChange(Math.min(lastPage, page + 1)),
          disabled: page >= lastPage,
          type: "tertiary",
          size: "small",
          tooltip: "Next page"
        }
      )
    ] })
  ] });
};

// src/components/Pill.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var sizeMap3 = {
  large: "px-3 py-1 text-base",
  normal: "px-2.5 py-1 text-sm",
  small: "px-2 py-0.5 text-xs"
};
var Pill = ({
  size = "normal",
  text,
  colour,
  outline
}) => /* @__PURE__ */ jsx7(
  "div",
  {
    style: outline ? { borderColor: colour, backgroundColor: `${colour}1A`, color: colour } : { borderColor: colour, backgroundColor: colour, color: "black" },
    className: `border size-fit font-bold rounded-full whitespace-nowrap ${sizeMap3[size]}`,
    children: /* @__PURE__ */ jsx7("span", { children: text })
  }
);

// src/components/ComboBox.tsx
import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HComboBox
} from "@headlessui/react";
import {
  ChevronDownIcon as ChevronDownIcon2,
  InformationCircleIcon as InformationCircleIcon3,
  PlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import classNames5 from "classnames";
import { useState as useState2 } from "react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function ComboBox({
  options,
  selected,
  onSelect,
  label,
  disabled,
  error,
  OptionIconStart,
  isFreeInput,
  helperText,
  placeholder,
  onQueryChange
}) {
  const outlined = useFieldVariant() === "outlined";
  const [value, setValue] = useState2("");
  const grouped = options.reduce(
    (acc, opt) => {
      const key = opt.group ?? "";
      (acc[key] ??= []).push(opt);
      return acc;
    },
    {}
  );
  const hasGroups = Object.keys(grouped).some((k) => k !== "");
  return /* @__PURE__ */ jsxs7("div", { children: [
    !!label && /* @__PURE__ */ jsx8(
      "label",
      {
        htmlFor: label,
        className: `${helperText ? "" : "mb-2"} ${outlined ? "block text-left text-[15px] font-semibold leading-6 text-low-priority" : "block text-sm font-semibold text-white"}`,
        children: label
      }
    ),
    !!helperText && /* @__PURE__ */ jsx8("span", { className: "mb-2 mt-1 text-low text-sm block", children: helperText }),
    /* @__PURE__ */ jsxs7(HComboBox, { children: [
      /* @__PURE__ */ jsx8(
        "div",
        {
          className: classNames5(
            "group relative flex flex-col overflow-hidden rounded-xs border bg-secondary transition-all duration-100 -outline-offset-1 focus-within:outline-2 focus-within:outline-white",
            {
              "border-transparent": !outlined && !error?.length,
              "border-grey-700t": outlined && !error?.length,
              "border-red-400": !!error?.length,
              "text-subtle": disabled
            }
          ),
          children: /* @__PURE__ */ jsxs7("div", { className: "relative flex", children: [
            isFreeInput ? /* @__PURE__ */ jsx8(
              "button",
              {
                onClick: () => {
                  onSelect({ label: value, value });
                  setValue("");
                },
                disabled: value.length === 0,
                className: "absolute top-1/2 transform right-0 -translate-y-1/2 p-3 cursor-pointer",
                children: /* @__PURE__ */ jsx8(PlusIcon, { className: "size-5" })
              }
            ) : /* @__PURE__ */ jsx8(ComboboxButton, { className: "cursor-pointer group absolute top-1/2 transform right-0 -translate-y-1/2 p-3", children: /* @__PURE__ */ jsx8(
              ChevronDownIcon2,
              {
                className: classNames5(
                  "size-5 group-data-open:rotate-180 transition-all",
                  { "stroke-subtle": disabled }
                )
              }
            ) }),
            /* @__PURE__ */ jsx8(
              ComboboxInput,
              {
                onKeyDown: (e) => {
                  if (e.key === "Enter" && value) {
                    const err = onSelect({ label: value, value });
                    if (err) e.preventDefault();
                  }
                },
                className: "w-full rounded-xs outline-none disabled:text-subtle placeholder:italic placeholder:text-grey-600 py-3 leading-none px-3 h-11 pr-12 bg-transparent text-white",
                disabled: !!disabled,
                placeholder: placeholder ?? (isFreeInput ? "Type a value and press enter" : "Start typing..."),
                onChange: (e) => {
                  setValue(e.target.value);
                  onQueryChange?.(e.target.value);
                }
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx8(
        ComboboxOptions,
        {
          transition: true,
          anchor: "bottom start",
          className: "bg-secondary mt-1 space-y-1 p-1 w-(--input-width) border border-transparent rounded-xs origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 z-50 max-h-60 overflow-y-auto",
          hidden: options.length === 0,
          children: hasGroups ? Object.entries(grouped).map(([group, items]) => /* @__PURE__ */ jsxs7("div", { children: [
            group && /* @__PURE__ */ jsx8("div", { className: "px-3 py-1.5 text-xs font-semibold text-low uppercase tracking-wider", children: group }),
            items.map((opt) => /* @__PURE__ */ jsxs7(
              ComboboxOption,
              {
                value: opt,
                onClick: () => onSelect(opt),
                className: "px-3 py-2.5 text-left hover:bg-grey/20 rounded text-sm w-full cursor-pointer text-white flex items-center gap-2",
                children: [
                  OptionIconStart && /* @__PURE__ */ jsx8(OptionIconStart, { className: "size-4 shrink-0" }),
                  opt.label
                ]
              },
              opt.value
            ))
          ] }, group)) : options.map((opt) => /* @__PURE__ */ jsxs7(
            ComboboxOption,
            {
              value: opt,
              onClick: () => onSelect(opt),
              className: "px-3 py-2.5 text-left hover:bg-grey/20 rounded text-sm w-full cursor-pointer text-white flex items-center gap-2",
              children: [
                OptionIconStart && /* @__PURE__ */ jsx8(OptionIconStart, { className: "size-4 shrink-0" }),
                opt.label
              ]
            },
            opt.value
          ))
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs7("div", { className: "flex space-x-1.5 items-start mt-2", children: [
      /* @__PURE__ */ jsx8(InformationCircleIcon3, { className: "shrink-0 size-4 text-red-400 mt-[3px]" }),
      /* @__PURE__ */ jsx8("span", { className: "text-sm text-red-400", children: error })
    ] }),
    /* @__PURE__ */ jsx8(
      "div",
      {
        className: "space-y-2 mt-2 data-visible:block hidden",
        "data-visible": selected.length ? true : void 0,
        children: !!selected.length && selected.map((s) => /* @__PURE__ */ jsxs7(
          "div",
          {
            className: "flex items-center space-x-1 bg-primary w-fit border border-grey/30 rounded",
            children: [
              /* @__PURE__ */ jsxs7("div", { className: "pl-2.5 py-2 space-x-2 flex items-center", children: [
                OptionIconStart && /* @__PURE__ */ jsx8(OptionIconStart, { className: "size-4" }),
                /* @__PURE__ */ jsx8("span", { className: "text-sm text-white", children: s.label })
              ] }),
              /* @__PURE__ */ jsx8(IconButton, { onClick: () => onSelect(s), Icon: XMarkIcon })
            ]
          },
          s.value
        ))
      }
    )
  ] });
}

// src/components/MultiSelect.tsx
import {
  Listbox as Listbox2,
  ListboxButton as ListboxButton2,
  ListboxOption as ListboxOption2,
  ListboxOptions as ListboxOptions2
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon as ChevronDownIcon3 } from "@heroicons/react/24/outline";
import classNames6 from "classnames";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function MultiSelect({
  options,
  value,
  onChange,
  summary,
  placeholder = "-- Select --",
  label,
  disabled,
  name,
  className = "",
  widthClass,
  size = "default",
  Icon,
  variant
}) {
  const outlined = useFieldVariant(variant ?? (label ? "outlined" : void 0)) === "outlined";
  const selected = options.filter((option) => value.includes(option.value));
  const display = selected.length === 0 ? placeholder : summary ? summary(selected) : `${selected.length} selected`;
  const heightClass = size === "small" ? "h-9 py-2" : outlined ? "h-10 py-2.5" : "h-11 py-3";
  return /* @__PURE__ */ jsxs8("div", { className: classNames6("flex flex-col", widthClass, className), children: [
    !!label && /* @__PURE__ */ jsx9(
      "label",
      {
        htmlFor: name,
        className: outlined ? "mb-2 text-left text-[15px] font-semibold leading-6 text-low-priority" : "mb-2 text-left text-sm font-semibold text-white",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs8(
      Listbox2,
      {
        as: "div",
        multiple: true,
        value,
        onChange: (next) => onChange(next),
        disabled: !!disabled,
        className: "group",
        children: [
          /* @__PURE__ */ jsx9(
            "div",
            {
              className: classNames6(dropdownTriggerStyles, {
                "border-transparent": !outlined,
                "border-grey-700t": outlined,
                "text-low-priority": !outlined && !disabled,
                "text-white": outlined && selected.length > 0 && !disabled,
                "text-low-priority/70": selected.length === 0 && !disabled,
                "text-text-disabled": disabled
              }),
              children: /* @__PURE__ */ jsxs8(
                ListboxButton2,
                {
                  id: name,
                  name,
                  "aria-label": label ?? display,
                  className: classNames6(
                    "flex w-full items-center justify-between rounded-xs px-3 text-left leading-none outline-none disabled:text-text-disabled",
                    heightClass
                  ),
                  children: [
                    /* @__PURE__ */ jsxs8("span", { className: "flex min-w-0 items-center gap-2", children: [
                      Icon ? /* @__PURE__ */ jsx9(
                        Icon,
                        {
                          "aria-hidden": "true",
                          className: classNames6("size-5 shrink-0", {
                            "stroke-text-disabled": disabled
                          })
                        }
                      ) : null,
                      /* @__PURE__ */ jsx9("span", { className: "truncate", children: display })
                    ] }),
                    /* @__PURE__ */ jsx9(
                      ChevronDownIcon3,
                      {
                        "aria-hidden": "true",
                        strokeWidth: 2.5,
                        className: classNames6(
                          "size-3 shrink-0 transition-transform group-data-[open]:rotate-180",
                          { "stroke-text-disabled": disabled }
                        )
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx9(ListboxOptions2, { anchor: "bottom start", className: dropdownPanelStyles, children: options.map((option) => /* @__PURE__ */ jsxs8(
            ListboxOption2,
            {
              value: option.value,
              className: classNames6(
                dropdownOptionStyles,
                "group/option flex items-center justify-between gap-2"
              ),
              children: [
                /* @__PURE__ */ jsx9("span", { className: "truncate", children: option.label }),
                /* @__PURE__ */ jsx9(
                  CheckIcon,
                  {
                    "aria-hidden": "true",
                    className: "invisible size-4 shrink-0 text-orange-100 group-data-[selected]/option:visible"
                  }
                )
              ]
            },
            option.value
          )) })
        ]
      }
    )
  ] });
}

// src/components/Modal.tsx
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon as XMarkIcon2 } from "@heroicons/react/24/outline";
import classNames7 from "classnames";
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var overlayClass = "fixed inset-0 z-40 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in data-[enter]:duration-200 data-[leave]:duration-150";
var panelBaseClass = "bg-tertiary border border-grey-700t rounded-[2px] shadow-xl flex flex-col max-h-[90vh] overflow-hidden";
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  panelClassName,
  titleId
}) {
  const resolvedTitleId = titleId ?? `modal-title-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return /* @__PURE__ */ jsxs9(
    Dialog,
    {
      open,
      onClose,
      className: "relative z-50",
      "aria-labelledby": resolvedTitleId,
      children: [
        /* @__PURE__ */ jsxs9("div", { className: overlayClass, "aria-hidden": "true", onClick: onClose, children: [
          /* @__PURE__ */ jsx10("div", { className: "absolute inset-0 backdrop-blur-xl" }),
          /* @__PURE__ */ jsx10("div", { className: "absolute inset-0 bg-primary/20" })
        ] }),
        /* @__PURE__ */ jsx10("div", { className: "fixed z-50 inset-0 flex w-full items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs9(
          DialogPanel,
          {
            "aria-modal": "true",
            role: "dialog",
            className: classNames7(
              panelBaseClass,
              "pointer-events-auto",
              panelClassName ?? "w-full max-w-lg"
            ),
            children: [
              /* @__PURE__ */ jsxs9("div", { className: "flex shrink-0 items-center justify-between border-b border-grey-700t px-5 py-4", children: [
                /* @__PURE__ */ jsx10(
                  DialogTitle,
                  {
                    id: resolvedTitleId,
                    className: "font-grotesque text-2xl font-bold text-white",
                    children: title
                  }
                ),
                /* @__PURE__ */ jsx10(
                  IconButton,
                  {
                    onClick: onClose,
                    Icon: XMarkIcon2,
                    "aria-label": "Close modal",
                    type: "subtle"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx10(FieldVariantContext.Provider, { value: "outlined", children: /* @__PURE__ */ jsx10("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4", children }) }),
              footer != null && /* @__PURE__ */ jsx10("div", { className: "flex shrink-0 items-center justify-end gap-3 border-t border-grey-700t px-5 py-4", children: footer })
            ]
          }
        ) })
      ]
    }
  );
}
function ModalFooter({
  onCancel,
  cancelLabel = "Cancel",
  primaryLabel,
  onPrimary,
  primaryDisabled,
  primaryLoading
}) {
  return /* @__PURE__ */ jsxs9(Fragment2, { children: [
    /* @__PURE__ */ jsx10(
      Button,
      {
        button: {
          text: cancelLabel,
          type: "ghost",
          size: "medium",
          shrink: true,
          onClick: onCancel
        }
      }
    ),
    /* @__PURE__ */ jsx10(
      Button,
      {
        button: {
          text: primaryLabel,
          type: "primary",
          size: "medium",
          shrink: true,
          onClick: onPrimary,
          disabled: primaryDisabled,
          loading: primaryLoading
        }
      }
    )
  ] });
}

// src/components/DetailCard.tsx
import {
  useId,
  useSyncExternalStore
} from "react";
import {
  ChevronDownIcon as ChevronDownIcon4,
  ChevronUpIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

// src/components/detailCardCollapseStore.ts
var DETAIL_CARD_COLLAPSED_STORAGE_KEY = "sa-detail-cards-collapsed";
var CHANGE_EVENT = "sa-detail-card-collapse";
function getDetailCardsCollapsed() {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.localStorage.getItem(DETAIL_CARD_COLLAPSED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
function setDetailCardsCollapsed(collapsed) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      DETAIL_CARD_COLLAPSED_STORAGE_KEY,
      collapsed ? "1" : "0"
    );
  } catch {
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
function subscribeDetailCardsCollapsed(onChange) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const onCustom = () => onChange();
  const onStorage = (event) => {
    if (event.key === DETAIL_CARD_COLLAPSED_STORAGE_KEY || event.key === null) {
      onChange();
    }
  };
  window.addEventListener(CHANGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

// src/components/DetailCard.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function DetailCard({
  title,
  subtitle,
  status,
  actions,
  onEdit,
  onDelete,
  children
}) {
  const collapseTooltipId = useId();
  const collapsed = useSyncExternalStore(
    subscribeDetailCardsCollapsed,
    getDetailCardsCollapsed,
    () => false
  );
  return /* @__PURE__ */ jsxs10("div", { className: "relative border border-grey-700t rounded-[2px] bg-secondary p-5 pb-12", children: [
    /* @__PURE__ */ jsxs10("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx11("h2", { className: "font-grotesque text-4xl lg:text-5xl font-bold text-white truncate", children: title }),
        status && /* @__PURE__ */ jsx11(
          Pill,
          {
            text: status.text,
            colour: status.colour,
            size: "small",
            outline: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2 shrink-0", children: [
        actions,
        onEdit && /* @__PURE__ */ jsx11(
          Button,
          {
            button: {
              text: "Edit",
              type: "secondary",
              size: "large",
              shrink: true,
              onClick: onEdit
            }
          }
        ),
        onDelete && /* @__PURE__ */ jsx11(
          IconButton,
          {
            Icon: TrashIcon,
            onClick: onDelete,
            tooltip: "Delete",
            type: "delete",
            size: "small"
          }
        )
      ] })
    ] }),
    !collapsed && subtitle && /* @__PURE__ */ jsx11("p", { className: "text-sm text-low mb-4", children: subtitle }),
    !collapsed && children,
    /* @__PURE__ */ jsx11(
      IconButton,
      {
        Icon: collapsed ? ChevronDownIcon4 : ChevronUpIcon,
        type: "basic",
        size: "small",
        tooltip: collapsed ? "Expand detail cards (all pages)" : "Collapse detail cards (all pages)",
        tooltipId: collapseTooltipId,
        onClick: () => setDetailCardsCollapsed(!collapsed),
        className: "!absolute bottom-3 right-5 z-10 border border-grey/30 hover:brightness-125"
      }
    )
  ] });
}
function DetailGrid({
  children
}) {
  return /* @__PURE__ */ jsx11("div", { className: "grid grid-cols-2 gap-x-8 gap-y-3 text-sm", children });
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx11("span", { className: "text-low", children: label }),
    /* @__PURE__ */ jsx11("span", { className: "text-white font-semibold", children: value ?? "-" })
  ] });
}

// src/components/ConfirmDialog.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  loading
}) {
  return /* @__PURE__ */ jsx12(
    Modal,
    {
      open,
      onClose,
      title,
      panelClassName: "w-full max-w-md",
      footer: /* @__PURE__ */ jsx12(
        ModalFooter,
        {
          onCancel: onClose,
          primaryLabel: confirmLabel,
          onPrimary: onConfirm,
          primaryLoading: loading
        }
      ),
      children: /* @__PURE__ */ jsx12("p", { className: "text-sm text-low", children: message })
    }
  );
}

// src/components/ProductLockup.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var ProductLockup = ({
  className = "font-grotesque text-sm font-semibold leading-6 text-grey-500",
  emphasizeProduct = true,
  productName
}) => /* @__PURE__ */ jsxs11("span", { className, children: [
  emphasizeProduct ? /* @__PURE__ */ jsx13("span", { className: "inline-block bg-primary-main bg-clip-text text-transparent [-webkit-text-fill-color:transparent]", children: productName }) : productName,
  " by Aduro"
] });

// src/components/AuthFrame.tsx
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// src/logo.svg
var logo_default = 'data:image/svg+xml,<svg width="155" height="29" viewBox="0 0 155 29" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<g clipPath="url(%23clip0_715_6171)">%0A<path d="M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z" fill="white"/>%0A<path d="M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z" fill="white"/>%0A<path d="M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z" fill="white"/>%0A<path d="M57.3797 19.9821H49.4849L47.8129 24.9682H43.4468L50.9095 4.53516H56.0177L63.4804 24.9682H59.0517L57.3797 19.9821ZM56.3277 16.823L54.3786 11.065L53.4487 7.96847H53.3861L52.5188 11.0024L50.5667 16.823H56.3247H56.3277Z" fill="white"/>%0A<path d="M85.4603 14.7515C85.4603 21.2843 81.8064 24.968 75.3987 24.968H67.5039V4.53198H75.3987C81.8094 4.53198 85.4603 8.21564 85.4603 14.7485V14.7515ZM81.0315 14.7515C81.0315 10.3555 79.0794 7.94146 75.1812 7.94146H71.7747V21.5644H75.1812C79.0824 21.5644 81.0315 19.1504 81.0315 14.7515Z" fill="white"/>%0A<path d="M107.906 16.9181C107.906 22.4913 104.872 25.2779 99.1732 25.2779C93.4749 25.2779 90.4409 22.4913 90.4409 16.9181V4.53198H94.7147V16.7304C94.7147 20.1667 96.1691 21.7761 99.1732 21.7761C102.177 21.7761 103.602 20.1667 103.602 16.7304V4.53198H107.906V16.9152V16.9181Z" fill="white"/>%0A<path d="M121.927 17.1357H118.089V24.968H113.877V4.53198H122.887C127.53 4.53198 130.317 6.82384 130.317 10.8473C130.317 13.7888 128.8 15.8333 126.138 16.6678L131.527 24.965H126.729L121.93 17.1327L121.927 17.1357ZM118.089 13.8842H122.33C124.806 13.8842 125.951 12.9543 125.951 10.9128C125.951 8.87131 124.806 7.94146 122.33 7.94146H118.089V13.8872V13.8842Z" fill="white"/>%0A<path d="M154.557 14.7515C154.557 21.3142 150.81 25.278 144.742 25.278C138.675 25.278 134.896 21.3142 134.896 14.7515C134.896 8.18891 138.672 4.2251 144.742 4.2251C150.813 4.2251 154.557 8.18891 154.557 14.7515ZM139.324 14.7515C139.324 19.3025 141.306 21.7791 144.742 21.7791C148.179 21.7791 150.131 19.3025 150.131 14.7515C150.131 10.2006 148.149 7.72398 144.742 7.72398C141.336 7.72398 139.324 10.2006 139.324 14.7515Z" fill="white"/>%0A</g>%0A<defs>%0A<clipPath id="clip0_715_6171">%0A<rect width="154.556" height="28" fill="white" transform="translate(0 0.75)"/>%0A</clipPath>%0A</defs>%0A</svg>%0A';

// src/components/AuthFrame.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var AuthFrame = ({
  children,
  emphasizeProduct = true,
  footer,
  logoSrc,
  onBack,
  productName
}) => /* @__PURE__ */ jsx14("div", { className: "flex min-h-dvh w-full flex-col", children: /* @__PURE__ */ jsxs12("div", { className: "mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col justify-between gap-10 px-5 py-10", children: [
  /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-10", children: [
    /* @__PURE__ */ jsx14("div", { className: "flex min-h-12 items-center", children: onBack ? /* @__PURE__ */ jsx14(
      "button",
      {
        type: "button",
        onClick: onBack,
        "aria-label": "Back",
        className: "cursor-pointer rounded-xs p-2 text-white hover:bg-grey-800t",
        children: /* @__PURE__ */ jsx14(ArrowLeftIcon, { className: "size-6" })
      }
    ) : null }),
    /* @__PURE__ */ jsxs12("span", { className: "inline-flex flex-col items-center", children: [
      /* @__PURE__ */ jsx14("img", { src: logoSrc ?? logo_default, alt: "", className: "h-8 w-auto" }),
      /* @__PURE__ */ jsx14(
        ProductLockup,
        {
          className: "mt-3 font-grotesque text-sm font-semibold leading-6 text-grey-500",
          emphasizeProduct,
          productName
        }
      )
    ] }),
    children
  ] }),
  footer ? /* @__PURE__ */ jsx14("div", { className: "flex flex-col gap-5", children: footer }) : null
] }) });
var AuthTitle = ({
  subtitle,
  title
}) => /* @__PURE__ */ jsxs12("div", { className: "w-full text-center", children: [
  /* @__PURE__ */ jsx14("h1", { className: "font-grotesque text-[2.25rem] font-semibold leading-[1.22] text-white", children: title }),
  subtitle ? /* @__PURE__ */ jsx14("p", { className: "mt-4 text-base leading-6 text-low", children: subtitle }) : null
] });

// src/components/SignInMethods.tsx
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Suspense, use } from "react";

// src/components/providerIcons.tsx
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
var GoogleIcon = (props) => /* @__PURE__ */ jsxs13("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, ...props, children: [
  /* @__PURE__ */ jsx15(
    "path",
    {
      d: "M18.1713 8.36792H17.5001V8.33333H10.0001V11.6667H14.7096C14.0225 13.6071 12.1763 15 10.0001 15C7.23882 15 5.00007 12.7613 5.00007 10C5.00007 7.23875 7.23882 5 10.0001 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1859 2.52167 12.1951 1.66667 10.0001 1.66667C5.39799 1.66667 1.66674 5.39792 1.66674 10C1.66674 14.6021 5.39799 18.3333 10.0001 18.3333C14.6022 18.3333 18.3334 14.6021 18.3334 10C18.3334 9.44125 18.2759 8.89583 18.1713 8.36792Z",
      fill: "#FFC107"
    }
  ),
  /* @__PURE__ */ jsx15(
    "path",
    {
      d: "M2.6275 6.12125L5.36542 8.12917C6.10625 6.29501 7.90042 5 10.0004 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52167 12.195 1.66667 10.0004 1.66667C6.79917 1.66667 4.02334 3.47375 2.6275 6.12125Z",
      fill: "#FF3D00"
    }
  ),
  /* @__PURE__ */ jsx15(
    "path",
    {
      d: "M10.0001 18.3333C12.1526 18.3333 14.1092 17.5096 15.5876 16.17L13.0084 13.9875C12.1432 14.6452 11.0865 15.0009 10.0001 15C7.83258 15 5.99133 13.6179 5.29883 11.6892L2.58008 13.7829C3.96133 16.4817 6.76133 18.3333 10.0001 18.3333Z",
      fill: "#4CAF50"
    }
  ),
  /* @__PURE__ */ jsx15(
    "path",
    {
      d: "M18.1713 8.36792H17.5001V8.33334H10.0001V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0084 13.9871L15.5876 16.1696C15.4042 16.3363 18.3334 14.1667 18.3334 10C18.3334 9.44126 18.2759 8.89584 18.1713 8.36792Z",
      fill: "#1976D2"
    }
  )
] });
var GitHubIcon = (props) => /* @__PURE__ */ jsx15("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsx15("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) });
var MicrosoftIcon = (props) => /* @__PURE__ */ jsxs13("svg", { viewBox: "0 0 21 21", "aria-hidden": true, ...props, children: [
  /* @__PURE__ */ jsx15("path", { fill: "#f25022", d: "M0 0h10v10H0z" }),
  /* @__PURE__ */ jsx15("path", { fill: "#7fba00", d: "M11 0h10v10H11z" }),
  /* @__PURE__ */ jsx15("path", { fill: "#00a4ef", d: "M0 11h10v10H0z" }),
  /* @__PURE__ */ jsx15("path", { fill: "#ffb900", d: "M11 11h10v10H11z" })
] });
var SlackIcon = (props) => /* @__PURE__ */ jsx15("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsx15("path", { d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" }) });

// src/components/SignInMethods.tsx
import { Fragment as Fragment3, jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
var CREDENTIALS_PROVIDER = "credentials";
var labels = {
  credentials: "Continue with email",
  github: "Continue with GitHub",
  google: "Continue with Google",
  microsoft: "Continue with Microsoft",
  slack: "Continue with Slack"
};
var cache = /* @__PURE__ */ new Map();
var signInProviderLabel = (hint) => {
  const known = labels[hint];
  if (known) return known;
  return `Continue with ${hint.charAt(0).toUpperCase()}${hint.slice(1)}`;
};
var loadSignetProviders = async (issuer) => {
  const endpoint = issuer.replace(/\/$/, "");
  if (endpoint === "") return [];
  try {
    const response = await fetch(`${endpoint}/oauth/providers`);
    if (!response.ok) return [];
    const body = await response.json();
    if (!Array.isArray(body.providers)) return [];
    return body.providers.filter((provider) => typeof provider === "string");
  } catch {
    return [];
  }
};
var signetProviders = (issuer) => {
  const endpoint = issuer.replace(/\/$/, "");
  const existing = cache.get(endpoint);
  if (existing) return existing;
  const pending = loadSignetProviders(endpoint);
  cache.set(endpoint, pending);
  return pending;
};
var providerIcons = {
  github: GitHubIcon,
  google: GoogleIcon,
  microsoft: MicrosoftIcon,
  slack: SlackIcon
};
var ProviderButtons = ({
  onSelect,
  providers
}) => {
  const list = use(providers);
  const social = list.filter((hint) => hint !== CREDENTIALS_PROVIDER);
  return /* @__PURE__ */ jsxs14(Fragment3, { children: [
    social.map((hint) => /* @__PURE__ */ jsx16(
      Button,
      {
        button: {
          IconEnd: providerIcons[hint],
          onClick: () => onSelect(hint),
          size: "large",
          text: signInProviderLabel(hint),
          type: "tertiary"
        }
      },
      hint
    )),
    list.includes(CREDENTIALS_PROVIDER) ? /* @__PURE__ */ jsx16(
      Button,
      {
        button: {
          IconEnd: EnvelopeIcon,
          onClick: () => onSelect(CREDENTIALS_PROVIDER),
          size: "large",
          text: signInProviderLabel(CREDENTIALS_PROVIDER),
          type: "primary"
        }
      }
    ) : null
  ] });
};
var SignInMethods = ({
  issuer,
  onSelect
}) => /* @__PURE__ */ jsx16(
  Suspense,
  {
    fallback: /* @__PURE__ */ jsx16("div", { className: "flex w-full justify-center py-4", children: /* @__PURE__ */ jsx16(Loader, {}) }),
    children: /* @__PURE__ */ jsx16(ProviderButtons, { onSelect, providers: signetProviders(issuer) })
  }
);

// src/authMetaEnv.ts
var present = (value) => {
  const trimmed = value?.trim() ?? "";
  return trimmed === "" ? void 0 : trimmed;
};
var readAuthMeta = (env) => {
  const registration = present(env.PUBLIC_ALLOW_REGISTRATION);
  return {
    allowRegistration: registration !== "false" && registration !== "0",
    signetAccessCookie: present(env.PUBLIC_SIGNET_ACCESS_COOKIE) ?? "signet-access",
    signetClientId: present(env.PUBLIC_SIGNET_CLIENT_ID),
    signetEndpoint: present(env.PUBLIC_SIGNET_ENDPOINT)
  };
};

// src/components/LegalNotice.tsx
import { Link as Link2 } from "@tanstack/react-router";
import { jsx as jsx17, jsxs as jsxs15 } from "react/jsx-runtime";
var separator = (index, count) => {
  if (index === 0) return "";
  if (index === count - 1) return " and ";
  return ", ";
};
var links = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms and Conditions", to: "/terms" }
];
var LegalNotice = ({ productName }) => {
  const names = links.map((link, index) => /* @__PURE__ */ jsxs15("span", { children: [
    separator(index, links.length),
    /* @__PURE__ */ jsx17(Link2, { to: link.to, className: "text-orange-100 underline hover:brightness-125", children: link.label })
  ] }, link.to));
  return /* @__PURE__ */ jsxs15("p", { className: "text-center font-open text-sm text-low-priority", children: [
    "By continuing, you acknowledge ",
    productName,
    "'s ",
    names,
    "."
  ] });
};

// src/components/PersonAvatar.tsx
import { useEffect, useState as useState3 } from "react";
import { jsx as jsx18, jsxs as jsxs16 } from "react/jsx-runtime";
var sizeClassName = {
  small: "size-7 text-[11px]",
  medium: "size-8 text-xs"
};
var initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "A";
var gravatarUrl = async (email) => {
  const trimmed = email.trim().toLowerCase();
  if (trimmed === "") return null;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(trimmed));
  const hash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `https://www.gravatar.com/avatar/${hash}?s=128&d=404`;
};
var PersonAvatar = ({
  email,
  name,
  size = "medium"
}) => {
  const [src, setSrc] = useState3(null);
  const [shown, setShown] = useState3(false);
  const box = sizeClassName[size];
  useEffect(() => {
    let cancelled = false;
    setShown(false);
    void gravatarUrl(email ?? "").then((next) => {
      if (!cancelled) setSrc(next);
    });
    return () => {
      cancelled = true;
    };
  }, [email]);
  return /* @__PURE__ */ jsxs16("span", { className: `relative inline-flex shrink-0 ${box}`, children: [
    /* @__PURE__ */ jsx18("span", { className: "flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 font-bold text-white", children: initials(name) }),
    src ? /* @__PURE__ */ jsx18(
      "img",
      {
        src,
        alt: "",
        className: `absolute inset-0 size-full rounded-full border border-orange-100/40 object-cover ${shown ? "" : "invisible"}`,
        onLoad: () => setShown(true),
        onError: () => setSrc(null)
      }
    ) : null
  ] });
};

// src/components/SignInScreen.tsx
import { EnvelopeIcon as EnvelopeIcon2, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm } from "@tanstack/react-form";
import { useState as useState4 } from "react";
import { Fragment as Fragment4, jsx as jsx19, jsxs as jsxs17 } from "react/jsx-runtime";
var SignInScreen = ({
  emphasizeProduct = true,
  error,
  footer,
  issuer,
  onSelect,
  onSubmitEmail,
  productName,
  showLegalNotice = true,
  submitting = false
}) => {
  const [emailStep, setEmailStep] = useState4(false);
  const frameFooter = /* @__PURE__ */ jsxs17(Fragment4, { children: [
    footer,
    showLegalNotice ? /* @__PURE__ */ jsx19(LegalNotice, { productName }) : null
  ] });
  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      await onSubmitEmail(value);
    }
  });
  if (emailStep) {
    return /* @__PURE__ */ jsxs17(
      AuthFrame,
      {
        emphasizeProduct,
        footer: frameFooter,
        onBack: () => setEmailStep(false),
        productName,
        children: [
          /* @__PURE__ */ jsx19(AuthTitle, { title: "Log in" }),
          /* @__PURE__ */ jsxs17(
            "form",
            {
              className: "w-full space-y-5",
              onSubmit: (event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
              },
              children: [
                /* @__PURE__ */ jsx19(
                  form.Field,
                  {
                    name: "email",
                    children: (field) => /* @__PURE__ */ jsx19(
                      Input,
                      {
                        name: "email",
                        value: field.state.value,
                        label: "Email",
                        type: "email",
                        placeholder: "you@example.com",
                        required: true,
                        autoComplete: "email",
                        Icon: EnvelopeIcon2,
                        onChange: (event) => field.handleChange(event.target.value)
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx19(
                  form.Field,
                  {
                    name: "password",
                    children: (field) => /* @__PURE__ */ jsx19(
                      Input,
                      {
                        name: "password",
                        value: field.state.value,
                        label: "Password",
                        type: "password",
                        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                        required: true,
                        autoComplete: "current-password",
                        Icon: LockClosedIcon,
                        onChange: (event) => field.handleChange(event.target.value)
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx19(
                  Button,
                  {
                    button: {
                      disabled: submitting,
                      isSubmit: true,
                      loading: submitting,
                      size: "large",
                      text: "Log in",
                      type: "primary"
                    }
                  }
                ),
                error ? /* @__PURE__ */ jsx19("p", { className: "text-center text-sm text-red-400", children: error }) : null
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs17(AuthFrame, { emphasizeProduct, footer: frameFooter, productName, children: [
    /* @__PURE__ */ jsx19(AuthTitle, { title: "Welcome back!", subtitle: "Select one of the options below" }),
    /* @__PURE__ */ jsxs17("div", { className: "flex w-full flex-col gap-3", children: [
      /* @__PURE__ */ jsx19(
        SignInMethods,
        {
          issuer,
          onSelect: (hint) => {
            if (hint === CREDENTIALS_PROVIDER) {
              setEmailStep(true);
              return;
            }
            onSelect(hint);
          }
        }
      ),
      error ? /* @__PURE__ */ jsx19("p", { className: "text-center text-sm text-red-400", children: error }) : null
    ] })
  ] });
};

// src/components/AppFrame.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon as ChevronDownIcon5,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { Link as Link3 } from "@tanstack/react-router";
import { useState as useState5 } from "react";
import { jsx as jsx20, jsxs as jsxs18 } from "react/jsx-runtime";
var AduroMark = ({ className = "h-5 w-auto" }) => /* @__PURE__ */ jsxs18("svg", { width: "33", height: "29", viewBox: "0 0 33 29", fill: "none", "aria-hidden": "true", className, children: [
  /* @__PURE__ */ jsx20("path", { d: "M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z", fill: "white" }),
  /* @__PURE__ */ jsx20("path", { d: "M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z", fill: "white" }),
  /* @__PURE__ */ jsx20("path", { d: "M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z", fill: "white" })
] });
var SidebarPanelIcon = ({ className = "" }) => /* @__PURE__ */ jsx20(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    className,
    children: /* @__PURE__ */ jsx20(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M3.75 5.25h16.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Zm5.25 0v13.5"
      }
    )
  }
);
var organisationFaviconUrl = (website) => {
  const trimmed = website?.trim();
  if (!trimmed) return null;
  try {
    const hostname = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`).hostname;
    if (hostname === "") return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
  } catch {
    return null;
  }
};
var OrganisationAvatar = ({
  label,
  website
}) => {
  const src = organisationFaviconUrl(website);
  const [failed, setFailed] = useState5(false);
  const [shown, setShown] = useState5(false);
  return /* @__PURE__ */ jsxs18("span", { className: "relative inline-flex size-7 shrink-0", children: [
    /* @__PURE__ */ jsx20("span", { className: "flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 text-[11px] font-bold text-white", children: initials2(label) }),
    src && !failed ? /* @__PURE__ */ jsx20(
      "img",
      {
        src,
        alt: "",
        className: `absolute inset-0 size-full rounded-full border border-line object-cover ${shown ? "" : "invisible"}`,
        onLoad: () => setShown(true),
        onError: () => setFailed(true)
      }
    ) : null
  ] });
};
var linkClassName = "group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-[15px] font-semibold leading-5 text-low-priority outline-none transition hover:bg-white/5 hover:text-white active:shadow-focused-dark data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100";
var menuItemClassName = "flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer";
var initials2 = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "A";
var NavLink = ({
  collapsed,
  item
}) => /* @__PURE__ */ jsxs18(
  Link3,
  {
    to: item.to,
    "aria-label": collapsed ? item.label : void 0,
    title: collapsed ? item.label : void 0,
    className: `${linkClassName} data-[collapsed=true]:justify-center`,
    "data-collapsed": collapsed,
    children: [
      item.Icon ? /* @__PURE__ */ jsx20(item.Icon, { className: "size-5 shrink-0" }) : null,
      collapsed ? null : /* @__PURE__ */ jsx20("span", { className: "truncate", children: item.label })
    ]
  }
);
var AccountMenu = ({
  collapsed,
  email,
  name,
  onLogout,
  role,
  settingsTo
}) => /* @__PURE__ */ jsxs18(Menu, { children: [
  /* @__PURE__ */ jsxs18(
    MenuButton,
    {
      "aria-label": "Account menu",
      className: "group flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-left outline-none transition hover:bg-white/5 data-[collapsed=true]:justify-center",
      "data-collapsed": collapsed,
      children: [
        /* @__PURE__ */ jsx20(PersonAvatar, { email, name }),
        collapsed ? null : /* @__PURE__ */ jsxs18("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx20("span", { className: "block truncate text-sm font-semibold text-white", children: name }),
          role ? /* @__PURE__ */ jsx20("span", { className: "block truncate text-xs text-subtle/70", children: role }) : null,
          !role && email ? /* @__PURE__ */ jsx20("span", { className: "block truncate text-xs text-subtle/70", children: email }) : null
        ] }),
        collapsed ? null : /* @__PURE__ */ jsx20(ChevronDownIcon5, { className: "size-4 shrink-0 text-subtle/70 group-hover:text-white" })
      ]
    }
  ),
  /* @__PURE__ */ jsxs18(
    MenuItems,
    {
      portal: true,
      anchor: { to: "top start", gap: 6 },
      className: "z-50 flex min-w-60 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none",
      children: [
        /* @__PURE__ */ jsxs18("div", { className: "flex flex-col border-b border-line px-3 py-3", children: [
          /* @__PURE__ */ jsx20("span", { className: "truncate text-sm font-semibold text-white", children: name }),
          role ? /* @__PURE__ */ jsx20("span", { className: "truncate text-xs text-subtle", children: role }) : null,
          email ? /* @__PURE__ */ jsx20("span", { className: "truncate text-xs text-subtle", children: email }) : null
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "p-1.5", children: [
          /* @__PURE__ */ jsx20(MenuItem, { children: /* @__PURE__ */ jsxs18(Link3, { to: settingsTo, className: menuItemClassName, children: [
            /* @__PURE__ */ jsx20(Cog6ToothIcon, { className: "size-4 shrink-0 text-subtle" }),
            /* @__PURE__ */ jsx20("span", { children: "Settings" })
          ] }) }),
          /* @__PURE__ */ jsx20(MenuItem, { children: /* @__PURE__ */ jsxs18("button", { type: "button", onClick: onLogout, className: menuItemClassName, children: [
            /* @__PURE__ */ jsx20(ArrowLeftStartOnRectangleIcon, { className: "size-4 shrink-0 text-subtle" }),
            /* @__PURE__ */ jsx20("span", { children: "Logout" })
          ] }) })
        ] })
      ]
    }
  )
] });
var OrganisationMenu = ({
  onChange,
  options,
  value
}) => {
  const current = options.find((option) => option.value === value) ?? options[0];
  const label = current?.label ?? "Organisation";
  return /* @__PURE__ */ jsxs18(Menu, { children: [
    /* @__PURE__ */ jsxs18(
      MenuButton,
      {
        "aria-label": "Switch organisation",
        className: "flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] bg-secondary px-2 py-2 text-left outline-none transition hover:bg-white/10",
        children: [
          /* @__PURE__ */ jsx20(OrganisationAvatar, { label, ...current?.website ? { website: current.website } : {} }),
          /* @__PURE__ */ jsx20("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-white", children: label }),
          /* @__PURE__ */ jsx20(ChevronDownIcon5, { className: "size-4 shrink-0 text-subtle" })
        ]
      }
    ),
    /* @__PURE__ */ jsx20(
      MenuItems,
      {
        portal: true,
        anchor: { to: "bottom start", gap: 6 },
        className: "z-50 flex min-w-56 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none",
        children: options.map((option) => /* @__PURE__ */ jsx20(MenuItem, { children: /* @__PURE__ */ jsxs18(
          "button",
          {
            type: "button",
            onClick: () => onChange(option.value),
            className: menuItemClassName,
            children: [
              /* @__PURE__ */ jsx20(OrganisationAvatar, { label: option.label, ...option.website ? { website: option.website } : {} }),
              /* @__PURE__ */ jsx20("span", { className: "min-w-0 flex-1 truncate", children: option.label })
            ]
          }
        ) }, option.value))
      }
    )
  ] });
};
var AppFrame = ({
  account,
  children,
  footerItems = [],
  items,
  logoSrc,
  organisations,
  productName
}) => {
  const [collapsed, setCollapsed] = useState5(false);
  return /* @__PURE__ */ jsxs18("div", { className: "flex h-screen w-full overflow-hidden bg-primary text-white", children: [
    /* @__PURE__ */ jsxs18(
      "aside",
      {
        "data-collapsed": collapsed,
        className: "flex h-full shrink-0 flex-col border-r border-line bg-primary transition-all duration-150 data-[collapsed=false]:w-60 data-[collapsed=true]:w-[65px]",
        children: [
          /* @__PURE__ */ jsx20(
            "div",
            {
              className: "flex shrink-0 flex-col items-center justify-center px-4 data-[collapsed=false]:pb-3 data-[collapsed=false]:pt-4 data-[collapsed=true]:h-14",
              "data-collapsed": collapsed,
              children: /* @__PURE__ */ jsxs18(
                Link3,
                {
                  to: "/",
                  "aria-label": `${productName} by Aduro`,
                  className: "inline-flex flex-col items-center gap-1.5",
                  children: [
                    collapsed ? /* @__PURE__ */ jsx20(AduroMark, { className: "h-5 w-auto" }) : /* @__PURE__ */ jsx20("img", { src: logoSrc ?? logo_default, alt: "", className: "h-5 w-auto" }),
                    collapsed ? null : /* @__PURE__ */ jsx20(ProductLockup, { productName })
                  ]
                }
              )
            }
          ),
          organisations && organisations.options.length > 0 && !collapsed ? /* @__PURE__ */ jsx20("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsx20(
            OrganisationMenu,
            {
              onChange: organisations.onChange,
              options: organisations.options,
              value: organisations.value
            }
          ) }) : null,
          /* @__PURE__ */ jsxs18(
            "nav",
            {
              "aria-label": "Main navigation",
              className: "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3",
              children: [
                items.map((item) => /* @__PURE__ */ jsx20(NavLink, { collapsed, item }, item.to)),
                footerItems.length > 0 ? /* @__PURE__ */ jsxs18("div", { className: "mt-auto flex flex-col gap-1", children: [
                  collapsed ? null : /* @__PURE__ */ jsx20("span", { className: "px-2.5 pb-1 pt-2 font-grotesque text-sm font-semibold leading-6 text-grey-500", children: "Administration" }),
                  footerItems.map((item) => /* @__PURE__ */ jsx20(NavLink, { collapsed, item }, item.to))
                ] }) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxs18("div", { className: "flex flex-col border-t border-line", children: [
            account ? /* @__PURE__ */ jsx20("div", { className: "px-3 py-2", children: /* @__PURE__ */ jsx20(
              AccountMenu,
              {
                collapsed,
                email: account.email,
                name: account.name,
                onLogout: account.onLogout,
                role: account.role,
                settingsTo: account.settingsTo ?? "/settings"
              }
            ) }) : null,
            /* @__PURE__ */ jsx20(
              "div",
              {
                className: "flex border-t border-line px-3 py-2 data-[collapsed=true]:justify-center",
                "data-collapsed": collapsed,
                children: /* @__PURE__ */ jsx20(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCollapsed((current) => !current),
                    "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
                    "aria-expanded": !collapsed,
                    className: "group flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-subtle outline-none transition hover:bg-white/5 hover:text-white",
                    children: /* @__PURE__ */ jsx20(SidebarPanelIcon, { className: "size-5 shrink-0" })
                  }
                )
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx20("main", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", children })
  ] });
};
var PageHeader = ({
  actions,
  title
}) => /* @__PURE__ */ jsxs18("div", { className: "flex items-center justify-between gap-4 border-b border-grey-700t px-6 py-4", children: [
  /* @__PURE__ */ jsx20("h1", { className: "truncate font-grotesque text-[30px] font-semibold leading-9 text-white", children: title }),
  actions
] });

// src/components/DataTable.tsx
import { useState as useState6 } from "react";
import { jsx as jsx21, jsxs as jsxs19 } from "react/jsx-runtime";
function DataTable({
  columns,
  empty = "Nothing here yet.",
  pageSize = 25,
  rows,
  rowKey
}) {
  const [page, setPage] = useState6(1);
  const [perPage, setPerPage] = useState6(pageSize);
  const lastPage = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(page, lastPage);
  const visible = rows.slice((current - 1) * perPage, current * perPage);
  const width = columns.length === 0 ? 100 : Math.floor(100 / columns.length);
  return /* @__PURE__ */ jsxs19(TableContainer, { flush: true, className: "min-h-[320px]", children: [
    /* @__PURE__ */ jsx21(
      TableColumns,
      {
        widthType: "pc",
        columns: columns.map((column) => ({ heading: column.header, width }))
      }
    ),
    visible.length === 0 ? /* @__PURE__ */ jsx21("p", { className: "px-5 py-6 text-sm text-subtle", children: empty }) : /* @__PURE__ */ jsx21(
      TableRows,
      {
        widthType: "pc",
        rows: visible.map((row) => ({
          uuid: rowKey(row),
          cells: columns.map((column) => ({
            content: column.cell(row),
            width
          }))
        }))
      }
    ),
    /* @__PURE__ */ jsx21(
      TablePagination,
      {
        page: current,
        perPage,
        total: rows.length,
        onPageChange: setPage,
        onPerPageChange: (next) => {
          setPerPage(next);
          setPage(1);
        }
      }
    )
  ] });
}

// src/index.tsx
var elements = {
  button: typeMap,
  ...styles
};
export {
  AppFrame,
  AuthFrame,
  AuthTitle,
  Button,
  CREDENTIALS_PROVIDER,
  ComboBox,
  ConfirmDialog,
  DataTable,
  DetailCard,
  DetailGrid,
  DetailRow,
  FullLoader,
  IconButton,
  Input,
  LegalNotice,
  Loader,
  Modal,
  ModalFooter,
  MultiSelect,
  PageHeader,
  PersonAvatar,
  Pill,
  ProductLockup,
  Select,
  SignInMethods,
  SignInScreen,
  TableBody,
  TableColumns,
  TableContainer,
  TablePagination,
  TableRows,
  elements,
  getIconButtonStyles,
  loadSignetProviders,
  readAuthMeta,
  signInProviderLabel,
  signetProviders
};
