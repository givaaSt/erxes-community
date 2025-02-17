import { Document, Schema } from 'mongoose';
import { ITransactionItem } from './transactionItems';
import { field, schemaHooksWrapper } from './utils';

export interface ITransactionCreateParams extends ITransaction {
  products: ITransactionItem[];
}

export interface ITransaction {
  status: string;
  contentType: string;
  contentId: string;
}

export interface ITransactionDocument extends ITransaction, Document {
  _id: string;
  createdAt: Date;
}

export const transactionSchema = schemaHooksWrapper(
  new Schema({
    _id: field({ pkey: true }),

    status: field({ type: String, label: 'Status' }),
    contentType: field({ type: String, label: 'Content Type' }),
    contentId: field({ type: String, label: 'Content ID' }),

    createdAt: { type: Date, default: new Date(), label: 'Created date' }
  }),
  'erxes_transactions'
);

// for transactionSchema query. increases search speed, avoids in-memory sorting
transactionSchema.index({
  contentType: 1,
  contentId: 1,
  branchId: 1,
  departmentId: 1
});
