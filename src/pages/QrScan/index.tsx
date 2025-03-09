import { FC, useEffect, useState } from 'react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QrScan: FC = () => {
  const [isPause, setIsPause] = useState(false);
  const [isErr, setIsErr] = useState('NotAllowedError');
  const navigate = useNavigate();

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsErr(''); // Очистить ошибку, если разрешение получено
    } catch (error) {
      setIsErr((error as Error).name); // Сохранить код ошибки
    }
  };

  const retry = () => {
    setIsErr('');
  };

  const onError = (error: unknown) => {
    console.log(error);
    if (typeof error === 'string') {
      setIsErr(error);
    }
    setIsErr((error as Error).name);
    requestCameraPermission();
  };

  const handleScan = (data: IDetectedBarcode[]) => {
    const route = data[0].rawValue.split('/').slice(3).join('/');
    navigate(`/${route}`);
  };

  useEffect(() => {
    requestCameraPermission();
  }, [])

  return (
    <div className='h-[100dvh] flex flex-col items-center justify-center'>
      <button
        onClick={() => setIsPause(!isPause)}
        className='bg-[#875AFF] p-2 rounded-md text-white mb-4'
      >
        {isPause ? 'Resume' : 'Pause'}
      </button>

      <div className='w-[200px] h-[200px] flex items-center justify-center border border-gray-400'>
        {isErr === 'NotAllowedError' ? (
          <div className='text-center'>
            <p className='text-red-500'>
              Дайте разрешение на использование камеры
            </p>
            <button
              onClick={retry}
              className='mt-2 bg-blue-500 text-white p-2 rounded-md'
            >
              Повторить запрос
            </button>
          </div>
        ) : (
          <Scanner paused={isPause} onScan={handleScan} onError={onError} />
        )}
      </div>
    </div>
  );
};

export default QrScan;
