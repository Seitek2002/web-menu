import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useAppSelector';

import './index.scss';

import { formatSchedule } from 'src/utlis/workTime';

interface ClosedModalProps {
  isShow: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const ClosedModal: FC<ClosedModalProps> = ({
  isShow,
  onClose,
  title,
  description,
}) => {
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  let scheduleRaw = useAppSelector(
    (state) => state.yourFeature.venue?.schedule
  ) || '';
  if (!scheduleRaw) {
    try {
      const venueLS = JSON.parse(localStorage.getItem('venue') ?? '{}');
      scheduleRaw = venueLS?.schedule ?? '';
    } catch {
      // ignore JSON errors
    }
  }
  const scheduleText = formatSchedule(scheduleRaw);
  const { t } = useTranslation();

  return (
    <>
      <div className={isShow ? 'overlay active' : 'overlay'} onClick={onClose} />
      <div className={isShow ? 'closed-modal active' : 'closed-modal'}>
        <h3 className='title'>
          {title ?? t('closed.title')}
        </h3>
        <p className='desc'>
          {description ?? t('closed.description')}
        </p>
        <p className='schedule'>
          {t('closed.schedule', { schedule: scheduleText })}
        </p>
        <button
          style={{ backgroundColor: colorTheme }}
          className='action'
          onClick={onClose}
        >
          {t('closed.ok')}
        </button>
      </div>
    </>
  );
};

export default ClosedModal;
