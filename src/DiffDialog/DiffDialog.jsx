import styles from './index.scss';
import React, { useState } from 'react';
import { diff } from './diff';
import { E6Render } from '../E6Render';

const DiffDialog = ({ currentData }) => {
  const [diffFlowData, setDiffFlowData] = useState();
  const [saveData, setSaveData] = useState(currentData);

  const handleShowDiffDialog = () => {
    setDiffFlowData(diffFlowData ? undefined : diff(currentData, saveData));
  };

  const handleMockSave = () => {
    setSaveData(currentData);
  };

  return (
    <div>
      <button className={'mockSave'} onClick={handleMockSave}>
        Mock Save
      </button>
      <button disabled={!saveData} className={'diffButton'} onClick={handleShowDiffDialog}>
        Show Diff
      </button>
      {diffFlowData && (
        <div className="diffDialog">
          <E6Render data={diffFlowData} isDiff />
        </div>
      )}
    </div>
  );
};

export default DiffDialog;
