import { IProduct } from '../../plugin-tumentech-ui/src/types';

export interface IDocumentDoc {
  name: string;
  attachments: any;
  description: string;
}

export interface IDocument extends IDocumentDoc {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type QueryResponse = {
  loading: boolean;
  refetch: () => Promise<any>;
  error?: string;
};

export type DocumentsQueryResponse = {
  documents: IDocument[];
} & QueryResponse;

export type DetailQueryResponse = {
  documentDetail: IDocument;
} & QueryResponse;

export type RemoveMutationVariables = {
  documentIds: string[];
};

export type RemoveMutationResponse = {
  documentsRemove: (params: {
    variables: RemoveMutationVariables;
  }) => Promise<any>;
};

export type DocumentsCountQueryResponse = {
  documentsCounts: number;
  loading: boolean;
  refetch: () => void;
};
