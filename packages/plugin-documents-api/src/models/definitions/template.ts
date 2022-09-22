import { Document, Schema } from 'mongoose';
import { field, schemaHooksWrapper } from './utils';

export interface IDocument {
  attachments?: any;
  description?: string;
}

export interface IDocumentDocument extends IDocument, Document {
  _id: string;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
}

const attachmentSchema = schemaHooksWrapper(
  new Schema({
    name: field({ type: String }),
    url: field({ type: String }),
    description: field({ type: String }),
    type: field({ type: String }),
    size: field({ type: Number, optional: true })
  }),
  'erxes_attachmentSchema'
);

export const documentSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  attachments: field({ type: [attachmentSchema] }),
  createdAt: field({ type: Date, label: 'Createdat' }),
  modifiedAt: field({ type: Date, label: 'Modified at' })
});
