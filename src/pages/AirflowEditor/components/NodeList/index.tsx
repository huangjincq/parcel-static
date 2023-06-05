import React, { useState, useRef, useEffect } from 'react';
import { Stencil } from '@antv/x6-plugin-stencil';

interface NodeListProps {
  editorInstance: any;
}
const NodeList = ({ editorInstance }: NodeListProps) => {
  const nodeListRef = useRef();

  const initStencil = () => {
    const stencil = new Stencil({
      title: 'Dag Editor',
      target: editorInstance,
      search(cell: any, keyword) {
        return cell.label.indexOf(keyword) !== -1;
      },
      stencilGraphHeight: 0,
      collapsable: true,
      groups: [
        {
          title: '资产库',
          name: 'group1',
        },
        {
          title: '基础资源',
          name: 'group2',
        },
      ],
      layoutOptions: {
        columns: 1,
        columnWidth: 180,
        rowHeight: 44,
        resizeToFit: true,
      },
    });
    nodeListRef.current.appendChild(stencil.container);

    const customNodeTypes = [
      'BranchPythonOperator',
      'DateTimeSensor',
      'DummyOperator',
      'HttpOperator',
      'HttpSensor',
      'PythonOperator',
      'S3KeySensor',
      'S3ListOperator',
      'TriggerDagRunOperator',
    ];

    const customNodes = customNodeTypes.map((item) =>
      editorInstance.createNode({
        shape: 'custom-rect',
        label: item,
        width: 180,
        height: 36,
      })
    );
    stencil.load(
      [
        editorInstance.createNode({
          shape: 'custom-rect',
          label: 'xxxx.use',
          width: 180,
          height: 36,
        }),
      ],
      'group1'
    );
    stencil.load(customNodes, 'group2');
  };

  useEffect(() => {
    if (editorInstance) {
      initStencil();
    }
  }, [editorInstance]);

  return <div className="node-list" ref={nodeListRef}></div>;
};

export default NodeList;
