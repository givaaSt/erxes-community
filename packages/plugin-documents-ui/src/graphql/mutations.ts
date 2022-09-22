import { documentFields } from './queries';

const documentVariableDef = `
    $name: String!
    $attachments: [AttachmentInput]
    $description: String
`;

const documentVariables = `
    name: $name
    attachments: $attachments
    description: $description
`;

const documentsAdd = `
  mutation documentsAdd(${documentVariableDef}) {
    documentsAdd(${documentVariables}) {
      ${documentFields}
    }
  }
`;

const documentsEdit = `
  mutation documentsEdit($_id: String!, ${documentVariableDef}) {
    documentsEdit(_id: $_id, ${documentVariables}) {
      ${documentFields}
    }
  }
`;

const documentsRemove = `
  mutation documentsRemove($documentIds: [String]) {
    documentsRemove(documentIds: $documentIds)
  }
`;

export default {
  documentsAdd,
  documentsEdit,
  documentsRemove
};
