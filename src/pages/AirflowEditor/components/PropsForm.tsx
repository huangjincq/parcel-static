import { BetaSchemaForm, ProFormColumnsType } from '@ant-design/pro-form';
import { Typography } from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;

interface PropsFormProps {}
const PropsForm = ({}: PropsFormProps) => {
  const columns: ProFormColumnsType[] = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'TaskId',
      dataIndex: 'taskId',
    },
    {
      title: 'DagId',
      dataIndex: 'dagId',
    },
    {
      title: 'Task Type',
      dataIndex: 'taskType',
      valueType: 'select',
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: 'Biz Type',
      dataIndex: 'bizType',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
  ];

  return (
    <div className="props-form">
      <Title className="props-form-title" level={4}>
        Node Config
      </Title>
      <div className="props-form-content">
        <BetaSchemaForm
          onFinish={async (values) => {
            console.log(values);
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default PropsForm;
