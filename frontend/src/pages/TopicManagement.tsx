import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const TopicManagement = () => {
  return (
    <ListPage
      title="专题活动管理"
      moduleKey="topics"
      fetchList={(query) => fetchModuleList('topics', query)}
      createItem={(payload) => createModuleItem('topics', payload)}
      updateItem={(id, payload) => updateModuleItem('topics', id, payload)}
    />
  );
};

export default TopicManagement;
