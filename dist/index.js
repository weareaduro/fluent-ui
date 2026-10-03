var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/pdf/statementPdf.tsx
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
var statementPdfColors, c, statementPdfStyles, StatementPdfFrame;
var init_statementPdf = __esm({
  "src/pdf/statementPdf.tsx"() {
    "use strict";
    statementPdfColors = {
      primary: "#111115",
      secondary: "#222226",
      white: "#ffffff",
      low: "#dddddd",
      subtle: "#bbbbbb",
      accent: "#d17238",
      border: "#3a424c",
      borderMuted: "#2c3138",
      positive: "#3EB077",
      negative: "#E55353",
      amber: "#F59E0B"
    };
    c = statementPdfColors;
    statementPdfStyles = (StyleSheet) => StyleSheet.create({
      page: {
        paddingTop: 36,
        paddingBottom: 56,
        paddingHorizontal: 36,
        fontSize: 8,
        fontFamily: "Helvetica",
        lineHeight: 1.4,
        color: c.white,
        backgroundColor: c.primary
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 18,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: c.border
      },
      headerLeft: {
        width: "42%",
        alignItems: "flex-start",
        justifyContent: "flex-start"
      },
      logo: { width: 124, height: 23 },
      headerRight: { width: "48%", alignItems: "flex-end" },
      statementLabel: {
        fontSize: 10,
        fontWeight: "bold",
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: c.accent,
        marginBottom: 10
      },
      headerMetaLabel: {
        fontSize: 7,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: c.subtle,
        marginBottom: 2
      },
      headerMetaValue: {
        fontSize: 9,
        color: c.white,
        marginBottom: 6,
        textAlign: "right"
      },
      headerMetaMuted: {
        fontSize: 8,
        color: c.low,
        textAlign: "right",
        marginBottom: 2
      },
      balanceCard: {
        borderWidth: 1,
        borderColor: c.border,
        borderRadius: 2,
        backgroundColor: c.secondary,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 16
      },
      balanceTitle: {
        fontSize: 9,
        color: c.low,
        marginBottom: 8
      },
      balanceRow: {
        flexDirection: "row",
        justifyContent: "flex-end"
      },
      balanceColumn: { alignItems: "flex-end", minWidth: 72, marginLeft: 16 },
      balanceColumnLabel: {
        fontSize: 7,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        color: c.subtle,
        marginBottom: 2
      },
      balanceColumnValue: {
        fontSize: 10,
        fontWeight: "bold",
        color: c.white
      },
      sectionHeading: {
        fontSize: 8,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        color: c.subtle,
        marginBottom: 8,
        marginTop: 2
      },
      table: {
        width: "100%",
        borderWidth: 1,
        borderColor: c.border,
        borderRadius: 2,
        marginBottom: 14,
        overflow: "hidden",
        backgroundColor: c.primary
      },
      tableHeaderRow: {
        flexDirection: "row",
        backgroundColor: c.secondary,
        borderBottomWidth: 1,
        borderBottomColor: c.border,
        paddingVertical: 7,
        paddingHorizontal: 8
      },
      tableHeaderCell: {
        fontSize: 6.5,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.4,
        color: c.subtle
      },
      tableRow: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: c.borderMuted,
        backgroundColor: c.primary
      },
      tableRowLast: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: c.primary
      },
      tableTotalRow: {
        flexDirection: "row",
        paddingVertical: 7,
        paddingHorizontal: 8,
        backgroundColor: c.secondary,
        borderTopWidth: 1,
        borderTopColor: c.border
      },
      tableCell: { fontSize: 7.5, color: c.white },
      tableCellMuted: { fontSize: 7.5, color: c.low },
      tableCellAmount: { fontSize: 7.5, color: c.white, textAlign: "right" },
      tableCellCredit: { fontSize: 7.5, color: c.positive, textAlign: "right" },
      tableCellDebit: { fontSize: 7.5, color: c.white, textAlign: "right" },
      tableCellTotalLabel: {
        fontSize: 7.5,
        fontWeight: "bold",
        color: c.white
      },
      tableCellTotalValue: {
        fontSize: 7.5,
        fontWeight: "bold",
        color: c.white,
        textAlign: "right"
      },
      empty: {
        fontSize: 8,
        color: c.subtle,
        marginBottom: 12,
        paddingHorizontal: 2
      },
      footer: {
        position: "absolute",
        bottom: 24,
        left: 36,
        right: 36,
        borderTopWidth: 1,
        borderTopColor: c.borderMuted,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
      },
      footerText: { fontSize: 7, color: c.subtle }
    });
    StatementPdfFrame = ({
      billTo,
      children,
      documentTitle,
      label,
      logoSrc,
      periodLabel,
      renderer,
      statementDate
    }) => {
      const { Document, Image: Image2, Page, Text, View } = renderer;
      const styles2 = statementPdfStyles(renderer.StyleSheet);
      const primaryName = billTo.companyName ?? billTo.name;
      return /* @__PURE__ */ jsx18(Document, { title: documentTitle, children: /* @__PURE__ */ jsxs11(Page, { size: "A4", style: styles2.page, children: [
        /* @__PURE__ */ jsxs11(View, { style: styles2.header, children: [
          /* @__PURE__ */ jsx18(View, { style: styles2.headerLeft, children: /* @__PURE__ */ jsx18(Image2, { src: logoSrc, style: styles2.logo }) }),
          /* @__PURE__ */ jsxs11(View, { style: styles2.headerRight, children: [
            /* @__PURE__ */ jsx18(Text, { style: styles2.statementLabel, children: label }),
            /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaLabel, children: "Bill to" }),
            /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaValue, children: primaryName }),
            billTo.companyName && billTo.companyName !== billTo.name ? /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaMuted, children: billTo.name }) : null,
            billTo.companyNumber ? /* @__PURE__ */ jsxs11(Text, { style: styles2.headerMetaMuted, children: [
              "Co. no. ",
              billTo.companyNumber
            ] }) : null,
            (billTo.addressLines ?? []).map((line, index) => /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaMuted, children: line }, `addr-${index}`)),
            billTo.email ? /* @__PURE__ */ jsx18(Text, { style: [styles2.headerMetaMuted, { marginTop: 4 }], children: billTo.email }) : null,
            /* @__PURE__ */ jsx18(Text, { style: [styles2.headerMetaLabel, { marginTop: 10 }], children: "Statement date" }),
            /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaValue, children: statementDate }),
            periodLabel ? /* @__PURE__ */ jsx18(Text, { style: [styles2.headerMetaLabel, { marginTop: 6 }], children: "Period" }) : null,
            periodLabel ? /* @__PURE__ */ jsx18(Text, { style: styles2.headerMetaValue, children: periodLabel }) : null
          ] })
        ] }),
        children,
        /* @__PURE__ */ jsxs11(View, { style: styles2.footer, fixed: true, children: [
          /* @__PURE__ */ jsx18(Text, { style: styles2.footerText, children: "Aduro Creative Ltd \xB7 Co. 11200639" }),
          /* @__PURE__ */ jsx18(Text, { style: styles2.footerText, children: "legal@weareaduro.com" })
        ] })
      ] }) });
    };
  }
});

// src/components/billingPdf.tsx
var billingPdf_exports = {};
__export(billingPdf_exports, {
  BillingPdfDocument: () => BillingPdfDocument
});
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
var moneyHeaders, formatDate, columnWeight, columnWidths, amountOf, formatMoney, signIndex, BillingPdfDocument;
var init_billingPdf = __esm({
  "src/components/billingPdf.tsx"() {
    "use strict";
    init_statementPdf();
    moneyHeaders = /* @__PURE__ */ new Set(["Spend", "Tax", "Total", "Gross", "Net"]);
    formatDate = (date) => date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    columnWeight = (header) => {
      if (moneyHeaders.has(header)) return 10;
      if (header === "Description") return 24;
      if (header === "Title") return 16;
      if (header === "Date") return 14;
      return 12;
    };
    columnWidths = (headers2) => {
      const weights = headers2.map(columnWeight);
      const total = weights.reduce((sum, weight) => sum + weight, 0);
      return weights.map((weight) => `${(weight / total * 100).toFixed(2)}%`);
    };
    amountOf = (value) => {
      const match = value.replace(/,/g, "").match(/^([+-])?£(\d+(?:\.\d+)?)$/);
      if (!match?.[2]) return null;
      const amount = Number(match[2]);
      return match[1] === "-" ? -amount : amount;
    };
    formatMoney = (amount) => {
      const formatted = `\xA3${Math.abs(amount).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (amount < 0) return `-${formatted}`;
      if (amount > 0) return `+${formatted}`;
      return formatted;
    };
    signIndex = (headers2) => {
      const total = headers2.indexOf("Total");
      if (total >= 0) return total;
      return headers2.indexOf("Gross");
    };
    BillingPdfDocument = ({
      generatedAt,
      headers: headers2,
      logoSrc,
      organisationName,
      periodLabel,
      renderer,
      rows,
      title
    }) => {
      const { Text, View } = renderer;
      const styles2 = statementPdfStyles(renderer.StyleSheet);
      const widths = columnWidths(headers2);
      const signedAt = signIndex(headers2);
      const totals = headers2.map((header, index) => {
        if (!moneyHeaders.has(header)) return null;
        let total = 0;
        for (const row of rows) {
          const amount = amountOf(row[index] ?? "");
          if (amount === null) return null;
          total += amount;
        }
        return total;
      });
      const showTotals = rows.length > 0 && totals.some((total) => total !== null);
      return /* @__PURE__ */ jsxs12(
        StatementPdfFrame,
        {
          billTo: { name: organisationName },
          documentTitle: `${title} \u2013 ${organisationName}`,
          label: title,
          logoSrc,
          renderer,
          statementDate: formatDate(generatedAt),
          ...periodLabel ? { periodLabel } : {},
          children: [
            /* @__PURE__ */ jsx19(Text, { style: styles2.sectionHeading, children: title }),
            rows.length === 0 ? /* @__PURE__ */ jsxs12(Text, { style: styles2.empty, children: [
              "No ",
              title.toLowerCase(),
              " in this export."
            ] }) : /* @__PURE__ */ jsxs12(View, { style: styles2.table, children: [
              /* @__PURE__ */ jsx19(View, { style: styles2.tableHeaderRow, children: headers2.map((header, index) => /* @__PURE__ */ jsx19(
                Text,
                {
                  style: [
                    styles2.tableHeaderCell,
                    { width: widths[index], textAlign: moneyHeaders.has(header) ? "right" : "left" }
                  ],
                  children: header
                },
                header
              )) }),
              rows.map((row, index) => {
                const credit = signedAt >= 0 && (row[signedAt] ?? "").startsWith("+");
                return /* @__PURE__ */ jsx19(View, { style: index === rows.length - 1 && !showTotals ? styles2.tableRowLast : styles2.tableRow, children: row.map((cell, cellIndex) => {
                  const header = headers2[cellIndex] ?? "";
                  const money3 = moneyHeaders.has(header);
                  return /* @__PURE__ */ jsx19(
                    Text,
                    {
                      style: [
                        money3 ? credit ? styles2.tableCellCredit : styles2.tableCell : cellIndex === 0 ? styles2.tableCellMuted : styles2.tableCell,
                        { width: widths[cellIndex], textAlign: money3 ? "right" : "left" }
                      ],
                      children: cell
                    },
                    `${header}-${cellIndex}`
                  );
                }) }, `${row[0] ?? "row"}-${index}`);
              }),
              showTotals ? /* @__PURE__ */ jsx19(View, { style: styles2.tableTotalRow, children: headers2.map((header, index) => {
                const total = totals[index];
                const explicitSign = rows.some((row) => /^[+-]/.test(row[index] ?? ""));
                const totalText = total === null ? "" : explicitSign ? formatMoney(total) : formatMoney(total).replace(/^\+/, "");
                return /* @__PURE__ */ jsx19(
                  Text,
                  {
                    style: [
                      styles2.tableCellTotalLabel,
                      { width: widths[index], textAlign: moneyHeaders.has(header) ? "right" : "left" }
                    ],
                    children: index === 0 ? "Total" : totalText
                  },
                  `total-${header}`
                );
              }) }) : null
            ] })
          ]
        }
      );
    };
  }
});

// src/logo.svg
var logo_default;
var init_logo = __esm({
  "src/logo.svg"() {
    logo_default = 'data:image/svg+xml,<svg width="155" height="29" viewBox="0 0 155 29" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<g clipPath="url(%23clip0_715_6171)">%0A<path d="M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z" fill="white"/>%0A<path d="M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z" fill="white"/>%0A<path d="M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z" fill="white"/>%0A<path d="M57.3797 19.9821H49.4849L47.8129 24.9682H43.4468L50.9095 4.53516H56.0177L63.4804 24.9682H59.0517L57.3797 19.9821ZM56.3277 16.823L54.3786 11.065L53.4487 7.96847H53.3861L52.5188 11.0024L50.5667 16.823H56.3247H56.3277Z" fill="white"/>%0A<path d="M85.4603 14.7515C85.4603 21.2843 81.8064 24.968 75.3987 24.968H67.5039V4.53198H75.3987C81.8094 4.53198 85.4603 8.21564 85.4603 14.7485V14.7515ZM81.0315 14.7515C81.0315 10.3555 79.0794 7.94146 75.1812 7.94146H71.7747V21.5644H75.1812C79.0824 21.5644 81.0315 19.1504 81.0315 14.7515Z" fill="white"/>%0A<path d="M107.906 16.9181C107.906 22.4913 104.872 25.2779 99.1732 25.2779C93.4749 25.2779 90.4409 22.4913 90.4409 16.9181V4.53198H94.7147V16.7304C94.7147 20.1667 96.1691 21.7761 99.1732 21.7761C102.177 21.7761 103.602 20.1667 103.602 16.7304V4.53198H107.906V16.9152V16.9181Z" fill="white"/>%0A<path d="M121.927 17.1357H118.089V24.968H113.877V4.53198H122.887C127.53 4.53198 130.317 6.82384 130.317 10.8473C130.317 13.7888 128.8 15.8333 126.138 16.6678L131.527 24.965H126.729L121.93 17.1327L121.927 17.1357ZM118.089 13.8842H122.33C124.806 13.8842 125.951 12.9543 125.951 10.9128C125.951 8.87131 124.806 7.94146 122.33 7.94146H118.089V13.8872V13.8842Z" fill="white"/>%0A<path d="M154.557 14.7515C154.557 21.3142 150.81 25.278 144.742 25.278C138.675 25.278 134.896 21.3142 134.896 14.7515C134.896 8.18891 138.672 4.2251 144.742 4.2251C150.813 4.2251 154.557 8.18891 154.557 14.7515ZM139.324 14.7515C139.324 19.3025 141.306 21.7791 144.742 21.7791C148.179 21.7791 150.131 19.3025 150.131 14.7515C150.131 10.2006 148.149 7.72398 144.742 7.72398C141.336 7.72398 139.324 10.2006 139.324 14.7515Z" fill="white"/>%0A</g>%0A<defs>%0A<clipPath id="clip0_715_6171">%0A<rect width="154.556" height="28" fill="white" transform="translate(0 0.75)"/>%0A</clipPath>%0A</defs>%0A</svg>%0A';
  }
});

// src/components/rasterizeLogoForPdf.ts
var rasterizeLogoForPdf_exports = {};
__export(rasterizeLogoForPdf_exports, {
  rasterizeLogoForPdf: () => rasterizeLogoForPdf
});
var rasterizeLogoForPdf;
var init_rasterizeLogoForPdf = __esm({
  "src/components/rasterizeLogoForPdf.ts"() {
    "use strict";
    init_logo();
    rasterizeLogoForPdf = () => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const width = 310;
        const height = 58;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas is not available for logo rasterisation."));
          return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => {
        reject(new Error("Failed to load the Aduro logo for the PDF."));
      };
      img.src = logo_default;
    });
  }
});

// src/components/Button.tsx
import { Link } from "@tanstack/react-router";
import classNames from "classnames";

// src/components/Loader.tsx
import { useId } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Loader = ({
  width = 38,
  height = 38,
  fill = "currentColor",
  className,
  label = "Loading"
}) => {
  const paintId = `loader-${useId().replace(/:/g, "")}`;
  const branded = fill === "currentColor";
  const paint = branded ? `url(#${paintId})` : fill;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width,
      height,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      role: "img",
      "aria-label": label,
      children: [
        branded ? /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: paintId, patternUnits: "userSpaceOnUse", width: "38", height: "38", children: /* @__PURE__ */ jsx("foreignObject", { width: "38", height: "38", children: /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-primary-main" }) }) }) }) : null,
        /* @__PURE__ */ jsx("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ jsxs("g", { transform: "translate(1 1)", children: [
          /* @__PURE__ */ jsx("path", { d: "M36 18c0-9.94-8.06-18-18-18", stroke: paint, strokeWidth: "2", children: /* @__PURE__ */ jsx(
            "animateTransform",
            {
              attributeName: "transform",
              type: "rotate",
              from: "0 18 18",
              to: "360 18 18",
              dur: "0.9s",
              repeatCount: "indefinite"
            }
          ) }),
          /* @__PURE__ */ jsx("circle", { fill: paint, cx: "36", cy: "18", r: "1", children: /* @__PURE__ */ jsx(
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
};
var FullLoader = ({ className }) => /* @__PURE__ */ jsx(
  "div",
  {
    role: "status",
    "aria-live": "polite",
    "aria-label": "Loading",
    className: ["flex min-h-0 w-full flex-1 items-center justify-center p-8", className].filter(Boolean).join(" "),
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
  secondary: "hover:brightness-125 border border-grey-700t text-low-priority font-open",
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

// node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
import * as React from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var QueryClientContext = React.createContext(void 0);
var useQueryClient = (queryClient) => {
  const client = React.useContext(QueryClientContext);
  if (queryClient) return queryClient;
  if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return client;
};
var QueryClientProvider = ({ client, children }) => {
  React.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ jsx4(QueryClientContext.Provider, {
    value: client,
    children
  });
};

// node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
  #provider = defaultTimeoutProvider;
  #providerCalled = false;
  /**
  * `setTimeoutProvider` can be used to set a custom implementation of the
  * `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions,
  * called a `TimeoutProvider`.
  *
  * This may be useful if you notice event loop performance issues with
  * thousands of queries. A custom TimeoutProvider could also support timer
  * delays longer than the global `setTimeout` maximum delay value of about
  * 24 days.
  *
  * It is important to call `setTimeoutProvider` before creating a
  * QueryClient or queries, so that the same provider is used consistently
  * for all timers in the application, since different TimeoutProviders
  * cannot cancel each others' timers.
  *
  * @example
  * ```ts
  * import { timeoutManager, QueryClient } from '@tanstack/query-core'
  * import { CustomTimeoutProvider } from './CustomTimeoutProvider'
  *
  * timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())
  *
  * export const queryClient = new QueryClient()
  * ```
  */
  setTimeoutProvider(provider) {
    if (true) {
      if (this.#providerCalled && provider !== this.#provider) console.error(`[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`, {
        previous: this.#provider,
        provider
      });
    }
    this.#provider = provider;
    if (true) this.#providerCalled = false;
  }
  /**
  * `setTimeout` schedules a callback to run after approximately `delay`
  * milliseconds, like the global `setTimeout` function. The callback can be
  * canceled with `clearTimeout`.
  *
  * It returns a timer ID, which may be a number or an object that can be
  * coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * const timeoutIdNumber: number = Number(timeoutId)
  * ```
  */
  setTimeout(callback, delay) {
    if (true) this.#providerCalled = true;
    return this.#provider.setTimeout(callback, delay);
  }
  /**
  * `clearTimeout` cancels a timeout callback scheduled with `setTimeout`,
  * like the global `clearTimeout` function. It should be called with a
  * timer ID returned by `setTimeout`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearTimeout(timeoutId)
  * ```
  */
  clearTimeout(timeoutId) {
    this.#provider.clearTimeout(timeoutId);
  }
  /**
  * `setInterval` schedules a callback to be called approximately every
  * `delay` milliseconds, like the global `setInterval` function.
  *
  * Like `setTimeout`, it returns a timer ID, which may be a number or an
  * object that can be coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  * ```
  */
  setInterval(callback, delay) {
    if (true) this.#providerCalled = true;
    return this.#provider.setInterval(callback, delay);
  }
  /**
  * `clearInterval` can be used to cancel an interval, like the global
  * `clearInterval` function. It should be called with an interval ID
  * returned by `setInterval`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearInterval(intervalId)
  * ```
  */
  clearInterval(intervalId) {
    this.#provider.clearInterval(intervalId);
  }
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}

// node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveQueryValue(value, query) {
  return typeof value === "function" ? value(query) : value;
}
function matchQuery(filters, query) {
  const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
    } else if (!partialMatchKey(query.queryKey, queryKey)) return false;
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) return false;
    if (type === "inactive" && isActive) return false;
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) return false;
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
  if (predicate && !predicate(query)) return false;
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) return false;
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
  }
  if (status && mutation.state.status !== status) return false;
  if (predicate && !predicate(mutation)) return false;
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (b.length > a.length) return false;
      for (let i = 0; i < b.length; i++) if (!partialMatchKey(a[i], b[i])) return false;
      return true;
    }
    const bKeys = Object.keys(b);
    for (const key of bKeys) if (!partialMatchKey(a[key], b[key])) return false;
    return true;
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b, depth = 0) {
  if (a === b) return a;
  if (depth > 500) return b;
  const array = isPlainArray(a) && isPlainArray(b);
  if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
  const aSize = (array ? a : Object.keys(a)).length;
  const bItems = array ? b : Object.keys(b);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i = 0; i < bSize; i++) {
    const key = array ? i : bItems[i];
    const aItem = a[key];
    const bItem = b[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v = replaceEqualDeep(aItem, bItem, depth + 1);
    copy[key] = v;
    if (v === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a : copy;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) return false;
  for (const key in a) if (a[key] !== b[key]) return false;
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) return false;
  const objectPrototype = Object.getPrototypeOf(o);
  const ctor = objectPrototype?.constructor;
  if (ctor === void 0) return true;
  if (typeof ctor !== "function") return false;
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) return false;
  if (!prot.hasOwnProperty("isPrototypeOf")) return false;
  if (objectPrototype !== Object.prototype) return false;
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
  else if (options.structuralSharing !== false) {
    if (true) try {
      return replaceEqualDeep(prevData, data);
    } catch (error) {
      console.error(`Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`);
      throw error;
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = /* @__PURE__ */ Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) console.error(`Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`);
  }
  if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
  if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") return throwOnError(...params);
  return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
  let consumed = false;
  let signal;
  Object.defineProperty(object, "signal", {
    enumerable: true,
    get: () => {
      signal ??= getSignal();
      if (consumed) return signal;
      consumed = true;
      if (signal.aborted) onCancelled();
      else signal.addEventListener("abort", onCancelled, { once: true });
      return signal;
    }
  });
  return object;
}

// node_modules/@tanstack/query-core/build/modern/environmentManager.js
var isServerFn = () => isServer;
var isServer2 = () => isServerFn();

// node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  /**
  * Registers a listener to be called on every update this object notifies about. Returns a function
  * that removes the listener again — call it to stop listening. The base class never drops a listener
  * on its own, though some subclasses clear all of theirs in `destroy()`.
  * @param listener - Called on each update, with whatever the subclass passes to its subscribers.
  * @example
  * ```ts
  * const unsubscribe = subscribable.subscribe(() => {
  *   // react to the update
  * })
  *
  * unsubscribe()
  * ```
  */
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  /**
  * Returns `true` while at least one listener is registered, `false` once they have all unsubscribed.
  */
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the focus state. The provided `setup` function
  * receives a `setFocused` callback: call it with a `boolean` to manually
  * set the focus state, or with no arguments to re-evaluate the current
  * focus state and notify subscribers.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * focusManager.setEventListener((handleFocus) => {
  *   const listener = () => handleFocus()
  *   // Listen to visibilitychange
  *   if (typeof window !== 'undefined' && window.addEventListener) {
  *     window.addEventListener('visibilitychange', listener, false)
  *   }
  *
  *   return () => {
  *     // Be sure to unsubscribe if a new handler is set
  *     window.removeEventListener('visibilitychange', listener)
  *   }
  * })
  * ```
  */
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") this.setFocused(focused);
      else this.onFocus();
    });
  }
  /**
  * `setFocused` can be used to manually set the focus state. Set `undefined`
  * to fall back to the default focus check.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * // Set focused
  * focusManager.setFocused(true)
  *
  * // Set unfocused
  * focusManager.setFocused(false)
  *
  * // Fallback to the default focus check
  * focusManager.setFocused(undefined)
  * ```
  */
  setFocused(focused) {
    if (this.#focused !== focused) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  /**
  * `onFocus` notifies all subscribed listeners with the current focus state.
  */
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  /**
  * `isFocused` can be used to get the current focus state.
  */
  isFocused() {
    if (typeof this.#focused === "boolean") return this.#focused;
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

// node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) queue.push(callback);
    else scheduleFn(() => {
      notifyFn(callback);
    });
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) scheduleFn(() => {
      batchNotifyFn(() => {
        originalQueue.forEach((callback) => {
          notifyFn(callback);
        });
      });
    });
  };
  return {
    /**
    * Batches all updates scheduled inside the passed callback.
    * This is mainly used internally to optimize query client updating.
    * Batches can be nested; the queue is only flushed once the outermost `batch` call finishes.
    * The return value of `callback` is passed through.
    */
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) flush();
      }
      return result;
    },
    /**
    * All calls to the wrapped function will be batched.
    */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    /**
    * Schedules a function to be run on the next batch.
    * By default, the batch is run with a `setTimeout`, but this can be configured via `setScheduler`.
    */
    schedule,
    /**
    * Use this method to set a custom notify function.
    * This can be used to for example wrap notifications with `React.act` while running tests.
    */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
    * Use this method to set a custom function to batch notifications together into a single tick.
    * Framework adapters use this to plug in their own batching primitive, so that a single query
    * update only triggers one re-render instead of one per subscriber.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    * import { batch } from 'solid-js'
    *
    * notifyManager.setBatchNotifyFunction(batch)
    * ```
    */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    /**
    * Configures a custom callback that schedules when the next batch runs.
    * The default behavior is `setTimeout(callback, 0)`.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    *
    * // Schedule batches in the next microtask
    * notifyManager.setScheduler(queueMicrotask)
    *
    * // Schedule batches before the next frame is rendered
    * notifyManager.setScheduler(requestAnimationFrame)
    *
    * // Schedule batches some time in the future
    * notifyManager.setScheduler((cb) => setTimeout(cb, 10))
    * ```
    */
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (typeof window !== "undefined" && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
    };
  }
  onSubscribe() {
    if (!this.#cleanup) this.setEventListener(this.#setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the online state. The provided `setup` function
  * receives a `setOnline` callback that should be called with a `boolean`
  * whenever the online state changes.
  *
  * @example
  * ```ts
  * import NetInfo from '@react-native-community/netinfo'
  * import { onlineManager } from '@tanstack/query-core'
  *
  * onlineManager.setEventListener((setOnline) => {
  *   return NetInfo.addEventListener((state) => {
  *     setOnline(!!state.isConnected)
  *   })
  * })
  * ```
  */
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  /**
  * `setOnline` can be used to manually set the online state.
  *
  * @example
  * ```ts
  * import { onlineManager } from '@tanstack/query-core'
  *
  * // Set to online
  * onlineManager.setOnline(true)
  *
  * // Set to offline
  * onlineManager.setOnline(false)
  * ```
  */
  setOnline(online) {
    if (this.#online !== online) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  /**
  * `isOnline` can be used to get the current online state.
  */
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

// node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  let status = "pending";
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((resolve2, reject2) => {
    promiseResolve = resolve2;
    promiseReject = reject2;
  });
  promise.catch(noop);
  const isResolved = () => status !== "pending";
  const cancel = (cancelOptions) => {
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      config.onCancel?.(error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn?.();
      status = "resolved";
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn?.();
      status = "rejected";
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved() || canContinue()) continueResolve(value);
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved()) config.onContinue?.();
    });
  };
  const run = () => {
    if (isResolved()) return;
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved()) return;
      const retry = config.retry ?? (isServer2() ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) reject(error);
        else run();
      });
    });
  };
  return {
    promise,
    status: () => status,
    cancel,
    continue: () => {
      continueFn?.();
      return promise;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) run();
      else pause().then(run);
      return promise;
    }
  };
}

// node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
  #gcTimeout;
  /**
  * Clears the pending garbage collection timeout, so the entry is no longer scheduled for removal.
  * A subclass may override this to release what it holds on to as well — `Query` also cancels any
  * in-flight fetch.
  */
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime);
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (isServer2() ? Infinity : 3e5));
  }
  clearGcTimeout() {
    if (this.#gcTimeout !== void 0) {
      timeoutManager.clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

// node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return { onFetch: (context, query) => {
    const options = context.options;
    const direction = context.fetchOptions?.meta?.fetchMore?.direction;
    const oldPages = context.state.data?.pages || [];
    const oldPageParams = context.state.data?.pageParams || [];
    let result = {
      pages: [],
      pageParams: []
    };
    let currentPage = 0;
    const fetchFn = async () => {
      let cancelled = false;
      const addSignalProperty = (object) => {
        addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
      };
      const queryFn = ensureQueryFn(context.options, context.fetchOptions);
      const fetchPage = async (data, param, previous) => {
        if (cancelled) return Promise.reject(context.signal.reason);
        if (param == null && data.pages.length) return Promise.resolve(data);
        const createQueryFnContext = () => {
          const queryFnContext2 = {
            client: context.client,
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext2);
          return queryFnContext2;
        };
        const queryFnContext = createQueryFnContext();
        const page = await queryFn(queryFnContext);
        const { maxPages } = context.options;
        const addTo = previous ? addToStart : addToEnd;
        return {
          pages: addTo(data.pages, page, maxPages),
          pageParams: addTo(data.pageParams, param, maxPages)
        };
      };
      if (direction && oldPages.length) {
        const previous = direction === "backward";
        const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
        const oldData = {
          pages: oldPages,
          pageParams: oldPageParams
        };
        result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
      } else {
        const remainingPages = pages ?? oldPages.length;
        do {
          const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
          if (currentPage > 0 && param == null) break;
          result = await fetchPage(result, param);
          currentPage++;
        } while (currentPage < remainingPages);
      }
      return result;
    };
    if (context.options.persister) context.fetchFn = () => {
      return context.options.persister?.(fetchFn, {
        client: context.client,
        queryKey: context.queryKey,
        meta: context.options.meta,
        signal: context.signal
      }, query);
    };
    else context.fetchFn = fetchFn;
  } };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}

// node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
  #queryType;
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  /**
  * The `meta` object passed in the query's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  get queryType() {
    return this.#queryType;
  }
  /**
  * The promise for the currently in-flight fetch, if the query is fetching.
  * `undefined` when the query is not fetching.
  */
  get promise() {
    return this.#retryer?.promise;
  }
  /** @internal */
  setOptions(options) {
    this.options = {
      ...this.#defaultOptions,
      ...options
    };
    if (options?._type) this.#queryType = options._type;
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState(this.options);
      if (defaultState.data !== void 0) {
        this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
        this.#initialState = defaultState;
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
  }
  /** @internal */
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  /**
  * Merges the given partial state directly into this query's state, notifying observers. Used
  * by persistence and broadcast plugins to restore a state snapshot, and by devtools to let a
  * user manually trigger a loading/error state or edit the cached data.
  */
  setState(state) {
    this.#dispatch({
      type: "setState",
      state
    });
  }
  /**
  * Cancels the query's currently in-flight fetch, if any.
  * - Returns a promise that resolves once the cancellation has settled.
  * - If no fetch is in progress, resolves immediately.
  *
  * @example
  * ```ts
  * await query.cancel()
  * ```
  */
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  /**
  * Clears the query's garbage collection timeout and silently cancels any
  * in-flight fetch. Called by `QueryCache` when the query is removed from
  * the cache.
  *
  * @see {@link Query#cancel}
  */
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  /** @internal */
  get resetState() {
    return this.#initialState;
  }
  /**
  * Resets the query back to its initial state (the state it had when it was
  * first created, e.g. any `initialData`), destroying it first to cancel any
  * in-flight fetch.
  */
  reset() {
    this.destroy();
    this.setState(this.resetState);
  }
  /**
  * Returns `true` if the query has at least one observer for which `enabled`
  * does not resolve to `false`.
  */
  isActive() {
    return this.observers.some((observer) => resolveQueryValue(observer.options.enabled, this) !== false);
  }
  /**
  * Returns `true` if the query is disabled, meaning it will not fetch
  * automatically.
  * - If the query has observers, it is disabled when none of them are active
  *   (see `isActive`).
  * - If the query has no observers, it is disabled when its `queryFn` is
  *   `skipToken` or it has never been fetched.
  */
  isDisabled() {
    if (this.getObserversCount() > 0) return !this.isActive();
    return this.options.queryFn === skipToken || !this.isFetched();
  }
  /**
  * Returns `true` if the query has been fetched, i.e. it has resolved with
  * either data or an error at least once.
  */
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  /**
  * Returns `true` if the query has at least one observer configured with
  * `staleTime: 'static'`, meaning it is treated as never stale.
  */
  isStatic() {
    if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveQueryValue(observer.options.staleTime, this) === "static");
    return false;
  }
  /**
  * Returns `true` if the query is stale.
  * - If the query has observers, defers to whether any observer's current
  *   result reports `isStale` (which accounts for each observer's own
  *   `staleTime` and `enabled` state).
  * - If the query has no observers, it is considered stale when it has no
  *   data or has been invalidated.
  *
  * @see {@link Query#isStaleByTime}
  * @example
  * ```ts
  * if (query.isStale()) {
  *   // refetch or otherwise treat the cached data as outdated
  * }
  * ```
  */
  isStale() {
    if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  /**
  * Returns `true` if the query's data is stale relative to the given
  * `staleTime` (defaults to `0`).
  * - A query with no data is always stale.
  * - `staleTime: 'static'` is never stale.
  * - An invalidated query is always stale.
  * - Otherwise, staleness is based on elapsed time since `dataUpdatedAt`.
  *
  * @see {@link Query#isStale}
  * @example
  * ```ts
  * const isStale = query.isStaleByTime(1000 * 60)
  * ```
  */
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) return true;
    if (staleTime === "static") return false;
    if (this.state.isInvalidated) return true;
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  /** @internal */
  onFocus() {
    this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  /** @internal */
  onOnline() {
    this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  /** @internal */
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }
  /** @internal */
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed || this.state.fetchStatus === "paused" && this.state.status === "pending") this.#retryer.cancel({ revert: true });
          else this.#retryer.cancelRetry();
        }
        this.scheduleGc();
      }
      this.#cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }
  /**
  * Returns the number of observers currently subscribed to this query.
  *
  * @example
  * ```ts
  * if (query.getObserversCount() === 0) {
  *   // no component is currently watching this query
  * }
  * ```
  */
  getObserversCount() {
    return this.observers.length;
  }
  /**
  * Marks the query as invalidated, unless it is already invalidated. This
  * updates `state.isInvalidated` and notifies observers, but does not by
  * itself trigger a refetch.
  *
  * @example
  * ```ts
  * query.invalidate()
  * ```
  */
  invalidate() {
    if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
  }
  /**
  * Fetches the query, i.e. runs its `queryFn` (through any configured
  * retryer/behavior) and updates the query's state with the result.
  * - If a fetch is already in flight, returns its promise instead of
  *   starting a new one, unless `fetchOptions.cancelRefetch` is set and the
  *   query already has data, in which case the current fetch is silently
  *   cancelled first.
  * - If `options` is passed, it replaces the query's current options
  *   before fetching.
  */
  async fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
      else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) this.setOptions(options);
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) this.setOptions(observer.options);
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) console.error(`As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`);
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: this.#client,
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      this.#abortSignalConsumed = false;
      if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#client,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    (this.#queryType === "infinite" ? infiniteQueryBehavior(this.options.pages) : this.options.behavior)?.onFetch(context, this);
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
      type: "fetch",
      meta: context.fetchOptions?.meta
    });
    const retryer = this.#retryer = createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) this.setState({
          ...this.#revertState,
          fetchStatus: "idle"
        });
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    try {
      const data = await retryer.start();
      if (data === void 0) {
        if (true) console.error(`Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`);
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      this.#cache.config.onSuccess?.(data, this);
      this.#cache.config.onSettled?.(data, this.state.error, this);
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) return this.#retryer.promise;
        else if (error.revert) {
          if (this.state.data === void 0) throw error;
          return this.state.data;
        }
      }
      this.#dispatch({
        type: "error",
        error
      });
      this.#cache.config.onError?.(error, this);
      this.#cache.config.onSettled?.(this.state.data, error, this);
      throw error;
    } finally {
      if (this.#retryer === retryer) this.#retryer = void 0;
      this.scheduleGc();
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          const newState = {
            ...state,
            ...successState(action.data, action.dataUpdatedAt),
            dataUpdateCount: state.dataUpdateCount + 1,
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          this.#revertState = action.manual ? newState : void 0;
          return newState;
        case "error":
          const error = action.error;
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: true
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.slice().forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({
        query: this,
        type: "updated",
        action
      });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function successState(data, dataUpdatedAt) {
  return {
    data,
    dataUpdatedAt: dataUpdatedAt ?? Date.now(),
    error: null,
    isInvalidated: false,
    status: "success"
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// node_modules/@tanstack/query-core/build/modern/queryObserver.js
var QueryObserver = class extends Subscribable {
  #client;
  #currentQuery = void 0;
  #currentQueryInitialState = void 0;
  #currentResult = void 0;
  #currentResultState;
  #currentResultOptions;
  #selectError;
  #selectFn;
  #selectResult;
  #lastQueryWithDefinedData;
  #staleTimeoutId;
  #refetchIntervalId;
  #currentRefetchInterval;
  #trackedProps = /* @__PURE__ */ new Set();
  constructor(client, options) {
    super();
    this.options = options;
    this.#client = client;
    this.#selectError = null;
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.#currentQuery, this.options)) this.#executeFetch();
      else this.updateResult();
      this.#updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) this.destroy();
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnReconnect` option) to refetch when the network
  * reconnects.
  */
  shouldFetchOnReconnect() {
    return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnWindowFocus` option) to refetch when the window
  * regains focus.
  */
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
  }
  /**
  * Stops observing the current query: clears all listeners, cancels the
  * stale and refetch-interval timers, and removes this observer from the
  * query it was observing.
  */
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#clearStaleTimeout();
    this.#clearRefetchInterval();
    this.#currentQuery.removeObserver(this);
  }
  /**
  * Updates the observer's options. This will re-resolve the query being
  * observed (switching to a different query if the `queryKey` changed),
  * trigger a fetch if the new options require one and the observer has
  * subscribers, recompute the current result, and reschedule the stale and
  * refetch-interval timers as needed.
  *
  * @example
  * ```ts
  * observer.setOptions({ queryKey: ['posts', 1], queryFn: () => fetchPost(1) })
  * // later: switch to a different query, reusing the same observer
  * observer.setOptions({ queryKey: ['posts', 2], queryFn: () => fetchPost(2) })
  * ```
  */
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = this.#currentQuery;
    this.options = this.#client.defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveQueryValue(this.options.enabled, this.#currentQuery) !== "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
    this.#updateQuery();
    this.#currentQuery.setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) this.#client.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#currentQuery,
      observer: this
    });
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) this.#executeFetch();
    this.updateResult();
    if (mounted && (this.#currentQuery !== prevQuery || resolveQueryValue(this.options.enabled, this.#currentQuery) !== resolveQueryValue(prevOptions.enabled, this.#currentQuery) || resolveQueryValue(this.options.staleTime, this.#currentQuery) !== resolveQueryValue(prevOptions.staleTime, this.#currentQuery))) this.#updateStaleTimeout();
    const nextRefetchInterval = this.#computeRefetchInterval();
    if (mounted && (this.#currentQuery !== prevQuery || resolveQueryValue(this.options.enabled, this.#currentQuery) !== resolveQueryValue(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) this.#updateRefetchInterval(nextRefetchInterval);
  }
  /**
  * Computes the result the observer would produce for the given (already-defaulted) options
  * right now, building the underlying `Query` if it doesn't exist yet, without waiting for a
  * subscription callback. Called by framework adapters on every render (e.g. `useQuery`) so the
  * returned value is available synchronously, ahead of `setOptions` triggering an actual fetch.
  */
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options);
    const result = this.createResult(query, options);
    if (!shallowEqualObjects(this.getCurrentResult(), result)) {
      this.#currentResult = result;
      this.#currentResultOptions = this.options;
      this.#currentResultState = this.#currentQuery.state;
    }
    return result;
  }
  /**
  * Returns the most recently computed `QueryObserverResult` for the
  * observed query. This is a point-in-time read; to be notified of updates
  * as they happen, subscribe to the observer instead (its inherited
  * `subscribe` method).
  *
  * @example
  * ```ts
  * const result = observer.getCurrentResult()
  * console.log(result.status, result.data)
  * ```
  */
  getCurrentResult() {
    return this.#currentResult;
  }
  /**
  * Wraps a `QueryObserverResult` in a `Proxy` that records which properties are read, via
  * {@link QueryObserver#trackProp} (and an optional `onPropTracked` callback). Used by framework
  * adapters when `notifyOnChangeProps` is not set, to implement its default "only re-render on
  * properties you actually read" behavior.
  */
  trackResult(result, onPropTracked) {
    return new Proxy(result, { get: (target, key) => {
      this.trackProp(key);
      onPropTracked?.(key);
      return Reflect.get(target, key);
    } });
  }
  /**
  * Records that the given `QueryObserverResult` property was read, so a subsequent update only
  * notifies this observer if a tracked property actually changed. Normally called indirectly via
  * {@link QueryObserver#trackResult}'s proxy; exposed directly for adapters that track property
  * access themselves (e.g. through their own reactivity system) instead of via the proxy.
  */
  trackProp(key) {
    this.#trackedProps.add(key);
  }
  /**
  * Returns the `Query` instance this observer is currently observing.
  */
  getCurrentQuery() {
    return this.#currentQuery;
  }
  /**
  * Refetches the observed query and returns a promise that resolves with
  * the resulting `QueryObserverResult`.
  *
  * @example
  * ```ts
  * const result = await observer.refetch({ cancelRefetch: false })
  * console.log(result.data)
  * ```
  */
  refetch({ ...options } = {}) {
    return this.fetch({ ...options });
  }
  /**
  * Fetches a query defined by the given options without affecting this
  * observer's own tracked query or result, and returns a promise that
  * resolves with the `QueryObserverResult` for that fetch. This is useful
  * for prefetching data that another observer (e.g. a query about to be
  * navigated to) will need, ahead of time.
  *
  * @example
  * ```ts
  * const result = await observer.fetchOptimistic({
  *   queryKey: ['posts', 2],
  *   queryFn: () => fetchPost(2),
  * })
  * console.log(result.data)
  * ```
  */
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options);
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
    let unsubscribe = () => {
    };
    let resolveEarly;
    const cachePromise = new Promise((resolve) => {
      resolveEarly = resolve;
      unsubscribe = this.#client.getQueryCache().subscribe((event) => {
        if (event.type === "updated" && event.query.queryHash === query.queryHash && query.state.data !== void 0) {
          unsubscribe();
          resolve(this.createResult(query, defaultedOptions));
        }
      });
    });
    return Promise.race([query.fetch().then(() => {
      const result = this.createResult(query, defaultedOptions);
      resolveEarly?.(result);
      return result;
    }).finally(() => {
      unsubscribe();
    }), cachePromise]);
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery();
    let promise = this.#currentQuery.fetch(this.options, fetchOptions);
    if (!fetchOptions?.throwOnError) promise = promise.catch(noop);
    return promise;
  }
  #shouldScheduleTimer(timeout) {
    return !isServer2() && resolveQueryValue(this.options.enabled, this.#currentQuery) !== false && isValidTimeout(timeout);
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout();
    const staleTime = resolveQueryValue(this.options.staleTime, this.#currentQuery);
    if (this.#currentResult.isStale || !this.#shouldScheduleTimer(staleTime)) return;
    const timeout = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime) + 1;
    this.#staleTimeoutId = timeoutManager.setTimeout(() => {
      if (!this.#currentResult.isStale) this.updateResult();
    }, timeout);
  }
  #computeRefetchInterval() {
    return resolveQueryValue(this.options.refetchInterval, this.#currentQuery) ?? false;
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval();
    this.#currentRefetchInterval = nextInterval;
    if (this.#currentRefetchInterval === 0 || !this.#shouldScheduleTimer(this.#currentRefetchInterval)) return;
    this.#refetchIntervalId = timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) this.#executeFetch();
    }, this.#currentRefetchInterval);
  }
  #updateTimers() {
    this.#updateStaleTimeout();
    this.#updateRefetchInterval(this.#computeRefetchInterval());
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId !== void 0) {
      timeoutManager.clearTimeout(this.#staleTimeoutId);
      this.#staleTimeoutId = void 0;
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId !== void 0) {
      timeoutManager.clearInterval(this.#refetchIntervalId);
      this.#refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery;
    const prevOptions = this.options;
    const prevResult = this.#currentResult;
    const prevResultState = this.#currentResultState;
    const prevResultOptions = this.#currentResultOptions;
    const queryInitialState = query !== prevQuery ? query.state : this.#currentQueryInitialState;
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) newState = {
        ...newState,
        ...fetchState(state.data, query.options)
      };
      if (options._optimisticResults === "isRestoring") newState.fetchStatus = "idle";
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(prevResult?.data, placeholderData, options);
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) data = this.#selectResult;
      else try {
        this.#selectFn = options.select;
        data = options.select(data);
        data = replaceData(prevResult?.data, data, options);
        this.#selectResult = data;
        this.#selectError = null;
      } catch (selectError) {
        this.#selectError = selectError;
      }
    } else if (data === void 0) this.#selectError = null;
    if (this.#selectError) {
      error = this.#selectError;
      data = this.#selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
      isPlaceholderData = false;
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    return {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      isEnabled: resolveQueryValue(options.enabled, query) !== false
    };
  }
  /**
  * Recomputes and stores the current result from the current query/options, notifying listeners
  * if it changed. Framework adapters call this right after subscribing to make sure no query
  * update was missed in the gap between creating the observer and subscribing to it.
  */
  updateResult() {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery, this.options);
    this.#currentResultState = this.#currentQuery.state;
    this.#currentResultOptions = this.options;
    if (this.#currentResultState.data !== void 0) this.#lastQueryWithDefinedData = this.#currentQuery;
    if (shallowEqualObjects(nextResult, prevResult)) return;
    this.#currentResult = nextResult;
    const shouldNotifyListeners = () => {
      if (!prevResult) return true;
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) return true;
      const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
      if (this.options.throwOnError) includedProps.add("error");
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key;
        return this.#currentResult[typedKey] !== prevResult[typedKey] && includedProps.has(typedKey);
      });
    };
    const notifyListeners = shouldNotifyListeners();
    notifyManager.batch(() => {
      if (notifyListeners) this.listeners.forEach((listener) => {
        listener(this.#currentResult);
      });
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated"
      });
    });
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options);
    if (query === this.#currentQuery) return;
    const prevQuery = this.#currentQuery;
    this.#currentQuery = query;
    this.#currentQueryInitialState = query.state;
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }
  /** @internal */
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) this.#updateTimers();
  }
};
function shouldLoadOnMount(query, options) {
  return resolveQueryValue(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && resolveQueryValue(options.retryOnMount, query) === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveQueryValue(options.enabled, query) !== false && resolveQueryValue(options.staleTime, query) !== "static") {
    const value = resolveQueryValue(field, query);
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveQueryValue(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveQueryValue(options.enabled, query) !== false && query.isStaleByTime(resolveQueryValue(options.staleTime, query));
}

// node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
  #client;
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.#client = config.client;
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  /** @internal */
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  /**
  * The `meta` object passed in the mutation's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  /** @internal */
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") this.scheduleGc();
      else this.#mutationCache.remove(this);
    }
  }
  /**
  * Resumes a mutation that is currently paused or was restored from a
  * dehydrated, still-`pending` state.
  *
  * - If this mutation has an active retryer (it paused mid-attempt, e.g. due
  *   to the network mode or scope-based queuing), its retryer is resumed.
  * - Otherwise, if the mutation's status is still `pending` (e.g. it was
  *   dehydrated while an attempt was in flight and never got a retryer in
  *   this instance), `execute` is called again with the last known variables.
  * - Otherwise the mutation has already settled and this resolves immediately
  *   without running anything again.
  *
  * @example
  * ```ts
  * // typically driven by reconnect handling, e.g. queryClient.resumePausedMutations()
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * await mutation?.continue()
  * ```
  *
  * @see {@link Mutation#execute}
  */
  continue() {
    return this.#retryer?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
  }
  /**
  * Runs the mutation function for the given variables through a retryer, and
  * drives the mutation's state and lifecycle callbacks through to settlement.
  *
  * If this mutation's state is already `pending` when `execute` is called
  * (i.e. it was restored, still in-flight, from a dehydrated state), the
  * `onMutate` step is skipped and a `continue` action is dispatched to
  * unpause it; otherwise a `pending` action is dispatched first, then the
  * mutation cache's `onMutate` and the mutation's own `onMutate` option are
  * awaited in that order, and the resulting context is stored.
  *
  * The mutation function is then run (subject to `retry`/`retryDelay`/
  * `networkMode`, and to the mutation cache's scope-based serialization).
  * On success, the cache's `onSuccess`/`onSettled` callbacks run before the
  * mutation's own `onSuccess`/`onSettled` options, a `success` action is
  * dispatched, and the resolved data is returned. On failure, the same
  * cache-then-option ordering is used for `onError`/`onSettled`, but each of
  * those four callbacks is individually caught so that a throwing callback
  * cannot mask the original error; an `error` action is then dispatched and
  * the original error is re-thrown.
  *
  * @example
  * ```ts
  * // Called internally by `MutationObserver.mutate` and `Mutation.continue` —
  * // applications normally trigger mutations through those, not this method.
  * const data = await mutation.execute(variables)
  * ```
  *
  * @see {@link Mutation#continue}
  */
  async execute(variables) {
    const onContinue = () => {
      this.#dispatch({ type: "continue" });
    };
    const mutationFnContext = {
      client: this.#client,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    const retryer = this.#retryer = createRetryer({
      fn: () => {
        if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !retryer.canStart();
    try {
      if (restored) onContinue();
      else {
        this.#dispatch({
          type: "pending",
          variables,
          isPaused
        });
        if (this.#mutationCache.config.onMutate) await this.#mutationCache.config.onMutate(variables, this, mutationFnContext);
        const context = await this.options.onMutate?.(variables, mutationFnContext);
        if (context !== this.state.context) this.#dispatch({
          type: "pending",
          context,
          variables,
          isPaused
        });
      }
      const data = await retryer.start();
      await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
      await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
      await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
      await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
      this.#dispatch({
        type: "success",
        data
      });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      try {
        await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
      } catch (e) {
        Promise.reject(e);
      }
      this.#dispatch({
        type: "error",
        error
      });
      throw error;
    } finally {
      if (this.#retryer === retryer) this.#retryer = void 0;
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// node_modules/@tanstack/query-core/build/modern/mutationCache.js
var MutationCache = class extends Subscribable {
  #mutations;
  #scopes;
  #mutationId;
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  /** @internal */
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  /** @internal */
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) scopedMutations.push(mutation);
      else this.#scopes.set(scope, [mutation]);
    }
    this.notify({
      type: "added",
      mutation
    });
  }
  /** @internal */
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) scopedMutations.splice(index, 1);
          } else if (scopedMutations[0] === mutation) this.#scopes.delete(scope);
        }
      }
    }
    this.notify({
      type: "removed",
      mutation
    });
  }
  /** @internal */
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const firstPendingMutation = this.#scopes.get(scope)?.find((m) => m.state.status === "pending");
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else return true;
  }
  /** @internal */
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") return this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused)?.continue() ?? Promise.resolve();
    else return Promise.resolve();
  }
  /**
  * Removes all mutations from the cache.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * mutationCache.clear()
  * ```
  */
  clear() {
    notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({
          type: "removed",
          mutation
        });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  /**
  * Returns all mutations within the cache.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.getAll()
  * ```
  */
  getAll() {
    return Array.from(this.#mutations);
  }
  /**
  * A slightly more advanced method that can be used to get an existing mutation instance from
  * the cache. If the mutation does not exist, `undefined` is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @see {@link MutationCache#findAll}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * ```
  */
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters
    };
    return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
  }
  /**
  * An even more advanced method that can be used to get existing mutation instances from the
  * cache that match the given filters. If no mutations match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about mutations in rare scenarios.
  *
  * @see {@link MutationCache#find}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.findAll({ mutationKey: ['addPost'] })
  * ```
  */
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  /** @internal */
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  /** @internal */
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

// node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache = class extends Subscribable {
  #queries;
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  /**
  * Returns the existing `Query` instance for the given options' `queryKey`/`queryHash`, or
  * builds and adds a new one to the cache if none exists yet. Used by framework adapters and
  * plugins (e.g. broadcast/persistence) that need to get-or-create a `Query` directly, bypassing
  * the reactive `QueryObserver` machinery.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.build(queryClient, {
  *   queryKey: ['posts'],
  *   queryFn: fetchPosts,
  * })
  * ```
  */
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  /** @internal */
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  /**
  * Destroys the given `Query` and removes it from the cache, notifying subscribers with a
  * `'removed'` event. A no-op if the query is no longer the one currently stored under its hash
  * (e.g. it was already replaced). Used by plugins (e.g. the broadcast client) that mirror
  * removals across `QueryCache` instances.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const query = queryCache.find({ queryKey: ['posts'] })
  *
  * if (query) {
  *   queryCache.remove(query)
  * }
  * ```
  */
  remove(query) {
    if (this.#queries.get(query.queryHash) === query) {
      query.destroy();
      this.#queries.delete(query.queryHash);
      this.notify({
        type: "removed",
        query
      });
    }
  }
  /**
  * Removes all queries from the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * queryCache.clear()
  * ```
  */
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  /**
  * Returns the `Query` instance stored under the given `queryHash`, or `undefined` if none
  * exists. Unlike {@link QueryCache#find}, this looks up by the already-computed hash rather
  * than by `QueryFilters`. Used by plugins (e.g. broadcast/hydration) that already have a hash
  * to look up directly.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const queryHash = hashKey(['posts'])
  *
  * const query = queryCache.get(queryHash)
  * ```
  */
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  /**
  * Returns all queries within the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.getAll()
  * ```
  */
  getAll() {
    return [...this.#queries.values()];
  }
  /**
  * A slightly more advanced method that can be used to get an existing query instance from the
  * cache. This instance not only contains all the state for the query, but all of the instances,
  * and underlying guts of the query as well. If the query does not exist, `undefined` is
  * returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a query in rare scenarios (e.g. looking at `query.state.dataUpdatedAt` to
  * decide whether a query is fresh enough to be used as an initial value).
  *
  * @see {@link QueryCache#findAll}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.find({ queryKey: ['posts'] })
  * ```
  */
  find(filters) {
    const defaultedFilters = {
      exact: true,
      ...filters
    };
    return this.getAll().find((query) => matchQuery(defaultedFilters, query));
  }
  /**
  * An even more advanced method that can be used to get existing query instances from the cache
  * that partially match a query key. If no queries match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about queries in rare scenarios.
  *
  * @see {@link QueryCache#find}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  /** @internal */
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  /** @internal */
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  /** @internal */
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new QueryCache();
    this.#mutationCache = config.mutationCache || new MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  /**
  * Called by a framework adapter's `QueryClientProvider`-equivalent when it mounts, to start
  * listening for focus/online events and resume paused mutations. Ref-counted via an internal
  * mount count, so nested or multiple providers sharing the same `QueryClient` don't tear down
  * the shared listeners until the last one unmounts.
  */
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1) return;
    this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  /**
  * The inverse of {@link QueryClient#mount} — called by a framework adapter's
  * `QueryClientProvider`-equivalent when it unmounts. Only tears down the focus/online
  * listeners once the mount count returns to `0`.
  */
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0) return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  /**
  * Returns the number of queries in the cache that are currently fetching, optionally
  * matching a set of filters. This includes background-fetching, loading new pages, and
  * loading more infinite query results.
  *
  * @example
  * ```ts
  * if (queryClient.isFetching()) {
  *   console.log('At least one query is fetching!')
  * }
  * ```
  */
  isFetching(filters) {
    return this.#queryCache.findAll({
      ...filters,
      fetchStatus: "fetching"
    }).length;
  }
  /**
  * Returns the number of mutations in the cache that are currently pending, optionally
  * matching a set of filters.
  *
  * @example
  * ```ts
  * if (queryClient.isMutating()) {
  *   console.log('At least one mutation is pending!')
  * }
  * ```
  */
  isMutating(filters) {
    return this.#mutationCache.findAll({
      ...filters,
      status: "pending"
    }).length;
  }
  /**
  * Imperative (non-reactive) way to retrieve data for a QueryKey.
  * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
  *
  * Hint: Do not use this function inside a component, because it won't receive updates.
  * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
  *
  * @returns The cached data for the query, or `undefined` if no query with this key has been observed yet.
  * @see {@link QueryClient#getQueriesData}
  */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  /**
  * @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) return this.fetchQuery(options);
    if (options.revalidateIfStale && query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
    return Promise.resolve(cachedData);
  }
  /**
  * Imperative (non-reactive) way to retrieve the cached data of multiple queries at once.
  * Only queries matching the given filters are returned; if none match, an empty array is
  * returned.
  *
  * Because the matched queries can hold data of different shapes (e.g. a broad filter can match
  * queries with unrelated data types), the `TQueryFnData` generic defaults to `unknown` rather
  * than being inferred. Passing a more specific type is a convenience for call sites that know
  * every matched query holds the same shape — it is not checked against the actual cache
  * contents.
  *
  * @returns An array of query key and data pairs. The data is `undefined` for a query with no cached data.
  * @see {@link QueryClient#getQueryData}
  * @example
  * ```ts
  * const data = queryClient.getQueriesData({ queryKey: ['posts'] })
  * ```
  */
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      return [queryKey, state.data];
    });
  }
  /**
  * Synchronous way to immediately update a query's cached data. If the updater (or the value
  * passed) resolves to `undefined`, the cache is left untouched and no query is created;
  * otherwise, if the query does not exist yet, it will be created. To update multiple queries
  * at once by partially matching query keys, use {@link QueryClient#setQueriesData} instead.
  *
  * Updates must be performed immutably: do not mutate `oldData`, or data previously retrieved
  * via {@link QueryClient#getQueryData}, in place.
  *
  * @param queryKey - The query key to set data for.
  * @param updater - Either the new data, or a function that receives the current data (which
  * may be `undefined`) and returns the new data.
  * @param options - Set `updatedAt` to override the timestamp the written data is recorded with.
  * @returns The data that was written, or `undefined` if the updater returned `undefined` — in that case
  * the write is skipped and the cache is left unchanged.
  *
  * @example
  * ```ts
  * queryClient.setQueryData(['posts'], newPosts)
  *
  * // Or, using an updater function that receives the current data:
  * queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
  * ```
  */
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) return;
    return this.#queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true
    });
  }
  /**
  * Synchronous way to immediately update the cached data of multiple queries at once, using
  * filters or partial query key matching. Only queries that already exist and match the given
  * filters are updated; no new cache entries are created. Internally this calls
  * {@link QueryClient#setQueryData} for each matching query.
  *
  * @returns One `[queryKey, data]` tuple per matched query, in the same shape and with the same
  * `undefined` case as {@link QueryClient#setQueryData}.
  * @example
  * ```ts
  * queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) =>
  *   oldPosts ? oldPosts.filter((post) => post.id !== deletedId) : oldPosts,
  * )
  * ```
  */
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }
  /**
  * Imperative (non-reactive) way to retrieve an existing query's state. If the query does not
  * exist, `undefined` is returned.
  *
  * @example
  * ```ts
  * const state = queryClient.getQueryState(['posts'])
  * console.log(state?.dataUpdatedAt)
  * ```
  */
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state;
  }
  /**
  * Removes queries from the cache that match the given filters. Unlike
  * {@link QueryClient#invalidateQueries} or {@link QueryClient#refetchQueries}, this removes
  * matching queries from the cache instead of refetching them. Without filters, every query in
  * the cache is removed.
  *
  * @example
  * ```ts
  * queryClient.removeQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  /**
  * Resets queries matching the given filters back to their initial state (e.g. any
  * `initialData`), notifying subscribers rather than removing them. Active queries among the
  * matched set are then refetched, and the returned promise resolves once that refetch settles.
  *
  * @example
  * ```ts
  * await queryClient.resetQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    return notifyManager.batch(() => {
      const matched = queryCache.findAll(filters);
      const queriesToRefetch = new Set(matched);
      matched.forEach((query) => {
        query.reset();
      });
      return this.refetchQueries({
        type: "active",
        predicate: (query) => queriesToRefetch.has(query)
      }, options);
    });
  }
  /**
  * Cancels outgoing fetches for queries matching the given filters. Most useful when performing
  * optimistic updates, since any outgoing refetch that resolves afterwards would otherwise
  * overwrite the optimistic update. By default (`revert: true`), a cancelled query's data is
  * reverted to its state before the outgoing fetch started.
  *
  * The returned promise never rejects, even if individual cancellations fail.
  *
  * @example
  * ```ts
  * await queryClient.cancelQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = {
      revert: true,
      ...cancelOptions
    };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  /**
  * Marks queries matching the given filters as invalidated. Unlike
  * {@link QueryClient#removeQueries}, invalidated queries stay in the cache.
  *
  * Unless `filters.refetchType` is `'none'`, matching queries are then refetched via
  * {@link QueryClient#refetchQueries}, using `filters.refetchType` if set, otherwise
  * `filters.type`, otherwise `'active'`.
  *
  * @example
  * ```ts
  * await queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'active' })
  * ```
  */
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") return Promise.resolve();
      return this.refetchQueries({
        ...filters,
        type: filters?.refetchType ?? filters?.type ?? "active"
      }, options);
    });
  }
  /**
  * Refetches queries matching the given filters, regardless of whether they are stale. Without
  * filters, every query in the cache is refetched. Queries that are disabled, or static (only
  * have observers with a static `staleTime`), are never refetched.
  *
  * By default (`cancelRefetch: true`), a currently running fetch is cancelled before the new
  * one starts. The returned promise resolves once all matching queries have settled; it does
  * not reject on individual query failures unless `throwOnError` is set.
  *
  * @example
  * ```ts
  * // refetch all active queries partially matching a query key:
  * await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
  * ```
  */
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
      let promise = query.fetch(void 0, fetchOptions);
      if (!fetchOptions.throwOnError) promise = promise.catch(noop);
      return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
    }));
    return Promise.all(promises).then(noop);
  }
  /**
  * Asynchronous method to fetch and cache a query, resolving with the data or throwing with
  * the error.
  *
  * If the query already exists in the cache and its data is not stale (per the given
  * `staleTime`), the cached data is returned without fetching. Otherwise, the query is fetched
  * and the promise resolves once the fetch settles. If a `select` function is provided, it is
  * applied to the data in both cases (cached or freshly fetched) before it is returned.
  *
  * Unlike a reactive observer, retries are disabled by default here (`retry: false`) unless
  * explicitly configured, since there is no component to catch a thrown error and retry through
  * re-render.
  *
  * The accepted options are `QueryObserverOptions` minus the fields that only make sense for a
  * reactive observer — `enabled`, `refetchInterval`, `refetchIntervalInBackground`,
  * `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `retryOnMount`,
  * `notifyOnChangeProps`, `throwOnError`, `suspense`, and `placeholderData` are not part of this
  * method's options.
  *
  * This method replaces the deprecated `fetchQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.query({ queryKey, queryFn, staleTime: 10000 })
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  async query(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
    const query = this.#queryCache.build(this, defaultedOptions);
    const queryData = query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? await query.fetch(defaultedOptions) : query.state.data;
    const select = defaultedOptions.select;
    if (select) return select(queryData);
    return queryData;
  }
  /**
  * @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
  */
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(resolveQueryValue(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  /**
  * @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  /**
  * Asynchronous method to fetch and cache an infinite query, resolving with an
  * {@link InfiniteData} object or throwing with the error.
  *
  * Behaves like {@link QueryClient#query}, accepting the same options (minus
  * `initialPageParam`), plus the required `initialPageParam`, and an optional `pages` /
  * `getNextPageParam` pair used to refetch a fixed number of pages from the start.
  *
  * This method replaces the deprecated `fetchInfiniteQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureInfiniteQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.infiniteQuery({ queryKey, queryFn, initialPageParam: 0 })
  *   console.log(data.pages)
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  infiniteQuery(options) {
    options._type = "infinite";
    return this.query(options);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
  */
  fetchInfiniteQuery(options) {
    options._type = "infinite";
    return this.fetchQuery(options);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureInfiniteQueryData(options) {
    options._type = "infinite";
    return this.ensureQueryData(options);
  }
  /**
  * Resumes mutations that were paused because there was no network connection. Does nothing
  * (resolving immediately) if the client is currently offline.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * await queryClient.resumePausedMutations()
  * ```
  */
  resumePausedMutations() {
    if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations();
    return Promise.resolve();
  }
  /**
  * Returns the query cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const queryCache = queryClient.getQueryCache()
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  getQueryCache() {
    return this.#queryCache;
  }
  /**
  * Returns the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const mutationCache = queryClient.getMutationCache()
  * const mutations = mutationCache.findAll({ status: 'pending' })
  * ```
  */
  getMutationCache() {
    return this.#mutationCache;
  }
  /**
  * Returns the default options that were set when creating the client, or via
  * {@link QueryClient#setDefaultOptions}.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const defaultOptions = queryClient.getDefaultOptions()
  * ```
  */
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  /**
  * Dynamically sets the default options for this client, overwriting any previously defined
  * default options.
  *
  * @see {@link QueryClient#getDefaultOptions}
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.setDefaultOptions({
  *   queries: {
  *     staleTime: Infinity,
  *   },
  * })
  * ```
  */
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  /**
  * Sets default options for queries whose query key partially matches the given `queryKey`.
  *
  * If several registered query defaults match a given query key, they are merged together in
  * registration order by {@link QueryClient#getQueryDefaults}, so register defaults from the
  * most generic key to the least generic one — more specific defaults should be registered
  * after more generic ones so they take precedence.
  *
  * @example
  * ```ts
  * queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })
  *
  * await queryClient.query({ queryKey: ['posts'] })
  * ```
  */
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  /**
  * Returns the default options registered for queries whose query key partially matches the
  * given `queryKey`, via {@link QueryClient#setQueryDefaults}. If multiple registered defaults
  * match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getQueryDefaults(['posts'])
  * ```
  */
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
    });
    return result;
  }
  /**
  * Sets default options for mutations whose mutation key partially matches the given
  * `mutationKey`. As with {@link QueryClient#setQueryDefaults}, the order of registration
  * matters when several registered defaults match the same mutation key.
  *
  * @see {@link QueryClient#getMutationDefaults}
  * @example
  * ```ts
  * queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })
  * ```
  */
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  /**
  * Returns the default options registered for mutations whose mutation key partially matches
  * the given `mutationKey`, via {@link QueryClient#setMutationDefaults}. If multiple registered
  * defaults match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getMutationDefaults(['addPost'])
  * ```
  */
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
    });
    return result;
  }
  /**
  * Called by framework adapters (e.g. inside `useQuery`) to resolve the options passed by the
  * caller into their final, defaulted form: merging `queryClient.setQueryDefaults` for the
  * given `queryKey`, then the client's own `defaultOptions.queries`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultQueryOptions(options) {
    if (options._defaulted) return options;
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
    if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
    return defaultedOptions;
  }
  /**
  * The mutation counterpart of {@link QueryClient#defaultQueryOptions}. Called by framework
  * adapters (e.g. inside `useMutation`) to merge `queryClient.setMutationDefaults` for the
  * given `mutationKey`, then the client's `defaultOptions.mutations`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultMutationOptions(options) {
    if (options?._defaulted) return options;
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  /**
  * Clears both the query cache and the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.clear()
  * ```
  */
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

// node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
import * as React2 from "react";
var IsRestoringContext = React2.createContext(false);
var useIsRestoring = () => React2.useContext(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;

// node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
import * as React3 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
function createValue() {
  let isReset = false;
  return {
    /**
    * Clears the reset state, so queries know not to try again until the boundary is reset again.
    */
    clearReset: () => {
      isReset = false;
    },
    /**
    * Resets any query errors within the boundary, so queries know they can try again.
    */
    reset: () => {
      isReset = true;
    },
    /**
    * Returns whether the boundary has been reset and not yet cleared.
    */
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = React3.createContext(createValue());
var useQueryErrorResetBoundary = () => React3.useContext(QueryErrorResetBoundaryContext);

// node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
import * as React4 from "react";
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || throwOnError) {
    if (!errorResetBoundary.isReset()) options.retryOnMount = false;
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  React4.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense }) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};

// node_modules/@tanstack/react-query/build/modern/suspense.js
var defaultThrowOnError = (_error, query) => query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
  }
};
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});

// node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
import * as React5 from "react";
function useBaseQuery(options, Observer, queryClient) {
  if (true) {
    if (typeof options !== "object" || Array.isArray(options)) throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
  }
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient(queryClient);
  const defaultedOptions = client.defaultQueryOptions(options);
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  if (true) {
    if (!defaultedOptions.queryFn) console.error(`[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`);
  }
  const subscribed = options.subscribed !== false;
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : subscribed ? "optimistic" : void 0;
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const [observer] = React5.useState(() => new Observer(client, defaultedOptions));
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && subscribed;
  React5.useSyncExternalStore(React5.useCallback((onStoreChange) => {
    const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
    observer.updateResult();
    return unsubscribe;
  }, [observer, shouldSubscribe]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
  React5.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) throw result.error;
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

// node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}

// node_modules/@tanstack/react-query/build/modern/useSuspenseQuery.js
function useSuspenseQuery(options, queryClient) {
  if (true) {
    if (options.queryFn === skipToken) console.error("skipToken is not allowed for useSuspenseQuery");
  }
  return useBaseQuery({
    ...options,
    enabled: true,
    suspense: true,
    throwOnError: defaultThrowOnError,
    placeholderData: void 0
  }, QueryObserver, queryClient);
}

// src/components/Input.tsx
import {
  useState as useState3
} from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import classNames2 from "classnames";

// src/components/FieldVariantContext.tsx
import { createContext as createContext4, useContext as useContext4 } from "react";
var FieldVariantContext = createContext4(null);
var useFieldVariant = (override) => {
  const fromContext = useContext4(FieldVariantContext);
  return override ?? fromContext ?? "plain";
};

// src/components/Input.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
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
  const [inputType, setInputType] = useState3(type);
  const errorId = error && typeof error === "string" ? `${name}-error` : void 0;
  const helperTextId = helperText ? `${name}-helper` : void 0;
  const describedByIds = [helperTextId, errorId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ jsxs4("div", { className: `flex flex-col ${className}`, children: [
    !!label && /* @__PURE__ */ jsx6(
      "label",
      {
        htmlFor: name,
        className: `${helperText ? "" : "mb-2"} ${resolvedVariant === "outlined" ? "text-left text-[15px] font-semibold leading-6 text-low-priority" : styles.label}`,
        children: label
      }
    ),
    !!helperText && /* @__PURE__ */ jsx6("span", { id: helperTextId, className: "mb-2 mt-1 text-low text-sm", children: helperText }),
    /* @__PURE__ */ jsx6(
      "div",
      {
        className: classNames2(styles.input, {
          "border-transparent": resolvedVariant === "plain" && !error,
          "border-grey-700t": resolvedVariant === "outlined" && !error,
          "border-red-300": !!error,
          "text-text-disabled": disabled
        }),
        children: /* @__PURE__ */ jsxs4("div", { className: "relative flex", children: [
          Icon ? /* @__PURE__ */ jsx6("div", { className: "absolute top-1/2 transform -translate-y-1/2 ml-3", children: /* @__PURE__ */ jsx6(
            Icon,
            {
              "aria-hidden": "true",
              className: classNames2("size-5", {
                "stroke-text-disabled": disabled
              })
            }
          ) }) : /* @__PURE__ */ jsx6(Fragment, {}),
          type !== "textarea" ? /* @__PURE__ */ jsx6(
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
          ) : /* @__PURE__ */ jsx6(
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
          type === "password" && /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              "aria-label": inputType === "password" ? "Show password" : "Hide password",
              "aria-controls": name,
              onPointerDown: (e) => e.preventDefault(),
              onClick: () => inputType === "password" ? setInputType("text") : setInputType("password"),
              className: "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer",
              children: inputType === "password" ? /* @__PURE__ */ jsx6(EyeIcon, { "aria-hidden": "true", className: "size-5" }) : /* @__PURE__ */ jsx6(EyeSlashIcon, { "aria-hidden": "true", className: "size-5" })
            }
          ),
          inlineButton && /* @__PURE__ */ jsx6(Button, { ...inlineButton }),
          loading && /* @__PURE__ */ jsx6(Loader, { className: "size-5 absolute top-1/2 right-4 -translate-y-1/2" }),
          IconEnd ? /* @__PURE__ */ jsx6("div", { className: "absolute top-1/2 transform right-0 -translate-y-1/2 mr-3", children: /* @__PURE__ */ jsx6(
            IconEnd,
            {
              className: classNames2("size-5", {
                "stroke-text-disabled": disabled
              })
            }
          ) }) : /* @__PURE__ */ jsx6(Fragment, {})
        ] })
      }
    ),
    error && typeof error === "string" && /* @__PURE__ */ jsxs4("div", { id: errorId, role: "alert", className: "flex space-x-1.5 items-start mt-2", children: [
      /* @__PURE__ */ jsx6(InformationCircleIcon, { "aria-hidden": "true", className: "shrink-0 size-4 text-red-300 mt-[3px]" }),
      /* @__PURE__ */ jsx6("span", { className: "text-body-smallest text-red-300", children: error })
    ] }),
    type === "textarea" && max && /* @__PURE__ */ jsx6("div", { className: "flex mt-2 items-center justify-end", children: /* @__PURE__ */ jsxs4("span", { className: "text-low-priority", children: [
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
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var dropdownTriggerStyles = "w-full bg-secondary border rounded-xs focus-within:outline-none transition-colors";
var dropdownPanelStyles = "z-50 mt-1 max-h-72 w-[var(--button-width)] origin-top overflow-y-auto rounded-xs border border-transparent bg-secondary p-1 outline-none transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0";
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
    !!label && /* @__PURE__ */ jsx7(
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
    !!helperText && /* @__PURE__ */ jsx7("span", { id: helperTextId, className: "mb-2 mt-1 text-low text-sm", children: helperText }),
    /* @__PURE__ */ jsxs5(
      Listbox,
      {
        as: "div",
        value,
        onChange: (v) => onChange(v),
        disabled: !!disabled,
        className: "group",
        children: [
          /* @__PURE__ */ jsx7(
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
                      Icon ? /* @__PURE__ */ jsx7(
                        Icon,
                        {
                          "aria-hidden": "true",
                          className: classNames3("size-5 shrink-0", {
                            "stroke-text-disabled": disabled
                          })
                        }
                      ) : null,
                      /* @__PURE__ */ jsx7("span", { className: "truncate", children: display })
                    ] }),
                    /* @__PURE__ */ jsx7(
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
          /* @__PURE__ */ jsx7(ListboxOptions, { anchor: "bottom start", className: dropdownPanelStyles, children: options.map((opt) => /* @__PURE__ */ jsx7(
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
          /* @__PURE__ */ jsx7(
            InformationCircleIcon2,
            {
              "aria-hidden": "true",
              className: "shrink-0 size-4 text-red-300 mt-[3px]"
            }
          ),
          /* @__PURE__ */ jsx7("span", { className: "text-body-smallest text-red-300", children: error })
        ]
      }
    )
  ] });
}

// src/components/Table.tsx
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
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
}) => /* @__PURE__ */ jsx8("div", { className: "flex shrink-0 border-b border-grey-700t px-2", children: columns.map((c2, i) => /* @__PURE__ */ jsx8(
  "div",
  {
    style: getStyles(widthType, c2.width),
    className: `flex min-w-0 items-center overflow-hidden px-3 py-4 text-xs font-bold uppercase text-grey-500 ${c2.className ?? ""}`,
    children: /* @__PURE__ */ jsx8("span", { className: "truncate", children: c2.heading })
  },
  `${c2.heading}-${i}`
)) });
var TableRows = ({
  rows,
  widthType
}) => /* @__PURE__ */ jsx8("div", { className: "flex min-h-0 flex-col overflow-hidden grow", children: /* @__PURE__ */ jsx8("div", { className: "min-h-0 overflow-x-hidden overflow-y-auto grow", children: rows.length ? rows.map(
  (r) => r.uuid && /* @__PURE__ */ jsx8(
    "div",
    {
      className: "flex w-full min-w-0 items-center border-b border-grey-700t last:border-b-0 transition hover:bg-secondary/50",
      children: r.cells.map((c2, i) => /* @__PURE__ */ jsx8(
        "div",
        {
          style: getStyles(widthType, c2.width),
          className: `flex min-w-0 items-center overflow-hidden px-5 py-3 text-sm ${c2.wrapperClassname ?? ""}`,
          children: typeof c2.content === "string" ? /* @__PURE__ */ jsx8("span", { className: "min-w-0 truncate", children: c2.content }) : /* @__PURE__ */ jsx8(
            "div",
            {
              className: `flex min-w-0 w-full items-center overflow-hidden ${c2.wrapperClassname ?? ""}`,
              children: c2.content
            }
          )
        },
        i
      ))
    },
    r.uuid
  )
) : /* @__PURE__ */ jsx8("div", { className: "text-center my-4", children: /* @__PURE__ */ jsx8("span", { className: "text-subtle text-sm", children: "No data found" }) }) }) });
var TableBody = ({
  children,
  className
}) => /* @__PURE__ */ jsx8(
  "div",
  {
    className: classNames4(
      "flex min-h-0 flex-1 flex-col overflow-hidden",
      className
    ),
    children: /* @__PURE__ */ jsx8("div", { className: "min-h-0 flex-1 overflow-y-auto", children })
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
              /* @__PURE__ */ jsx8("h2", { className: "mr-5 truncate font-grotesque text-[24px]/[28px] font-semibold text-white", children: title }),
              titleAddon
            ] }) : titleAddon,
            toolbar != null && /* @__PURE__ */ jsx8("div", { className: "flex flex-grow shrink-0 flex-wrap items-center justify-end gap-3", children: toolbar })
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
      /* @__PURE__ */ jsx8("label", { htmlFor: "table-rows-per-page", children: "Rows per page" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsx8("span", { "aria-current": "page", children: page }),
      /* @__PURE__ */ jsxs6("span", { children: [
        "Of ",
        lastPage
      ] }),
      /* @__PURE__ */ jsx8(
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
import { jsx as jsx9 } from "react/jsx-runtime";
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
}) => /* @__PURE__ */ jsx9(
  "div",
  {
    style: outline ? { borderColor: colour, backgroundColor: `${colour}1A`, color: colour } : { borderColor: colour, backgroundColor: colour, color: "black" },
    className: `border size-fit font-bold rounded-full whitespace-nowrap ${sizeMap3[size]}`,
    children: /* @__PURE__ */ jsx9("span", { children: text })
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
import { useState as useState4 } from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
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
  const [value, setValue] = useState4("");
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
    !!label && /* @__PURE__ */ jsx10(
      "label",
      {
        htmlFor: label,
        className: `${helperText ? "" : "mb-2"} ${outlined ? "block text-left text-[15px] font-semibold leading-6 text-low-priority" : "block text-sm font-semibold text-white"}`,
        children: label
      }
    ),
    !!helperText && /* @__PURE__ */ jsx10("span", { className: "mb-2 mt-1 text-low text-sm block", children: helperText }),
    /* @__PURE__ */ jsxs7(HComboBox, { children: [
      /* @__PURE__ */ jsx10(
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
            isFreeInput ? /* @__PURE__ */ jsx10(
              "button",
              {
                onClick: () => {
                  onSelect({ label: value, value });
                  setValue("");
                },
                disabled: value.length === 0,
                className: "absolute top-1/2 transform right-0 -translate-y-1/2 p-3 cursor-pointer",
                children: /* @__PURE__ */ jsx10(PlusIcon, { className: "size-5" })
              }
            ) : /* @__PURE__ */ jsx10(ComboboxButton, { className: "cursor-pointer group absolute top-1/2 transform right-0 -translate-y-1/2 p-3", children: /* @__PURE__ */ jsx10(
              ChevronDownIcon2,
              {
                className: classNames5(
                  "size-5 group-data-open:rotate-180 transition-all",
                  { "stroke-subtle": disabled }
                )
              }
            ) }),
            /* @__PURE__ */ jsx10(
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
      /* @__PURE__ */ jsx10(
        ComboboxOptions,
        {
          transition: true,
          anchor: "bottom start",
          className: "bg-secondary mt-1 space-y-1 p-1 w-(--input-width) border border-transparent rounded-xs origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 z-50 max-h-60 overflow-y-auto",
          hidden: options.length === 0,
          children: hasGroups ? Object.entries(grouped).map(([group, items]) => /* @__PURE__ */ jsxs7("div", { children: [
            group && /* @__PURE__ */ jsx10("div", { className: "px-3 py-1.5 text-xs font-semibold text-low uppercase tracking-wider", children: group }),
            items.map((opt) => /* @__PURE__ */ jsxs7(
              ComboboxOption,
              {
                value: opt,
                onClick: () => onSelect(opt),
                className: "px-3 py-2.5 text-left hover:bg-grey/20 rounded text-sm w-full cursor-pointer text-white flex items-center gap-2",
                children: [
                  OptionIconStart && /* @__PURE__ */ jsx10(OptionIconStart, { className: "size-4 shrink-0" }),
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
                OptionIconStart && /* @__PURE__ */ jsx10(OptionIconStart, { className: "size-4 shrink-0" }),
                opt.label
              ]
            },
            opt.value
          ))
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxs7("div", { className: "flex space-x-1.5 items-start mt-2", children: [
      /* @__PURE__ */ jsx10(InformationCircleIcon3, { className: "shrink-0 size-4 text-red-400 mt-[3px]" }),
      /* @__PURE__ */ jsx10("span", { className: "text-sm text-red-400", children: error })
    ] }),
    /* @__PURE__ */ jsx10(
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
                OptionIconStart && /* @__PURE__ */ jsx10(OptionIconStart, { className: "size-4" }),
                /* @__PURE__ */ jsx10("span", { className: "text-sm text-white", children: s.label })
              ] }),
              /* @__PURE__ */ jsx10(IconButton, { onClick: () => onSelect(s), Icon: XMarkIcon })
            ]
          },
          s.value
        ))
      }
    )
  ] });
}

// src/components/CountrySelect.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var COUNTRY_CODES = "AF,AX,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BQ,BA,BW,BV,BR,IO,BN,BG,BF,BI,CV,KH,CM,CA,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CW,CY,CZ,DK,DJ,DM,DO,EC,EG,SV,GQ,ER,EE,SZ,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GG,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IM,IL,IT,JM,JP,JE,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,ME,MS,MA,MZ,MM,NA,NR,NP,NL,NC,NZ,NI,NE,NG,NU,NF,MK,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,BL,SH,KN,LC,MF,PM,VC,WS,SM,ST,SA,SN,RS,SC,SL,SG,SX,SK,SI,SB,SO,ZA,GS,SS,ES,LK,SD,SR,SJ,SE,CH,SY,TW,TJ,TZ,TH,TL,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,ZM,ZW";
var countryNames = new Intl.DisplayNames(["en"], { type: "region" });
var countryOptions = COUNTRY_CODES.split(",").map((code) => ({ value: code, label: countryNames.of(code) ?? code })).sort((left, right) => left.label.localeCompare(right.label, "en"));
var codeByLabel = new Map(countryOptions.map((option) => [option.label.toLowerCase(), option.value]));
var countryCode = (value) => {
  const trimmed = value?.trim() ?? "";
  if (trimmed === "") return "";
  const upper = trimmed.toUpperCase();
  if (countryOptions.some((option) => option.value === upper)) return upper;
  return codeByLabel.get(trimmed.toLowerCase()) ?? "";
};
var countryValue = (value) => {
  const trimmed = value?.trim() ?? "";
  return countryCode(trimmed) || trimmed;
};
var countryName = (value) => {
  const trimmed = value?.trim() ?? "";
  if (trimmed === "") return "";
  const code = countryCode(trimmed);
  if (code === "") return trimmed;
  return countryOptions.find((option) => option.value === code)?.label ?? trimmed;
};
var CountrySelect = ({
  className,
  disabled,
  error,
  label = "Country",
  name = "country",
  onChange,
  placeholder = "Select a country",
  value
}) => /* @__PURE__ */ jsx11(
  Select,
  {
    className,
    disabled,
    error,
    label,
    name,
    options: countryOptions,
    placeholder,
    value: countryCode(value),
    onChange
  }
);

// src/components/PaymentMethodsList.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState as useState5 } from "react";

// src/components/Modal.tsx
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon as XMarkIcon2 } from "@heroicons/react/24/outline";
import classNames6 from "classnames";
import { Fragment as Fragment2, jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs8(
    Dialog,
    {
      open,
      onClose,
      className: "relative z-50",
      "aria-labelledby": resolvedTitleId,
      children: [
        /* @__PURE__ */ jsxs8("div", { className: overlayClass, "aria-hidden": "true", onClick: onClose, children: [
          /* @__PURE__ */ jsx12("div", { className: "absolute inset-0 backdrop-blur-xl" }),
          /* @__PURE__ */ jsx12("div", { className: "absolute inset-0 bg-primary/20" })
        ] }),
        /* @__PURE__ */ jsx12("div", { className: "fixed z-50 inset-0 flex w-full items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs8(
          DialogPanel,
          {
            "aria-modal": "true",
            role: "dialog",
            className: classNames6(
              panelBaseClass,
              "pointer-events-auto",
              panelClassName ?? "w-full max-w-lg"
            ),
            children: [
              /* @__PURE__ */ jsxs8("div", { className: "flex shrink-0 items-center justify-between border-b border-grey-700t px-5 py-4", children: [
                /* @__PURE__ */ jsx12(
                  DialogTitle,
                  {
                    id: resolvedTitleId,
                    className: "font-grotesque text-2xl font-bold text-white",
                    children: title
                  }
                ),
                /* @__PURE__ */ jsx12(
                  IconButton,
                  {
                    onClick: onClose,
                    Icon: XMarkIcon2,
                    "aria-label": "Close modal",
                    type: "subtle"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx12(FieldVariantContext.Provider, { value: "outlined", children: /* @__PURE__ */ jsx12("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-4", children }) }),
              footer != null && /* @__PURE__ */ jsx12("div", { className: "flex shrink-0 items-center justify-end gap-3 border-t border-grey-700t px-5 py-4", children: footer })
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
  return /* @__PURE__ */ jsxs8(Fragment2, { children: [
    /* @__PURE__ */ jsx12(
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
    /* @__PURE__ */ jsx12(
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

// src/components/ConfirmDialog.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  loading
}) {
  return /* @__PURE__ */ jsx13(
    Modal,
    {
      open,
      onClose,
      title,
      panelClassName: "w-full max-w-md",
      footer: /* @__PURE__ */ jsx13(
        ModalFooter,
        {
          onCancel: onClose,
          primaryLabel: confirmLabel,
          onPrimary: onConfirm,
          primaryLoading: loading
        }
      ),
      children: /* @__PURE__ */ jsx13("p", { className: "text-sm text-low", children: message })
    }
  );
}

// src/components/PaymentMethodsList.tsx
import { Fragment as Fragment3, jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var menuItemClassName = "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5";
var PaymentMethodsList = ({
  defaultPaymentMethodId = "",
  methods,
  onRemove,
  onSetDefault
}) => {
  const [removing, setRemoving] = useState5();
  const defaultId = defaultPaymentMethodId ?? "";
  return /* @__PURE__ */ jsxs9(Fragment3, { children: [
    /* @__PURE__ */ jsxs9(TableContainer, { className: "min-h-0 flex-1", flush: true, title: "Payment methods", children: [
      /* @__PURE__ */ jsx14(
        TableColumns,
        {
          widthType: "pc",
          columns: [
            { width: 20, heading: "Brand" },
            { width: 16, heading: "Last 4" },
            { width: 20, heading: "Purpose" },
            { width: 16, heading: "Expiry" },
            { width: 16, heading: "Status" },
            { width: 12 }
          ]
        }
      ),
      methods.length === 0 ? /* @__PURE__ */ jsx14("p", { className: "p-4 text-subtle", children: "No payment methods yet." }) : /* @__PURE__ */ jsx14(
        TableRows,
        {
          widthType: "pc",
          rows: methods.map((card) => {
            const expiry = card.expMonth && card.expYear ? `${String(card.expMonth).padStart(2, "0")}/${String(card.expYear).slice(-2)}` : "\u2014";
            return {
              uuid: card.id,
              cells: [
                { width: 20, content: /* @__PURE__ */ jsx14("span", { className: "text-sm capitalize text-white", children: card.brand }) },
                { width: 16, content: /* @__PURE__ */ jsxs9("span", { className: "font-mono text-sm text-white", children: [
                  "\u2022\u2022\u2022\u2022 ",
                  card.last4 || "\u2022\u2022\u2022\u2022"
                ] }) },
                { width: 20, content: /* @__PURE__ */ jsx14("span", { className: "text-sm text-white", children: card.id === defaultId ? "Default" : "Card" }) },
                { width: 16, content: /* @__PURE__ */ jsx14("span", { className: "text-sm text-white", children: expiry }) },
                {
                  width: 16,
                  content: /* @__PURE__ */ jsx14(Pill, { size: "small", colour: card.expired ? "#EF4444" : "#3EB077", text: card.expired ? "Expired" : "Active", outline: true })
                },
                {
                  width: 12,
                  wrapperClassname: "justify-end",
                  content: /* @__PURE__ */ jsxs9(Menu, { children: [
                    /* @__PURE__ */ jsx14(MenuButton, { "aria-label": `Actions for ${card.brand} ${card.last4}`, className: "rounded-[2px] p-1 text-subtle outline-none hover:bg-white/5 hover:text-white", children: /* @__PURE__ */ jsx14(EllipsisVerticalIcon, { className: "size-5" }) }),
                    /* @__PURE__ */ jsxs9(MenuItems, { portal: true, anchor: { to: "bottom end", gap: 6 }, className: "z-50 flex min-w-44 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none", children: [
                      card.id === defaultId ? null : /* @__PURE__ */ jsx14(MenuItem, { children: /* @__PURE__ */ jsx14("button", { type: "button", className: menuItemClassName, onClick: () => void onSetDefault(card.id), children: "Set as default" }) }),
                      /* @__PURE__ */ jsx14(MenuItem, { children: /* @__PURE__ */ jsx14("button", { type: "button", className: menuItemClassName, onClick: () => setRemoving(card), children: "Remove" }) })
                    ] })
                  ] })
                }
              ]
            };
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsx14(
      ConfirmDialog,
      {
        open: removing != null,
        onClose: () => setRemoving(void 0),
        onConfirm: () => {
          if (!removing) return;
          void Promise.resolve(onRemove(removing.id)).finally(() => setRemoving(void 0));
        },
        title: "Remove Payment Method",
        message: "Are you sure you want to remove your payment method?",
        confirmLabel: "Remove"
      }
    )
  ] });
};

// src/components/XeroInvoicesList.tsx
import { Menu as Menu2, MenuButton as MenuButton2, MenuItem as MenuItem2, MenuItems as MenuItems2 } from "@headlessui/react";
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState as useState7 } from "react";

// src/signet/provider.tsx
import {
  createContext as createContext6,
  Suspense,
  useCallback as useCallback2,
  useContext as useContext6,
  useEffect as useEffect4,
  useMemo,
  useRef,
  useState as useState6
} from "react";

// src/components/Notifications.tsx
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon, CheckIcon, XMarkIcon as XMarkIcon3 } from "@heroicons/react/24/outline";
import { createContext as createContext5, useContext as useContext5 } from "react";
import { Fragment as Fragment4, jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var NotificationsContext = createContext5(null);
var PortalNotificationsContext = createContext5([]);
var NotificationsProvider = ({
  children,
  groups
}) => /* @__PURE__ */ jsx15(NotificationsContext.Provider, { value: groups, children });
var useNotificationGroups = () => useContext5(NotificationsContext);
var PortalNotificationsProvider = ({
  children,
  notifications
}) => /* @__PURE__ */ jsx15(PortalNotificationsContext.Provider, { value: notifications, children });
var usePortalNotifications = () => useContext5(PortalNotificationsContext);
var menuPanelClassName = "z-50 outline-hidden flex flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl";
var NotificationsMenu = () => {
  const notifications = usePortalNotifications();
  const unread = notifications.filter((notification) => !notification.isViewed).length;
  return /* @__PURE__ */ jsxs10(Popover, { className: "relative", children: [
    /* @__PURE__ */ jsxs10(
      PopoverButton,
      {
        "aria-label": unread > 0 ? `Notifications (${unread} unread)` : "Notifications",
        ...getIconButtonStyles({ type: "basic", size: "small", disabled: false }),
        children: [
          /* @__PURE__ */ jsx15(BellIcon, { className: "size-5 stroke-subtle" }),
          unread > 0 ? /* @__PURE__ */ jsx15("span", { className: "absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold leading-none text-white", children: unread > 99 ? "99+" : unread }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsx15(
      PopoverPanel,
      {
        portal: true,
        anchor: { to: "bottom end", gap: 8 },
        transition: true,
        className: `${menuPanelClassName} w-[360px] max-w-[calc(100vw-2rem)] origin-top transition data-closed:scale-95 data-closed:opacity-0`,
        children: ({ close }) => /* @__PURE__ */ jsxs10(Fragment4, { children: [
          /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between border-b border-line px-4 py-3", children: [
            /* @__PURE__ */ jsx15("h2", { className: "font-grotesque text-xl font-bold", children: "Notifications" }),
            /* @__PURE__ */ jsx15(IconButton, { onClick: () => close(), size: "small", type: "subtle", Icon: XMarkIcon3, tooltip: "Close" })
          ] }),
          /* @__PURE__ */ jsx15("div", { className: "max-h-96 overflow-y-auto", children: notifications.length > 0 ? notifications.map((notification) => /* @__PURE__ */ jsxs10("div", { className: "border-b border-line px-4 py-3 last:border-b-0", children: [
            /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx15("h4", { className: "text-sm font-semibold text-white", children: notification.title }),
              !notification.isViewed ? /* @__PURE__ */ jsx15("span", { className: "rounded-full bg-orange-100/15 px-2 py-0.5 text-[10px] font-bold uppercase text-orange-100", children: "New" }) : null
            ] }),
            /* @__PURE__ */ jsx15("p", { className: "mt-1 text-sm text-low", children: notification.description }),
            /* @__PURE__ */ jsx15("span", { className: "mt-2 block text-xs text-subtle", children: new Date(notification.createdAt).toLocaleString() })
          ] }, notification.uuid)) : /* @__PURE__ */ jsxs10("div", { className: "flex flex-col items-center px-6 py-8 text-center", children: [
            /* @__PURE__ */ jsx15("div", { className: "mb-4 rounded-[2px] bg-orange-100/10 p-4", children: /* @__PURE__ */ jsx15(CheckIcon, { className: "size-8 text-orange-100" }) }),
            /* @__PURE__ */ jsx15("h3", { className: "font-grotesque text-xl font-semibold text-white", children: "No notifications yet" }),
            /* @__PURE__ */ jsx15("p", { className: "mt-1 text-sm text-subtle", children: "You're all caught up." })
          ] }) })
        ] })
      }
    )
  ] });
};

// src/signet/claims.tsx
import { BuildingOffice2Icon, CreditCardIcon, KeyIcon, ShieldCheckIcon, TicketIcon, UsersIcon } from "@heroicons/react/24/outline";
import { jsx as jsx16 } from "react/jsx-runtime";
var MANAGE_CLAIM = "signet.manage";
var MANAGE_ORGANISATIONS_CLAIM = "signet.manage-organisations";
var managesOrganisations = (clientId, claims) => claims.includes(`${clientId}.manage-organisations`);
var MANAGE_ORGANISATION_CLAIM = "signet.organisation.manage";
var MANAGE_TEAM_CLAIM = "signet.organisation.team";
var MANAGE_ORGANISATION_USERS_CLAIM = "signet.organisation.users";
var signetOrganisationAction = {
  "manage-organisation": "manage",
  "manage-team": "team",
  "manage-users": "users"
};
var organisationClaimName = (clientId, action) => `${clientId}.organisation.${clientId === "signet" ? signetOrganisationAction[action] : action}`;
var signetAdministrationItems = ({
  clientId = "signet",
  membershipClaims
}) => {
  return [
    ...membershipClaims.includes(`${clientId}.organisation.billing`) ? [{ icon: /* @__PURE__ */ jsx16(CreditCardIcon, { className: "size-5 shrink-0" }), label: "Billing", to: "/billing" }] : [],
    ...membershipClaims.includes(organisationClaimName(clientId, "manage-team")) ? [{ icon: /* @__PURE__ */ jsx16(UsersIcon, { className: "size-5 shrink-0" }), label: "Team", to: "/team" }] : [],
    ...membershipClaims.includes(organisationClaimName(clientId, "manage-organisation")) ? [
      {
        icon: /* @__PURE__ */ jsx16(BuildingOffice2Icon, { className: "size-5 shrink-0" }),
        label: "Organisation",
        to: "/organisation"
      }
    ] : []
  ];
};
var signetPlatformItems = ({
  claims,
  clientId = "signet",
  organisationSelected
}) => {
  if (clientId !== "signet" || organisationSelected) return [];
  return [
    { claim: "signet.manage-users", icon: /* @__PURE__ */ jsx16(UsersIcon, { className: "size-5 shrink-0" }), label: "Users", to: "/users" },
    { claim: "signet.manage-roles", icon: /* @__PURE__ */ jsx16(ShieldCheckIcon, { className: "size-5 shrink-0" }), label: "Roles", to: "/roles" },
    {
      claim: "signet.manage-organisations",
      icon: /* @__PURE__ */ jsx16(BuildingOffice2Icon, { className: "size-5 shrink-0" }),
      label: "Organisations",
      to: "/organisations"
    },
    { claim: "signet.manage-claims", icon: /* @__PURE__ */ jsx16(TicketIcon, { className: "size-5 shrink-0" }), label: "Claims", to: "/claims" },
    { claim: "signet.manage-clients", icon: /* @__PURE__ */ jsx16(KeyIcon, { className: "size-5 shrink-0" }), label: "Clients", to: "/clients" }
  ].filter((item) => claims.includes(item.claim)).map(({ icon, label, to }) => ({ icon, label, to }));
};
var roleLabel = (role) => {
  const value = role?.trim() ?? "";
  if (value === "") return "";
  if (value === "super-admin") return "Super Admin";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
var displayRole = (membershipRole, userRole) => roleLabel(membershipRole || userRole);

// src/signet/client.ts
var SignetError = class extends Error {
  constructor(status) {
    super("request_failed");
    this.status = status;
  }
  status;
};
var signetJson = async (endpoint, token, path, init) => {
  const headers2 = new Headers(init?.headers);
  headers2.set("accept", "application/json");
  headers2.set("authorization", `Bearer ${token}`);
  if (init?.body != null && !headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  const response = await fetch(`${endpoint.replace(/\/$/, "")}${path}`, { ...init, headers: headers2 });
  if (!response.ok) throw new SignetError(response.status);
  if (response.status === 204) return void 0;
  return await response.json();
};

// src/signet/provider.tsx
import { jsx as jsx17 } from "react/jsx-runtime";
var FluentConfigContext = createContext6(null);
var DirectoryContext = createContext6(null);
var organisationFrom = (row) => {
  if (!row.uuid || !row.name) return void 0;
  return {
    claims: row.claims ?? [],
    name: row.name,
    role: row.role ?? "",
    uuid: row.uuid,
    website: row.website ?? null
  };
};
var loadDirectory = async (config) => {
  const token = config.token();
  if (!token) throw new Error("request_failed");
  const body = await signetJson(config.endpoint, token, "/oauth/userinfo");
  const memberships = (body.organisations ?? []).map((row) => organisationFrom(row)).filter((row) => row != null);
  const user = {
    claims: body.claims ?? [],
    connections: body.connections ?? [],
    email: body.email ?? "",
    ...body.family_name ? { family_name: body.family_name } : {},
    ...body.given_name ? { given_name: body.given_name } : {},
    ...body.name ? { name: body.name } : {},
    organisations: memberships,
    role: body.role ?? ""
  };
  return { organisations: memberships, user };
};
var DirectoryGate = ({
  children,
  config,
  storageKey
}) => {
  const directory = useSuspenseQuery({
    queryKey: ["signet", "directory"],
    queryFn: () => loadDirectory(config)
  });
  const [organisationUuid, setStoredUuid] = useState6(() => localStorage.getItem(storageKey) ?? "");
  const organisations = directory.data.organisations;
  const canClearOrganisation = managesOrganisations(config.clientId, [
    ...directory.data.user.claims,
    ...directory.data.user.organisations.flatMap((organisation) => organisation.claims)
  ]);
  const selected = organisations.some((organisation) => organisation.uuid === organisationUuid) ? organisationUuid : canClearOrganisation && organisationUuid === "" ? "" : organisations[0]?.uuid ?? "";
  const setOrganisationUuid = useCallback2(
    (uuid) => {
      localStorage.setItem(storageKey, uuid);
      setStoredUuid(uuid);
    },
    [storageKey]
  );
  useEffect4(() => {
    if (selected !== organisationUuid) setOrganisationUuid(selected);
  }, [organisationUuid, selected, setOrganisationUuid]);
  const currentOrganisation = organisations.find((organisation) => organisation.uuid === selected);
  const value = useMemo(
    () => ({
      currentOrganisation,
      organisationUuid: selected,
      organisations,
      setOrganisationUuid,
      user: directory.data.user
    }),
    [currentOrganisation, directory.data.user, organisations, selected, setOrganisationUuid]
  );
  return /* @__PURE__ */ jsx17(DirectoryContext.Provider, { value, children });
};
var noNotificationGroups = [];
var FluentProvider = ({
  children,
  clientId = "signet",
  getAccessToken,
  notificationGroups = noNotificationGroups,
  onLogout,
  organisationClaim,
  organisationStorageKey = "signet-current-organisation",
  signetEndpoint,
  teamClaim
}) => {
  const [client] = useState6(() => new QueryClient({ defaultOptions: { queries: { staleTime: 3e4 } } }));
  const tokenRef = useRef(getAccessToken);
  tokenRef.current = getAccessToken;
  const resolvedOrganisationClaim = organisationClaim ?? organisationClaimName(clientId, "manage-organisation");
  const resolvedTeamClaim = teamClaim ?? organisationClaimName(clientId, "manage-team");
  const config = useMemo(
    () => ({
      clientId,
      endpoint: signetEndpoint,
      onLogout,
      organisationClaim: resolvedOrganisationClaim,
      teamClaim: resolvedTeamClaim,
      token: () => tokenRef.current(),
      usersClaim: organisationClaimName(clientId, "manage-users")
    }),
    [clientId, onLogout, resolvedOrganisationClaim, resolvedTeamClaim, signetEndpoint]
  );
  return /* @__PURE__ */ jsx17(QueryClientProvider, { client, children: /* @__PURE__ */ jsx17(FluentConfigContext.Provider, { value: config, children: /* @__PURE__ */ jsx17(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx17("div", { className: "flex min-h-screen items-center justify-center bg-primary", children: /* @__PURE__ */ jsx17(FullLoader, {}) }),
      children: /* @__PURE__ */ jsx17(DirectoryGate, { config, storageKey: organisationStorageKey, children: /* @__PURE__ */ jsx17(NotificationsProvider, { groups: notificationGroups, children }) })
    }
  ) }) });
};
var useFluentConfig = () => {
  const config = useContext6(FluentConfigContext);
  if (!config) throw new Error("FluentProvider is required");
  return config;
};
var useDirectory = () => {
  const directory = useContext6(DirectoryContext);
  if (!directory) throw new Error("FluentProvider is required");
  return directory;
};
var useSignetQuery = (key, path, enabled = true) => {
  const config = useFluentConfig();
  return useQuery({
    enabled,
    queryKey: ["signet", ...key],
    queryFn: () => {
      const token = config.token();
      if (!token) throw new Error("request_failed");
      return signetJson(config.endpoint, token, path);
    }
  });
};
var useSignetMutation = () => {
  const config = useFluentConfig();
  return async (path, init) => {
    const token = config.token();
    if (!token) throw new Error("request_failed");
    return signetJson(config.endpoint, token, path, init);
  };
};

// src/components/tableExport.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var downloadBlob = (filename, blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
var downloadCsv = (filename, headers2, rows) => {
  const escape = (value) => /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  const csv = [headers2, ...rows].map((row) => row.map(escape).join(",")).join("\n");
  downloadBlob(filename, new Blob([csv], { type: "text/csv;charset=utf-8;" }));
};
var downloadPdf = async (filename, title, headers2, rows, details) => {
  const [renderer, { BillingPdfDocument: BillingPdfDocument2 }, { rasterizeLogoForPdf: rasterizeLogoForPdf2 }] = await Promise.all([
    import("@react-pdf/renderer"),
    Promise.resolve().then(() => (init_billingPdf(), billingPdf_exports)),
    Promise.resolve().then(() => (init_rasterizeLogoForPdf(), rasterizeLogoForPdf_exports))
  ]);
  const logoSrc = await rasterizeLogoForPdf2();
  const blob = await renderer.pdf(
    /* @__PURE__ */ jsx20(
      BillingPdfDocument2,
      {
        generatedAt: /* @__PURE__ */ new Date(),
        headers: headers2,
        logoSrc,
        organisationName: details.organisationName,
        renderer,
        rows,
        title,
        ...details.periodLabel ? { periodLabel: details.periodLabel } : {}
      }
    )
  ).toBlob();
  downloadBlob(filename, blob);
};

// src/components/XeroInvoicesList.tsx
import { jsx as jsx21, jsxs as jsxs13 } from "react/jsx-runtime";
var providerColours = {
  stripe: "#635BFF",
  xero: "#3B82F6"
};
var money = (amount) => `\xA3${amount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
var descriptionOf = (invoice) => invoice.description ?? invoice.uuid;
var XeroInvoicesList = ({
  client,
  clients,
  invoices,
  onClientChange
}) => {
  const { currentOrganisation } = useDirectory();
  const [query, setQuery] = useState7("");
  const [provider, setProvider] = useState7("");
  const [page, setPage] = useState7(1);
  const [perPage, setPerPage] = useState7(25);
  const needle = query.trim().toLowerCase();
  const filtered = invoices.filter((invoice) => {
    const matchesQuery = needle === "" || descriptionOf(invoice).toLowerCase().includes(needle);
    const matchesProvider = provider === "" || invoice.provider === provider;
    return matchesQuery && matchesProvider;
  });
  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);
  const showClient = clients !== void 0;
  const headers2 = showClient ? ["Date", "Description", "Client", "Source", "Gross", "Tax", "Net"] : ["Date", "Description", "Source", "Gross", "Tax", "Net"];
  const exportRows = filtered.map((invoice) => [
    new Date(invoice.createdAt).toLocaleDateString("en-GB"),
    descriptionOf(invoice),
    ...showClient ? [invoice.clientId] : [],
    invoice.provider === "stripe" ? "Stripe" : "Xero",
    money(invoice.gross),
    money(invoice.tax),
    money(invoice.net)
  ]);
  return /* @__PURE__ */ jsxs13(
    TableContainer,
    {
      className: "min-h-0 flex-1",
      flush: true,
      title: "Invoices",
      toolbar: /* @__PURE__ */ jsxs13(Menu2, { children: [
        /* @__PURE__ */ jsxs13(MenuButton2, { className: "flex h-10 shrink-0 items-center gap-2 rounded-[2px] border border-grey-700t px-4 text-sm font-bold text-low-priority outline-none hover:bg-white/5", children: [
          /* @__PURE__ */ jsx21(ArrowDownTrayIcon, { "aria-hidden": "true", className: "size-[18px]" }),
          "Export"
        ] }),
        /* @__PURE__ */ jsxs13(MenuItems2, { portal: true, anchor: { to: "bottom end", gap: 6 }, className: "z-50 min-w-36 rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none", children: [
          /* @__PURE__ */ jsx21(MenuItem2, { children: /* @__PURE__ */ jsx21("button", { type: "button", className: "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5", onClick: () => downloadCsv("invoices.csv", headers2, exportRows), children: "CSV" }) }),
          /* @__PURE__ */ jsx21(MenuItem2, { children: /* @__PURE__ */ jsx21(
            "button",
            {
              type: "button",
              className: "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5",
              onClick: () => {
                void downloadPdf("invoices.pdf", "Invoices", headers2, exportRows, {
                  organisationName: currentOrganisation?.name ?? "Organisation"
                });
              },
              children: "PDF"
            }
          ) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsxs13("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-grey-700t px-5 py-3", children: [
          /* @__PURE__ */ jsx21(
            Input,
            {
              name: "invoiceQuery",
              Icon: MagnifyingGlassIcon,
              value: query,
              placeholder: "Search for invoices",
              className: "w-full sm:w-72",
              onChange: (event) => {
                setPage(1);
                setQuery(event.target.value);
              }
            }
          ),
          /* @__PURE__ */ jsxs13("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-3", children: [
            showClient ? /* @__PURE__ */ jsx21(
              Select,
              {
                placeholder: "All clients",
                widthClass: "w-44",
                value: client ?? "",
                onChange: (value) => onClientChange?.(value),
                options: [{ value: "", label: "All clients" }, ...clients.map((id) => ({ value: id, label: id }))]
              }
            ) : null,
            /* @__PURE__ */ jsx21(
              Select,
              {
                placeholder: "All sources",
                widthClass: "w-40",
                value: provider,
                onChange: (value) => {
                  setPage(1);
                  setProvider(value);
                },
                options: [
                  { value: "", label: "All sources" },
                  { value: "xero", label: "Xero" },
                  { value: "stripe", label: "Stripe" }
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx21(
          TableColumns,
          {
            widthType: "pc",
            columns: [
              { width: showClient ? 12 : 14, heading: "Date" },
              { width: showClient ? 20 : 26, heading: "Description" },
              ...showClient ? [{ width: 12, heading: "Client" }] : [],
              { width: 12, heading: "Source" },
              { width: 12, heading: "Gross" },
              { width: 12, heading: "Tax" },
              { width: 12, heading: "Net" },
              { width: 12 }
            ]
          }
        ),
        visible.length === 0 ? /* @__PURE__ */ jsx21("p", { className: "p-4 text-subtle", children: "No invoices yet." }) : /* @__PURE__ */ jsx21(
          TableRows,
          {
            widthType: "pc",
            rows: visible.map((invoice) => ({
              uuid: invoice.uuid,
              cells: [
                { width: showClient ? 12 : 14, content: new Date(invoice.createdAt).toLocaleDateString("en-GB") },
                { width: showClient ? 20 : 26, content: descriptionOf(invoice) },
                ...showClient ? [{ width: 12, content: invoice.clientId }] : [],
                {
                  width: 12,
                  content: /* @__PURE__ */ jsx21(
                    Pill,
                    {
                      size: "small",
                      colour: providerColours[invoice.provider],
                      text: invoice.provider === "stripe" ? "Stripe" : "Xero",
                      outline: true
                    }
                  )
                },
                { width: 12, content: money(invoice.gross) },
                { width: 12, content: money(invoice.tax) },
                { width: 12, content: money(invoice.net) },
                {
                  width: 12,
                  wrapperClassname: "justify-end",
                  content: /* @__PURE__ */ jsx21("a", { "aria-label": "Open invoice", className: "text-subtle hover:text-white", href: invoice.url, rel: "noreferrer", target: "_blank", children: /* @__PURE__ */ jsx21(ArrowTopRightOnSquareIcon, { className: "size-4" }) })
                }
              ]
            }))
          }
        ),
        /* @__PURE__ */ jsx21(
          TablePagination,
          {
            page,
            perPage,
            total: filtered.length,
            onPageChange: setPage,
            onPerPageChange: (next) => {
              setPage(1);
              setPerPage(next);
            }
          }
        )
      ]
    }
  );
};

// src/components/MultiSelect.tsx
import {
  Listbox as Listbox2,
  ListboxButton as ListboxButton2,
  ListboxOption as ListboxOption2,
  ListboxOptions as ListboxOptions2
} from "@headlessui/react";
import { CheckIcon as CheckIcon2, ChevronDownIcon as ChevronDownIcon3 } from "@heroicons/react/24/outline";
import classNames7 from "classnames";
import { jsx as jsx22, jsxs as jsxs14 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs14("div", { className: classNames7("flex flex-col", widthClass, className), children: [
    !!label && /* @__PURE__ */ jsx22(
      "label",
      {
        htmlFor: name,
        className: outlined ? "mb-2 text-left text-[15px] font-semibold leading-6 text-low-priority" : "mb-2 text-left text-sm font-semibold text-white",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs14(
      Listbox2,
      {
        as: "div",
        multiple: true,
        value,
        onChange: (next) => onChange(next),
        disabled: !!disabled,
        className: "group",
        children: [
          /* @__PURE__ */ jsx22(
            "div",
            {
              className: classNames7(dropdownTriggerStyles, {
                "border-transparent": !outlined,
                "border-grey-700t": outlined,
                "text-low-priority": !outlined && !disabled,
                "text-white": outlined && selected.length > 0 && !disabled,
                "text-low-priority/70": selected.length === 0 && !disabled,
                "text-text-disabled": disabled
              }),
              children: /* @__PURE__ */ jsxs14(
                ListboxButton2,
                {
                  id: name,
                  name,
                  "aria-label": label ?? display,
                  className: classNames7(
                    "flex w-full items-center justify-between rounded-xs px-3 text-left leading-none outline-none disabled:text-text-disabled",
                    heightClass
                  ),
                  children: [
                    /* @__PURE__ */ jsxs14("span", { className: "flex min-w-0 items-center gap-2", children: [
                      Icon ? /* @__PURE__ */ jsx22(
                        Icon,
                        {
                          "aria-hidden": "true",
                          className: classNames7("size-5 shrink-0", {
                            "stroke-text-disabled": disabled
                          })
                        }
                      ) : null,
                      /* @__PURE__ */ jsx22("span", { className: "truncate", children: display })
                    ] }),
                    /* @__PURE__ */ jsx22(
                      ChevronDownIcon3,
                      {
                        "aria-hidden": "true",
                        strokeWidth: 2.5,
                        className: classNames7(
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
          /* @__PURE__ */ jsx22(ListboxOptions2, { anchor: "bottom start", className: dropdownPanelStyles, children: options.map((option) => /* @__PURE__ */ jsxs14(
            ListboxOption2,
            {
              value: option.value,
              className: classNames7(
                dropdownOptionStyles,
                "group/option flex items-center justify-between gap-2"
              ),
              children: [
                /* @__PURE__ */ jsx22("span", { className: "truncate", children: option.label }),
                /* @__PURE__ */ jsx22(
                  CheckIcon2,
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

// src/components/AlertDialog.tsx
import { Dialog as Dialog2, DialogPanel as DialogPanel2, DialogTitle as DialogTitle2 } from "@headlessui/react";
import { CheckIcon as CheckIcon3, XMarkIcon as XMarkIcon4 } from "@heroicons/react/24/outline";
import classNames8 from "classnames";
import { jsx as jsx23, jsxs as jsxs15 } from "react/jsx-runtime";
var overlayClass2 = "fixed inset-0 z-40 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in data-[enter]:duration-200 data-[leave]:duration-150";
function AlertDialog({
  actionLabel,
  icon: Icon = CheckIcon3,
  message,
  onAction,
  onClose,
  open,
  title
}) {
  return /* @__PURE__ */ jsxs15(Dialog2, { open, onClose, className: "relative z-50", children: [
    /* @__PURE__ */ jsxs15("div", { className: overlayClass2, "aria-hidden": "true", onClick: onClose, children: [
      /* @__PURE__ */ jsx23("div", { className: "absolute inset-0 backdrop-blur-xl" }),
      /* @__PURE__ */ jsx23("div", { className: "absolute inset-0 bg-primary/20" })
    ] }),
    /* @__PURE__ */ jsx23("div", { className: "fixed z-50 inset-0 flex w-full items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs15(
      DialogPanel2,
      {
        className: classNames8(
          "pointer-events-auto w-full max-w-md rounded-[2px] border border-grey-700t bg-tertiary p-5 shadow-xl"
        ),
        children: [
          /* @__PURE__ */ jsxs15("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs15("div", { className: "flex min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsx23("span", { className: "flex size-8 shrink-0 items-center justify-center rounded-[2px] bg-orange-100/20 text-orange-100", children: /* @__PURE__ */ jsx23(Icon, { "aria-hidden": "true", className: "size-4" }) }),
              /* @__PURE__ */ jsx23(DialogTitle2, { className: "truncate text-base font-semibold text-white", children: title })
            ] }),
            /* @__PURE__ */ jsx23(IconButton, { onClick: onClose, Icon: XMarkIcon4, "aria-label": "Close", type: "subtle", size: "small" })
          ] }),
          /* @__PURE__ */ jsx23("p", { className: "mt-3 text-sm text-subtle", children: message }),
          /* @__PURE__ */ jsx23("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsx23(
            Button,
            {
              button: {
                onClick: onAction,
                shrink: true,
                size: "control",
                text: actionLabel,
                type: "primary"
              }
            }
          ) })
        ]
      }
    ) })
  ] });
}

// src/components/DetailCard.tsx
import {
  useId as useId2,
  useSyncExternalStore as useSyncExternalStore2
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
import { jsx as jsx24, jsxs as jsxs16 } from "react/jsx-runtime";
function DetailCard({
  title,
  subtitle,
  status,
  actions,
  onEdit,
  onDelete,
  children
}) {
  const collapseTooltipId = useId2();
  const collapsed = useSyncExternalStore2(
    subscribeDetailCardsCollapsed,
    getDetailCardsCollapsed,
    () => false
  );
  return /* @__PURE__ */ jsxs16("div", { className: "relative border border-grey-700t rounded-[2px] bg-secondary p-5 pb-12", children: [
    /* @__PURE__ */ jsxs16("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
      /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx24("h2", { className: "font-grotesque text-4xl lg:text-5xl font-bold text-white truncate", children: title }),
        status && /* @__PURE__ */ jsx24(
          Pill,
          {
            text: status.text,
            colour: status.colour,
            size: "small",
            outline: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-2 shrink-0", children: [
        actions,
        onEdit && /* @__PURE__ */ jsx24(
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
        onDelete && /* @__PURE__ */ jsx24(
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
    !collapsed && subtitle && /* @__PURE__ */ jsx24("p", { className: "text-sm text-low mb-4", children: subtitle }),
    !collapsed && children,
    /* @__PURE__ */ jsx24(
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
  return /* @__PURE__ */ jsx24("div", { className: "grid grid-cols-2 gap-x-8 gap-y-3 text-sm", children });
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx24("span", { className: "text-low", children: label }),
    /* @__PURE__ */ jsx24("span", { className: "text-white font-semibold", children: value ?? "-" })
  ] });
}

// src/components/ProductLockup.tsx
import { jsx as jsx25, jsxs as jsxs17 } from "react/jsx-runtime";
var sidebarLabelClassName = "font-grotesque text-sm font-bold leading-5 text-grey-500 uppercase";
var ProductLockup = ({
  className = sidebarLabelClassName,
  emphasizeProduct = true,
  productName
}) => /* @__PURE__ */ jsxs17("span", { className, children: [
  emphasizeProduct && typeof productName === "string" ? /* @__PURE__ */ jsx25("span", { className: "inline-block bg-primary-main bg-clip-text text-transparent [-webkit-text-fill-color:transparent]", children: productName }) : productName,
  " by Aduro"
] });

// src/components/AuthFrame.tsx
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// src/components/AduroEmblem.tsx
import { jsx as jsx26, jsxs as jsxs18 } from "react/jsx-runtime";
var emblemPaths = [
  "M8.40666 22.4259L15.6041 9.9563C15.6488 9.87583 15.6756 9.78642 15.6756 9.69403V1.27764C15.6756 0.74118 14.9633 0.55044 14.6951 1.01537L0.0737181 26.3391C-0.19749 26.807 0.333005 27.3315 0.797933 27.0513L8.22188 22.6107C8.29937 22.566 8.36196 22.5004 8.40666 22.4229V22.4259Z",
  "M16.8225 9.96206L24.0647 22.5062C24.1094 22.5837 24.1749 22.6492 24.2524 22.6969L31.6346 27.0601C32.0996 27.3343 32.6271 26.8127 32.3559 26.3448L17.7315 1.01219C17.4633 0.547267 16.751 0.738006 16.751 1.27446V9.69682C16.751 9.7892 16.7748 9.87861 16.8225 9.95908V9.96206Z",
  "M23.3771 23.5137H8.95834C8.86297 23.5137 8.77058 23.5405 8.69011 23.5882L1.68937 27.7755C1.2304 28.0497 1.4271 28.7531 1.96057 28.7531H30.4613C30.9947 28.7531 31.1885 28.0467 30.7295 27.7755L23.6483 23.5882C23.5678 23.5405 23.4754 23.5137 23.3801 23.5137H23.3771Z"
];
var join = { x: 28.31, y: 26.87 };
var radius = 5.3;
var border = 6.43;
var AduroEmblem = ({ className = "h-5 w-auto" }) => /* @__PURE__ */ jsxs18("svg", { viewBox: "0 0 33 29", fill: "none", "aria-hidden": "true", className: `overflow-visible ${className}`, children: [
  emblemPaths.map((path) => /* @__PURE__ */ jsx26("path", { d: path, fill: "white" }, path)),
  /* @__PURE__ */ jsx26("circle", { cx: join.x, cy: join.y, r: border, fill: "var(--color-primary)" }),
  /* @__PURE__ */ jsx26("foreignObject", { x: join.x - radius, y: join.y - radius, width: radius * 2, height: radius * 2, children: /* @__PURE__ */ jsx26("div", { className: "h-full w-full rounded-full bg-primary-main" }) })
] });

// src/components/AuthFrame.tsx
import { jsx as jsx27, jsxs as jsxs19 } from "react/jsx-runtime";
var AuthFrame = ({
  children,
  emphasizeProduct = true,
  footer,
  onBack,
  productName
}) => /* @__PURE__ */ jsx27("div", { className: "flex min-h-dvh w-full flex-col", children: /* @__PURE__ */ jsxs19("div", { className: "mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col justify-between gap-10 px-5 py-10", children: [
  /* @__PURE__ */ jsxs19("div", { className: "flex flex-col gap-10", children: [
    /* @__PURE__ */ jsx27("div", { className: "flex min-h-12 items-center", children: onBack ? /* @__PURE__ */ jsx27(
      "button",
      {
        type: "button",
        onClick: onBack,
        "aria-label": "Back",
        className: "cursor-pointer rounded-xs p-2 text-white hover:bg-grey-800t",
        children: /* @__PURE__ */ jsx27(ArrowLeftIcon, { className: "size-6" })
      }
    ) : null }),
    /* @__PURE__ */ jsxs19("span", { className: "inline-flex flex-col items-center", children: [
      /* @__PURE__ */ jsx27(AduroEmblem, { className: "h-12 w-auto" }),
      /* @__PURE__ */ jsx27(
        ProductLockup,
        {
          className: `mt-3 ${sidebarLabelClassName}`,
          emphasizeProduct,
          productName
        }
      )
    ] }),
    children
  ] }),
  footer ? /* @__PURE__ */ jsx27("div", { className: "flex flex-col gap-5", children: footer }) : null
] }) });
var AuthTitle = ({
  subtitle,
  title
}) => /* @__PURE__ */ jsxs19("div", { className: "w-full text-center", children: [
  /* @__PURE__ */ jsx27("h1", { className: "font-grotesque text-[2.25rem] font-semibold leading-[1.22] text-white", children: title }),
  subtitle ? /* @__PURE__ */ jsx27("p", { className: "mt-4 text-base leading-6 text-low", children: subtitle }) : null
] });

// src/components/SignInMethods.tsx
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Suspense as Suspense2, use } from "react";

// src/components/providerIcons.tsx
import { jsx as jsx28, jsxs as jsxs20 } from "react/jsx-runtime";
var GoogleIcon = (props) => /* @__PURE__ */ jsxs20("svg", { viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, ...props, children: [
  /* @__PURE__ */ jsx28(
    "path",
    {
      d: "M18.1713 8.36792H17.5001V8.33333H10.0001V11.6667H14.7096C14.0225 13.6071 12.1763 15 10.0001 15C7.23882 15 5.00007 12.7613 5.00007 10C5.00007 7.23875 7.23882 5 10.0001 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1859 2.52167 12.1951 1.66667 10.0001 1.66667C5.39799 1.66667 1.66674 5.39792 1.66674 10C1.66674 14.6021 5.39799 18.3333 10.0001 18.3333C14.6022 18.3333 18.3334 14.6021 18.3334 10C18.3334 9.44125 18.2759 8.89583 18.1713 8.36792Z",
      fill: "#FFC107"
    }
  ),
  /* @__PURE__ */ jsx28(
    "path",
    {
      d: "M2.6275 6.12125L5.36542 8.12917C6.10625 6.29501 7.90042 5 10.0004 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52167 12.195 1.66667 10.0004 1.66667C6.79917 1.66667 4.02334 3.47375 2.6275 6.12125Z",
      fill: "#FF3D00"
    }
  ),
  /* @__PURE__ */ jsx28(
    "path",
    {
      d: "M10.0001 18.3333C12.1526 18.3333 14.1092 17.5096 15.5876 16.17L13.0084 13.9875C12.1432 14.6452 11.0865 15.0009 10.0001 15C7.83258 15 5.99133 13.6179 5.29883 11.6892L2.58008 13.7829C3.96133 16.4817 6.76133 18.3333 10.0001 18.3333Z",
      fill: "#4CAF50"
    }
  ),
  /* @__PURE__ */ jsx28(
    "path",
    {
      d: "M18.1713 8.36792H17.5001V8.33334H10.0001V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0084 13.9871L15.5876 16.1696C15.4042 16.3363 18.3334 14.1667 18.3334 10C18.3334 9.44126 18.2759 8.89584 18.1713 8.36792Z",
      fill: "#1976D2"
    }
  )
] });
var GitHubIcon = (props) => /* @__PURE__ */ jsx28("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsx28("path", { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }) });
var MicrosoftIcon = (props) => /* @__PURE__ */ jsxs20("svg", { viewBox: "0 0 21 21", "aria-hidden": true, ...props, children: [
  /* @__PURE__ */ jsx28("path", { fill: "#f25022", d: "M0 0h10v10H0z" }),
  /* @__PURE__ */ jsx28("path", { fill: "#7fba00", d: "M11 0h10v10H11z" }),
  /* @__PURE__ */ jsx28("path", { fill: "#00a4ef", d: "M0 11h10v10H0z" }),
  /* @__PURE__ */ jsx28("path", { fill: "#ffb900", d: "M11 11h10v10H11z" })
] });
var SlackIcon = (props) => /* @__PURE__ */ jsx28("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...props, children: /* @__PURE__ */ jsx28("path", { d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" }) });

// src/components/SignInMethods.tsx
import { Fragment as Fragment5, jsx as jsx29, jsxs as jsxs21 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs21(Fragment5, { children: [
    social.map((hint) => /* @__PURE__ */ jsx29(
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
    list.includes(CREDENTIALS_PROVIDER) ? /* @__PURE__ */ jsx29(
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
}) => /* @__PURE__ */ jsx29(
  Suspense2,
  {
    fallback: /* @__PURE__ */ jsx29("div", { className: "flex w-full justify-center py-4", children: /* @__PURE__ */ jsx29(Loader, {}) }),
    children: /* @__PURE__ */ jsx29(ProviderButtons, { onSelect, providers: signetProviders(issuer) })
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
import { jsx as jsx30, jsxs as jsxs22 } from "react/jsx-runtime";
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
  const names = links.map((link, index) => /* @__PURE__ */ jsxs22("span", { children: [
    separator(index, links.length),
    /* @__PURE__ */ jsx30(Link2, { to: link.to, className: "text-orange-100 underline hover:brightness-125", children: link.label })
  ] }, link.to));
  return /* @__PURE__ */ jsxs22("p", { className: "text-center font-open text-sm text-low-priority", children: [
    "By continuing, you acknowledge ",
    productName,
    "'s ",
    names,
    "."
  ] });
};

// src/components/PersonAvatar.tsx
import { useEffect as useEffect5, useState as useState8 } from "react";
import { jsx as jsx31, jsxs as jsxs23 } from "react/jsx-runtime";
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
  const [src, setSrc] = useState8(null);
  const [shown, setShown] = useState8(false);
  const box = sizeClassName[size];
  useEffect5(() => {
    let cancelled = false;
    setShown(false);
    void gravatarUrl(email ?? "").then((next) => {
      if (!cancelled) setSrc(next);
    });
    return () => {
      cancelled = true;
    };
  }, [email]);
  return /* @__PURE__ */ jsxs23("span", { className: `relative inline-flex shrink-0 overflow-hidden rounded-full ${box}`, children: [
    shown ? null : /* @__PURE__ */ jsx31("span", { className: "flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 font-bold text-white", children: initials(name) }),
    src ? /* @__PURE__ */ jsx31(
      "img",
      {
        src,
        alt: "",
        className: `absolute inset-0 size-full object-cover ${shown ? "" : "invisible"}`,
        onLoad: () => setShown(true),
        onError: () => setSrc(null)
      }
    ) : null
  ] });
};

// src/components/OrganisationAvatar.tsx
import { useEffect as useEffect6, useState as useState9 } from "react";

// src/organisationFavicon.ts
var organisationFaviconUrl = (website, size = 128) => {
  const trimmed = website?.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.hostname === "") return null;
    const params = new URLSearchParams({
      client: "SOCIAL",
      type: "FAVICON",
      fallback_opts: "TYPE,SIZE,URL",
      url: `${url.protocol}//${url.hostname}`,
      size: String(size)
    });
    return `https://t1.gstatic.com/faviconV2?${params.toString()}`;
  } catch {
    return null;
  }
};

// src/components/OrganisationAvatar.tsx
import { jsx as jsx32, jsxs as jsxs24 } from "react/jsx-runtime";
var sizeClassName2 = {
  small: "size-7 text-[11px]",
  medium: "size-8 text-xs"
};
var initials2 = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "A";
var OrganisationAvatar = ({
  name,
  size = "small",
  website
}) => {
  const src = organisationFaviconUrl(website);
  const [failed, setFailed] = useState9(false);
  const [shown, setShown] = useState9(false);
  const box = sizeClassName2[size];
  useEffect6(() => {
    setFailed(false);
    setShown(false);
  }, [src]);
  return /* @__PURE__ */ jsxs24("span", { className: `relative inline-flex shrink-0 overflow-hidden rounded-full ${box}`, children: [
    shown ? null : /* @__PURE__ */ jsx32("span", { className: "flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 font-bold text-white", children: initials2(name) }),
    src && !failed ? /* @__PURE__ */ jsx32(
      "img",
      {
        src,
        alt: "",
        className: `absolute inset-0 size-full object-cover ${shown ? "" : "invisible"}`,
        onLoad: () => setShown(true),
        onError: () => setFailed(true)
      }
    ) : null
  ] });
};

// src/components/SignInScreen.tsx
import { EnvelopeIcon as EnvelopeIcon2, LockClosedIcon } from "@heroicons/react/24/outline";
import { useForm } from "@tanstack/react-form";
import { useState as useState10 } from "react";
import { Fragment as Fragment6, jsx as jsx33, jsxs as jsxs25 } from "react/jsx-runtime";
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
  const [emailStep, setEmailStep] = useState10(false);
  const frameFooter = /* @__PURE__ */ jsxs25(Fragment6, { children: [
    footer,
    showLegalNotice ? /* @__PURE__ */ jsx33(LegalNotice, { productName }) : null
  ] });
  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      await onSubmitEmail(value);
    }
  });
  if (emailStep) {
    return /* @__PURE__ */ jsxs25(
      AuthFrame,
      {
        emphasizeProduct,
        footer: frameFooter,
        onBack: () => setEmailStep(false),
        productName,
        children: [
          /* @__PURE__ */ jsx33(AuthTitle, { title: "Log in" }),
          /* @__PURE__ */ jsxs25(
            "form",
            {
              className: "w-full space-y-5",
              onSubmit: (event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
              },
              children: [
                /* @__PURE__ */ jsx33(
                  form.Field,
                  {
                    name: "email",
                    children: (field) => /* @__PURE__ */ jsx33(
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
                /* @__PURE__ */ jsx33(
                  form.Field,
                  {
                    name: "password",
                    children: (field) => /* @__PURE__ */ jsx33(
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
                /* @__PURE__ */ jsx33(
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
                error ? /* @__PURE__ */ jsx33("p", { className: "text-center text-sm text-red-400", children: error }) : null
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs25(AuthFrame, { emphasizeProduct, footer: frameFooter, productName, children: [
    /* @__PURE__ */ jsx33(AuthTitle, { title: "Welcome back!", subtitle: "Select one of the options below" }),
    /* @__PURE__ */ jsxs25("div", { className: "flex w-full flex-col gap-3", children: [
      /* @__PURE__ */ jsx33(
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
      error ? /* @__PURE__ */ jsx33("p", { className: "text-center text-sm text-red-400", children: error }) : null
    ] })
  ] });
};

// src/signet/useSignIn.ts
import { useState as useState11 } from "react";

// src/signet/session.ts
var TOKEN_KEY = "signet.access_token";
var VERIFIER_KEY = "signet.pkce_verifier";
var STATE_KEY = "signet.oauth_state";
var current;
var bindSignetAuth = (meta) => {
  current = meta;
};
var auth = () => {
  if (!current) throw new Error("Signet auth is not configured");
  return current;
};
var readCookie = (name) => {
  const prefix = `${name}=`;
  const match = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(prefix));
  if (!match) return null;
  return decodeURIComponent(match.slice(prefix.length));
};
var base64Url = (bytes) => {
  let binary = "";
  for (const value of bytes) binary += String.fromCharCode(value);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
};
var randomToken = () => base64Url(crypto.getRandomValues(new Uint8Array(32)));
var challengeFor = async (verifier) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64Url(new Uint8Array(digest));
};
var signetIssuer = () => (auth().signetEndpoint || window.location.origin).replace(/\/$/, "");
var signetClientId = () => auth().signetClientId ?? "";
var signetAccessToken = () => readCookie(auth().signetAccessCookie) ?? sessionStorage.getItem(TOKEN_KEY);
var clearSignetSession = () => {
  const cookie = auth().signetAccessCookie;
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  document.cookie = `${cookie}=; Path=/; Max-Age=0; Secure; SameSite=Lax`;
  document.cookie = `${cookie}=; Path=/; Max-Age=0; Domain=.aduro.io; Secure; SameSite=Lax`;
};
var redirectUri = () => `${window.location.origin}/login`;
var signInWithSignetPassword = async (email, password) => {
  const response = await fetch(`${signetIssuer()}/oauth/token`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: signetClientId(),
      grant_type: "password",
      password,
      username: email
    })
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error ?? "Sign-in failed");
  }
  sessionStorage.setItem(TOKEN_KEY, payload.access_token);
  window.location.assign("/");
};
var startSignetLogin = async (hint) => {
  const verifier = randomToken();
  const state = randomToken();
  const nonce = randomToken();
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);
  const url = new URL(`${signetIssuer()}/authorize`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", signetClientId());
  url.searchParams.set("redirect_uri", redirectUri());
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  url.searchParams.set("code_challenge", await challengeFor(verifier));
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("idp_hint", hint);
  window.location.assign(url.toString());
};
var completeSignetLogin = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");
  if (!code || !state) return false;
  const expected = sessionStorage.getItem(STATE_KEY);
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  if (!verifier || state !== expected) {
    clearSignetSession();
    throw new Error("Sign-in state did not match.");
  }
  const response = await fetch(`${signetIssuer()}/oauth/token`, {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: signetClientId(),
      code,
      code_verifier: verifier,
      grant_type: "authorization_code",
      redirect_uri: redirectUri()
    })
  });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error ?? "Sign-in failed");
  }
  sessionStorage.setItem(TOKEN_KEY, payload.access_token);
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  window.history.replaceState({}, "", "/");
  return true;
};

// src/signet/useSignIn.ts
var useSignIn = () => {
  const [error, setError] = useState11("");
  const fail = (reason) => {
    setError(reason instanceof Error ? reason.message : "Sign-in failed");
  };
  return {
    error,
    issuer: signetIssuer(),
    start: async (hint) => {
      try {
        await startSignetLogin(hint);
      } catch (reason) {
        fail(reason);
      }
    },
    submitEmail: async (value) => {
      try {
        await signInWithSignetPassword(value.email, value.password);
      } catch (reason) {
        fail(reason);
      }
    }
  };
};

// src/components/LoginPage.tsx
import { jsx as jsx34 } from "react/jsx-runtime";
var LoginPage = ({
  emphasizeProduct = true,
  error,
  footer,
  productName
}) => {
  const signIn = useSignIn();
  return /* @__PURE__ */ jsx34(
    SignInScreen,
    {
      emphasizeProduct,
      error: error || signIn.error || void 0,
      ...footer ? { footer } : {},
      issuer: signIn.issuer,
      onSelect: (hint) => {
        void signIn.start(hint);
      },
      onSubmitEmail: signIn.submitEmail,
      productName
    }
  );
};

// src/components/AppFrame.tsx
import { Menu as Menu3, MenuButton as MenuButton3, MenuItem as MenuItem3, MenuItems as MenuItems3 } from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon as ChevronDownIcon5,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { Link as Link3 } from "@tanstack/react-router";
import { useState as useState12 } from "react";

// src/components/AppHeader.tsx
import { ArrowLeftIcon as ArrowLeftIcon2 } from "@heroicons/react/24/outline";
import { useRouter } from "@tanstack/react-router";
import { jsx as jsx35, jsxs as jsxs26 } from "react/jsx-runtime";
var AppHeader = ({
  button,
  crumb,
  title
}) => {
  const router = useRouter();
  const goBack = () => {
    if (!crumb) return;
    void router.navigate({ to: crumb.backPath });
  };
  return /* @__PURE__ */ jsxs26("header", { className: "flex shrink-0 items-center gap-4 border-b border-grey-700t bg-primary px-5 py-3", children: [
    /* @__PURE__ */ jsxs26("div", { className: "flex min-w-0 flex-1 items-center justify-between gap-4", children: [
      crumb ? /* @__PURE__ */ jsxs26("div", { className: "flex min-w-0 items-center gap-5", children: [
        /* @__PURE__ */ jsx35(
          IconButton,
          {
            Icon: ArrowLeftIcon2,
            onClick: goBack,
            size: "small",
            type: "tertiary",
            tooltip: "Go back",
            className: "border-line hover:bg-white/5"
          }
        ),
        /* @__PURE__ */ jsxs26("nav", { "aria-label": "Breadcrumb", className: "flex min-w-0 items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx35(
            "button",
            {
              type: "button",
              className: "truncate font-semibold text-subtle transition hover:text-white",
              onClick: goBack,
              children: title
            }
          ),
          /* @__PURE__ */ jsx35("span", { className: "text-subtle/40", "aria-hidden": "true", children: "/" }),
          /* @__PURE__ */ jsx35("h1", { className: "truncate font-semibold text-subtle/60", "aria-current": "page", children: crumb.segment })
        ] })
      ] }) : /* @__PURE__ */ jsx35("h1", { className: "min-w-0 truncate font-grotesque text-[30px] font-semibold leading-9 text-white", children: title }),
      button ? /* @__PURE__ */ jsx35(
        Button,
        {
          button: {
            IconStart: button.icon,
            onClick: button.onClick,
            shrink: true,
            size: "control",
            text: button.label,
            type: "primary"
          }
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsx35(NotificationsMenu, {})
  ] });
};

// src/components/AppFrame.tsx
import { jsx as jsx36, jsxs as jsxs27 } from "react/jsx-runtime";
var SidebarPanelIcon = ({ className = "" }) => /* @__PURE__ */ jsx36(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    className,
    children: /* @__PURE__ */ jsx36(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M3.75 5.25h16.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Zm5.25 0v13.5"
      }
    )
  }
);
var linkClassName = "group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-[15px] font-semibold leading-5 text-low-priority outline-none transition hover:bg-white/5 hover:text-white active:shadow-focused-dark data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100";
var menuItemClassName2 = "flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer";
var NavLink = ({
  collapsed,
  item
}) => /* @__PURE__ */ jsxs27(
  Link3,
  {
    to: item.to,
    "aria-label": collapsed ? item.label : void 0,
    title: collapsed ? item.label : void 0,
    className: `${linkClassName} data-[collapsed=true]:justify-center`,
    "data-collapsed": collapsed,
    children: [
      item.Icon ? /* @__PURE__ */ jsx36(item.Icon, { className: "size-5 shrink-0" }) : null,
      collapsed ? null : /* @__PURE__ */ jsx36("span", { className: "truncate", children: item.label })
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
}) => /* @__PURE__ */ jsxs27(Menu3, { children: [
  /* @__PURE__ */ jsxs27(
    MenuButton3,
    {
      "aria-label": "Account menu",
      className: "group flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-left outline-none transition hover:bg-white/5 data-[collapsed=true]:justify-center",
      "data-collapsed": collapsed,
      children: [
        /* @__PURE__ */ jsx36(PersonAvatar, { email, name }),
        collapsed ? null : /* @__PURE__ */ jsxs27("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx36("span", { className: "block truncate text-sm font-semibold text-white", children: name }),
          role ? /* @__PURE__ */ jsx36("span", { className: "block truncate text-xs text-subtle/70", children: role }) : null,
          !role && email ? /* @__PURE__ */ jsx36("span", { className: "block truncate text-xs text-subtle/70", children: email }) : null
        ] }),
        collapsed ? null : /* @__PURE__ */ jsx36(ChevronDownIcon5, { className: "size-4 shrink-0 text-subtle/70 group-hover:text-white" })
      ]
    }
  ),
  /* @__PURE__ */ jsxs27(
    MenuItems3,
    {
      portal: true,
      anchor: { to: "top start", gap: 6 },
      className: "z-50 flex min-w-60 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none",
      children: [
        /* @__PURE__ */ jsxs27("div", { className: "flex flex-col border-b border-line px-3 py-3", children: [
          /* @__PURE__ */ jsx36("span", { className: "truncate text-sm font-semibold text-white", children: name }),
          role ? /* @__PURE__ */ jsx36("span", { className: "truncate text-xs text-subtle", children: role }) : null,
          email ? /* @__PURE__ */ jsx36("span", { className: "truncate text-xs text-subtle", children: email }) : null
        ] }),
        /* @__PURE__ */ jsxs27("div", { className: "p-1.5", children: [
          /* @__PURE__ */ jsx36(MenuItem3, { children: /* @__PURE__ */ jsxs27(Link3, { to: settingsTo, className: menuItemClassName2, children: [
            /* @__PURE__ */ jsx36(Cog6ToothIcon, { className: "size-4 shrink-0 text-subtle" }),
            /* @__PURE__ */ jsx36("span", { children: "Settings" })
          ] }) }),
          /* @__PURE__ */ jsx36(MenuItem3, { children: /* @__PURE__ */ jsxs27("button", { type: "button", onClick: onLogout, className: menuItemClassName2, children: [
            /* @__PURE__ */ jsx36(ArrowLeftStartOnRectangleIcon, { className: "size-4 shrink-0 text-subtle" }),
            /* @__PURE__ */ jsx36("span", { children: "Logout" })
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
  const current2 = options.find((option) => option.value === value) ?? options[0];
  const label = current2?.label ?? "Organisation";
  return /* @__PURE__ */ jsxs27(Menu3, { children: [
    /* @__PURE__ */ jsxs27(
      MenuButton3,
      {
        "aria-label": "Switch organisation",
        className: "flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] bg-secondary px-2 py-2 text-left outline-none transition hover:bg-white/10",
        children: [
          /* @__PURE__ */ jsx36(OrganisationAvatar, { name: label, ...current2?.website ? { website: current2.website } : {} }),
          /* @__PURE__ */ jsx36("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-white", children: label }),
          /* @__PURE__ */ jsx36(ChevronDownIcon5, { className: "size-4 shrink-0 text-subtle" })
        ]
      }
    ),
    /* @__PURE__ */ jsx36(
      MenuItems3,
      {
        portal: true,
        anchor: { to: "bottom start", gap: 6 },
        className: "z-50 flex min-w-56 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none",
        children: options.map((option) => /* @__PURE__ */ jsx36(MenuItem3, { children: /* @__PURE__ */ jsxs27(
          "button",
          {
            type: "button",
            onClick: () => onChange(option.value),
            className: menuItemClassName2,
            children: [
              /* @__PURE__ */ jsx36(OrganisationAvatar, { name: option.label, ...option.website ? { website: option.website } : {} }),
              /* @__PURE__ */ jsx36("span", { className: "min-w-0 flex-1 truncate", children: option.label })
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
  organisations
}) => {
  const [collapsed, setCollapsed] = useState12(false);
  return /* @__PURE__ */ jsxs27("div", { className: "flex h-screen w-full overflow-hidden bg-primary text-white", children: [
    /* @__PURE__ */ jsxs27(
      "aside",
      {
        "data-collapsed": collapsed,
        className: "flex h-full shrink-0 flex-col border-r border-line bg-primary transition-all duration-150 data-[collapsed=false]:w-60 data-[collapsed=true]:w-[65px]",
        children: [
          /* @__PURE__ */ jsx36(
            "div",
            {
              className: "mb-1 flex shrink-0 flex-col items-center justify-center px-4 data-[collapsed=false]:pb-3 data-[collapsed=false]:pt-4 data-[collapsed=true]:h-14",
              "data-collapsed": collapsed,
              children: /* @__PURE__ */ jsx36(Link3, { to: "/", "aria-label": "Home", className: "inline-flex items-center", children: /* @__PURE__ */ jsx36(AduroEmblem, { className: "h-7 w-auto" }) })
            }
          ),
          organisations && organisations.options.length > 0 && !collapsed ? /* @__PURE__ */ jsx36("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsx36(
            OrganisationMenu,
            {
              onChange: organisations.onChange,
              options: organisations.options,
              value: organisations.value
            }
          ) }) : null,
          /* @__PURE__ */ jsxs27(
            "nav",
            {
              "aria-label": "Main navigation",
              className: "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3",
              children: [
                items.map((item) => /* @__PURE__ */ jsx36(NavLink, { collapsed, item }, item.to)),
                footerItems.length > 0 ? /* @__PURE__ */ jsxs27("div", { className: "mt-auto flex flex-col gap-1", children: [
                  collapsed ? null : /* @__PURE__ */ jsx36("span", { className: `px-2.5 pb-1 pt-2 ${sidebarLabelClassName}`, children: "Administration" }),
                  footerItems.map((item) => /* @__PURE__ */ jsx36(NavLink, { collapsed, item }, item.to))
                ] }) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxs27("div", { className: "flex flex-col border-t border-line", children: [
            account ? /* @__PURE__ */ jsx36("div", { className: "px-3 py-2", children: /* @__PURE__ */ jsx36(
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
            /* @__PURE__ */ jsx36(
              "div",
              {
                className: "flex border-t border-line px-3 py-2 data-[collapsed=true]:justify-center",
                "data-collapsed": collapsed,
                children: /* @__PURE__ */ jsx36(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCollapsed((current2) => !current2),
                    "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
                    "aria-expanded": !collapsed,
                    className: "group flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-subtle outline-none transition hover:bg-white/5 hover:text-white",
                    children: /* @__PURE__ */ jsx36(SidebarPanelIcon, { className: "size-5 shrink-0" })
                  }
                )
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx36("main", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", children })
  ] });
};
var PageHeader = ({
  button,
  crumb,
  title
}) => /* @__PURE__ */ jsx36(AppHeader, { button, crumb, title });

// src/components/SideNav.tsx
import { Menu as Menu4, MenuButton as MenuButton4, MenuItem as MenuItem4, MenuItems as MenuItems4 } from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon as ArrowLeftStartOnRectangleIcon2,
  ChevronDownIcon as ChevronDownIcon6,
  Cog6ToothIcon as Cog6ToothIcon2
} from "@heroicons/react/24/outline";
import { Link as Link4 } from "@tanstack/react-router";
import { useState as useState13 } from "react";
import { jsx as jsx37, jsxs as jsxs28 } from "react/jsx-runtime";
var SidebarPanelIcon2 = ({ className = "" }) => /* @__PURE__ */ jsx37("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", "aria-hidden": "true", className, children: /* @__PURE__ */ jsx37("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 5.25h16.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5Zm5.25 0v13.5" }) });
var linkClassName2 = "group flex items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-[15px] font-semibold leading-5 text-low-priority outline-none transition hover:bg-white/5 hover:text-white active:shadow-focused-dark data-[status=active]:bg-orange-100/10 data-[status=active]:text-orange-100";
var menuItemClassName3 = "flex w-full items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white cursor-pointer";
var NavLink2 = ({ collapsed, item }) => /* @__PURE__ */ jsxs28(
  Link4,
  {
    to: item.to,
    "aria-label": collapsed ? item.label : void 0,
    title: collapsed ? item.label : void 0,
    className: `${linkClassName2} data-[collapsed=true]:justify-center`,
    "data-collapsed": collapsed,
    children: [
      item.icon,
      collapsed ? null : /* @__PURE__ */ jsx37("span", { className: "truncate", children: item.label })
    ]
  }
);
var SideNav = ({
  administrationMenuItems = [],
  children,
  clientId,
  homeTo = "/",
  menuItems,
  preMenu
}) => {
  const config = useFluentConfig();
  const { onLogout } = config;
  const { currentOrganisation, organisationUuid, organisations, setOrganisationUuid, user } = useDirectory();
  const resolvedClientId = clientId ?? config.clientId;
  const organisationItems = signetAdministrationItems({
    clientId: resolvedClientId,
    membershipClaims: currentOrganisation?.claims ?? []
  }).filter((item) => !administrationMenuItems.some((existing) => existing.to === item.to));
  const administrationItems = [...administrationMenuItems, ...organisationItems];
  const platformItems = signetPlatformItems({
    claims: user.claims,
    clientId: resolvedClientId,
    organisationSelected: organisationUuid !== ""
  }).filter((item) => !menuItems.some((existing) => existing.to === item.to));
  const navigationItems = [...platformItems, ...menuItems];
  const [collapsed, setCollapsed] = useState13(false);
  const given = user.given_name?.trim() ?? "";
  const family = user.family_name?.trim() ?? "";
  const name = [given, family].filter((part) => part !== "").join(" ") || user.name?.trim() || user.email || "Account";
  const role = displayRole(currentOrganisation?.role, user.role);
  const canClearOrganisation = managesOrganisations(resolvedClientId, [
    ...user.claims,
    ...user.organisations.flatMap((organisation) => organisation.claims)
  ]);
  const showSwitcher = organisations.length > 0 || canClearOrganisation;
  const preMenuNode = typeof preMenu === "function" ? preMenu(collapsed) : preMenu;
  return /* @__PURE__ */ jsxs28("div", { className: "flex h-screen w-full overflow-hidden bg-primary text-white", children: [
    /* @__PURE__ */ jsxs28(
      "aside",
      {
        "data-collapsed": collapsed,
        className: "flex h-full shrink-0 flex-col border-r border-line bg-primary transition-all duration-150 data-[collapsed=false]:w-60 data-[collapsed=true]:w-[65px]",
        children: [
          /* @__PURE__ */ jsx37("div", { className: "mb-1 flex shrink-0 flex-col items-center justify-center px-4 data-[collapsed=false]:pb-3 data-[collapsed=false]:pt-4 data-[collapsed=true]:h-14", "data-collapsed": collapsed, children: /* @__PURE__ */ jsx37(Link4, { to: homeTo, "aria-label": "Home", className: "inline-flex items-center", children: /* @__PURE__ */ jsx37(AduroEmblem, { className: "h-7 w-auto" }) }) }),
          showSwitcher && !collapsed ? /* @__PURE__ */ jsx37("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxs28(Menu4, { children: [
            /* @__PURE__ */ jsxs28(MenuButton4, { "aria-label": "Switch organisation", className: "flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] bg-secondary px-2 py-2 text-left outline-none transition hover:bg-white/10", children: [
              /* @__PURE__ */ jsx37(OrganisationAvatar, { name: currentOrganisation?.name ?? "No organisation", ...currentOrganisation?.website ? { website: currentOrganisation.website } : {} }),
              /* @__PURE__ */ jsx37("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-white", children: currentOrganisation?.name ?? "No organisation" }),
              /* @__PURE__ */ jsx37(ChevronDownIcon6, { className: "size-4 shrink-0 text-subtle" })
            ] }),
            /* @__PURE__ */ jsxs28(MenuItems4, { portal: true, anchor: { to: "bottom start", gap: 6 }, className: "z-50 flex min-w-56 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none", children: [
              canClearOrganisation ? /* @__PURE__ */ jsx37(MenuItem4, { children: /* @__PURE__ */ jsxs28("button", { type: "button", className: menuItemClassName3, onClick: () => setOrganisationUuid(""), children: [
                /* @__PURE__ */ jsx37(OrganisationAvatar, { name: "No organisation" }),
                /* @__PURE__ */ jsx37("span", { className: "min-w-0 flex-1 truncate", children: "No organisation" })
              ] }) }) : null,
              organisations.map((organisation) => /* @__PURE__ */ jsx37(MenuItem4, { children: /* @__PURE__ */ jsxs28("button", { type: "button", className: menuItemClassName3, onClick: () => setOrganisationUuid(organisation.uuid), children: [
                /* @__PURE__ */ jsx37(OrganisationAvatar, { name: organisation.name, ...organisation.website ? { website: organisation.website } : {} }),
                /* @__PURE__ */ jsx37("span", { className: "min-w-0 flex-1 truncate", children: organisation.name })
              ] }) }, organisation.uuid))
            ] })
          ] }) }) : null,
          preMenuNode ? /* @__PURE__ */ jsx37("div", { className: "shrink-0 px-3 pb-3", children: preMenuNode }) : null,
          /* @__PURE__ */ jsxs28("nav", { "aria-label": "Main navigation", className: "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3", children: [
            navigationItems.map((item) => /* @__PURE__ */ jsx37(NavLink2, { collapsed, item }, item.to)),
            administrationItems.length > 0 ? /* @__PURE__ */ jsxs28("div", { className: "mt-auto flex flex-col gap-1", children: [
              collapsed || administrationItems.length < 2 ? null : /* @__PURE__ */ jsx37("span", { className: `px-2.5 pb-1 pt-2 ${sidebarLabelClassName}`, children: "Administration" }),
              administrationItems.map((item) => /* @__PURE__ */ jsx37(NavLink2, { collapsed, item }, item.to))
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs28("div", { className: "flex flex-col border-t border-line", children: [
            /* @__PURE__ */ jsx37("div", { className: "px-3 py-2", children: /* @__PURE__ */ jsxs28(Menu4, { children: [
              /* @__PURE__ */ jsxs28(MenuButton4, { "aria-label": "Account menu", className: "group flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2 py-2 text-left outline-none transition hover:bg-white/5 data-[collapsed=true]:justify-center", "data-collapsed": collapsed, children: [
                /* @__PURE__ */ jsx37(PersonAvatar, { email: user.email, name }),
                collapsed ? null : /* @__PURE__ */ jsxs28("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx37("span", { className: "block truncate text-sm font-semibold text-white", children: name }),
                  role ? /* @__PURE__ */ jsx37("span", { className: "block truncate text-xs text-subtle/70", children: role }) : null
                ] }),
                collapsed ? null : /* @__PURE__ */ jsx37(ChevronDownIcon6, { className: "size-4 shrink-0 text-subtle/70 group-hover:text-white" })
              ] }),
              /* @__PURE__ */ jsxs28(MenuItems4, { portal: true, anchor: { to: "top start", gap: 6 }, className: "z-50 flex min-w-60 flex-col rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-none", children: [
                /* @__PURE__ */ jsxs28("div", { className: "flex flex-col border-b border-line px-3 py-3", children: [
                  /* @__PURE__ */ jsx37("span", { className: "truncate text-sm font-semibold text-white", children: name }),
                  role ? /* @__PURE__ */ jsx37("span", { className: "truncate text-xs text-subtle", children: role }) : null,
                  user.email ? /* @__PURE__ */ jsx37("span", { className: "truncate text-xs text-subtle", children: user.email }) : null
                ] }),
                /* @__PURE__ */ jsxs28("div", { className: "p-1.5", children: [
                  /* @__PURE__ */ jsx37(MenuItem4, { children: /* @__PURE__ */ jsxs28(Link4, { to: "/settings", className: menuItemClassName3, children: [
                    /* @__PURE__ */ jsx37(Cog6ToothIcon2, { className: "size-4 shrink-0 text-subtle" }),
                    /* @__PURE__ */ jsx37("span", { children: "Settings" })
                  ] }) }),
                  /* @__PURE__ */ jsx37(MenuItem4, { children: /* @__PURE__ */ jsxs28("button", { type: "button", onClick: onLogout, className: menuItemClassName3, children: [
                    /* @__PURE__ */ jsx37(ArrowLeftStartOnRectangleIcon2, { className: "size-4 shrink-0 text-subtle" }),
                    /* @__PURE__ */ jsx37("span", { children: "Logout" })
                  ] }) })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx37("div", { className: "flex border-t border-line px-3 py-2 data-[collapsed=true]:justify-center", "data-collapsed": collapsed, children: /* @__PURE__ */ jsx37("button", { type: "button", onClick: () => setCollapsed((current2) => !current2), "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar", "aria-expanded": !collapsed, className: "group flex cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-subtle outline-none transition hover:bg-white/5 hover:text-white", children: /* @__PURE__ */ jsx37(SidebarPanelIcon2, { className: "size-5 shrink-0" }) }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx37("main", { className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", children })
  ] });
};

// src/components/SubNav.tsx
import { Link as Link5 } from "@tanstack/react-router";
import { jsx as jsx38, jsxs as jsxs29 } from "react/jsx-runtime";
var tabActive = "flex items-center border-b-2 border-orange-100 px-3 text-sm font-semibold text-orange-100 transition";
var tabInactive = "flex items-center border-b-2 border-transparent px-3 text-sm font-semibold text-subtle transition hover:text-white";
var itemId = (item) => item.id ?? item.to ?? item.label;
function SubNav({
  items,
  onChange,
  value
}) {
  return /* @__PURE__ */ jsxs29("div", { className: "shrink-0", children: [
    /* @__PURE__ */ jsx38("div", { className: "flex h-12 items-stretch gap-1 overflow-x-auto px-5", children: items.map((item) => {
      const id = itemId(item);
      if (item.to && !onChange) {
        return /* @__PURE__ */ jsx38(
          Link5,
          {
            to: item.to,
            activeProps: { className: tabActive },
            inactiveProps: { className: tabInactive },
            children: item.label
          },
          id
        );
      }
      const active = value === id;
      return /* @__PURE__ */ jsx38("button", { type: "button", className: active ? tabActive : tabInactive, onClick: () => onChange?.(id), children: item.label }, id);
    }) }),
    /* @__PURE__ */ jsx38("div", { className: "-mt-px border-b border-grey-700t", "aria-hidden": "true" })
  ] });
}

// src/components/SummaryCard.tsx
import { jsx as jsx39, jsxs as jsxs30 } from "react/jsx-runtime";
function SummaryCard({
  actions,
  children,
  status,
  title
}) {
  return /* @__PURE__ */ jsxs30("div", { className: "rounded-[2px] border border-grey-700t bg-secondary p-5", children: [
    /* @__PURE__ */ jsxs30("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs30("div", { className: "flex min-w-0 flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx39("h2", { className: "truncate font-grotesque text-[30px] font-semibold leading-9 text-white", children: title }),
        status ? /* @__PURE__ */ jsx39("span", { className: "rounded-full bg-white/10 px-2.5 py-1 text-sm font-semibold capitalize text-subtle", children: status }) : null
      ] }),
      actions
    ] }),
    children
  ] });
}

// src/components/OrganisationPage.tsx
import { Menu as Menu5, MenuButton as MenuButton5, MenuItem as MenuItem5, MenuItems as MenuItems5 } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareIcon2,
  BuildingOfficeIcon,
  EllipsisVerticalIcon as EllipsisVerticalIcon2,
  EnvelopeIcon as EnvelopeIcon3,
  IdentificationIcon,
  LinkIcon,
  MapPinIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { useState as useState14 } from "react";
import { jsx as jsx40, jsxs as jsxs31 } from "react/jsx-runtime";
var blank = {
  billingAddressLine1: "",
  billingAddressLine2: "",
  billingCity: "",
  billingContactFirstName: "",
  billingContactLastName: "",
  billingCountry: "",
  billingCounty: "",
  billingEmail: "",
  billingPostcode: "",
  name: "",
  registeredCompanyName: "",
  registeredCompanyNumber: "",
  taxId: "",
  website: ""
};
var fields = [
  ["name", "Name"],
  ["registeredCompanyName", "Registered company name"],
  ["website", "Website"],
  ["billingEmail", "Billing email"],
  ["billingContactFirstName", "Billing contact first name"],
  ["billingContactLastName", "Billing contact last name"],
  ["registeredCompanyNumber", "Company number"],
  ["taxId", "Tax ID / VAT"],
  ["billingAddressLine1", "Billing line 1"],
  ["billingAddressLine2", "Billing line 2"],
  ["billingCity", "City"],
  ["billingCounty", "County"],
  ["billingPostcode", "Postcode"],
  ["billingCountry", "Country"]
];
var emptyToNull = (value) => {
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};
var menuItemClassName4 = "flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white";
var OrgField = ({
  Icon,
  label,
  value
}) => /* @__PURE__ */ jsxs31("div", { children: [
  /* @__PURE__ */ jsx40("dt", { className: "text-xs leading-[18px] text-low-priority", children: label }),
  /* @__PURE__ */ jsxs31("dd", { className: "mt-2 flex min-w-0 items-center gap-2 text-sm text-white", children: [
    /* @__PURE__ */ jsx40(Icon, { className: "size-4 shrink-0 text-low-priority", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx40("span", { className: "min-w-0", children: value })
  ] })
] });
var OrganisationPage = ({ aside }) => {
  const { organisationClaim } = useFluentConfig();
  const { organisationUuid, user } = useDirectory();
  const membership = user.organisations.find((organisation2) => organisation2.uuid === organisationUuid);
  const canManage = membership?.claims.includes(organisationClaim) ?? false;
  const organisation = useSignetQuery(
    ["organisation", organisationUuid],
    `/api/resources/organisations/${organisationUuid}`,
    organisationUuid !== "" && canManage
  );
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState14(false);
  const [form, setForm] = useState14(blank);
  const [saving, setSaving] = useState14(false);
  const record = organisation.data;
  const openEdit = () => {
    if (!record) return;
    setForm({
      billingAddressLine1: record.billingAddressLine1 ?? "",
      billingAddressLine2: record.billingAddressLine2 ?? "",
      billingCity: record.billingCity ?? "",
      billingContactFirstName: record.billingContactFirstName ?? "",
      billingContactLastName: record.billingContactLastName ?? "",
      billingCountry: countryValue(record.billingCountry),
      billingCounty: record.billingCounty ?? "",
      billingEmail: record.billingEmail ?? "",
      billingPostcode: record.billingPostcode ?? "",
      name: record.name,
      registeredCompanyName: record.registeredCompanyName ?? "",
      registeredCompanyNumber: record.registeredCompanyNumber ?? "",
      taxId: record.taxId ?? "",
      website: record.website ?? ""
    });
    setEditing(true);
  };
  const address = record ? [record.billingAddressLine1, record.billingAddressLine2, record.billingCity, record.billingCounty, record.billingPostcode, countryName(record.billingCountry)].map((part) => part?.trim()).filter((part) => part).join(", ") : "";
  const contact = record ? [record.billingContactFirstName, record.billingContactLastName].filter(Boolean).join(" ") : "";
  if (!canManage) {
    return /* @__PURE__ */ jsx40("p", { className: "p-6 text-sm text-subtle", children: "You do not have access to this organisation." });
  }
  const website = record?.website?.trim() ?? "";
  const websiteHref = /^https?:\/\//i.test(website) ? website : `https://${website}`;
  return /* @__PURE__ */ jsxs31("section", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto", children: [
    /* @__PURE__ */ jsx40(PageHeader, { title: "Organisation" }),
    record ? /* @__PURE__ */ jsxs31("div", { className: "border-b border-grey-700t px-5 py-5", children: [
      /* @__PURE__ */ jsxs31("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsx40("h2", { className: "min-w-0 truncate font-grotesque text-[30px] font-semibold leading-9 text-white", children: record.name }),
        /* @__PURE__ */ jsxs31(Menu5, { children: [
          /* @__PURE__ */ jsx40(MenuButton5, { "aria-label": "Organisation actions", className: "rounded-[2px] p-2 text-subtle outline-none transition hover:bg-white/5 hover:text-white", children: /* @__PURE__ */ jsx40(EllipsisVerticalIcon2, { className: "size-5" }) }),
          /* @__PURE__ */ jsx40(MenuItems5, { portal: true, anchor: { to: "bottom end", gap: 6 }, className: "z-50 min-w-44 rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-hidden", children: /* @__PURE__ */ jsx40("div", { className: "p-1.5", children: /* @__PURE__ */ jsx40(MenuItem5, { children: /* @__PURE__ */ jsx40("button", { type: "button", className: menuItemClassName4, onClick: openEdit, children: "Edit organisation" }) }) }) })
        ] })
      ] }),
      website !== "" || address !== "" ? /* @__PURE__ */ jsxs31("div", { className: "mt-4 flex flex-col gap-2 text-sm text-subtle", children: [
        website !== "" ? /* @__PURE__ */ jsxs31("a", { className: "inline-flex w-fit max-w-full items-center gap-2 transition hover:text-white", href: websiteHref, rel: "noopener noreferrer", target: "_blank", children: [
          /* @__PURE__ */ jsx40(LinkIcon, { className: "size-4 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx40("span", { className: "min-w-0 break-all", children: website }),
          /* @__PURE__ */ jsx40(ArrowTopRightOnSquareIcon2, { className: "size-4 shrink-0", "aria-hidden": "true" })
        ] }) : null,
        address !== "" ? /* @__PURE__ */ jsxs31("p", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsx40(MapPinIcon, { className: "mt-0.5 size-4 shrink-0", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx40("span", { children: address })
        ] }) : null
      ] }) : null
    ] }) : null,
    /* @__PURE__ */ jsxs31("div", { className: aside ? "grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-grey-700t" : "", children: [
      record ? /* @__PURE__ */ jsxs31("section", { className: "px-5 py-5", children: [
        /* @__PURE__ */ jsx40("h3", { className: "mb-5 font-grotesque text-2xl/7 font-semibold text-white", children: "Account" }),
        /* @__PURE__ */ jsxs31("dl", { className: "flex max-w-xl flex-col gap-5", children: [
          /* @__PURE__ */ jsx40(OrgField, { Icon: BuildingOfficeIcon, label: "Registered company", value: record.registeredCompanyName ?? "\u2014" }),
          /* @__PURE__ */ jsx40(OrgField, { Icon: UserCircleIcon, label: "Account manager", value: contact !== "" ? contact : "\u2014" }),
          /* @__PURE__ */ jsx40(OrgField, { Icon: EnvelopeIcon3, label: "Billing email", value: record.billingEmail ?? "\u2014" }),
          /* @__PURE__ */ jsx40(OrgField, { Icon: IdentificationIcon, label: "Company number", value: record.registeredCompanyNumber ?? "\u2014" }),
          /* @__PURE__ */ jsx40(OrgField, { Icon: IdentificationIcon, label: "Tax ID / VAT", value: record.taxId ?? "\u2014" })
        ] })
      ] }) : organisation.isPending ? /* @__PURE__ */ jsx40(FullLoader, {}) : /* @__PURE__ */ jsx40("p", { className: "p-6 text-sm text-subtle", children: "This organisation is not available." }),
      aside ? /* @__PURE__ */ jsx40("div", { className: "min-w-0", children: aside }) : null
    ] }),
    /* @__PURE__ */ jsx40(
      Modal,
      {
        open: editing,
        onClose: () => setEditing(false),
        title: "Edit organisation",
        panelClassName: "w-full max-w-2xl",
        footer: /* @__PURE__ */ jsx40(
          ModalFooter,
          {
            onCancel: () => setEditing(false),
            primaryLabel: saving ? "Saving..." : "Save",
            primaryLoading: saving,
            primaryDisabled: form.name.trim() === "" || saving,
            onPrimary: () => {
              setSaving(true);
              void mutate(`/api/resources/organisations/${organisationUuid}`, {
                method: "PATCH",
                body: JSON.stringify({
                  billingAddressLine1: emptyToNull(form.billingAddressLine1),
                  billingAddressLine2: emptyToNull(form.billingAddressLine2),
                  billingCity: emptyToNull(form.billingCity),
                  billingContactFirstName: emptyToNull(form.billingContactFirstName),
                  billingContactLastName: emptyToNull(form.billingContactLastName),
                  billingCountry: emptyToNull(form.billingCountry),
                  billingCounty: emptyToNull(form.billingCounty),
                  billingEmail: emptyToNull(form.billingEmail),
                  billingPostcode: emptyToNull(form.billingPostcode),
                  name: form.name.trim(),
                  registeredCompanyName: emptyToNull(form.registeredCompanyName),
                  registeredCompanyNumber: emptyToNull(form.registeredCompanyNumber),
                  taxId: emptyToNull(form.taxId),
                  website: emptyToNull(form.website)
                })
              }).then(() => {
                setEditing(false);
                return queryClient.invalidateQueries({ queryKey: ["signet", "organisation", organisationUuid] });
              }).catch(() => void 0).finally(() => setSaving(false));
            }
          }
        ),
        children: /* @__PURE__ */ jsx40("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: fields.map(
          ([key, label]) => key === "billingCountry" ? /* @__PURE__ */ jsx40(
            CountrySelect,
            {
              label,
              name: key,
              value: form.billingCountry,
              onChange: (value) => setForm((current2) => ({ ...current2, billingCountry: value }))
            },
            key
          ) : /* @__PURE__ */ jsx40(
            Input,
            {
              label,
              name: key,
              value: form[key],
              onChange: (event) => setForm((current2) => ({ ...current2, [key]: event.target.value }))
            },
            key
          )
        ) })
      }
    )
  ] });
};

// src/components/TeamPage.tsx
import { Menu as Menu6, MenuButton as MenuButton6, MenuItem as MenuItem6, MenuItems as MenuItems6 } from "@headlessui/react";
import { EllipsisVerticalIcon as EllipsisVerticalIcon3, MagnifyingGlassIcon as MagnifyingGlassIcon2, PlusIcon as PlusIcon2 } from "@heroicons/react/24/outline";
import { useState as useState16 } from "react";

// src/signet/useTeam.ts
var withClient = (path, clientId, organisationUuid) => {
  const url = new URL(path, "https://signet.local");
  url.searchParams.set("client", clientId);
  if (organisationUuid) url.searchParams.set("organisation", organisationUuid);
  return `${url.pathname}${url.search}`;
};
var useTeam = () => {
  const { clientId, teamClaim } = useFluentConfig();
  const { organisationUuid, user } = useDirectory();
  const membership = user.organisations.find((organisation) => organisation.uuid === organisationUuid);
  const canManage = membership?.claims.includes(teamClaim) ?? false;
  const membersPath = withClient(`/api/resources/organisations/${organisationUuid}/members`, clientId);
  const membersQuery = useSignetQuery(
    ["members", clientId, organisationUuid],
    membersPath,
    organisationUuid !== "" && canManage
  );
  const rolesQuery = useSignetQuery(
    ["roles", clientId, organisationUuid],
    withClient("/api/resources/roles", clientId, organisationUuid),
    organisationUuid !== "" && canManage
  );
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["signet", "members", clientId, organisationUuid] });
  return {
    canManage,
    invite: (email, role) => mutate(membersPath, {
      body: JSON.stringify({ client: clientId, email: email.trim(), role }),
      method: "POST"
    }).then(refresh),
    members: membersQuery.data?.items ?? [],
    pending: membersQuery.isPending,
    remove: (userUuid) => mutate(withClient(`/api/resources/organisations/${organisationUuid}/members/${userUuid}`, clientId), {
      method: "DELETE"
    }).then(refresh),
    roleOptions: (rolesQuery.data?.items ?? []).map((item) => ({ label: roleLabel(item.name), value: item.name })),
    updateRole: (userUuid, role) => mutate(withClient(`/api/resources/organisations/${organisationUuid}/members/${userUuid}`, clientId), {
      body: JSON.stringify({ client: clientId, role }),
      method: "PATCH"
    }).then(refresh)
  };
};

// src/components/DataTable.tsx
import { useState as useState15 } from "react";
import { jsx as jsx41, jsxs as jsxs32 } from "react/jsx-runtime";
function DataTable({
  columns,
  empty = "Nothing here yet.",
  pageSize = 25,
  rows,
  rowKey
}) {
  const [page, setPage] = useState15(1);
  const [perPage, setPerPage] = useState15(pageSize);
  const lastPage = Math.max(1, Math.ceil(rows.length / perPage));
  const current2 = Math.min(page, lastPage);
  const visible = rows.slice((current2 - 1) * perPage, current2 * perPage);
  const width = columns.length === 0 ? 100 : Math.floor(100 / columns.length);
  return /* @__PURE__ */ jsxs32(TableContainer, { flush: true, className: "min-h-0 flex-1", children: [
    /* @__PURE__ */ jsx41(
      TableColumns,
      {
        widthType: "pc",
        columns: columns.map((column) => ({ heading: column.header, width }))
      }
    ),
    visible.length === 0 ? typeof empty === "string" ? /* @__PURE__ */ jsx41("p", { className: "px-5 py-6 text-sm text-subtle", children: empty }) : empty : /* @__PURE__ */ jsx41(
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
    /* @__PURE__ */ jsx41(
      TablePagination,
      {
        page: current2,
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

// src/components/TeamPage.tsx
import { jsx as jsx42, jsxs as jsxs33 } from "react/jsx-runtime";
var menuItemClassName5 = "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5";
var TeamPage = ({
  onManageUser
}) => {
  const team = useTeam();
  const [email, setEmail] = useState16("");
  const [role, setRole] = useState16("member");
  const [search, setSearch] = useState16("");
  const [inviting, setInviting] = useState16(false);
  const query = search.trim().toLowerCase();
  const members = team.members.filter((member) => {
    if (query === "") return true;
    return member.email.toLowerCase().includes(query) || member.role.toLowerCase().includes(query);
  });
  const close = () => {
    setInviting(false);
    setEmail("");
    setRole("member");
  };
  if (!team.canManage) {
    return /* @__PURE__ */ jsx42("p", { className: "p-6 text-sm text-subtle", children: "You do not have access to this team." });
  }
  return /* @__PURE__ */ jsxs33("section", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsx42(
      PageHeader,
      {
        title: "Team",
        button: { icon: PlusIcon2, label: "Invite", onClick: () => setInviting(true) }
      }
    ),
    /* @__PURE__ */ jsx42("div", { className: "flex items-center justify-between gap-3 border-b border-grey-700t px-5 py-3", children: /* @__PURE__ */ jsx42("div", { className: "w-full sm:w-72", children: /* @__PURE__ */ jsx42(
      Input,
      {
        Icon: MagnifyingGlassIcon2,
        name: "search",
        placeholder: "Search for members",
        value: search,
        onChange: (event) => setSearch(event.target.value)
      }
    ) }) }),
    /* @__PURE__ */ jsx42(
      Modal,
      {
        open: inviting,
        onClose: close,
        title: "Invite",
        footer: /* @__PURE__ */ jsx42(
          ModalFooter,
          {
            onCancel: close,
            primaryDisabled: email.trim() === "",
            primaryLabel: "Invite",
            onPrimary: () => {
              void team.invite(email, role).then(close).catch(() => void 0);
            }
          }
        ),
        children: /* @__PURE__ */ jsxs33("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx42(Input, { label: "Email", name: "member-email", type: "email", value: email, onChange: (event) => setEmail(event.target.value) }),
          /* @__PURE__ */ jsx42(Select, { label: "Role", name: "member-role", value: role, options: team.roleOptions, onChange: setRole })
        ] })
      }
    ),
    /* @__PURE__ */ jsx42(
      DataTable,
      {
        empty: team.pending ? /* @__PURE__ */ jsx42(FullLoader, {}) : "No members yet.",
        rowKey: (member) => member.userUuid,
        rows: members,
        columns: [
          { cell: (member) => member.email, header: "Email", key: "email" },
          {
            cell: (member) => /* @__PURE__ */ jsx42(
              Select,
              {
                name: `member-role-${member.userUuid}`,
                widthClass: "w-36",
                value: member.role,
                options: team.roleOptions,
                onChange: (next) => {
                  void team.updateRole(member.userUuid, next).catch(() => void 0);
                }
              }
            ),
            header: "Role",
            key: "role"
          },
          {
            cell: (member) => /* @__PURE__ */ jsx42(
              MemberMenu,
              {
                member,
                onManage: onManageUser ? () => onManageUser(member.userUuid) : void 0,
                onRemove: () => void team.remove(member.userUuid).catch(() => void 0)
              }
            ),
            header: "",
            key: "actions"
          }
        ]
      }
    )
  ] });
};
var MemberMenu = ({
  member,
  onManage,
  onRemove
}) => /* @__PURE__ */ jsxs33(Menu6, { children: [
  /* @__PURE__ */ jsx42(
    MenuButton6,
    {
      "aria-label": `Actions for ${member.email}`,
      className: "rounded-[2px] p-1 text-subtle outline-none hover:bg-white/5 hover:text-white",
      children: /* @__PURE__ */ jsx42(EllipsisVerticalIcon3, { className: "size-5" })
    }
  ),
  /* @__PURE__ */ jsxs33(
    MenuItems6,
    {
      portal: true,
      anchor: { to: "bottom end", gap: 6 },
      className: "z-50 flex min-w-44 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none",
      children: [
        onManage ? /* @__PURE__ */ jsx42(MenuItem6, { children: /* @__PURE__ */ jsx42("button", { type: "button", className: menuItemClassName5, onClick: onManage, children: "Manage user" }) }) : null,
        /* @__PURE__ */ jsx42(MenuItem6, { children: /* @__PURE__ */ jsx42("button", { type: "button", className: menuItemClassName5, onClick: onRemove, children: "Remove" }) })
      ]
    }
  )
] });

// src/components/SettingsPage.tsx
import { Menu as Menu7, MenuButton as MenuButton7, MenuItem as MenuItem7, MenuItems as MenuItems7 } from "@headlessui/react";
import { EllipsisVerticalIcon as EllipsisVerticalIcon4 } from "@heroicons/react/24/outline";
import { useEffect as useEffect7, useState as useState17 } from "react";
import { jsx as jsx43, jsxs as jsxs34 } from "react/jsx-runtime";
var sideNavItemClassName = (active) => ["w-full rounded-[2px] px-3 py-2 text-left text-sm font-semibold outline-none transition", active ? "bg-orange-100/10 text-orange-100" : "text-low hover:bg-white/5 hover:text-white"].join(" ");
var serviceLabel = (provider) => {
  const names = {
    github: "GitHub",
    gitlab: "GitLab",
    google: "Google",
    microsoft: "Microsoft",
    slack: "Slack"
  };
  return names[provider] ?? roleLabel(provider);
};
var menuItemClassName6 = "flex w-full cursor-pointer items-center gap-2.5 rounded-[2px] px-2.5 py-2.5 text-left text-sm font-semibold text-subtle data-focus:bg-white/5 data-focus:text-white";
var sectionFromHash = (hasNotifications) => {
  const hash = window.location.hash.replace("#", "");
  if (hash === "connected-services") return "connected-services";
  if (hash === "notifications" && hasNotifications) return "notifications";
  return "account";
};
var SettingsPage = () => {
  const { endpoint } = useFluentConfig();
  const { currentOrganisation, user } = useDirectory();
  const groups = useNotificationGroups();
  const hasNotifications = (groups?.length ?? 0) > 0;
  const [section, setSection] = useState17(() => sectionFromHash(hasNotifications));
  const [providers, setProviders] = useState17([]);
  const [confirmRemove, setConfirmRemove] = useState17(null);
  const [removing, setRemoving] = useState17(false);
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const given = user.given_name?.trim() ?? "";
  const family = user.family_name?.trim() ?? "";
  const name = [given, family].filter((part) => part !== "").join(" ") || user.name?.trim() || user.email;
  useEffect7(() => {
    void fetch(`${endpoint.replace(/\/$/, "")}/oauth/providers`).then(async (response) => {
      if (!response.ok) return;
      const body = await response.json();
      setProviders((body.providers ?? []).filter((provider) => provider !== "credentials"));
    }).catch(() => void 0);
  }, [endpoint]);
  const connected = providers.filter((provider) => user.connections.some((connection) => connection.method === provider));
  const choose = (next) => {
    setSection(next);
    window.history.replaceState(null, "", next === "account" ? "/settings" : `/settings#${next}`);
  };
  return /* @__PURE__ */ jsxs34("section", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsx43(PageHeader, { title: "Settings" }),
    /* @__PURE__ */ jsxs34("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs34("aside", { className: "flex w-52 shrink-0 flex-col gap-0.5 self-stretch border-r border-grey-700t px-3 py-4", "aria-label": "Settings sections", children: [
        /* @__PURE__ */ jsx43("button", { type: "button", className: sideNavItemClassName(section === "account"), onClick: () => choose("account"), children: "Account" }),
        hasNotifications ? /* @__PURE__ */ jsx43("button", { type: "button", className: sideNavItemClassName(section === "notifications"), onClick: () => choose("notifications"), children: "Notifications" }) : null,
        /* @__PURE__ */ jsx43("button", { type: "button", className: sideNavItemClassName(section === "connected-services"), onClick: () => choose("connected-services"), children: "Connected Services" })
      ] }),
      /* @__PURE__ */ jsxs34("div", { className: section === "connected-services" ? "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" : "flex min-h-0 flex-1 flex-col overflow-y-auto p-5", children: [
        section === "account" ? /* @__PURE__ */ jsx43("div", { className: "flex max-w-3xl flex-col gap-8", children: /* @__PURE__ */ jsxs34("section", { children: [
          /* @__PURE__ */ jsx43("h2", { className: "mb-4 font-grotesque text-xl font-semibold", children: "Profile" }),
          /* @__PURE__ */ jsxs34("dl", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs34("div", { children: [
              /* @__PURE__ */ jsx43("dt", { className: "mb-1 text-sm text-subtle", children: "Role" }),
              /* @__PURE__ */ jsx43("dd", { className: "font-semibold text-orange-100", children: displayRole(currentOrganisation?.role, user.role) || "\u2014" })
            ] }),
            /* @__PURE__ */ jsxs34("div", { children: [
              /* @__PURE__ */ jsx43("dt", { className: "mb-1 text-sm text-subtle", children: "Name" }),
              /* @__PURE__ */ jsx43("dd", { className: "text-low", children: name || "\u2014" })
            ] }),
            /* @__PURE__ */ jsxs34("div", { children: [
              /* @__PURE__ */ jsx43("dt", { className: "mb-1 text-sm text-subtle", children: "Email" }),
              /* @__PURE__ */ jsx43("dd", { className: "text-low", children: user.email || "\u2014" })
            ] })
          ] })
        ] }) }) : null,
        section === "notifications" && groups ? /* @__PURE__ */ jsx43("div", { className: "flex max-w-3xl flex-col gap-8", children: groups.map((group) => /* @__PURE__ */ jsxs34("section", { children: [
          /* @__PURE__ */ jsx43("h2", { className: "mb-4 font-grotesque text-xl font-semibold", children: group.title }),
          /* @__PURE__ */ jsx43("ul", { className: "flex flex-col gap-3", children: group.options.map((option) => /* @__PURE__ */ jsxs34("li", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs34("span", { children: [
              /* @__PURE__ */ jsx43("span", { className: "block text-sm text-white", children: option.label }),
              option.description ? /* @__PURE__ */ jsx43("span", { className: "block text-xs text-subtle", children: option.description }) : null
            ] }),
            /* @__PURE__ */ jsx43("button", { type: "button", "aria-pressed": option.enabled, className: "text-sm font-semibold text-orange-100", onClick: () => option.onChange(!option.enabled), children: option.enabled ? "On" : "Off" })
          ] }, option.id)) })
        ] }, group.id)) }) : null,
        section === "connected-services" ? /* @__PURE__ */ jsx43(
          DataTable,
          {
            empty: "No connected services.",
            rowKey: (provider) => provider,
            rows: connected,
            columns: [
              { cell: (provider) => /* @__PURE__ */ jsx43("span", { className: "font-semibold text-white", children: serviceLabel(provider) }), header: "Service", key: "service" },
              {
                cell: (provider) => {
                  const connected2 = user.connections.some((connection) => connection.method === provider);
                  return connected2 ? /* @__PURE__ */ jsx43(Pill, { size: "small", colour: "#3EB077", text: "Connected", outline: true }) : /* @__PURE__ */ jsx43("span", { className: "text-sm text-low", children: "Not connected" });
                },
                header: "Status",
                key: "status"
              },
              {
                cell: (provider) => {
                  const connected2 = user.connections.some((connection) => connection.method === provider);
                  const canChange = provider === "github" || provider === "google";
                  if (!canChange) return null;
                  const href = `${endpoint.replace(/\/$/, "")}/connect/${provider}?return_to=${encodeURIComponent(window.location.href)}`;
                  return /* @__PURE__ */ jsxs34(Menu7, { children: [
                    /* @__PURE__ */ jsx43(MenuButton7, { "aria-label": `${provider} actions`, className: "rounded-[2px] p-2 text-subtle outline-none transition hover:bg-white/5 hover:text-white", children: /* @__PURE__ */ jsx43(EllipsisVerticalIcon4, { className: "size-5" }) }),
                    /* @__PURE__ */ jsx43(MenuItems7, { portal: true, anchor: { to: "bottom end", gap: 6 }, className: "z-50 min-w-44 rounded-[2px] border border-line bg-secondary text-white shadow-xl outline-hidden", children: /* @__PURE__ */ jsx43("div", { className: "p-1.5", children: connected2 ? /* @__PURE__ */ jsx43(MenuItem7, { children: /* @__PURE__ */ jsx43("button", { type: "button", className: menuItemClassName6, onClick: () => setConfirmRemove(provider), children: "Remove" }) }) : /* @__PURE__ */ jsx43(MenuItem7, { children: /* @__PURE__ */ jsx43("a", { href, className: menuItemClassName6, children: "Connect" }) }) }) })
                  ] });
                },
                header: "",
                key: "actions"
              }
            ]
          }
        ) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx43(
      ConfirmDialog,
      {
        confirmLabel: "Remove",
        loading: removing,
        message: confirmRemove ? `Remove your ${serviceLabel(confirmRemove)} connection?` : "Remove this connection?",
        open: confirmRemove != null,
        title: "Remove Connection",
        onClose: () => setConfirmRemove(null),
        onConfirm: () => {
          if (!confirmRemove) return;
          setRemoving(true);
          void mutate(`/oauth/connections/${confirmRemove}`, { method: "DELETE" }).then(() => {
            setConfirmRemove(null);
            return queryClient.invalidateQueries({ queryKey: ["signet", "directory"] });
          }).catch(() => void 0).finally(() => setRemoving(false));
        }
      }
    )
  ] });
};

// src/components/BillingPage.tsx
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PlusIcon as PlusIcon3 } from "@heroicons/react/24/outline";
import { useEffect as useEffect8, useRef as useRef2, useState as useState19 } from "react";

// src/components/TransactionsList.tsx
import { Menu as Menu8, MenuButton as MenuButton8, MenuItem as MenuItem8, MenuItems as MenuItems8 } from "@headlessui/react";
import { ArrowDownTrayIcon as ArrowDownTrayIcon2, MagnifyingGlassIcon as MagnifyingGlassIcon3 } from "@heroicons/react/24/outline";
import { useState as useState18 } from "react";
import { jsx as jsx44, jsxs as jsxs35 } from "react/jsx-runtime";
var typeLabels = {
  stripe_payment: { label: "Payment", colour: "#3EB077" },
  xero_invoice: { label: "Invoice", colour: "#3B82F6" },
  credit: { label: "Credit", colour: "#3EB077" },
  debit: { label: "Debit", colour: "#EF4444" }
};
var periodOptions = [
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "lastMonth", label: "Last month" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "all", label: "All time" }
];
var money2 = (amount) => `\xA3${Math.abs(amount).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
var isoDate = (date) => date.toISOString().slice(0, 10);
var formatExportDate = (iso) => (/* @__PURE__ */ new Date(`${iso}T00:00:00Z`)).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC"
});
var periodRange = (period) => {
  if (period === "all") return {};
  const to = /* @__PURE__ */ new Date();
  const from = /* @__PURE__ */ new Date();
  if (period === "week") {
    const weekday = from.getUTCDay();
    from.setUTCDate(from.getUTCDate() - (weekday === 0 ? 6 : weekday - 1));
  } else if (period === "7d") {
    from.setUTCDate(from.getUTCDate() - 6);
  } else if (period === "90d") {
    from.setUTCDate(from.getUTCDate() - 89);
  } else if (period === "month") {
    from.setUTCDate(1);
  } else if (period === "lastMonth") {
    const start = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth() - 1, 1));
    const end = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0));
    return { from: isoDate(start), to: isoDate(end) };
  } else {
    from.setUTCDate(from.getUTCDate() - 29);
  }
  return { from: isoDate(from), to: isoDate(to) };
};
var headers = ["Date", "Title", "Description", "Client", "Type", "Spend", "Tax", "Total"];
var TransactionsList = ({
  appClientId,
  canFilterClients,
  organisationUuid
}) => {
  const [query, setQuery] = useState18("");
  const [client, setClient] = useState18("");
  const [type, setType] = useState18("");
  const [period, setPeriod] = useState18("month");
  const [page, setPage] = useState18(1);
  const [perPage, setPerPage] = useState18(25);
  const range = periodRange(period);
  const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });
  if (canFilterClients) {
    if (client !== "") params.set("client", client);
  } else if (appClientId !== "") {
    params.set("client", appClientId);
  }
  if (query.trim() !== "") params.set("query", query.trim());
  if (type !== "") params.set("type", type);
  if (range.from) params.set("from", range.from);
  if (range.to) params.set("to", range.to);
  const { currentOrganisation } = useDirectory();
  const mutate = useSignetMutation();
  const result = useSignetQuery(
    ["billing-transactions", organisationUuid, params.toString()],
    `/api/resources/organisations/${organisationUuid}/transactions?${params.toString()}`,
    organisationUuid !== "" && (canFilterClients || appClientId !== "")
  );
  if (result.isPending) return /* @__PURE__ */ jsx44(FullLoader, {});
  if (result.isError || !result.data) return /* @__PURE__ */ jsx44("p", { className: "p-5 text-sm text-subtle", children: "Transactions could not be loaded." });
  const exportRows = async () => {
    const collected = [];
    let nextPage = 1;
    let lastPage = 1;
    do {
      const exportParams = new URLSearchParams(params);
      exportParams.set("page", String(nextPage));
      exportParams.set("perPage", "100");
      const body = await mutate(
        `/api/resources/organisations/${organisationUuid}/transactions?${exportParams.toString()}`,
        { method: "GET" }
      );
      lastPage = body.pagination.lastPage;
      for (const entry of body.items) {
        const debit = entry.gross < 0;
        collected.push([
          new Date(entry.createdAt).toLocaleDateString("en-GB"),
          entry.title ?? "-",
          entry.description ?? "-",
          entry.clientId,
          typeLabels[entry.type].label,
          money2(entry.net),
          money2(entry.vat),
          `${debit ? "-" : "+"}${money2(entry.gross)}`
        ]);
      }
      nextPage += 1;
    } while (nextPage <= lastPage);
    return collected;
  };
  return /* @__PURE__ */ jsxs35(
    TableContainer,
    {
      className: "min-h-0 flex-1",
      flush: true,
      title: "Transactions",
      toolbar: /* @__PURE__ */ jsxs35(Menu8, { children: [
        /* @__PURE__ */ jsxs35(MenuButton8, { className: "flex h-10 shrink-0 items-center gap-2 rounded-[2px] border border-grey-700t px-4 text-sm font-bold text-low-priority outline-none hover:bg-white/5", children: [
          /* @__PURE__ */ jsx44(ArrowDownTrayIcon2, { "aria-hidden": "true", className: "size-[18px]" }),
          "Export"
        ] }),
        /* @__PURE__ */ jsxs35(MenuItems8, { portal: true, anchor: { to: "bottom end", gap: 6 }, className: "z-50 min-w-36 rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none", children: [
          /* @__PURE__ */ jsx44(MenuItem8, { children: /* @__PURE__ */ jsx44(
            "button",
            {
              type: "button",
              className: "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5",
              onClick: () => {
                void exportRows().then((exported) => downloadCsv("transactions.csv", headers, exported));
              },
              children: "CSV"
            }
          ) }),
          /* @__PURE__ */ jsx44(MenuItem8, { children: /* @__PURE__ */ jsx44(
            "button",
            {
              type: "button",
              className: "w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5",
              onClick: () => {
                void exportRows().then(
                  (exported) => downloadPdf("transactions.pdf", "Transactions", headers, exported, {
                    organisationName: currentOrganisation?.name ?? "Organisation",
                    periodLabel: range.from && range.to ? `${formatExportDate(range.from)} \u2013 ${formatExportDate(range.to)}` : "All time"
                  })
                );
              },
              children: "PDF"
            }
          ) })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsxs35("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-grey-700t px-5 py-3", children: [
          /* @__PURE__ */ jsx44(
            Input,
            {
              name: "transactionQuery",
              Icon: MagnifyingGlassIcon3,
              value: query,
              placeholder: "Search descriptions",
              className: "w-full sm:w-72",
              onChange: (event) => {
                setPage(1);
                setQuery(event.target.value);
              }
            }
          ),
          /* @__PURE__ */ jsxs35("div", { className: "flex flex-wrap items-center justify-end gap-3", children: [
            canFilterClients ? /* @__PURE__ */ jsx44(
              Select,
              {
                placeholder: "All clients",
                widthClass: "w-44",
                value: client,
                onChange: (value) => {
                  setPage(1);
                  setClient(value);
                },
                options: [
                  { value: "", label: "All clients" },
                  ...(result.data.clients ?? []).map((id) => ({ value: id, label: id }))
                ]
              }
            ) : null,
            /* @__PURE__ */ jsx44(
              Select,
              {
                placeholder: "This month",
                widthClass: "w-44",
                value: period,
                onChange: (value) => {
                  setPage(1);
                  setPeriod(value);
                },
                options: periodOptions
              }
            ),
            /* @__PURE__ */ jsx44(
              Select,
              {
                placeholder: "All types",
                widthClass: "w-44",
                value: type,
                onChange: (value) => {
                  setPage(1);
                  setType(value);
                },
                options: [
                  { value: "", label: "All types" },
                  { value: "stripe_payment", label: "Stripe payment" },
                  { value: "xero_invoice", label: "Xero invoice" },
                  { value: "credit", label: "Credit" },
                  { value: "debit", label: "Debit" }
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx44(
          TableColumns,
          {
            widthType: "pc",
            columns: [
              { width: 14, heading: "Date" },
              { width: 14, heading: "Title" },
              { width: 18, heading: "Description" },
              { width: 14, heading: "Client" },
              { width: 10, heading: "Type" },
              { width: 10, heading: "Spend" },
              { width: 10, heading: "Tax" },
              { width: 10, heading: "Total" }
            ]
          }
        ),
        result.data.items.length === 0 ? /* @__PURE__ */ jsx44("p", { className: "p-4 text-subtle", children: "No transactions yet." }) : /* @__PURE__ */ jsx44(
          TableRows,
          {
            widthType: "pc",
            rows: result.data.items.map((entry) => {
              const meta = typeLabels[entry.type];
              const debit = entry.gross < 0;
              const amountClass = debit ? "text-red-400" : "text-orange-100";
              return {
                uuid: entry.uuid,
                cells: [
                  { width: 14, content: /* @__PURE__ */ jsx44("span", { className: "text-sm text-white", children: new Date(entry.createdAt).toLocaleDateString("en-GB") }) },
                  { width: 14, content: /* @__PURE__ */ jsx44("span", { className: "truncate text-sm text-white", title: entry.title ?? "", children: entry.title ?? "-" }) },
                  { width: 18, content: /* @__PURE__ */ jsx44("span", { className: "truncate text-sm text-white", title: entry.description ?? "", children: entry.description ?? "-" }) },
                  { width: 14, content: /* @__PURE__ */ jsx44("span", { className: "truncate text-sm text-white", children: entry.clientId }) },
                  { width: 10, content: /* @__PURE__ */ jsx44(Pill, { size: "small", colour: meta.colour, text: meta.label, outline: true }) },
                  { width: 10, content: /* @__PURE__ */ jsx44("span", { className: `text-sm ${amountClass}`, children: money2(entry.net) }) },
                  { width: 10, content: /* @__PURE__ */ jsx44("span", { className: `text-sm ${amountClass}`, children: money2(entry.vat) }) },
                  { width: 10, content: /* @__PURE__ */ jsxs35("span", { className: `text-sm font-semibold ${amountClass}`, children: [
                    debit ? "-" : "+",
                    money2(entry.gross)
                  ] }) }
                ]
              };
            })
          }
        ),
        /* @__PURE__ */ jsx44(
          TablePagination,
          {
            page: result.data.pagination.page,
            perPage: result.data.pagination.perPage,
            total: result.data.pagination.total,
            onPageChange: setPage,
            onPerPageChange: (next) => {
              setPage(1);
              setPerPage(next);
            }
          }
        )
      ]
    }
  );
};

// src/components/BillingPage.tsx
import { jsx as jsx45, jsxs as jsxs36 } from "react/jsx-runtime";
var stripeElementStyle = {
  base: {
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "inherit",
    "::placeholder": { color: "#70808E" }
  },
  invalid: { color: "#ef4444" }
};
var sideNavItemClassName2 = (active) => ["w-full rounded-[2px] px-3 py-2 text-left text-sm font-semibold outline-none transition", active ? "bg-orange-100/10 text-orange-100" : "text-low hover:bg-white/5 hover:text-white"].join(" ");
var readSection = (hasBalance) => {
  if (hasBalance && (window.location.hash === "#balance" || window.location.pathname.endsWith("/balance"))) {
    return "balance";
  }
  if (window.location.hash === "#payment-methods" || window.location.pathname.endsWith("/payment-methods")) {
    return "payment-methods";
  }
  if (window.location.hash === "#transactions" || window.location.pathname.endsWith("/transactions")) {
    return "transactions";
  }
  return "invoices";
};
var sectionUrl = (next) => {
  const path = window.location.pathname;
  const nested = path === "/billing/balance" || path === "/billing/invoices" || path === "/billing/payment-methods" || path === "/billing/transactions";
  if (next === "balance") return nested ? "/billing/balance" : "/billing#balance";
  if (next === "payment-methods") return nested ? "/billing/payment-methods" : "/billing#payment-methods";
  if (next === "transactions") return nested ? "/billing/transactions" : "/billing#transactions";
  return nested ? "/billing/invoices" : "/billing";
};
var note = (message) => /* @__PURE__ */ jsx45("p", { className: "p-5 text-sm text-subtle", children: message });
var CardForm = ({
  clientSecret,
  onBusyChange,
  onSuccess,
  submitRef
}) => {
  const stripe = useStripe();
  const elements2 = useElements();
  const [error, setError] = useState19("");
  const save = async () => {
    if (!stripe || !elements2) return;
    const card = elements2.getElement(CardNumberElement);
    if (!card) return;
    onBusyChange(true);
    setError("");
    const result = await stripe.confirmCardSetup(clientSecret, { payment_method: { card } });
    if (result.error) {
      setError(result.error.message ?? "Something went wrong.");
      onBusyChange(false);
      return;
    }
    const paymentMethodId = result.setupIntent.payment_method;
    if (typeof paymentMethodId !== "string") {
      setError("Failed to retrieve payment method.");
      onBusyChange(false);
      return;
    }
    onSuccess(paymentMethodId);
  };
  const saveRef = useRef2(save);
  saveRef.current = save;
  useEffect8(() => {
    submitRef.current = () => {
      void saveRef.current();
    };
    return () => {
      submitRef.current = null;
    };
  }, [submitRef]);
  return /* @__PURE__ */ jsxs36("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs36("div", { children: [
      /* @__PURE__ */ jsx45("label", { className: "mb-1.5 block text-sm text-low", children: "Card number" }),
      /* @__PURE__ */ jsx45("div", { className: "rounded-[2px] border border-grey-700t bg-input p-3", children: /* @__PURE__ */ jsx45(CardNumberElement, { options: { style: stripeElementStyle, showIcon: true } }) })
    ] }),
    /* @__PURE__ */ jsxs36("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs36("div", { children: [
        /* @__PURE__ */ jsx45("label", { className: "mb-1.5 block text-sm text-low", children: "Expiry" }),
        /* @__PURE__ */ jsx45("div", { className: "rounded-[2px] border border-grey-700t bg-input p-3", children: /* @__PURE__ */ jsx45(CardExpiryElement, { options: { style: stripeElementStyle } }) })
      ] }),
      /* @__PURE__ */ jsxs36("div", { children: [
        /* @__PURE__ */ jsx45("label", { className: "mb-1.5 block text-sm text-low", children: "CVC" }),
        /* @__PURE__ */ jsx45("div", { className: "rounded-[2px] border border-grey-700t bg-input p-3", children: /* @__PURE__ */ jsx45(CardCvcElement, { options: { style: stripeElementStyle } }) })
      ] })
    ] }),
    error === "" ? null : /* @__PURE__ */ jsx45("p", { className: "text-sm text-red-400", children: error })
  ] });
};
var AddCardModal = ({
  hasCards,
  onClose,
  onSaved,
  open,
  organisationUuid
}) => {
  const mutate = useSignetMutation();
  const mutateRef = useRef2(mutate);
  const onCloseRef = useRef2(onClose);
  const [stripePromise, setStripePromise] = useState19(null);
  const [clientSecret, setClientSecret] = useState19();
  const [saving, setSaving] = useState19(false);
  const saveRef = useRef2(null);
  mutateRef.current = mutate;
  onCloseRef.current = onClose;
  useEffect8(() => {
    if (!open || clientSecret) return;
    let cancelled = false;
    mutateRef.current("/api/resources/billing/stripe").then((stripe) => {
      if (cancelled || stripe.publishableKey === "") {
        onCloseRef.current();
        return void 0;
      }
      setStripePromise(loadStripe(stripe.publishableKey));
      return mutateRef.current(`/api/resources/organisations/${organisationUuid}/payment-methods/setup-intent`, {
        method: "POST"
      });
    }).then((result) => {
      if (cancelled || !result) return;
      setClientSecret(result.clientSecret);
    }).catch(() => {
      if (!cancelled) onCloseRef.current();
    });
    return () => {
      cancelled = true;
    };
  }, [clientSecret, open, organisationUuid]);
  const close = () => {
    if (saving) return;
    setClientSecret(void 0);
    onClose();
  };
  return /* @__PURE__ */ jsx45(
    Modal,
    {
      open: open && clientSecret != null && stripePromise != null,
      onClose: close,
      title: hasCards ? "Update Payment Method" : "Add Payment Method",
      footer: /* @__PURE__ */ jsx45(
        ModalFooter,
        {
          onCancel: close,
          primaryLabel: saving ? "Saving..." : "Save card",
          primaryLoading: saving,
          primaryDisabled: saving,
          onPrimary: () => saveRef.current?.()
        }
      ),
      children: clientSecret && stripePromise ? /* @__PURE__ */ jsx45(Elements, { stripe: stripePromise, options: { clientSecret }, children: /* @__PURE__ */ jsx45(
        CardForm,
        {
          clientSecret,
          onBusyChange: setSaving,
          submitRef: saveRef,
          onSuccess: (paymentMethodId) => {
            mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${paymentMethodId}/default`, {
              method: "POST"
            }).then(() => {
              setClientSecret(void 0);
              onClose();
              onSaved();
            }).catch(() => void 0).finally(() => setSaving(false));
          }
        }
      ) }) : /* @__PURE__ */ jsx45(FullLoader, {})
    }
  );
};
var BillingPage = ({ BalanceComponent }) => {
  const { clientId } = useFluentConfig();
  const { currentOrganisation, organisationUuid } = useDirectory();
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const hasBalance = BalanceComponent !== void 0;
  const [section, setSection] = useState19(() => readSection(hasBalance));
  const [addingCard, setAddingCard] = useState19(false);
  const canBill = currentOrganisation?.claims.includes(`${clientId}.organisation.billing`) ?? false;
  const canFilterClients = clientId === "signet" && (currentOrganisation?.claims.includes("signet.organisation.billing.clients") ?? false);
  const [invoiceClient, setInvoiceClient] = useState19("");
  const ready = organisationUuid !== "" && canBill;
  const invoicePath = `/api/resources/organisations/${organisationUuid}/invoices${canFilterClients ? invoiceClient === "" ? "" : `?client=${encodeURIComponent(invoiceClient)}` : `?client=${encodeURIComponent(clientId)}`}`;
  const invoices = useSignetQuery(
    ["billing-invoices", organisationUuid, canFilterClients ? invoiceClient : clientId],
    invoicePath,
    ready && (canFilterClients || clientId !== "")
  );
  const methods = useSignetQuery(
    ["billing-payment-methods", organisationUuid],
    `/api/resources/organisations/${organisationUuid}/payment-methods`,
    ready
  );
  useEffect8(() => {
    const sync = () => setSection(readSection(hasBalance));
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [hasBalance]);
  const choose = (next) => {
    setSection(next);
    const url = sectionUrl(next);
    if (`${window.location.pathname}${window.location.hash}` === url) return;
    window.history.pushState(null, "", url);
  };
  const reloadMethods = () => queryClient.invalidateQueries({ queryKey: ["signet", "billing-payment-methods", organisationUuid] });
  const payments = section === "payment-methods";
  const transactions = section === "transactions";
  const methodBody = methods.data;
  return /* @__PURE__ */ jsxs36("section", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx45(
      PageHeader,
      {
        title: "Billing",
        ...payments && ready ? { button: { icon: PlusIcon3, label: "Add card", onClick: () => setAddingCard(true) } } : {}
      }
    ),
    /* @__PURE__ */ jsxs36("div", { className: "flex min-h-0 flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs36("aside", { "aria-label": "Billing sections", className: "flex w-52 shrink-0 flex-col gap-0.5 self-stretch border-r border-grey-700t px-3 py-4", children: [
        /* @__PURE__ */ jsx45("button", { type: "button", className: sideNavItemClassName2(section === "invoices"), onClick: () => choose("invoices"), children: "Invoices" }),
        /* @__PURE__ */ jsx45("button", { type: "button", className: sideNavItemClassName2(transactions), onClick: () => choose("transactions"), children: "Transactions" }),
        BalanceComponent ? /* @__PURE__ */ jsx45("button", { type: "button", className: sideNavItemClassName2(section === "balance"), onClick: () => choose("balance"), children: "Balance" }) : null,
        /* @__PURE__ */ jsx45("button", { type: "button", className: sideNavItemClassName2(payments), onClick: () => choose("payment-methods"), children: "Payment Methods" })
      ] }),
      /* @__PURE__ */ jsxs36("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
        organisationUuid === "" ? note("Select an organisation to view billing.") : null,
        organisationUuid !== "" && !canBill ? note("You do not have access to billing.") : null,
        ready && section === "invoices" ? /* @__PURE__ */ jsx45(
          InvoicesPanel,
          {
            client: invoiceClient,
            clients: canFilterClients ? invoices.data?.clients : void 0,
            onClientChange: (value) => setInvoiceClient(value),
            query: invoices
          }
        ) : null,
        ready && section === "balance" && BalanceComponent ? /* @__PURE__ */ jsx45(BalanceComponent, {}) : null,
        ready && transactions ? /* @__PURE__ */ jsx45(
          TransactionsList,
          {
            appClientId: clientId,
            canFilterClients,
            organisationUuid
          }
        ) : null,
        ready && payments ? /* @__PURE__ */ jsx45(
          PaymentsPanel,
          {
            onRemove: (id) => mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${id}`, { method: "DELETE" }).then(reloadMethods),
            onSetDefault: (id) => mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${id}/default`, { method: "POST" }).then(reloadMethods),
            query: methods
          }
        ) : null
      ] })
    ] }),
    ready ? /* @__PURE__ */ jsx45(
      AddCardModal,
      {
        hasCards: (methodBody?.items.length ?? 0) > 0,
        open: addingCard,
        organisationUuid,
        onClose: () => setAddingCard(false),
        onSaved: reloadMethods
      }
    ) : null
  ] });
};
var InvoicesPanel = ({
  client,
  clients,
  onClientChange,
  query
}) => {
  if (query.isPending) return /* @__PURE__ */ jsx45(FullLoader, {});
  if (query.isError || !query.data) return note("Invoices could not be loaded.");
  return /* @__PURE__ */ jsx45(
    XeroInvoicesList,
    {
      client,
      ...clients ? { clients, onClientChange } : {},
      invoices: query.data.items
    }
  );
};
var PaymentsPanel = ({
  onRemove,
  onSetDefault,
  query
}) => {
  if (query.isPending) return /* @__PURE__ */ jsx45(FullLoader, {});
  if (query.isError || !query.data) return note("Payment methods could not be loaded.");
  if (!query.data.configured) return note("Stripe is not configured on this server.");
  if (query.data.hasCustomer === false) return note("This organisation has no Stripe customer.");
  if (query.data.unavailable) return note("Stripe could not load payment methods for this customer.");
  return /* @__PURE__ */ jsx45(
    PaymentMethodsList,
    {
      defaultPaymentMethodId: query.data.defaultPaymentMethodId,
      methods: query.data.items,
      onRemove,
      onSetDefault
    }
  );
};

// src/index.tsx
init_rasterizeLogoForPdf();
init_statementPdf();
var elements = {
  button: typeMap,
  ...styles
};
export {
  AduroEmblem,
  AlertDialog,
  AppFrame,
  AppHeader,
  AuthFrame,
  AuthTitle,
  BillingPage,
  Button,
  CREDENTIALS_PROVIDER,
  ComboBox,
  ConfirmDialog,
  CountrySelect,
  DataTable,
  DetailCard,
  DetailGrid,
  DetailRow,
  FluentProvider,
  FullLoader,
  IconButton,
  Input,
  LegalNotice,
  Loader,
  LoginPage,
  MANAGE_CLAIM,
  MANAGE_ORGANISATIONS_CLAIM,
  MANAGE_ORGANISATION_CLAIM,
  MANAGE_ORGANISATION_USERS_CLAIM,
  MANAGE_TEAM_CLAIM,
  Modal,
  ModalFooter,
  MultiSelect,
  NotificationsMenu,
  NotificationsProvider,
  OrganisationAvatar,
  OrganisationPage,
  PageHeader,
  PaymentMethodsList,
  PersonAvatar,
  Pill,
  PortalNotificationsProvider,
  ProductLockup,
  Select,
  SettingsPage,
  SideNav,
  SignInMethods,
  SignInScreen,
  StatementPdfFrame,
  SubNav,
  SummaryCard,
  TableBody,
  TableColumns,
  TableContainer,
  TablePagination,
  TableRows,
  TeamPage,
  XeroInvoicesList,
  bindSignetAuth,
  clearSignetSession,
  completeSignetLogin,
  countryCode,
  countryName,
  countryValue,
  displayRole,
  elements,
  getIconButtonStyles,
  loadSignetProviders,
  organisationClaimName,
  organisationFaviconUrl,
  rasterizeLogoForPdf,
  readAuthMeta,
  roleLabel,
  sidebarLabelClassName,
  signInProviderLabel,
  signInWithSignetPassword,
  signetAccessToken,
  signetAdministrationItems,
  signetIssuer,
  signetPlatformItems,
  signetProviders,
  startSignetLogin,
  statementPdfColors,
  statementPdfStyles,
  useDirectory,
  useFluentConfig,
  useNotificationGroups,
  usePortalNotifications,
  useQueryClient,
  useSignIn,
  useSignetMutation,
  useSuspenseQuery,
  useTeam
};
