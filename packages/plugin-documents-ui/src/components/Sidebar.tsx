import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import SideBarList from './SideBarList';

function Sidebar({
  loadingMainQuery,
  queryParams,
  history
}: {
  loadingMainQuery: boolean;
  queryParams: any;
  history: any;
}) {
  return (
    <Wrapper.Sidebar>
      <SideBarList />
    </Wrapper.Sidebar>
  );
}
export default Sidebar;
