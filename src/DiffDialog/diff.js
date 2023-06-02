export const diff = (current, origin) => {
  // 被删掉的节点
  const deletedNodes = origin.nodes.filter((o) => {
    return !current.nodes.find((c) => c.id === o.id);
  });
  // 新增的节点
  const addNodes = current.nodes.filter((c) => {
    return !origin.nodes.find((o) => c.id === o.id);
  });
  // 合并所有节点
  let mergeNodes = current.nodes.map((v) => {
    // 如果是新增的节点
    if (addNodes.find((a) => a.id === v.id)) {
      return {
        ...v,
        attrs: {
          ...v.attrs,
          body: {
            ...v.attrs?.body,
            fill: '#00ff00',
          },
        },
      };
    } else {
      return { ...v };
    }
  });

  // 删除的节点
  mergeNodes = mergeNodes.concat(
    deletedNodes.map((d) => ({
      ...d,
      attrs: {
        ...d.attrs,
        body: {
          ...d.attrs?.body,
          fill: '#ff0000',
        },
      },
    }))
  );

  /***********************************************/
  // 被删掉的线
  const deletedEdges = origin.edges.filter((o) => {
    return !current.edges.find((c) => c.source === o.source && c.target === o.target);
  });
  // 新增的线
  const addEdges = current.edges.filter((c) => {
    return !origin.edges.find((o) => c.source === o.source && c.target === o.target);
  });
  // 合并所有线条
  let mergeEdges = current.edges.map((v) => {
    // 如果是新增的线
    if (addEdges.find((a) => a.source === v.source && a.target === v.target)) {
      return {
        ...v,
        attrs: {
          ...v.attrs,
          line: {
            ...v.attrs?.line,
            stroke: '#00ff00',
          },
        },
      };
    } else {
      return { ...v };
    }
  });
  // 删除的线
  mergeEdges = mergeEdges.concat(
    deletedEdges.map((d) => ({
      ...d,
      attrs: {
        ...d.attrs,
        line: {
          ...d.attrs?.line,
          stroke: '#ff0000',
        },
      },
    }))
  );

  return { nodes: mergeNodes, edges: mergeEdges };
};
