import * as path from 'path';
import Box from '@erxes/ui/src/components/Box';
import { IDocument } from '../types';
import React from 'react';
import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import { __ } from 'coreui/utils';
import dayjs from 'dayjs';
import { isEnabled } from '@erxes/ui/src/utils/core';
import { List } from '../styles';

type Props = {
  document: IDocument;
};

export default class RightSidebar extends React.Component<Props> {
  render() {
    const { document } = this.props;

    return (
      <Sidebar>
        <Box title={__('Other')} name="showOthers">
          <List>
            <li>
              <div>{__('Created at')}: </div>{' '}
              <span>{dayjs(document.createdAt).format('lll')}</span>
            </li>
            <li>
              <div>{__('Modified at')}: </div>{' '}
              <span>{dayjs(document.modifiedAt).format('lll')}</span>
            </li>
          </List>
        </Box>
      </Sidebar>
    );
  }
}
