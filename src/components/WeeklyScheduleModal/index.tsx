import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/useAppSelector';

import './index.scss';

import { formatSchedule } from 'src/utlis/workTime';

type Props = {
  isShow: boolean;
  onClose: () => void;
  schedules?: unknown; // expected: { mon: "09:00-18:00", tue: "...", ... }
  fallbackSchedule?: string; // e.g. "09:00-18:00" for all days
};

type DayDef = { key: string; label: string; alt?: string[] };

const DAY_DEFS: DayDef[] = [
  { key: 'mon', label: 'Пн', alt: ['monday', 'пн', '1'] },
  { key: 'tue', label: 'Вт', alt: ['tuesday', 'вт', '2'] },
  { key: 'wed', label: 'Ср', alt: ['wednesday', 'ср', '3'] },
  { key: 'thu', label: 'Чт', alt: ['thursday', 'чт', '4'] },
  { key: 'fri', label: 'Пт', alt: ['friday', 'пт', '5'] },
  { key: 'sat', label: 'Сб', alt: ['saturday', 'сб', '6'] },
  { key: 'sun', label: 'Вс', alt: ['sunday', 'вск', 'вс', '0', '7'] },
];

function getFromObj(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  }
  return undefined;
}

const WeeklyScheduleModal: FC<Props> = ({ isShow, onClose, schedules, fallbackSchedule }) => {
  const colorTheme = useAppSelector((state) => state.yourFeature.venue?.colorTheme) || '#875AFF';
  const { t } = useTranslation();

  const weekly = useMemo(() => {
    const rows: { label: string; time: string }[] = [];
    const obj = (schedules && typeof schedules === 'object') ? (schedules as Record<string, unknown>) : undefined;

    for (const d of DAY_DEFS) {
      let raw: string | undefined;
      if (obj) {
        const keys = [d.key, ...(d.alt || [])];
        raw = getFromObj(obj, keys);
      }
      const schedule = raw ?? (fallbackSchedule || '');
      rows.push({
        label: d.label,
        time: formatSchedule(schedule),
      });
    }
    return rows;
  }, [schedules, fallbackSchedule]);

  return (
    <>
      <div className={isShow ? 'overlay active' : 'overlay'} onClick={onClose} />
      <div className={isShow ? 'weekly-modal active' : 'weekly-modal'}>
        <h3 className='title'>{t('closed.scheduleTitle', { defaultValue: 'График работы' })}</h3>

        <div className='list'>
          {weekly.map((row, idx) => (
            <div className='row' key={idx}>
              <span className='day'>{row.label}</span>
              <span className='time'>{row.time}</span>
            </div>
          ))}
        </div>

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

export default WeeklyScheduleModal;
