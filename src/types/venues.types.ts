export interface ISpot {
  id: number;
  name: string;
  address: string | null;
}

export interface IVenues {
  colorTheme: string;
  companyName: string;
  slug: string;
  logo: string;
  schedule: string;
  serviceFeePercent: number;

  // table info is present only for /venues/{slug}/table/{tableId}/
  table?: {
    id: number;
    tableNum: string;
  };

  // new fields from API
  defaultDeliverySpot?: number | null;
  deliveryFixedFee?: string | null;
  deliveryFreeFrom?: string | null;

  // optional weekly schedules holder (shape TBD)
  schedules?: unknown;

  spots?: ISpot[];
  activeSpot: number;
  isDeliveryAvailable: boolean;
  isTakeoutAvailable: boolean;
  isDineinAvailable: boolean;
}
