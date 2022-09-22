import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import React from 'react';

import { IDocument } from '../types';
import BasicInfo from '../containers/BasicInfo';

type Props = {
  document: IDocument;
};

class LeftSidebar extends React.Component<Props> {
  render() {
    const { document } = this.props;

    return (
      <Sidebar wide={true}>
        <BasicInfo document={document} />
      </Sidebar>
    );
  }
}

export default LeftSidebar;
