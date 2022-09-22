import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Alert, withProps, router } from '@erxes/ui/src/utils';
import List from '../components/List';
import { mutations, queries } from '../graphql';
import React from 'react';
import { IButtonMutateProps, IRouterProps } from '@erxes/ui/src/types';
import * as compose from 'lodash.flowright';
import {
  DocumentsCountQueryResponse,
  DocumentsQueryResponse,
  RemoveMutationResponse,
  RemoveMutationVariables
} from '../types';
import Bulk from '@erxes/ui/src/components/Bulk';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';

type Props = {
  queryParams: any;
  history: any;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

type FinalProps = {
  documentsListQuery: DocumentsQueryResponse;
  documentsTotalCountQuery: DocumentsCountQueryResponse;
} & Props &
  IRouterProps &
  RemoveMutationResponse;

class ListContainer extends React.Component<FinalProps> {
  render() {
    const {
      documentsListQuery,
      documentsRemove,
      documentsTotalCountQuery
    } = this.props;

    const documents = documentsListQuery.documents || [];
    const searchValue = this.props.queryParams.searchValue || '';

    const removeDocuments = ({ documentIds }, emptyBulk) => {
      documentsRemove({
        variables: { documentIds }
      })
        .then(() => {
          emptyBulk();
          Alert.success('You successfully deleted a car');
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const updatedProps = {
      ...this.props,
      loading: documentsListQuery.loading,
      documents,
      documentsCount: documentsTotalCountQuery.documentsCounts || 0,
      removeDocuments,
      searchValue
    };

    const docsList = props => {
      return <List {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.documentsListQuery.refetch();
    };

    return <Bulk content={docsList} refetch={refetch} />;
  }
}

const generateOptions = () => ({
  refetchQueries: ['documents', 'documentsCounts']
});

export default withProps<Props>(
  compose(
    graphql<Props, DocumentsQueryResponse>(gql(queries.documents), {
      name: 'documentsListQuery',
      options: ({ queryParams }) => ({
        variables: {
          searchValue: queryParams.searchValue,
          ...generatePaginationParams(queryParams)
        }
      })
    }),
    graphql<{}, RemoveMutationResponse, RemoveMutationVariables>(
      gql(mutations.documentsRemove),
      {
        name: 'documentsRemove',
        options: generateOptions
      }
    ),
    graphql<Props, DocumentsCountQueryResponse>(gql(queries.documentCounts), {
      name: 'documentsTotalCountQuery'
    })
  )(ListContainer)
);
