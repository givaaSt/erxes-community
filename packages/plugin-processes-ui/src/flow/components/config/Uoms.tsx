import React from 'react';

import { IUom } from '@erxes/ui-products/src/types';
import {
  Button,
  DataWithLoader,
  EmptyState,
  HeaderDescription,
  ModalTrigger,
  Pagination,
  Table
} from '@erxes/ui/src/components';
import { Wrapper } from '@erxes/ui/src/layout';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import { __ } from '@erxes/ui/src/utils';

// import { IUom } from '../../types';
import Row from './Row';
import Sidebar from './Sidebar';
import Form from './UomsForm';

type Props = {
  uomsTotalCount: number;
  uoms: IUom[];
  loading: boolean;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  remove: (brandId: string) => void;
};

class Brands extends React.Component<Props, {}> {
  renderContent() {
    const { uoms, renderButton, remove } = this.props;

    if (uoms.length === 0) {
      return (
        <EmptyState image="/images/actions/8.svg" text="No Uoms" size="small" />
      );
    }

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>{__('Name')}</th>
              <th>{__('code')}</th>
              <th>{__('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {uoms.map(uom => {
              return (
                <Row
                  key={uom._id}
                  uom={uom}
                  renderButton={renderButton}
                  remove={remove}
                />
              );
            })}
          </tbody>
        </Table>
        <Pagination count={10} />
      </>
    );
  }

  render() {
    const { uomsTotalCount, loading } = this.props;
    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('Uoms'), link: '/settings/uoms-manage' }
    ];

    const addBrand = (
      <Button
        id={'NewUomButton'}
        btnStyle="success"
        block={true}
        icon="plus-circle"
      >
        Add Uom
      </Button>
    );

    const content = props => (
      <Form {...props} extended={true} renderButton={this.props.renderButton} />
    );

    const righActionBar = (
      <ModalTrigger
        size="lg"
        title="New Uom"
        autoOpenKey="showUomAddModal"
        trigger={addBrand}
        content={content}
      />
    );

    return (
      <Wrapper
        header={<Wrapper.Header title={`Uom`} breadcrumb={breadcrumb} />}
        mainHead={
          <HeaderDescription
            icon="/images/actions/32.svg"
            title={'Uoms'}
            description={__('Add uoms ...')}
          />
        }
        actionBar={<Wrapper.ActionBar right={righActionBar} />}
        leftSidebar={<Sidebar />}
        content={
          <DataWithLoader
            data={this.renderContent()}
            loading={loading}
            count={uomsTotalCount}
            emptyText="Add an integration in this Uom"
            emptyImage="/images/actions/2.svg"
          />
        }
        footer={uomsTotalCount > 0 && <Pagination count={uomsTotalCount} />}
      />
    );
  }
}

export default Brands;
