import { __, confirm, router } from '@erxes/ui/src/utils';
import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import { BarItems } from '@erxes/ui/src/layout/styles';
import FormControl from '@erxes/ui/src/components/form/Control';
import Sidebar from './Sidebar';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import Button from '@erxes/ui/src/components/Button';
import DocumentForm from '../containers/DocumentForm';
import { IDocument } from '../types';
import withTableWrapper from '@erxes/ui/src/components/table/withTableWrapper';
import Table from '@erxes/ui/src/components/table';
import DocumentRow from './DocumentRow';
import Alert from '@erxes/ui/src/utils/Alert';
import { IRouterProps } from '@erxes/ui/src/types';

interface IProps extends IRouterProps {
  queryParams: any;
  history: any;
  documents: IDocument[];
  removeDocuments: (
    doc: { documentIds: string[] },
    emptyBulk: () => void
  ) => void;
  toggleBulk: () => void;
  toggleAll: (targets: IDocument[], containerId: string) => void;
  bulk: any[];
  isAllSelected: boolean;
  emptyBulk: () => void;
  loading: boolean;
  documentsCount: number;
  searchValue: string;
}

type State = {
  searchValue?: string;
};

class ListComp extends React.Component<IProps, State> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  onChange = () => {
    const { toggleAll, documents } = this.props;
    toggleAll(documents, 'documents');
  };

  mainContent() {
    const { documents, history, toggleBulk, isAllSelected, bulk } = this.props;

    return (
      <withTableWrapper.Wrapper>
        <Table
          whiteSpace="nowrap"
          hover={true}
          bordered={true}
          responsive={true}
          wideHeader={true}
        >
          <thead>
            <tr>
              <th>
                <FormControl
                  checked={isAllSelected}
                  componentClass="checkbox"
                  onChange={this.onChange}
                />
              </th>
              <th>{__('Name')}</th>
              <th>{__('File name')}</th>
              <th>{__('File type')}</th>
              <th>{__('Descripition')}</th>
              <th>{__('Created at')}</th>
            </tr>
          </thead>
          <tbody id="clientPortalUsers">
            {(documents || []).map((document, i) => (
              <DocumentRow
                document={document}
                key={document._id}
                isChecked={bulk.includes(document)}
                toggleBulk={toggleBulk}
                history={history}
              />
            ))}
          </tbody>
        </Table>
      </withTableWrapper.Wrapper>
    );
  }

  removeDocuments = documents => {
    const documentIds: string[] = [];

    documents.forEach(car => {
      documentIds.push(car._id);
    });

    this.props.removeDocuments({ documentIds }, this.props.emptyBulk);
  };

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    this.setState({ searchValue });
    this.timer = setTimeout(() => {
      router.removeParams(history, 'page');
      router.setParams(history, { searchValue });
    }, 500);
  };

  moveCursorAtTheEnd = e => {
    const tmpValue = e.target.value;
    e.target.value = '';
    e.target.value = tmpValue;
  };

  render() {
    const { queryParams, bulk, loading, documentsCount } = this.props;

    const addTrigger = (
      <Button btnStyle="success" size="small" icon="plus-circle">
        Upload file...
      </Button>
    );

    const renderFormContent = props => {
      return <DocumentForm {...props} queryParams={queryParams} />;
    };

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Type to search')}
          onChange={this.search}
          value={this.state.searchValue}
          autoFocus={true}
          onFocus={this.moveCursorAtTheEnd}
        />

        <ModalTrigger
          title="New Document"
          trigger={addTrigger}
          autoOpenKey="showDocumentModal"
          content={renderFormContent}
        />
      </BarItems>
    );

    let actionBarLeft: React.ReactNode;

    if (bulk.length > 0) {
      const onClick = () =>
        confirm()
          .then(() => {
            this.removeDocuments(bulk);
          })
          .catch(error => {
            Alert.error(error.message);
          });

      actionBarLeft = (
        <BarItems>
          <Button
            btnStyle="danger"
            size="small"
            icon="cancel-1"
            onClick={onClick}
          >
            Delete
          </Button>
        </BarItems>
      );
    }

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} left={actionBarLeft} />
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header title={__(`Documents`) + ` (${documentsCount})`} />
        }
        actionBar={actionBar}
        footer={<Pagination count={documentsCount} />}
        leftSidebar={
          <Sidebar
            loadingMainQuery={false}
            queryParams={queryParams}
            history={history}
          />
        }
        content={
          <DataWithLoader
            data={this.mainContent()}
            loading={loading}
            count={documentsCount}
            emptyText="Add in your first templates!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default ListComp;
