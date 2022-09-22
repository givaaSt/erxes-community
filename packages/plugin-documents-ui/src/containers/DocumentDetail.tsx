import { EmptyState, Spinner, withProps } from '@erxes/ui/src';
import { IUser } from '@erxes/ui/src/auth/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import DocumentDetails from '../components/DocumentDetail';
import { queries } from '../graphql';
import { DetailQueryResponse } from '../types';

type Props = {
  id: string;
};

type FinalProps = {
  documentDetailQuery: DetailQueryResponse;
} & Props;

const DocumentDetailsContainer = (props: FinalProps) => {
  const { id, documentDetailQuery } = props;

  if (documentDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!documentDetailQuery.documentDetail) {
    return (
      <EmptyState text="Document not found" image="/images/actions/24.svg" />
    );
  }

  const documentDetail = documentDetailQuery.documentDetail;

  const updatedProps = {
    ...props,
    loading: documentDetailQuery.loading,
    document: documentDetail
  };

  return <DocumentDetails {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.documentDetail),
      {
        name: 'documentDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    )
  )(DocumentDetailsContainer)
);
