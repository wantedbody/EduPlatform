import request from './request';
import type { ListItem, ListQuery, ListResponse } from '../types/common';

const endpoints: Record<string, string> = {
  columns: '/columns',
  navigation: '/navigation',
  topics: '/topics',
  resources: '/resources',
  userCenter: '/user-center',
  systemMessages: '/system-messages'
};

const buildParams = (query: ListQuery) => ({
  keyword: query.keyword,
  status: query.status,
  dateRange: query.dateRange
});

export const fetchModuleList = async (
  moduleKey: keyof typeof endpoints,
  query: ListQuery
): Promise<ListResponse<ListItem>> => {
  return request.get(endpoints[moduleKey], { params: buildParams(query) });
};

export const createModuleItem = async (
  moduleKey: keyof typeof endpoints,
  payload: Partial<ListItem>
) => request.post(endpoints[moduleKey], payload);

export const updateModuleItem = async (
  moduleKey: keyof typeof endpoints,
  id: string,
  payload: Partial<ListItem>
) => request.put(`${endpoints[moduleKey]}/${id}`, payload);
