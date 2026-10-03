import type { ReactElement } from 'react';

type Renderer = typeof import('@react-pdf/renderer');

const colors = {
  primary: '#111115',
  secondary: '#222226',
  white: '#ffffff',
  low: '#dddddd',
  subtle: '#bbbbbb',
  accent: '#d17238',
  border: '#3a424c',
  borderMuted: '#2c3138',
  positive: '#3EB077',
} as const;

const moneyHeaders = new Set(['Spend', 'Tax', 'Total', 'Gross', 'Net']);

const stylesFor = (StyleSheet: Renderer['StyleSheet']) => StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 36,
    fontSize: 8,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
    color: colors.white,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: { width: '42%' },
  logo: { width: 124, height: 23 },
  headerRight: { width: '48%', alignItems: 'flex-end' },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 10,
  },
  metaLabel: {
    fontSize: 7,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.subtle,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 9,
    color: colors.white,
    marginBottom: 6,
    textAlign: 'right',
  },
  sectionHeading: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.subtle,
    marginBottom: 8,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 6.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.subtle,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  tableRowLast: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableTotalRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: colors.secondary,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cell: { fontSize: 7.5, color: colors.white },
  cellMuted: { fontSize: 7.5, color: colors.low },
  cellCredit: { fontSize: 7.5, color: colors.positive },
  cellBold: { fontSize: 7.5, fontWeight: 'bold', color: colors.white },
  empty: { fontSize: 8, color: colors.subtle, paddingHorizontal: 2 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 36,
    right: 36,
    borderTopWidth: 1,
    borderTopColor: colors.borderMuted,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 7, color: colors.subtle },
});

export type BillingPdfProps = {
  generatedAt: Date;
  headers: string[];
  logoSrc: string;
  organisationName: string;
  periodLabel?: string;
  rows: string[][];
  title: string;
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const columnWeight = (header: string): number => {
  if (moneyHeaders.has(header)) return 10;

  if (header === 'Description') return 24;

  if (header === 'Title') return 16;

  if (header === 'Date') return 14;

  return 12;
};

const columnWidths = (headers: string[]): string[] => {
  const weights = headers.map(columnWeight);
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  return weights.map((weight) => `${((weight / total) * 100).toFixed(2)}%`);
};

const amountOf = (value: string): number | null => {
  const match = value.replace(/,/g, '').match(/^([+-])?£(\d+(?:\.\d+)?)$/);

  if (!match?.[2]) return null;

  const amount = Number(match[2]);

  return match[1] === '-' ? -amount : amount;
};

const formatMoney = (amount: number): string => {
  const formatted = `£${Math.abs(amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (amount < 0) return `-${formatted}`;

  if (amount > 0) return `+${formatted}`;

  return formatted;
};

const signIndex = (headers: string[]): number => {
  const total = headers.indexOf('Total');

  if (total >= 0) return total;

  return headers.indexOf('Gross');
};

export const BillingPdfDocument = ({
  generatedAt,
  headers,
  logoSrc,
  organisationName,
  periodLabel,
  renderer,
  rows,
  title,
}: BillingPdfProps & { renderer: Renderer }): ReactElement => {
  const { Document, Image, Page, Text, View } = renderer;
  const styles = stylesFor(renderer.StyleSheet);
  const widths = columnWidths(headers);
  const signedAt = signIndex(headers);
  const totals = headers.map((header, index) => {
    if (!moneyHeaders.has(header)) return null;

    let total = 0;

    for (const row of rows) {
      const amount = amountOf(row[index] ?? '');

      if (amount === null) return null;

      total += amount;
    }

    return total;
  });
  const showTotals = rows.length > 0 && totals.some((total) => total !== null);

  return (
    <Document title={`${title} – ${organisationName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logoSrc} style={styles.logo} />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.metaLabel}>Bill to</Text>
            <Text style={styles.metaValue}>{organisationName}</Text>
            <Text style={[styles.metaLabel, { marginTop: 4 }]}>Statement date</Text>
            <Text style={styles.metaValue}>{formatDate(generatedAt)}</Text>
            {periodLabel ? <Text style={[styles.metaLabel, { marginTop: 4 }]}>Period</Text> : null}
            {periodLabel ? <Text style={styles.metaValue}>{periodLabel}</Text> : null}
          </View>
        </View>
        <Text style={styles.sectionHeading}>{title}</Text>
        {rows.length === 0 ? (
          <Text style={styles.empty}>No {title.toLowerCase()} in this export.</Text>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              {headers.map((header, index) => (
                <Text
                  key={header}
                  style={[
                    styles.tableHeaderCell,
                    { width: widths[index], textAlign: moneyHeaders.has(header) ? 'right' : 'left' },
                  ]}
                >
                  {header}
                </Text>
              ))}
            </View>
            {rows.map((row, index) => {
              const credit = signedAt >= 0 && (row[signedAt] ?? '').startsWith('+');

              return (
                <View key={`${row[0] ?? 'row'}-${index}`} style={index === rows.length - 1 && !showTotals ? styles.tableRowLast : styles.tableRow}>
                  {row.map((cell, cellIndex) => {
                    const header = headers[cellIndex] ?? '';
                    const money = moneyHeaders.has(header);

                    return (
                      <Text
                        key={`${header}-${cellIndex}`}
                        style={[
                          money ? (credit ? styles.cellCredit : styles.cell) : cellIndex === 0 ? styles.cellMuted : styles.cell,
                          { width: widths[cellIndex], textAlign: money ? 'right' : 'left' },
                        ]}
                      >
                        {cell}
                      </Text>
                    );
                  })}
                </View>
              );
            })}
            {showTotals ? (
              <View style={styles.tableTotalRow}>
                {headers.map((header, index) => {
                  const total = totals[index];

                  const explicitSign = rows.some((row) => /^[+-]/.test(row[index] ?? ''));
                  const totalText = total === null ? '' : explicitSign ? formatMoney(total) : formatMoney(total).replace(/^\+/, '');

                  return (
                    <Text
                      key={`total-${header}`}
                      style={[
                        styles.cellBold,
                        { width: widths[index], textAlign: moneyHeaders.has(header) ? 'right' : 'left' },
                      ]}
                    >
                      {index === 0 ? 'Total' : totalText}
                    </Text>
                  );
                })}
              </View>
            ) : null}
          </View>
        )}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Aduro Creative Ltd · Co. 11200639</Text>
          <Text style={styles.footerText}>legal@weareaduro.com</Text>
        </View>
      </Page>
    </Document>
  );
};
