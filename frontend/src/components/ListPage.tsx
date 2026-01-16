import { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ListItem, ListQuery, ListResponse } from '../types/common';

const { RangePicker } = DatePicker;

export interface ListPageProps {
  title: string;
  moduleKey: string;
  fetchList: (query: ListQuery) => Promise<ListResponse<ListItem>>;
  createItem: (payload: Partial<ListItem>) => Promise<void>;
  updateItem: (id: string, payload: Partial<ListItem>) => Promise<void>;
}

const defaultQuery: ListQuery = {
  keyword: '',
  status: undefined,
  dateRange: []
};

const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: 'active' },
  { label: '停用', value: 'inactive' }
];

const ListPage = ({ title, moduleKey, fetchList, createItem, updateItem }: ListPageProps) => {
  const [filterForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [query, setQuery] = useState<ListQuery>(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async (nextQuery: ListQuery) => {
    setLoading(true);
    try {
      const response = await fetchList(nextQuery);
      setData(response.items);
    } catch (error) {
      messageApi.error('列表数据获取失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(query);
  }, [query]);

  const handleSearch = () => {
    const values = filterForm.getFieldsValue();
    setQuery({
      keyword: values.keyword ?? '',
      status: values.status || undefined,
      dateRange: values.dateRange ?? []
    });
  };

  const handleReset = () => {
    filterForm.resetFields();
    setQuery(defaultQuery);
  };

  const handleOpenModal = (record?: ListItem) => {
    setEditingItem(record ?? null);
    modalForm.setFieldsValue({
      name: record?.name,
      status: record?.status ?? 'active',
      owner: record?.owner,
      description: record?.description
    });
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingItem(null);
  };

  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      if (editingItem) {
        await updateItem(editingItem.id, values);
        messageApi.success('更新成功');
      } else {
        await createItem(values);
        messageApi.success('新增成功');
      }
      setModalVisible(false);
      setEditingItem(null);
      loadData(query);
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      }
    }
  };

  const columns: ColumnsType<ListItem> = useMemo(
    () => [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '负责人',
        dataIndex: 'owner',
        key: 'owner'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: ListItem['status']) => (
          <Tag color={status === 'active' ? 'green' : 'red'}>
            {status === 'active' ? '启用' : '停用'}
          </Tag>
        )
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt'
      },
      {
        title: '操作',
        key: 'actions',
        render: (_, record) => (
          <Space>
            <Button type="link" onClick={() => handleOpenModal(record)}>
              编辑
            </Button>
            <Button type="link" danger>
              下线
            </Button>
          </Space>
        )
      }
    ],
    [moduleKey]
  );

  return (
    <PageContainer title={title} className="list-page">
      {contextHolder}
      <Card className="list-filter" title="筛选区">
        <Form form={filterForm} layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="关键字" name="keyword">
                <Input placeholder="请输入名称/编号" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="状态" name="status">
                <Select options={statusOptions} placeholder="请选择" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="创建时间" name="dateRange">
                <RangePicker className="full-width" />
              </Form.Item>
            </Col>
            <Col span={4} className="filter-actions">
              <Space>
                <Button type="primary" onClick={handleSearch}>
                  查询
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        className="list-table"
        title="列表"
        extra={
          <Space>
            <Button>导出</Button>
            <Button type="primary" onClick={() => handleOpenModal()}>
              新增{title}
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        open={modalVisible}
        title={editingItem ? `编辑${title}` : `新增${title}`}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        okText="保存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={modalForm} layout="vertical" preserve={false}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder={`请输入${title}名称`} />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select options={statusOptions.filter((option) => option.value)} />
          </Form.Item>
          <Form.Item label="负责人" name="owner">
            <Input placeholder="请输入负责人" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ListPage;
