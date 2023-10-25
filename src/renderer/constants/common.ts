export const DEFAULT_PAGE_SIZE = 10;
export const LOCALSTORAGE_USER = 'user';
export const LOCALSTORAGE_NOW = 'now';
export const LOCALSTORAGE_IS_DISCONNECT = 'is_connect';

export interface IPagination {
  currentPage: number;
  pageSize: number;
}

export const PAGE_SIZE_OPTIONS = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
];
