import ListPage from '../components/ListPage';
import { createModuleItem, fetchModuleList, updateModuleItem } from '../services/modules';

const ResourceAggregation = () => {
  return (
    <ListPage
      title="资源/服务聚合"
      moduleKey="resources"
      fetchList={(query) => fetchModuleList('resources', query)}
      createItem={(payload) => createModuleItem('resources', payload)}
      updateItem={(id, payload) => updateModuleItem('resources', id, payload)}
    />
  );
};

export default ResourceAggregation;
