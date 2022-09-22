import ButtonMutate from '@erxes/ui/src/components/ButtonMutate';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import React from 'react';
import DocumentForm from '../components/DocumentForm';
import { mutations } from '../graphql';
import { IDocument } from '../types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { withProps } from '@erxes/ui/src';

type Props = {
  queryParams: any;
  history: any;
  document: IDocument;
  closeModal: () => void;
};

class DocumentFormContainer extends React.Component<Props> {
  render() {
    const renderButton = ({
      name,
      values,
      isSubmitted,
      object
    }: IButtonMutateProps) => {
      const { closeModal } = this.props;

      const afterSave = data => {
        closeModal();
      };

      return (
        <ButtonMutate
          mutation={object ? mutations.documentsEdit : mutations.documentsAdd}
          variables={values}
          callback={afterSave}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          successMessage={`You successfully ${
            object ? 'updated' : 'added'
          } a ${name}`}
        />
      );
    };

    const updatedProps = {
      ...this.props,
      renderButton
    };

    return <DocumentForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['documentDetail', 'documents', 'documentsCounts'];
};

export default withProps(DocumentFormContainer);
