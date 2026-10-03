import type { ReactElement, ReactNode } from 'react';

type Renderer = typeof import('@react-pdf/renderer');

/** Portal statement colours. react-pdf needs solid hex; rgba can paint as white. */
export const statementPdfColors = {
  primary: '#111115',
  secondary: '#222226',
  white: '#ffffff',
  low: '#dddddd',
  subtle: '#bbbbbb',
  accent: '#d17238',
  border: '#3a424c',
  borderMuted: '#2c3138',
  positive: '#3EB077',
  negative: '#E55353',
  amber: '#F59E0B',
} as const;

const c = statementPdfColors;

export const statementPdfStyles = (StyleSheet: Renderer['StyleSheet']) =>
  StyleSheet.create({
    page: {
      paddingTop: 36,
      paddingBottom: 56,
      paddingHorizontal: 36,
      fontSize: 8,
      fontFamily: 'Helvetica',
      lineHeight: 1.4,
      color: c.white,
      backgroundColor: c.primary,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 18,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    headerLeft: {
      width: '42%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logo: { width: 124, height: 23 },
    headerRight: { width: '48%', alignItems: 'flex-end' },
    statementLabel: {
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      color: c.accent,
      marginBottom: 10,
    },
    headerMetaLabel: {
      fontSize: 7,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      color: c.subtle,
      marginBottom: 2,
    },
    headerMetaValue: {
      fontSize: 9,
      color: c.white,
      marginBottom: 6,
      textAlign: 'right',
    },
    headerMetaMuted: {
      fontSize: 8,
      color: c.low,
      textAlign: 'right',
      marginBottom: 2,
    },
    balanceCard: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 2,
      backgroundColor: c.secondary,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    balanceTitle: {
      fontSize: 9,
      color: c.low,
      marginBottom: 8,
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    balanceColumn: { alignItems: 'flex-end', minWidth: 72, marginLeft: 16 },
    balanceColumnLabel: {
      fontSize: 7,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      color: c.subtle,
      marginBottom: 2,
    },
    balanceColumnValue: {
      fontSize: 10,
      fontWeight: 'bold',
      color: c.white,
    },
    sectionHeading: {
      fontSize: 8,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      color: c.subtle,
      marginBottom: 8,
      marginTop: 2,
    },
    table: {
      width: '100%',
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 2,
      marginBottom: 14,
      overflow: 'hidden',
      backgroundColor: c.primary,
    },
    tableHeaderRow: {
      flexDirection: 'row',
      backgroundColor: c.secondary,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      paddingVertical: 7,
      paddingHorizontal: 8,
    },
    tableHeaderCell: {
      fontSize: 6.5,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
      color: c.subtle,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: c.borderMuted,
      backgroundColor: c.primary,
    },
    tableRowLast: {
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: c.primary,
    },
    tableTotalRow: {
      flexDirection: 'row',
      paddingVertical: 7,
      paddingHorizontal: 8,
      backgroundColor: c.secondary,
      borderTopWidth: 1,
      borderTopColor: c.border,
    },
    tableCell: { fontSize: 7.5, color: c.white },
    tableCellMuted: { fontSize: 7.5, color: c.low },
    tableCellAmount: { fontSize: 7.5, color: c.white, textAlign: 'right' },
    tableCellCredit: { fontSize: 7.5, color: c.positive, textAlign: 'right' },
    tableCellDebit: { fontSize: 7.5, color: c.white, textAlign: 'right' },
    tableCellTotalLabel: {
      fontSize: 7.5,
      fontWeight: 'bold',
      color: c.white,
    },
    tableCellTotalValue: {
      fontSize: 7.5,
      fontWeight: 'bold',
      color: c.white,
      textAlign: 'right',
    },
    empty: {
      fontSize: 8,
      color: c.subtle,
      marginBottom: 12,
      paddingHorizontal: 2,
    },
    footer: {
      position: 'absolute',
      bottom: 24,
      left: 36,
      right: 36,
      borderTopWidth: 1,
      borderTopColor: c.borderMuted,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerText: { fontSize: 7, color: c.subtle },
  });

export type StatementPdfBillTo = {
  addressLines?: readonly string[];
  companyName?: string | null;
  companyNumber?: string | null;
  email?: string | null;
  name: string;
};

export const StatementPdfFrame = ({
  billTo,
  children,
  documentTitle,
  label,
  logoSrc,
  periodLabel,
  renderer,
  statementDate,
}: {
  billTo: StatementPdfBillTo;
  children: ReactNode;
  documentTitle: string;
  label: string;
  logoSrc: string;
  periodLabel?: string;
  renderer: Renderer;
  statementDate: string;
}): ReactElement => {
  const { Document, Image, Page, Text, View } = renderer;
  const styles = statementPdfStyles(renderer.StyleSheet);
  const primaryName = billTo.companyName ?? billTo.name;

  return (
    <Document title={documentTitle}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logoSrc} style={styles.logo} />
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.statementLabel}>{label}</Text>
            <Text style={styles.headerMetaLabel}>Bill to</Text>
            <Text style={styles.headerMetaValue}>{primaryName}</Text>
            {billTo.companyName && billTo.companyName !== billTo.name ? (
              <Text style={styles.headerMetaMuted}>{billTo.name}</Text>
            ) : null}
            {billTo.companyNumber ? <Text style={styles.headerMetaMuted}>Co. no. {billTo.companyNumber}</Text> : null}
            {(billTo.addressLines ?? []).map((line, index) => (
              <Text key={`addr-${index}`} style={styles.headerMetaMuted}>
                {line}
              </Text>
            ))}
            {billTo.email ? <Text style={[styles.headerMetaMuted, { marginTop: 4 }]}>{billTo.email}</Text> : null}
            <Text style={[styles.headerMetaLabel, { marginTop: 10 }]}>Statement date</Text>
            <Text style={styles.headerMetaValue}>{statementDate}</Text>
            {periodLabel ? <Text style={[styles.headerMetaLabel, { marginTop: 6 }]}>Period</Text> : null}
            {periodLabel ? <Text style={styles.headerMetaValue}>{periodLabel}</Text> : null}
          </View>
        </View>
        {children}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Aduro Creative Ltd · Co. 11200639</Text>
          <Text style={styles.footerText}>legal@weareaduro.com</Text>
        </View>
      </Page>
    </Document>
  );
};
