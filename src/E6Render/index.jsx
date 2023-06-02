import React, { useEffect, useRef } from 'react';
import { DagreLayout } from '@antv/layout';
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
// import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import './index.scss';
import { Export } from '@antv/x6-plugin-export';

// #region 初始化图形
const ports = {
  groups: {
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            // visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'right',
    },
  ],
};

Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 12,
        fill: '#262626',
      },
    },
    ports: { ...ports },
  },
  true
);

export function E6Render({ data, onChange, isDiff = false }) {
  const refContainer = useRef();
  const refStencil = useRef();

  const graphRef = useRef();

  useEffect(() => {
    if (!graphRef.current) {
      // 为了协助代码演示
      // #region 初始化画布
      const graph = new Graph({
        container: refContainer.current,
        grid: true,
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
          // validateConnection({ targetMagnet }) {
          //   return !!targetMagnet;
          // },
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
      graphRef.current = graph;
      // #endregion

      // #region 使用插件
      graph
        // .use(
        //   new Transform({
        //     resizing: true,
        //     rotating: false,
        //   })
        // )
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

      // #region 初始化 stencil
      const stencil = new Stencil({
        title: 'Dag Editor',
        target: graph,
        search: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 0,
        collapsable: true,
        groups: [
          {
            title: '基础资源',
            name: 'group1',
          },
          {
            title: '资产库',
            name: 'group2',
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55,
        },
      });
      refStencil.current.appendChild(stencil.container);
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
      // undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
          graph.undo();
        }
        return false;
      });
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
          graph.redo();
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

      // #endregion

      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '基础资源',
      });
      stencil.load([r2], 'group1');

      // #endregion
      // 自动 dagre 布局
      if (!isDiff) {
        const dagreLayout = new DagreLayout({
          type: 'dagre',
          rankdir: 'LR',
          align: 'UR',
          ranksep: 100,
          nodesep: 10,
        });
        const model = dagreLayout.layout(data);
        graph.fromJSON(model); // 渲染元素
      } else {
        graph.fromJSON(data); // 渲染元素
      }
      const zoomOptions = {
        maxScale: 1,
        padding: {
          left: 10,
          right: 10,
        },
      };
      graph.zoomToFit(zoomOptions); // 自动缩放到充满
      graph.centerContent(); // 居中显示

      const handleChange = () => {
        const data2 = graph?.toJSON().cells;
        const data3 = {
          nodes: data2.filter((v) => v.shape === 'custom-rect'),
          edges: data2
            .filter((v) => v.shape === 'edge')
            .map((v) => ({ ...v, source: v.source.cell, target: v.target.cell })),
        };
        onChange?.(data3);
      };
      graph.on('edge:connected', handleChange); //  这个方法不准确
      graph.on('edge:removed', handleChange);
      graph.on('node:added', handleChange);
      graph.on('node:removed', handleChange);
    } else {
      graphRef.current.fromJSON(data); // 渲染元素
    }
  }, [data]);

  const handleAutoLayout = () => {
    const data2 = graphRef.current?.toJSON().cells;
    const data3 = {
      nodes: data2.filter((v) => v.shape === 'custom-rect'),
      edges: data2
        .filter((v) => v.shape === 'edge')
        .map((v) => ({ ...v, source: v.source.cell, target: v.target.cell })),
    };
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: 'LR',
      align: 'UR',
      ranksep: 100,
      nodesep: 15,
    });
    const model = dagreLayout.layout(data3);
    graphRef.current.fromJSON(model); // 渲染元素
    const zoomOptions = {
      padding: {
        left: 10,
        right: 10,
      },
    };
    graphRef.current.zoomToFit(zoomOptions); // 自动缩放到充满
    graphRef.current.centerContent(); // 居中显示

    onChange?.(model);
  };

  const handleUndo = () => {
    if (graphRef.current.canUndo()) {
      graphRef.current.undo();
    }
    return false;
  };
  const handleRedo = () => {
    if (graphRef.current.canRedo()) {
      graphRef.current.redo();
    }
    return false;
  };

  const handleExport = () => {
    graphRef.current.exportPNG();
  };

  const handleNodeMoveCenter = () => {
    graphRef.current.centerCell(graphRef.current.getCells()[100]);
  };
  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div hidden={isDiff} style={{ borderBottom: '1px solid #000' }}>
        <button onClick={handleAutoLayout}>自动排列</button>
        <button onClick={handleUndo}>撤销</button>
        <button onClick={handleRedo}>重做</button>
        <button onClick={handleExport}>导出</button>
        <button onClick={handleNodeMoveCenter}>某个点移动到中心</button>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div hidden={isDiff} className="stencil" ref={refStencil}></div>
        <div className="graph-container" ref={refContainer}></div>
      </div>
    </div>
  );
}
