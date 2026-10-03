import logoAssetUrl from '../logo.svg';

/** react-pdf Image does not reliably render SVG data URIs in the browser. */
export const rasterizeLogoForPdf = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = 310;
      const height = 58;
      const canvas = document.createElement('canvas');

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas is not available for logo rasterisation.'));

        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      reject(new Error('Failed to load the Aduro logo for the PDF.'));
    };

    img.src = logoAssetUrl;
  });
