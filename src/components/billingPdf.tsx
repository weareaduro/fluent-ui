import type { ReactElement } from 'react';
import { StatementPdfFrame, statementPdfStyles } from '../pdf/statementPdf';

type Renderer = typeof import('@react-pdf/renderer');

const moneyHeaders = new Set(['Spend', 'Tax', 'Total', 'Gross', 'Net']);

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
  const { Text, View } = renderer;
  const styles = statementPdfStyles(renderer.StyleSheet);
  const widths = columnWidths(headers);
  const widthAt = (index: number): string => widths[index] ?? '12%';
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
    <StatementPdfFrame
      billTo={{ name: organisationName }}
      documentTitle={`${title} – ${organisationName}`}
      label={title}
      logoSrc={logoSrc}
      renderer={renderer}
      statementDate={formatDate(generatedAt)}
      {...(periodLabel ? { periodLabel } : {})}
    >
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
                    { width: widthAt(index), textAlign: moneyHeaders.has(header) ? 'right' : 'left' },
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
                          money ? (credit ? styles.tableCellCredit : styles.tableCell) : cellIndex === 0 ? styles.tableCellMuted : styles.tableCell,
                          { width: widthAt(cellIndex), textAlign: money ? 'right' : 'left' },
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
                  const totalText = total == null ? '' : explicitSign ? formatMoney(total) : formatMoney(total).replace(/^\+/, '');

                  return (
                    <Text
                      key={`total-${header}`}
                      style={[
                        styles.tableCellTotalLabel,
                        { width: widthAt(index), textAlign: moneyHeaders.has(header) ? 'right' : 'left' },
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
    </StatementPdfFrame>
  );
};
