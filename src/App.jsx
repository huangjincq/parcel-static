import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import './index.scss';
import createData from './createData';
import { DagreLayout } from '@antv/layout';

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
    },
    {
      id: 'node2',
      shape: 'rect',

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
    },
  ],
};

export function App() {
  const refContainer = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current, // 网格
      // 网格
      grid: true,
      // 剪切板
      clipboard: true,
      // 键盘快捷键
      keyboard: true,
      // 撤销/重做
      history: true,
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        // modifiers: 'ctrl',
        minScale: 0.1,
        maxScale: 1,
      },
      // 设置画布背景颜色
      background: {
        color: '#F2F7FA',
      },
      autoResize: true,
    });
    // 自动 dagre 布局
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 100,
      nodesep: 15,
    });
    const model = dagreLayout.layout(createData);

    graph.fromJSON(model); // 渲染元素
    graph.centerContent(); // 居中显示
  }, []);

  return (
    <div className="helloworld-app">
      <div className="app-content" ref={refContainer}></div>
    </div>
  );
}
