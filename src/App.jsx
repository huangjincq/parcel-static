import React, { useEffect, useRef, useState } from 'react';
import { Graph } from '@antv/x6';
import './index.scss';
import createData from './createData';
import { DagreLayout } from '@antv/layout';
import { DiffDialog } from './DiffDialog';
import { E6Render } from './E6Render';

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'custom-rect',
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        body: {
          // fill: '#ff00ff',
        },
      },
    },
    {
      id: 'node2',
      shape: 'custom-rect',
      width: 100,
      height: 40,
      label: 'world',
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      attrs: {
        line: {
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
    },
  ],
};

export function App() {
  const [flowData, setFlowData] = useState(createData);

  return (
    <div className="helloworld-app">
      <E6Render data={createData} onChange={setFlowData} />
      <DiffDialog currentData={flowData} />
    </div>
  );
}
