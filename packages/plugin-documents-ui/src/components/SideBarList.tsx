import { router } from '@erxes/ui/src/utils';
import { TopHeader } from '@erxes/ui/src/styles/main';
import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import { __ } from '@erxes/ui/src/utils/core';
import Button from '@erxes/ui/src/components/Button';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import Icon from '@erxes/ui/src/components/Icon';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import Tip from '@erxes/ui/src/components/Tip';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import { SidebarList } from '@erxes/ui/src/layout/styles';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import React from 'react';
import { Link } from 'react-router-dom';

const { Section } = Wrapper.Sidebar;

interface IProps {
  history: any;
  queryParams: any;
}

class List extends React.Component<IProps> {
  renderCategoryHeader() {
    const trigger = (
      <Button
        btnStyle="success"
        uppercase={false}
        icon="plus-circle"
        block={true}
      >
        Add category
      </Button>
    );

    return (
      <>
        <TopHeader>{'Documents'}</TopHeader>
        <Section.Title>
          {__('Documents')}
          {/* <Section.QuickButtons>
            {router.getParam(this.props.history, 'categoryId') && (
              <a href="#cancel" tabIndex={0} onClick={this.clearCategoryFilter}>
                <Tip text={__('Clear filter')} placement="bottom">
                  <Icon icon="cancel-1" />
                </Tip>
              </a>
            )} */}
          {/* </Section.QuickButtons> */}
        </Section.Title>

        <Section.Title>
          {__('Recent')}
          {/* <Section.QuickButtons>
            {router.getParam(this.props.history, 'categoryId') && (
              <a href="#cancel" tabIndex={0} onClick={this.clearCategoryFilter}>
                <Tip text={__('Clear filter')} placement="bottom">
                  <Icon icon="cancel-1" />
                </Tip>
              </a>
            )} */}
          {/* </Section.QuickButtons> */}
        </Section.Title>
        <Section.Title>
          {__('Trash')}
          {/* <Section.QuickButtons>
            {router.getParam(this.props.history, 'categoryId') && (
              <a href="#cancel" tabIndex={0} onClick={this.clearCategoryFilter}>
                <Tip text={__('Clear filter')} placement="bottom">
                  <Icon icon="cancel-1" />
                </Tip>
              </a>
            )} */}
          {/* </Section.QuickButtons> */}
        </Section.Title>
      </>
    );
  }

  //   renderCategoryList() {
  //     const { carCategoriesCount, loading } = this.props;

  //     return (
  //       <SidebarList>
  //         <DataWithLoader
  //           data={this.renderContent()}
  //           loading={loading}
  //           count={carCategoriesCount}
  //           emptyText="There is no car category"
  //           emptyIcon="folder-2"
  //           size="small"
  //         />
  //       </SidebarList>
  //     );
  //   }

  render() {
    return (
      <Sidebar>
        <Section maxHeight={188}>
          {this.renderCategoryHeader()}
          {/* {this.renderCategoryList()} */}
        </Section>
      </Sidebar>
    );
  }
}

export default List;
