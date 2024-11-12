'use client';
import ScanAnimation from '@/components/ScanAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Scan } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

export const SCAN_TIME_FORWARDS = 10000;
export const SCAN_TIME_REVERSE = 1500;

const PdfScanner = () => {
  const [url, setUrl] = useState('');
  const [loadedUrl, setLoadedUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hasTargetText, setHasTargetText] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const scanTimeoutRef = useRef<NodeJS.Timeout>();
  const PDF = `${process.env.NEXT_PUBLIC_PDF_HOST}/02091939.pdf`;

  const getPdfUrl = (url: string) => {
    if (!url) return '';

    const splitUrlFull = url.split('?');
    const urlWithoutQuery = splitUrlFull[0];
    const splitUrl = urlWithoutQuery.split('/');
    const fileName = splitUrl[splitUrl.length - 1];
    const date = fileName.split('-')[fileName.split('-').length - 1];

    return `${process.env.NEXT_PUBLIC_PDF_HOST}/${date}.pdf`;
  };

  const addPdfViewerParams = (url: string) => {
    return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitV`;
  };

  useEffect(() => {
    if (loadedUrl) {
      setIsIframeLoading(true);
      setIsButtonLoading(true);

      const iframeTimer = setTimeout(() => {
        setIsIframeLoading(false);
      }, 1500);

      const buttonTimer = setTimeout(() => {
        setIsButtonLoading(false);
      }, 2500);

      return () => {
        clearTimeout(iframeTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [loadedUrl]);

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  const handleUrlSubmit = () => {
    if (url !== loadedUrl) {
      setLoadedUrl(url);
      setShowResult(false);
      setHasTargetText(false);
    }
  };

  const startScan: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!loadedUrl) return;

    const containsTarget = loadedUrl.toLowerCase().includes('19031980');
    setHasTargetText(containsTarget);
    setIsScanning(true);
    setShowResult(false);

    // Store timeout reference
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, SCAN_TIME_FORWARDS + SCAN_TIME_REVERSE);
  };

  const getCurrentPdf = () => {
    if (!loadedUrl) return '';

    if (showResult) {
      return hasTargetText ? addPdfViewerParams(PDF) : addPdfViewerParams(getPdfUrl(loadedUrl));
    }
    return addPdfViewerParams(getPdfUrl(loadedUrl));
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setShowResult(true);
  };

  const handleScanCancel = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    setIsScanning(false);
    setShowResult(false);
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6 relative'>
      <form onSubmit={startScan} className='space-y-4'>
        <div className='flex gap-4'>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isScanning}
            placeholder='Enter document URL...'
            className='flex-1 p-2 border rounded-lg'
          />
          <button
            type='button'
            onClick={handleUrlSubmit}
            disabled={!url || isButtonLoading || url === loadedUrl}
            className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300'
          >
            Load PDF
          </button>
          <button
            type='submit'
            disabled={isScanning || isButtonLoading || !loadedUrl}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2'
          >
            {isButtonLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Scan className='w-4 h-4' />}
            {isButtonLoading ? 'Loading...' : isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
        </div>
      </form>

      {getCurrentPdf() && (
        <div className='relative w-full border rounded-lg overflow-hidden bg-white h-[800px]'>
          {isIframeLoading ? (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-50'>
              <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
            </div>
          ) : (
            <iframe src={getCurrentPdf()} className='w-full h-full' title='PDF Document' />
          )}

          {isScanning && <ScanAnimation isScanning={isScanning} onComplete={handleScanComplete} />}
        </div>
      )}

      <Dialog open={isScanning} onOpenChange={() => {}} modal>
        <DialogContent className='sm:max-w-md [&>button]:hidden'>
          <DialogHeader>
            <DialogTitle className='text-center'>Scanning...</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col items-center gap-4'>
            <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
            <button onClick={handleScanCancel} className='px-4 py-2 text-sm text-gray-600 hover:text-gray-900'>
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfScanner;
