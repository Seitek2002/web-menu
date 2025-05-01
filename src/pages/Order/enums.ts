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
      description: string;
    };
  };
}

export const statusMessages: StatusMessages = {
  1: {
    0: {
      icon: guy,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: check,
      },
      description:
        'В ближайшие 5-10 минут администратор свяжется с Вами и уточнит детали',
    },
    1: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ принят!',
        icon: clock,
      },
      description: 'Ожидайте, скоро приготовится',
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
      description: 'Что-то пошло не так. Попробуйте снова',
    },
  },
  2: {
    0: {
      icon: guy,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: check,
      },
      description:
        'В ближайшие 5-10 минут администратор свяжется с Вами и уточнит детали',
    },
    1: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ принят!',
        icon: clock,
      },
      description: 'Ожидайте, скоро приготовится',
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
      description: 'Что-то пошло не так. Попробуйте снова',
    },
  },
  3: {
    0: {
      icon: guy,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: check,
      },
      description:
        'В ближайшие 5-10 минут администратор свяжется с Вами и уточнит детали',
    },
    1: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ принят!',
        icon: clock,
      },
      description: 'Ожидайте, скоро приготовится',
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
      description: 'Что-то пошло не так. Попробуйте снова',
    },
  },
};

// data.serviceMode --> 1 (На месте) | 2 (На вынос) | 3 (Доставка)
// order.status     --> 0 (Новый)    | 1 (Принят)   | 7 (Отменен)
