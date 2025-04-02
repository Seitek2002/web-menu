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
  table: {
    id: number;
    tableNum: string;
  };
  spots?: ISpot[]
}
