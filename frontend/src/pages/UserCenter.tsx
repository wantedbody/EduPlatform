import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const UserCenter = () => {
  return (
    <ListPage
      title="用户中心"
      moduleKey="userCenter"
      fetchList={(query) => fetchModuleList('userCenter', query)}
      createItem={(payload) => createModuleItem('userCenter', payload)}
      updateItem={(id, payload) => updateModuleItem('userCenter', id, payload)}
    />
  );
};

export default UserCenter;
