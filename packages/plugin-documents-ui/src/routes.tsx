import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import queryString from 'query-string';
import React from 'react';
import { Route } from 'react-router-dom';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List - Documents" */ './containers/List')
);

const DocumentDetail = asyncComponent(() =>
  import(
    /* webpackChunkName: "List - Documents" */ './containers/DocumentDetail'
  )
);

const documents = ({ location, history }) => {
  const queryParams = queryString.parse(location.search);

  return <List queryParams={queryParams} history={history} />;
};

const documentDetail = ({ match, history }) => {
  const id = match.params.id;

  return <DocumentDetail id={id} history={history} />;
};

const routes = () => {
  return (
    <>
      <Route path="/documents/" component={documents} />
      <Route
        key="/document/details/:id"
        exact={true}
        path="/document/details/:id"
        component={documentDetail}
      />
    </>
  );
};

export default routes;
