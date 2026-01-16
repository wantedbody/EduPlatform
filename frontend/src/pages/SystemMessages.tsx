import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const SystemMessages = () => {
  return (
    <ListPage
      title="系统消息"
      moduleKey="systemMessages"
      fetchList={(query) => fetchModuleList('systemMessages', query)}
      createItem={(payload) => createModuleItem('systemMessages', payload)}
      updateItem={(id, payload) => updateModuleItem('systemMessages', id, payload)}
    />
  );
};

export default SystemMessages;
