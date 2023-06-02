import styles from './index.scss';
import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { diff } from './diff';
import { E6Render } from '../E6Render';
import ReactDiffViewer from 'react-diff-viewer-continued';
import { ProDescriptions } from '@ant-design/pro-components';

const oldCode = `const a = 133`;
const newCode = `const a = 10`;

const DiffDialog = ({ currentData }) => {
  const [diffFlowData, setDiffFlowData] = useState();
  const [saveData, setSaveData] = useState(currentData);
  const [open, setOpen] = useState(false);

  const handleShowDiffDialog = () => {
    setDiffFlowData(diffFlowData ? undefined : diff(currentData, saveData));
  };

  const handleMockSave = () => {
    setSaveData(currentData);
  };

  const handleShowDiffFieldDialog = () => {};

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
          <Button
            type="primary"
            onClick={() => setOpen(true)}
            style={{ position: 'absolute', right: 0, top: 0, zIndex: 1000 }}
          >
            Field
          </Button>
          <Drawer title="(rollday_finished.usne) Config Change" onClose={() => setOpen(false)} open={open} size="large">
            <ProDescriptions
              column={1}
              layout="vertical"
              columns={[
                {
                  title: 'Title',
                  dataIndex: 'id',
                  render: () => {
                    return (
                      <ReactDiffViewer oldValue={'xxxx'} newValue={'axxxb'} splitView={true} hideLineNumbers={true} />
                    );
                  },
                },
                {
                  title: 'EntryDate',
                  dataIndex: 'id',
                  render: () => {
                    return (
                      <ReactDiffViewer
                        oldValue={'2023-06-01'}
                        newValue={'2023-05-23'}
                        splitView={true}
                        hideLineNumbers={true}
                      />
                    );
                  },
                },
              ]}
            ></ProDescriptions>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default DiffDialog;
