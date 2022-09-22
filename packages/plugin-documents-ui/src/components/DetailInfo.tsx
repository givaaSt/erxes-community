import {
  FieldStyle,
  SidebarCounter,
  SidebarList
} from '@erxes/ui/src/layout/styles';
import { __ } from '@erxes/ui/src/utils/core';
import React from 'react';

import { IDocument } from '../types';

type Props = {
  document: IDocument;
};

class DetailInfo extends React.Component<Props> {
  renderRow = (label, value) => {
    return (
      <li>
        <FieldStyle>{__(`${label}`)}</FieldStyle>
        <SidebarCounter>{value || '-'}</SidebarCounter>
      </li>
    );
  };

  render() {
    const { document } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('Name', document.name)}
        {this.renderRow('Description', document.description)}
      </SidebarList>
    );
  }
}

export default DetailInfo;
