'use client';

export const useDownloadBrochure = () => {
  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = 'OpenCode-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { downloadBrochure };
};
