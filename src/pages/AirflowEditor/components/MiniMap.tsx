import React, { useEffect, useState, useRef } from 'react';
import { MiniMap as MP } from '@antv/x6-plugin-minimap';
import { Typography } from 'antd';
import { Graph } from '@antv/x6';

const { Title } = Typography;

interface MiniMapProps {
  editorInstance: Graph;
}
const MiniMap = ({ editorInstance }: MiniMapProps) => {
  const ref = useRef<HTMLDivElement>();

  const initMiniMap = () => {
    setTimeout(() => {
      editorInstance.use(
        new MP({
          container: ref.current,
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        })
      );
    }, 200);
  };

  useEffect(() => {
    if (editorInstance) {
      initMiniMap();
    }
  }, [editorInstance]);

  return (
    <div className="mini-map">
      <Title className="mini-map-title" level={5}>
        Mini Map
      </Title>
      <div ref={ref} className="mini-map-wrapper"></div>
    </div>
  );
};

export default MiniMap;
