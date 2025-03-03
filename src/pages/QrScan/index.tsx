import { FC, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScan: FC = () => {
  const [isPause, setIsPause] = useState(false);
  const [isErr, setIsErr] = useState('NotAllowedError: Permission denied');

  const onError = (error) => {
    console.log(error);
    setIsErr(error);
  };

  return (
    <div className='h-[100dvh]'>
      <button onClick={() => setIsPause(!isPause)} className='bg-[#875AFF]'>
        pause
      </button>
      <div className='w-[200px] h-[200px]'>
        {isErr === 'NotAllowedError: Permission denied' ? (
          <p>Дайте разрешение на использование камеры</p>
        ) : (
          <Scanner
            paused={isPause}
            onScan={(result) => console.log(result[0].rawValue)}
            onError={(error) => onError(error)}
          />
        )}
      </div>
    </div>
  );
};

export default QrScan;
