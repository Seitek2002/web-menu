import { FC, useEffect, useState } from 'react';

import { useAppSelector } from 'hooks/useAppSelector';

import './index.scss';

type Props = {
  isShow: boolean;
  max: number;
  initial?: number;
  onCancel: () => void;
  onConfirm: (value: number) => void;
};

const PointsModal: FC<Props> = ({
  isShow,
  max,
  initial = 0,
  onCancel,
  onConfirm,
}) => {
  const colorTheme = useAppSelector((s) => s.yourFeature.venue?.colorTheme);
  const [value, setValue] = useState<number>(initial);

  useEffect(() => {
    if (isShow) setValue(initial);
  }, [isShow, initial]);

  const handleOk = () => {
    const v = Number.isFinite(value) ? value : 0;
    const clamped = Math.max(0, Math.min(Math.floor(v), Math.floor(max)));
    onConfirm(clamped);
  };

  return (
    <>
      <div
        className={isShow ? 'overlay active' : 'overlay'}
        onClick={onCancel}
      />
      <div className={isShow ? 'points-modal active' : 'points-modal'}>
        <h3 className='title'>Сколько баллов хотите потратить?</h3>
        <div className='content'>
          <input
            type="number"
            min={0}
            max={Math.floor(max)}
            step={1}
            value={value}
            onChange={(e) => {
              const num = Number(e.target.value);
              const v = Number.isFinite(num) ? num : 0;
              const clamped = Math.max(0, Math.min(Math.floor(v), Math.floor(max)));
              setValue(clamped);
            }}
          />
          <div className='hint'>Доступно: {Math.floor(max)} б.</div>
        </div>
        <div className='actions'>
          <button className='cancel' onClick={onCancel}>
            Отмена
          </button>
          <button
            className='ok'
            style={{ backgroundColor: colorTheme }}
            onClick={handleOk}
          >
            Ок
          </button>
        </div>
      </div>
    </>
  );
};

export default PointsModal;
