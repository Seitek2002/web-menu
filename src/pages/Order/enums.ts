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
    // На месте
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
      description: 'К сожалению, мы не сможем принять заказ.',
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят. Скоро приготовится',
        icon: check,
      },
      description: 'К сожалению, мы не сможем принять заказ.',
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
      description: 'К сожалению, мы не сможем принять заказ.',
    },
  },
  2: {
    // На вынос
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
      description: 'Ожидайте, заказ принят. Скоро приготовится',
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят.',
        icon: check,
      },
      description: 'Спасибо, скоро приготовится',
    },
    7: {
      icon: cancel,
      title: {
        text: 'Заказ отменен',
        icon: '',
      },
      description: 'К сожалению, мы не сможем принять заказ.',
    },
  },
  3: {
    // Доставка
    0: {
      icon: pending,
      title: {
        text: 'Спасибо, заказ обрабатывается',
        icon: clock,
      },
      description: 'Ожидайте, заказ принят. Скоро доставим',
    },
    1: {
      icon: guy,
      title: {
        text: 'Ожидайте, заказ принят. Скоро доставим',
        icon: check,
      },
      description: 'Скоро доставим',
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
// order.status     --> 0 (Ожидание) | 1 (Принят)   | 7 (Отменен)
