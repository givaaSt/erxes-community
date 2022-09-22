import { Alert, withProps } from '@erxes/ui/src';
import { IUser } from '@erxes/ui/src/auth/types';
import { IRouterProps } from '@erxes/ui/src/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import BasicInfoSection from '../components/BasicInfoSection';
import { mutations } from '../graphql';
import {
  IDocument,
  RemoveMutationResponse,
  RemoveMutationVariables
} from '../types';

type Props = {
  document: IDocument;
};

type FinalProps = { currentUser: IUser } & Props &
  IRouterProps &
  RemoveMutationResponse;

const BasicInfoContainer = (props: FinalProps) => {
  const { document, documentsRemove, history } = props;

  const { _id } = document;

  const remove = () => {
    documentsRemove({ variables: { documentIds: [_id] } })
      .then(() => {
        Alert.success('You successfully deleted a document');
        history.push('/documents');
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  const updatedProps = {
    ...props,
    remove
  };

  return <BasicInfoSection {...updatedProps} />;
};

const generateOptions = () => ({
  refetchQueries: ['documents', 'documentsCounts']
});

export default withProps<Props>(
  compose(
    graphql<{}, RemoveMutationResponse, RemoveMutationVariables>(
      gql(mutations.documentsRemove),
      {
        name: 'documentsRemove',
        options: generateOptions
      }
    )
  )(withRouter<FinalProps>(BasicInfoContainer))
);
