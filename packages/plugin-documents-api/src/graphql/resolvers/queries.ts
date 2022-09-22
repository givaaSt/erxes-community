import { requireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';
import { paginate } from 'erxes-api-utils';

const documentQueries = {
  documents(_root: any, params, { models }: IContext) {
    const selector = {} as any;

    if (params.searchValue) {
      selector.name = { $in: [new RegExp(`.*${params.searchValue}.*`, 'i')] };
    }

    return paginate(models.Documents.find(selector), params);
  },

  documentsCounts(_root: any, _args: any, { models }: IContext) {
    return models.Documents.find({}).countDocuments();
  },

  documentDetail: async (_root, { _id }, { models }) => {
    return models.Documents.getDocument(_id);
  }
};

// requireLogin(templateQueries, 'templates');
// requireLogin(templateQueries, 'templatesTotalCount');

export default documentQueries;
