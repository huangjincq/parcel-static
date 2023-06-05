import { Graph } from '@antv/x6';
import { createContext, useContext } from 'react';

export interface AirflowEditorManagerProps {
  editorInstance: Graph | null;
  handleUndo: () => void;
  handleRedo: () => void;
}
const defaultValue: AirflowEditorManagerProps = {
  editorInstance: null,
  handleUndo: () => {},
  handleRedo: () => {},
};
const AirflowEditorManagerContext = createContext(defaultValue);

export const AirflowEditorManagerProvider = AirflowEditorManagerContext.Provider;

// 提供 OfficeGlobalManager 导出
export const useAirflowEditorManager = (): AirflowEditorManagerProps => {
  return useContext(AirflowEditorManagerContext);
};
