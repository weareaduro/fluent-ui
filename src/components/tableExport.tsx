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

export type BillingPdfDetails = {
  organisationName: string;
  periodLabel?: string;
};

export const downloadPdf = async (
  filename: string,
  title: string,
  headers: string[],
  rows: string[][],
  details: BillingPdfDetails,
): Promise<void> => {
  const [renderer, { BillingPdfDocument }, { rasterizeLogoForPdf }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('./billingPdf'),
    import('./rasterizeLogoForPdf'),
  ]);
  const logoSrc = await rasterizeLogoForPdf();
  const blob = await renderer.pdf(
    <BillingPdfDocument
      generatedAt={new Date()}
      headers={headers}
      logoSrc={logoSrc}
      organisationName={details.organisationName}
      renderer={renderer}
      rows={rows}
      title={title}
      {...(details.periodLabel ? { periodLabel: details.periodLabel } : {})}
    />,
  ).toBlob();

  downloadBlob(filename, blob);
};
