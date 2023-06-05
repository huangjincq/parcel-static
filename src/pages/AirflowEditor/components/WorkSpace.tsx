import React, { useState, useRef, useEffect } from 'react';
import { DagreLayout } from '@antv/layout';
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
// import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Export } from '@antv/x6-plugin-export';

interface WorkSpaceProps {
  setEditorInstance: any;
  value: any;
}
const WorkSpace = ({ setEditorInstance, value }: WorkSpaceProps) => {
  const contentRef = useRef();

  const editorInstanceRef = useRef<Graph | null>(null);

  const initEditor = () => {
    // #region 初始化画布
    const graph = new Graph({
      container: contentRef.current,
      grid: true,
      autoResize: true,
      panning: {
        enabled: true,
        // eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        // factor: 1.1,
        minScale: 0.1,
        maxScale: 2,
      },
      connecting: {
        router: 'metro', // normal ｜ orth ｜ oneSide ｜ manhattan ｜ metro ｜ er
        // connector: {
        //   // name: 'smooth',
        //   // args: {
        //   //   radius: 8,
        //   // },
        // },
        // anchor: 'center',
        // connectionPoint: 'anchor', // anchor - 将 将锚点作为连接点
        allowBlank: false, // 是否允许连接到画布空白位置的点
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowNode: true, // 是否允许边连接到节点
        allowEdge: false, // 是否允许边连接到另一个边
        allowPort: false, // 是否允许边连接到连接桩
        allowMulti: false, // 不允许 相同的起始节点和终止之间 创建多条边
        highlight: true,
        // 自定义新建的边的样式
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              fill: 'rgba(95,149,255,0.6)',
              stroke: 'rgba(95,149,255,0.6)',
            },
          },
        },
      },
    });
    setEditorInstance(graph);
    editorInstanceRef.current = graph;
    // #region 使用插件
    graph
      .use(
        new Selection({
          enabled: true,
          rubberband: true, // 是否启用框选
          // showNodeSelectionBox: true,
          showNodeSelectionBox: true,
          modifiers: 'alt',
        })
      )
      .use(new Export())
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History());
    // #endregion

    // #region 快捷键与事件
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // delete
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom();
      if (zoom < 1.5) {
        graph.zoom(0.1);
      }
    });
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom();
      if (zoom > 0.5) {
        graph.zoom(-0.1);
      }
    });

    updateValue();

    const handleChange = () => {
      const data2 = graph?.toJSON().cells;
      const data3 = {
        nodes: data2.filter((v) => v.shape === 'custom-rect'),
        edges: data2
          .filter((v) => v.shape === 'edge')
          .map((v) => ({ ...v, source: v.source.cell, target: v.target.cell })),
      };
      // onChange?.(data3);
    };
    graph.on('edge:connected', handleChange); //  这个方法不准确
    graph.on('edge:removed', handleChange);
    graph.on('node:added', handleChange);
    graph.on('node:removed', handleChange);
  };

  const updateValue = () => {
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 100,
      nodesep: 10,
    });
    const model = dagreLayout.layout(value);
    editorInstanceRef.current.fromJSON(model); // 渲染元素

    const zoomOptions = {
      maxScale: 1,
      padding: {
        left: 10,
        right: 10,
      },
    };
    editorInstanceRef.current.zoomToFit(zoomOptions); // 自动缩放到充满
    editorInstanceRef.current.centerContent(); // 居中显示
  };

  useEffect(() => {
    editorInstanceRef.current ? updateValue() : initEditor();
  }, [value]);

  // 注销
  useEffect(() => {
    return () => {
      editorInstanceRef.current?.dispose();
    };
  }, []);

  return <div className="work-space" ref={contentRef}></div>;
};

export default WorkSpace;
