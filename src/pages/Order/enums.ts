import cancel from 'assets/icons/Order/cancel.svg';
import check from 'assets/icons/Order/check.svg';
import clock from 'assets/icons/Order/clock.svg';
import guy from 'assets/icons/Order/guy.svg';
import pending from 'assets/icons/Order/pending.svg';

interface StatusMessages {
  [key: number]: {
    [key: number]: {
      icon: string;
      title: {
        text: string;
        icon: string;
      };
    };
  };
}

export const statusMessages: StatusMessages = {
  1: {
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят. Скоро приготовится',
        icon: check,
      },
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
    },
  },
  2: {
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят.',
        icon: check,
      },
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
    },
  },
  3: {
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят. Скоро доставим',
        icon: check,
      },
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
    },
  },
};

// serviceMode === 1 (На месте) | 2 (На вынос) | 3 (Доставка)
// status === 0 (Ожидание) | 1 (Принят) | 7 (Отменен)
