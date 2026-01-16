import {
  AppstoreOutlined,
  BarsOutlined,
  ClusterOutlined,
  NotificationOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';

export const menuRoutes = [
  {
    path: '/columns',
    name: '栏目管理',
    icon: AppstoreOutlined
  },
  {
    path: '/navigation',
    name: '导航管理',
    icon: BarsOutlined
  },
  {
    path: '/topics',
    name: '专题活动管理',
    icon: ProfileOutlined
  },
  {
    path: '/resources',
    name: '资源/服务聚合',
    icon: ClusterOutlined
  },
  {
    path: '/user-center',
    name: '用户中心',
    icon: SettingOutlined
  },
  {
    path: '/system-messages',
    name: '系统消息',
    icon: NotificationOutlined
  }
];
