import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const NavigationManagement = () => {
  return (
    <ListPage
      title="导航管理"
      moduleKey="navigation"
      fetchList={(query) => fetchModuleList('navigation', query)}
      createItem={(payload) => createModuleItem('navigation', payload)}
      updateItem={(id, payload) => updateModuleItem('navigation', id, payload)}
    />
  );
};

export default NavigationManagement;
