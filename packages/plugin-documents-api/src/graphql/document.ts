import {
  attachmentInput,
  attachmentType
} from '@erxes/api-utils/src/commonTypeDefs';

export const types = `

${attachmentType}
${attachmentInput}

type Document {
    _id: String!
    name: String
    createdAt: Date
    modifiedAt: Date
    description: String
    attachments: [Attachment]
  }
`;

const documentParams = `
  page: Int
  perPage: Int
  searchValue: String
`;

export const queries = `
  documents(${documentParams}): [Document]
  documentDetail(_id: String!): Document
  documentsCounts(${documentParams}): JSON
`;

const DocumentCommonFields = `
  name: String!
  description: String
  attachments: [AttachmentInput]
`;

export const mutations = `
  documentsEdit(_id: String!, ${DocumentCommonFields}) : Document
  documentsRemove(documentIds: [String]) : [String]
  documentsAdd(${DocumentCommonFields}) : Document
`;
