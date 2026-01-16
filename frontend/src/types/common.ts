export type ListStatus = 'active' | 'inactive';

export interface ListItem {
  id: string;
  name: string;
  status: ListStatus;
  owner?: string;
  description?: string;
  updatedAt: string;
}

export interface ListQuery {
  keyword: string;
  status?: ListStatus;
  dateRange: unknown[];
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
