import { IContext } from '../../connectionResolver';
import { checkPermission, putDeleteLog } from '@erxes/api-utils/src';
import { requireLogin } from '@erxes/api-utils/src/permissions';
import { IDocument } from '../../models/definitions/template';

const documentMutations = {
  /**
   * Creates a new template
   */
  async documentsAdd(_root: any, doc: IDocument, { models }: IContext) {
    const document = await models.Documents.createDocument(doc);

    return document;
  },

  documentsRemove: async (
    _root,
    { documentIds }: { documentIds: string[] },
    { models }
  ) => {
    console.log(documentIds, 'hhrhhrhrhrhhrhrhrhrh');
    await models.Documents.removeDocument(documentIds);

    return documentIds;
  },

  async documentsEdit(_root: any, { _id, ...doc }, { models }: IContext) {
    const updated = await models.Documents.editDocument(_id, doc);
    return updated;
  }
};

requireLogin(documentMutations, 'documentsAdd');
requireLogin(documentMutations, 'documentsEdit');
requireLogin(documentMutations, 'documentsRemove');

// checkPermission(documentMutations, 'documentsAdd', 'manageDocuments');
// checkPermission(documentMutations, 'documentsEdit', 'manageDocuments');
// checkPermission(documentMutations, 'documentsRemove', 'manageDocuments');

export default documentMutations;
