import React, { useEffect, useRef } from 'react';
import { Graph } from '@antv/x6';
import './index.scss';
import { DagreLayout } from '@antv/layout';

export function E6Render({ data }) {
  const refContainer = useRef();

  useEffect(() => {
    const graph = new Graph({
      container: refContainer.current, // 网格
      // 网格
      // grid: true,
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
      // background: {
      //   color: '#F2F7FA',
      // },
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
    const model = dagreLayout.layout(data);

    graph.fromJSON(model); // 渲染元素
    graph.centerContent(); // 居中显示

    graph.on('cell:changed', (a) => {
      console.log(a);
    });
  }, [data]);

  return <div ref={refContainer}></div>;
}
