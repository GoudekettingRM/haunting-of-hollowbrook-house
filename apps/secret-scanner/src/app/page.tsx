'use client';
import ScanAnimation from '@/components/ScanAnimation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Scan } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export const SCAN_TIME_FORWARDS = 10000;
export const SCAN_TIME_REVERSE = 1500;

const PdfScanner = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hasTargetText, setHasTargetText] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const PDF = 'http://localhost:3002/pdfs/02091939.pdf';

  const getPdfUrl = (url: string) => {
    if (!url) return '';

    const splitUrlFull = url.split('?');
    const urlWithoutQuery = splitUrlFull[0];
    const splitUrl = urlWithoutQuery.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    const date = fileName.split('-')[fileName.split('-').length - 1];

    return `http://localhost:3002/pdfs/${date}.pdf`;
  };

  const addPdfViewerParams = (url: string) => {
    return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitV`;
  };

  // Handle URL changes with separate loading states
  useEffect(() => {
    if (url) {
      setIsIframeLoading(true);
      setIsButtonLoading(true);

      // Clear iframe loading after 1.5 seconds
      const iframeTimer = setTimeout(() => {
        setIsIframeLoading(false);
      }, 1500);

      // Clear button loading after 2.5 seconds
      const buttonTimer = setTimeout(() => {
        setIsButtonLoading(false);
      }, 2500);

      return () => {
        clearTimeout(iframeTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [url]);

  const startScan: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!url) return;

    const containsTarget = url.toLowerCase().includes('19031980');
    setHasTargetText(containsTarget);
    setIsScanning(true);
    setShowResult(false);

    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, SCAN_TIME_FORWARDS + SCAN_TIME_REVERSE);
  };

  const getCurrentPdf = () => {
    if (!url) return '';

    if (showResult) {
      return hasTargetText ? addPdfViewerParams(PDF) : addPdfViewerParams(getPdfUrl(url));
    }
    return addPdfViewerParams(getPdfUrl(url));
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setShowResult(true);
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <form onSubmit={startScan} className='space-y-4'>
        <div className='flex gap-4'>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Enter document URL...'
            className='flex-1 p-2 border rounded-lg'
          />
          <button
            type='submit'
            disabled={isScanning || isButtonLoading}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2'
          >
            {isButtonLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Scan className='w-4 h-4' />}
            {isButtonLoading ? 'Loading...' : isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </form>

      {getCurrentPdf() && (
        <div className='relative w-full border rounded-lg overflow-hidden bg-white h-[800px]'>
          {/* PDF Display */}
          {isIframeLoading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-50'>
              <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
            </div>
          ) : (
            <iframe src={getCurrentPdf()} className='w-full h-full' title='PDF Document' />
          )}

          {/* Scanning Animation Overlay */}
          {isScanning && <ScanAnimation isScanning={isScanning} onComplete={handleScanComplete} />}
        </div>
      )}

      {isScanning && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>Scanning document for hidden content...</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PdfScanner;
