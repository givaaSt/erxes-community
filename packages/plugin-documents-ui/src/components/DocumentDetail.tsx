import * as path from 'path';
import EmptyState from '@erxes/ui/src/components/EmptyState';
import { IDocument } from '../types';
import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import { isEnabled, __ } from '@erxes/ui/src/utils/core';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';

const ActivityInputs = asyncComponent(
  () =>
    isEnabled('logs') &&
    path.resolve(
      /* webpackChunkName: "ActivityInputs" */ '@erxes/ui-log/src/activityLogs/components/ActivityInputs'
    )
);

const ActivityLogs = asyncComponent(
  () =>
    isEnabled('logs') &&
    path.resolve(
      /* webpackChunkName: "ActivityLogs" */ '@@erxes/ui-log/src/activityLogs/containers/ActivityLogs'
    )
);

type Props = {
  document: IDocument;
};

class DocumentDetails extends React.Component<Props> {
  renderContent(content) {
    if (isEnabled('logs')) {
      return content;
    }

    return (
      <EmptyState
        image="/images/actions/5.svg"
        text={__('No results found')}
        size="full"
      />
    );
  }

  render() {
    const { document } = this.props;

    const title = document.name || 'Unknown';

    const breadcrumb = [
      { title: __('Document'), link: '/documents' },
      { title }
    ];

    const content = (
      <>
        <ActivityInputs
          contentTypeId={document._id}
          contentType="document"
          showEmail={false}
        />
        <ActivityLogs
          target={document.name || ''}
          contentId={document._id}
          contentType="document:document"
          extraTabs={[]}
        />
      </>
    );

    return (
      <Wrapper
        header={<Wrapper.Header title={title} breadcrumb={breadcrumb} />}
        leftSidebar={<LeftSidebar {...this.props} />}
        rightSidebar={<RightSidebar document={document} />}
        content={this.renderContent(content)}
        transparent={true}
      />
    );
  }
}

export default DocumentDetails;
