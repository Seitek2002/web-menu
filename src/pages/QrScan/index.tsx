import { FC, useEffect, useState, useCallback } from 'react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../Home/components/Mobile/SiteHeader';

const QrScan: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const requestCameraPermission = useCallback(async () => {
    localStorage.setItem('cartItems', JSON.stringify([]));
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );

      if (videoDevices.length === 0) throw new Error('No camera found');

      const selectedCamera =
        videoDevices.find((device) => !device.label.includes('OBS')) ||
        videoDevices[0];

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedCamera.deviceId
            ? { exact: selectedCamera.deviceId }
            : undefined,
        },
      });

      stream.getTracks().forEach((track) => track.stop()); // Освобождаем камеру
      setError(null);
    } catch (err) {
      setError((err as Error).name);
    }
  }, []);

  const handleScan = useCallback(
    (data: IDetectedBarcode[]) => {
      if (!data.length) return;
      const route = data[0].rawValue.split('/').slice(3).join('/');
      localStorage.setItem('currentUrl', route);
      navigate(`/I/${route}`);
    },
    [navigate]
  );

  const handleError = useCallback(
    (err: unknown) => {
      if ((err as Error).name !== error) {
        setError((err as Error).name);
        requestCameraPermission();
      }
    },
    [requestCameraPermission, error]
  );

  useEffect(() => {
    requestCameraPermission();
    localStorage.setItem('cartItems', [].toString());
  }, [requestCameraPermission]);

  useEffect(() => {
    localStorage.setItem('cartItems', [].toString());
  }, []);

  return (
    <>
      <SiteHeader />
      <div className='h-[89dvh] flex flex-col items-center justify-center'>
        <div className='w-[80%] flex items-center justify-center md:w-[30%]'>
          {error ? (
            <div className='text-center'>
              <p className='text-red-500'>
                Дайте разрешение на использование камеры
              </p>
              <button
                onClick={() => window.location.reload()}
                className='mt-2 bg-blue-500 text-white p-2 rounded-md'
              >
                Повторить запрос
              </button>
            </div>
          ) : (
            <div className='w-full'>
              <p className='text-center text-xl mb-3'>
                Наведите на QR код стола
              </p>
              <Scanner
                onScan={handleScan}
                onError={handleError}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QrScan;
