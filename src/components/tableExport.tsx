const downloadBlob = (filename: string, blob: Blob): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const downloadCsv = (filename: string, headers: string[], rows: string[][]): void => {
  const escape = (value: string): string => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n');

  downloadBlob(filename, new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
};

export const downloadPdf = async (filename: string, title: string, headers: string[], rows: string[][]): Promise<void> => {
  const { Document, Page, StyleSheet, Text, View, pdf } = await import('@react-pdf/renderer');
  const styles = StyleSheet.create({
    page: { padding: 28, fontSize: 8, fontFamily: 'Helvetica', color: '#111827' },
    title: { fontSize: 14, marginBottom: 12, fontFamily: 'Helvetica-Bold' },
    row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingVertical: 4 },
    header: { fontFamily: 'Helvetica-Bold', backgroundColor: '#F3F4F6' },
    cell: { flex: 1, paddingRight: 6 },
  });
  const blob = await pdf(
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.row, styles.header]}>
          {headers.map((header) => (
            <Text key={header} style={styles.cell}>
              {header}
            </Text>
          ))}
        </View>
        {rows.map((row, index) => (
          <View key={`${row[0] ?? index}-${index}`} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <Text key={`${headers[cellIndex] ?? cellIndex}`} style={styles.cell}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>,
  ).toBlob();

  downloadBlob(filename, blob);
};
