'use client';
import ScanAnimation from '@/components/ScanAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useScanContext } from '@/components/useScanContext';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Loader2, Scan } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const SCAN_TIME_FORWARDS = 10000;
export const SCAN_TIME_REVERSE = 1500;

const RevealPage = () => {
  const { documentUrl, setDocumentUrl } = useScanContext();
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hasTargetText, setHasTargetText] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const router = useRouter();
  const scanTimeoutRef = useRef<NodeJS.Timeout>();

  const PDF = `${process.env.NEXT_PUBLIC_PDF_HOST}/02091939.pdf`;

  useEffect(() => {
    if (!documentUrl) {
      router.replace('/');
    }

    const timer = setTimeout(() => {
      setIsIframeLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [router]);

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

  const startScan = () => {
    if (!documentUrl) return;

    const containsTarget = documentUrl.toLowerCase().includes('19031980');
    setHasTargetText(containsTarget);
    setIsScanning(true);
    setShowResult(false);

    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, SCAN_TIME_FORWARDS + SCAN_TIME_REVERSE);
  };

  const getCurrentPdf = () => {
    if (!documentUrl) return undefined;

    if (showResult) {
      return hasTargetText ? addPdfViewerParams(PDF) : addPdfViewerParams(getPdfUrl(documentUrl));
    }
    return addPdfViewerParams(getPdfUrl(documentUrl));
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

  const handleNewUrl = () => {
    setDocumentUrl('');
    router.replace('/');
  };

  return (
    <div className='max-w-4xl w-full p-6 space-y-6 relative'>
      <div className='flex justify-center items-center'>
        <div className='flex gap-4'>
          <button onClick={handleNewUrl} className='px-4 py-2 text-gray-600 hover:text-gray-900'>
            New {showResult ? 'Scan' : 'Document'}
          </button>
          <button
            onClick={startScan}
            disabled={isScanning || isIframeLoading || showResult}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2'
          >
            <Scan className='w-4 h-4' />
            {isScanning ? 'Scanning...' : showResult ? 'Scan complete' : 'Start Scan'}
          </button>
        </div>
      </div>

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

      <Dialog open={isScanning} onOpenChange={() => {}} modal>
        <DialogContent className='sm:max-w-md [&>button]:hidden'>
          <DialogHeader>
            <DialogTitle className='text-center'>
              <DialogDescription>Scanning...</DialogDescription>
            </DialogTitle>
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

export default RevealPage;
