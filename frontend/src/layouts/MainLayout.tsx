import { Layout, Menu, Avatar, Badge, Typography, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuRoutes } from '../routes';
import '../styles/layout.css';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKeys = menuRoutes
    .map((route) => route.path)
    .filter((path) => location.pathname.startsWith(path));

  return (
    <Layout className="app-layout">
      <Sider width={220} className="app-sider">
        <div className="app-logo">EduPlatform</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={({ key }) => navigate(key)}
          items={menuRoutes.map((route) => ({
            key: route.path,
            icon: <route.icon />,
            label: route.name
          }))}
        />
      </Sider>
      <Layout>
        <Header className="app-header">
          <Space size={16}>
            <Typography.Title level={4} className="app-header-title">
              运营管理控制台
            </Typography.Title>
          </Space>
          <Space size={16} className="app-header-actions">
            <Badge count={3}>
              <Avatar size="small">U</Avatar>
            </Badge>
            <Typography.Text>管理员</Typography.Text>
          </Space>
        </Header>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
