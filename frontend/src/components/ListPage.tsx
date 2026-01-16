import { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
  { label: '上架', value: 'on' },
  { label: '下架', value: 'off' }
];

const jumpTypeOptions = [
  { label: '当前窗口', value: '_self' },
  { label: '新窗口', value: '_blank' }
];

const auditStatusOptions = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' }
];

const ListPage = ({ title, moduleKey, fetchList, createItem, updateItem }: ListPageProps) => {
  const [filterForm] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [query, setQuery] = useState<ListQuery>(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ListItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const loadData = async (nextQuery: ListQuery) => {
    setLoading(true);
    try {
      const response = await fetchList(nextQuery);
      setData(
        response.items.map((item, index) => ({
          ...item,
          sortOrder: item.sortOrder ?? index + 1
        }))
      );
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
      title: record?.title,
      url: record?.url,
      jumpType: record?.jumpType ?? '_self',
      auditStatus: record?.auditStatus ?? 'pending',
      status: record?.status ?? 'on',
      sortOrder: record?.sortOrder ?? data.length + 1,
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

  const handleMove = (record: ListItem, direction: 'up' | 'down') => {
    setData((prev) => {
      const currentIndex = prev.findIndex((item) => item.id === record.id);
      if (currentIndex < 0) {
        return prev;
      }
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) {
        return prev;
      }
      const next = [...prev];
      [next[currentIndex], next[targetIndex]] = [next[targetIndex], next[currentIndex]];
      return next.map((item, index) => ({
        ...item,
        sortOrder: index + 1
      }));
    });
    messageApi.success(direction === 'up' ? '已上移' : '已下移');
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      messageApi.warning('请先选择要删除的条目');
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      okText: '删除',
      cancelText: '取消',
      onOk: () => {
        setData((prev) => prev.filter((item) => !selectedRowKeys.includes(item.id)));
        setSelectedRowKeys([]);
        messageApi.success('批量删除成功');
      }
    });
  };

  const handleRefresh = () => {
    loadData(query);
  };

  const columns: ColumnsType<ListItem> = useMemo(
    () => [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url'
      },
      {
        title: '跳转方式',
        dataIndex: 'jumpType',
        key: 'jumpType',
        render: (jumpType: ListItem['jumpType']) =>
          jumpType === '_blank' ? '新窗口' : '当前窗口'
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatus',
        key: 'auditStatus',
        render: (auditStatus: ListItem['auditStatus']) => {
          const mapping = {
            pending: { color: 'gold', label: '待审核' },
            approved: { color: 'green', label: '已通过' },
            rejected: { color: 'red', label: '已拒绝' }
          } as const;
          const result = mapping[auditStatus ?? 'pending'];
          return <Tag color={result.color}>{result.label}</Tag>;
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: ListItem['status']) => (
          <Tag color={status === 'on' ? 'green' : 'red'}>
            {status === 'on' ? '上架' : '下架'}
          </Tag>
        )
      },
      {
        title: '排序号',
        dataIndex: 'sortOrder',
        key: 'sortOrder'
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
            <Button
              type="link"
              onClick={() => handleMove(record, 'up')}
              disabled={data.findIndex((item) => item.id === record.id) === 0}
            >
              上移
            </Button>
            <Button
              type="link"
              onClick={() => handleMove(record, 'down')}
              disabled={data.findIndex((item) => item.id === record.id) === data.length - 1}
            >
              下移
            </Button>
          </Space>
        )
      }
    ],
    [data, moduleKey]
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
              <Form.Item label="上/下架状态" name="status">
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
            <Button onClick={handleRefresh}>刷新</Button>
            <Button danger onClick={handleBatchDelete} disabled={selectedRowKeys.length === 0}>
              批量删除
            </Button>
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
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys as string[])
          }}
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
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder={`请输入${title}标题`} />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: '请输入URL' }]}
          >
            <Input placeholder="请输入URL" />
          </Form.Item>
          <Form.Item
            label="跳转方式"
            name="jumpType"
            rules={[{ required: true, message: '请选择跳转方式' }]}
          >
            <Select options={jumpTypeOptions} placeholder="请选择跳转方式" />
          </Form.Item>
          <Form.Item
            label="审核状态"
            name="auditStatus"
            rules={[{ required: true, message: '请选择审核状态' }]}
          >
            <Select options={auditStatusOptions} placeholder="请选择审核状态" />
          </Form.Item>
          <Form.Item
            label="上/下架状态"
            name="status"
            rules={[{ required: true, message: '请选择上/下架状态' }]}
          >
            <Select options={statusOptions.filter((option) => option.value)} />
          </Form.Item>
          <Form.Item
            label="排序号"
            name="sortOrder"
            rules={[{ required: true, message: '请输入排序号' }]}
          >
            <InputNumber className="full-width" min={1} placeholder="请输入排序号" />
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
