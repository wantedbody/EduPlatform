import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const ColumnManagement = () => {
  return (
    <ListPage
      title="栏目管理"
      moduleKey="columns"
      fetchList={(query) => fetchModuleList('columns', query)}
      createItem={(payload) => createModuleItem('columns', payload)}
      updateItem={(id, payload) => updateModuleItem('columns', id, payload)}
    />
  );
};

export default ColumnManagement;
