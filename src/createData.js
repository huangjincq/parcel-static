import mockData from './mockData.json';

const createData = (data) => {
  const nodes = data.map((v, i) => {
    const label = v.title || v.taskId;
    return {
      // shape: 'rect',
      shape: 'custom-rect',
      color: '#1890FF',
      label: label,

      width: getTextWith(label),
      height: 40,
      id: v.taskId,
    };
  });

  const edges = [];
  // 构建节点路径数据
  data.forEach((taskItem) => {
    taskItem.downstreamTaskIdList.forEach((taskId) => {
      if (data.some((v) => v.taskId === taskId)) {
        edges.push({
          source: taskItem.taskId,
          target: taskId,
          shape: 'edge',
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
        });
      }
    });
  });

  return {
    nodes,
    edges,
  };
};

/**
 * 根据文本内容计算文本长度
 * @param text 文本内容
 * @param fontStyle 文本样式
 * @returns length
 */
export const getTextWith = (text, fontStyle = '14px Arial, PingFang SC, PingFang SC Regular, sans-serif') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = fontStyle;
  const dimension = context.measureText(text);
  return dimension.width;
};

export default createData(mockData);
