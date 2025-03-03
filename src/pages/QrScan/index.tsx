import { FC, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScan: FC = () => {
  const [isPause, setIsPause] = useState(false);
  const [isErr, setIsErr] = useState('');

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsErr(''); // Очистить ошибку, если разрешение получено
    } catch (error) {
      setIsErr(error.name); // Сохранить код ошибки
    }
  };

  const onError = (error: any) => {
    console.log(error);
    setIsErr(error.name);
  };

  return (
    <div className='h-[100dvh] flex flex-col items-center justify-center'>
      <button onClick={() => setIsPause(!isPause)} className='bg-[#875AFF] p-2 rounded-md text-white mb-4'>
        {isPause ? 'Resume' : 'Pause'}
      </button>

      <div className='w-[200px] h-[200px] flex items-center justify-center border border-gray-400'>
        {isErr === 'NotAllowedError' ? (
          <div className='text-center'>
            <p className='text-red-500'>Дайте разрешение на использование камеры</p>
            <button onClick={requestCameraPermission} className='mt-2 bg-blue-500 text-white p-2 rounded-md'>
              Повторить запрос
            </button>
          </div>
        ) : (
          <Scanner
            paused={isPause}
            onScan={(result) => console.log(result[0].rawValue)}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
};

export default QrScan;
