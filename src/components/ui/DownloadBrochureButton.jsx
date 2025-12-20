'use client';
import { Button } from '@/components/ui/Button.jsx';
import { Download } from 'lucide-react';

export default function DownloadBrochureButton({
  variant = 'outline',
  size = 'default',
  showIcon = true,
  className = '',
}) {
  const downloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/Participant_Rulebook_Updated.pdf';
    link.download = 'OpenCode-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={downloadBrochure}
      className={`group ${className}`}
    >
      {showIcon && (
        <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
      )}
       Rule Book
    </Button>
  );
}
