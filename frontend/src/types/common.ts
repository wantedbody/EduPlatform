export type ListStatus = 'on' | 'off';
export type JumpType = '_self' | '_blank';
export type AuditStatus = 'pending' | 'approved' | 'rejected';

export interface ListItem {
  id: string;
  title: string;
  url: string;
  jumpType?: JumpType;
  auditStatus?: AuditStatus;
  status: ListStatus;
  sortOrder?: number;
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
