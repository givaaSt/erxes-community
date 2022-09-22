export const documentFields = `
    _id
    name
    attachments {
      duration
      name
      size
      type
      url
    }
    description
    createdAt
    modifiedAt
`;

const listParamsDef = `
  $page: Int
  $perPage: Int
  $searchValue: String
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  searchValue: $searchValue
`;

const documents = `
  query documents(${listParamsDef}) {
    documents(${listParamsValue}) {
      ${documentFields}
    }
  }
`;

export const documentDetail = ` 
  query documentDetail($_id: String!) {
    documentDetail(_id: $_id) {
      ${documentFields}
    }
  }
`;

export const documentCounts = `
  query documentsCounts {
    documentsCounts
  }
`;

export default {
  documents,
  documentDetail,
  documentCounts
};
